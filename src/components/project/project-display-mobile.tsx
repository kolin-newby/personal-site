import { useRef } from "react";
import type { Project } from "@/generated/graphql";
import { prefersReducedMotion } from "@/common/use-media-query";
import { ProjectCard } from "./project-card";

type Props = {
  project: Project;
  index: number;
  count: number;
  touch: boolean;
};

// Also the height of the strip each stacked card leaves showing.
const cardPaddingValue = 39;
const cardDwell = "40dvh";

export const ProjectDisplayMobile = ({
  project,
  index,
  count,
  touch
}: Props) => {
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
      <ProjectCard
        project={project}
        touch={touch}
        className="rounded-t-2xl"
        // The overlap keeps the content clear of the part under the next card;
        // past that, the same inset as the other sides, so the description
        // takes any spare height instead of it pooling below the button.
        style={{ paddingBottom: `calc(0.375rem + ${overlap}px)` }}
        index={index}
        count={count}
        onCounterClick={scrollCardIntoView}
      />
    </li>
  );
};
