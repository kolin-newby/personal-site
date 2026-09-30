import { useId, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/generated/graphql";
import { useGradientColor } from "@/common/gradient-color";
import {
  renderDocumentNodes,
  type Element as DocumentElement
} from "@/components/document-renderer";
import TextHighlighterContainer from "../text-highlighter-container";
import Button from "../common/button";
import { Dot, GitFork, Link2, Star } from "lucide-react";
import { formatCount, RepoIcon, useRepoData } from "../repo-preview";
import { prefersReducedMotion } from "@/common/use-media-query";
import PhotoCarousel from "../photo-carousel";

type Props = {
  project: Project;
  index: number;
  count: number;
  touch: boolean;
};

// Also the height of the strip each stacked card leaves showing.
const cardPaddingValue = 39;
const cardDwell = "40dvh";
// Carousel height with no photo open.
const carouselHeight = "11rem";

export const ProjectDisplayMobile = ({
  project,
  index,
  count,
  touch
}: Props) => {
  const bgColor = useGradientColor();
  const { data: repo, loading: repoLoading } = useRepoData(
    project.repository?.link?.url ?? "",
    project.repository?.type ?? ""
  );
  // The repo card takes priority, so the gallery only shows once there's no
  // repo to wait for: none linked, or it failed to load.
  const showGallery = !repo && !repoLoading && !!project.gallery?.length;

  // Only fade the description's last line when it's actually cut off.
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionOverflows, setDescriptionOverflows] =
    useState<boolean>(false);
  // Whether text is still hidden below, which scrolling changes once expanded.
  const [moreBelow, setMoreBelow] = useState<boolean>(false);
  // Collapses the skills/context below so the description can take their space.
  const [expanded, setExpanded] = useState<boolean>(false);
  // True while "show less" animates. The description fits until the section
  // below has grown back, so without this the button would unmount mid-way.
  const [collapsing, setCollapsing] = useState<boolean>(false);
  const detailsId = useId();

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const isPhotoOpen = activePhotoIndex !== null;

  // An open photo takes over the context card's space, so the carousel grows
  // by exactly what the card gives up. Measured on the card itself, which
  // keeps its natural height inside the collapsed wrapper.
  const contextRef = useRef<HTMLDivElement>(null);
  const [contextHeight, setContextHeight] = useState<number>(0);
  useLayoutEffect(() => {
    const el = contextRef.current;
    if (!el) return;
    const measure = () =>
      setContextHeight(
        el.offsetHeight + parseFloat(getComputedStyle(el).marginTop)
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleExpanded = () => {
    // Reduced motion skips the transition, so there's no transition end to
    // clear this.
    setCollapsing(expanded && !prefersReducedMotion());
    // Collapsing shows the start of the description again.
    if (expanded && descriptionRef.current)
      descriptionRef.current.scrollTop = 0;
    setExpanded(!expanded);
  };

  // scrollIntoView can't be used here: a sticky card that's covered by the
  // ones after it is already "in view" at its stuck position. Instead scroll
  // until the card's normal-flow position lines up with where it sticks,
  // which pushes the later cards back down to their strips at the bottom.
  const cardRef = useRef<HTMLLIElement>(null);
  const scrollCardIntoView = () => {
    const card = cardRef.current;
    const list = card?.parentElement;
    if (!card || !list) return;

    let scroller = list.parentElement;
    while (
      scroller &&
      !/auto|scroll/.test(getComputedStyle(scroller).overflowY)
    )
      scroller = scroller.parentElement;
    if (!scroller) return;

    // Sticky offsets don't affect offsetHeight or margins, so the cards
    // before this one plus the dwell margins give its normal-flow top.
    const marginTop = (el: Element) =>
      parseFloat(getComputedStyle(el).marginTop);
    let naturalTop = list.getBoundingClientRect().top + marginTop(card);
    for (
      let prev = card.previousElementSibling;
      prev;
      prev = prev.previousElementSibling
    )
      naturalTop += (prev as HTMLElement).offsetHeight + marginTop(prev);
    const stuckTop = parseFloat(getComputedStyle(card).top);

    scroller.scrollBy({
      top: naturalTop - stuckTop,
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  };

  const handleDetailsTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && e.propertyName === "grid-template-rows")
      setCollapsing(false);
  };

  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    const check = () => {
      const overflows = el.scrollHeight > el.clientHeight + 1;
      setDescriptionOverflows(overflows);
      setMoreBelow(el.scrollHeight - el.scrollTop > el.clientHeight + 1);
      // Overflow now keeps the button up; the transition end covers the
      // case where it fits even once collapsed.
      if (overflows) setCollapsing(false);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    el.addEventListener("scroll", check, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", check);
    };
  }, []);

  // Every card is the same height: the screen minus a strip for each of the
  // other cards, stacked above (already passed) or below (still to come), so
  // the current card always fits fully between them. All but the last run
  // one strip further, under the next card, so that card's rounded corners
  // show this card's color rather than the page behind.
  const overlap = index < count - 1 ? cardPaddingValue : 0;
  const cardHeight = `(100dvh - var(--nav-h) - ${(count - 1) * cardPaddingValue - overlap}px)`;

  return (
    <li
      ref={cardRef}
      key={project.id}
      className="sticky flex w-full flex-col overflow-hidden rounded-t-2xl bg-gray-200 [container:card/size]"
      style={{
        top: `calc(var(--nav-h) + ${index * cardPaddingValue}px)`,
        // Negative so an upcoming card is held with only its top strip on
        // screen, in the stack below the current card, until the scroll
        // reaches it.
        bottom: `calc(${(count - index) * cardPaddingValue}px - ${cardHeight})`,
        height: `calc${cardHeight}`,
        // Scroll distance the previous card stays fully in view before this
        // one starts sliding up over it.
        marginTop: index > 0 ? cardDwell : 0,
        // Cast upward: cards stack, so the one behind is what shows the shadow.
        boxShadow: "0 -2px 8px rgb(0 0 0 / 0.08)"
      }}
    >
      {/* min-h-0 lets the flex chain shrink below its content so the
          description, not the card's bottom edge, absorbs any overflow. */}
      <div
        className={`relative flex min-h-0 w-full flex-1 flex-col rounded-t-2xl p-1.5 ${bgColor}`}
        // The overlap keeps the content clear of the part under the next card;
        // past that, the same inset as the other sides, so the description
        // takes any spare height instead of it pooling below the button.
        style={{ paddingBottom: `calc(0.375rem + ${overlap}px)` }}
      >
        <div className="flex w-full shrink-0 items-center justify-center pb-1.5">
          {/* The ::before stretches the tap target over the whole strip that
              stays visible when later cards stack on top of this one. */}
          <button
            type="button"
            aria-label={`Scroll to ${project.title}`}
            onClick={scrollCardIntoView}
            className="relative h-[27px] w-1/3 rounded-full bg-gray-100/80 text-black/70 before:absolute before:inset-x-0 before:-inset-y-1.5"
          >
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
          </button>
        </div>
        <div className="inset-card flex min-h-0 grow flex-col rounded-2xl px-3 py-1">
          <div className="mb-3 flex shrink-0 flex-row items-center gap-4">
            <RepoIcon type={project.repository?.type} className="inline" />
            <h2 className="flex flex-col font-bold">
              <span>{project.title}</span>
              <span className="opacity-60">{project.projectContext}</span>
            </h2>
          </div>
          {/* Scrollable once expanded, in case the freed space still isn't
              enough to fit it all. */}
          <div
            ref={descriptionRef}
            className={`mask-fade-b my-auto min-h-0 text-sm motion-safe:scroll-smooth motion-reduce:transition-none ${
              expanded ? "overflow-y-auto" : "overflow-hidden"
            } ${moreBelow ? "[--fade-b-size:2rem]" : ""}`}
          >
            <TextHighlighterContainer
              holdAfterAllSec={12}
              terms={project?.skills?.map((skill) => skill?.name || "")}
            >
              {project.description?.document
                ? renderDocumentNodes(
                    project.description?.document as DocumentElement[]
                  )
                : null}
            </TextHighlighterContainer>
          </div>
          {/* Stays visible once expanded, even if the description then fits,
              so it can be collapsed again. */}
          {(descriptionOverflows || expanded || collapsing) && (
            <div className="flex shrink-0 justify-center pt-2">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={detailsId}
                onClick={toggleExpanded}
              >
                {expanded ? "show less" : "show more"}
              </button>
            </div>
          )}
        </div>
        <div
          id={detailsId}
          className={`grid shrink-0 motion-reduce:transition-none ${
            expanded
              ? "grid-rows-[0fr] opacity-0 [transition:grid-template-rows_300ms_ease-out,opacity_150ms_ease-out]"
              : "grid-rows-[1fr] [transition:grid-template-rows_300ms_ease-out,opacity_200ms_ease-out_100ms]"
          }`}
          inert={expanded}
          onTransitionEnd={handleDetailsTransitionEnd}
          onTransitionCancel={handleDetailsTransitionEnd}
        >
          <div className="min-h-0 overflow-hidden">
            {/* Same duration and easing as the photo and carousel height, so
                the space this gives up and the space the photo takes stay in
                step. */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-700 motion-reduce:transition-none ${
                isPhotoOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]"
              }`}
              inert={isPhotoOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  ref={contextRef}
                  className="inset-card mt-1.5 rounded-2xl px-3 py-1"
                >
                  <p className="mt-2 flex w-full flex-row items-center justify-center font-bold">
                    Skills
                  </p>
                  <div className="mx-3 my-2 flex flex-wrap justify-center gap-1">
                    {project.skills?.map((skill, skillIndex) => (
                      <div key={skill?.id} className="flex gap-1 text-xs">
                        {skillIndex !== 0 && <Dot size={16} />}
                        <p>{skill?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {repo && (
              <div className="tall-card:block inset-card mt-1.5 hidden rounded-2xl px-3 py-1">
                <p className="mb-1 flex flex-row items-center justify-center font-bold">
                  Repository Stats
                </p>
                <div className="mb-1 flex flex-row items-center justify-center gap-4">
                  <span className="flex flex-wrap items-center gap-1">
                    <Star size={20} /> {formatCount(repo.star_count)}
                  </span>
                  <span className="flex flex-wrap items-center gap-1">
                    <GitFork size={20} /> {formatCount(repo.forks_count)}
                  </span>
                  {repo.language && <span>{repo.language}</span>}
                </div>
                <div className="flex flex-row items-center justify-center">
                  Updated {new Date(repo.last_activity_at).toLocaleDateString()}
                </div>
              </div>
            )}
            {showGallery && (
              <div
                className="flex transition-[height] duration-700 motion-reduce:transition-none"
                style={{
                  height: isPhotoOpen
                    ? `calc(${carouselHeight} + ${contextHeight}px)`
                    : carouselHeight
                }}
              >
                <PhotoCarousel
                  className="flex w-full"
                  fitExpanded
                  expandedBgClassName="bg-black/80"
                  photos={project.gallery}
                  activePhotoIndex={activePhotoIndex}
                  setActivePhotoIndex={setActivePhotoIndex}
                />
              </div>
            )}
          </div>
        </div>
        {/* Outside the collapsible details so it stays reachable while the
            description is expanded. */}
        {project.repository?.link?.url && (
          <div>
            <Button
              href={project.repository.link.url}
              gradient={false}
              className="mt-1 w-full cursor-pointer"
              buttonText="Open Repository"
              icon={<Link2 />}
              touch={touch}
            />
          </div>
        )}
      </div>
    </li>
  );
};
