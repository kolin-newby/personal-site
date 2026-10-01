import { useState } from "react";
import PhotoCarousel from "@/components/photo-carousel";
import IdleScrollArea from "@/components/idle-scroll-area";
import TextHighlighterContainer from "@/components/text-highlighter-container";
import Button from "@/components/common/button";
import {
  renderDocumentNodes,
  type Element as DocumentElement
} from "@/components/document-renderer";
import { CustomSvg } from "@/components/custom-svg";
import { useIsLg } from "@/common/use-media-query";
import type { GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  data?: GetSiteDataQuery | undefined;
  touch: boolean;
};

type SkillIcon = NonNullable<
  NonNullable<GetSiteDataQuery["iconDisplay"]>["icon"]
>[number];

// With this many icons, lg screens split them over several rows.
const MULTI_ROW_MIN_ICONS = 12;

const multiRows = [
  { speed: 80, direction: "forward" },
  { speed: 60, direction: "backward" },
  { speed: 50, direction: "forward" }
] as const;

// Splits `items` into `rows` equal runs, then deals any leftovers from the
// end of the list out one per row.
const splitRows = <T,>(items: T[], rows: number): T[][] => {
  const size = Math.floor(items.length / rows);
  return Array.from({ length: rows }, (_, i) => {
    const row = items.slice(i * size, (i + 1) * size);
    const extra = items[rows * size + i];
    return extra ? [...row, extra] : row;
  });
};

const IconRow = ({
  icons,
  speed,
  direction
}: {
  icons: SkillIcon[];
  speed: number;
  direction: "forward" | "backward";
}) => (
  <div className="w-full overflow-hidden">
    <IdleScrollArea
      axis="x"
      speed={speed}
      idleDelay={2000}
      startDirection={direction}
      className="scrollbar-display-none w-full leading-0"
    >
      <div className="inline-flex items-center">
        {icons.map((icon, index) => (
          <CustomSvg
            source={icon.svg?.file?.url ?? ""}
            key={`skill-${index}-${icon.label}`}
            role="img"
            aria-label={icon.label ?? undefined}
            className="mx-10 size-10 opacity-50 transition-opacity hover:opacity-100 md:size-14 lg:size-16"
          />
        ))}
      </div>
    </IdleScrollArea>
  </div>
);

const AboutPage = ({ touch, data }: Props) => {
  const { bio, iconDisplay, personalLinkList } = data ?? {};

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const isPhotoOpen = activePhotoIndex !== null;

  const isLg = useIsLg();

  const icons = iconDisplay?.icon ?? [];
  const multiRow = icons.length >= MULTI_ROW_MIN_ICONS;
  const iconRows = splitRows(icons, multiRows.length);

  return (
    <section
      id={"about"}
      aria-labelledby="about-heading"
      className="relative flex min-h-dvh w-full snap-start flex-col items-center pt-(--nav-h) lg:flex-row"
    >
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <div
        className={
          "flex w-full flex-col items-center lg:justify-center lg:space-y-0"
        }
      >
        <div
          className={
            "text-shadow flex w-full max-w-225 min-w-0 flex-col items-start justify-end space-y-2 px-2 py-2 text-xs wrap-break-word sm:px-4 md:text-sm lg:min-h-1/2 lg:px-12 lg:pt-4 lg:pb-0"
          }
        >
          <div>
            <TextHighlighterContainer
              className="flex flex-col space-y-2"
              terms={bio?.textToHighlight?.map((item) => item.name ?? "")}
              caseSensitive
              holdAfterAllSec={10}
              perWordFillSec={0.45}
            >
              {bio?.content &&
                renderDocumentNodes(
                  (bio.content.document as DocumentElement[]) ?? []
                )}
            </TextHighlighterContainer>
          </div>

          <div className="mt-1 flex w-full items-center justify-between md:mt-2 md:justify-center">
            {personalLinkList?.links?.map((link) => {
              const {
                label,
                url,
                newTab,
                icon,
                isDownload,
                downloadValue,
                downloadFile
              } = link;

              return (
                <Button
                  type="button"
                  key={`social-links-${url}`}
                  buttonText={label}
                  aria-label={label || undefined}
                  touch={touch}
                  href={
                    isDownload && downloadFile?.file?.url
                      ? downloadFile?.file?.url
                      : url
                  }
                  newTab={newTab}
                  download={isDownload && downloadValue ? downloadValue : null}
                  icon={
                    icon?.svg?.file?.url && (
                      <CustomSvg
                        source={icon?.svg?.file?.url || ""}
                        size={28}
                      />
                    )
                  }
                />
              );
            })}
          </div>
        </div>
        <div
          className={`grid w-full transition-all duration-700 lg:mt-2 lg:w-auto lg:grow lg:grid-rows-[1fr] ${
            isPhotoOpen
              ? "mt-0 grid-rows-[0fr]"
              : "mt-1 grid-rows-[1fr] md:mt-2"
          }`}
          aria-hidden={isPhotoOpen && !isLg}
        >
          <div className="flex min-h-0 items-center justify-center overflow-hidden">
            {/* One row, or several on lg screens when there are many icons. */}
            <div
              className={`inset-card relative flex w-full flex-col space-y-3 py-2 text-black/40 lg:max-w-112.5 lg:rounded-lg ${multiRow ? "lg:hidden" : ""}`}
            >
              <IconRow icons={icons} speed={70} direction="forward" />
            </div>
            <div
              className={`inset-card relative hidden w-full flex-col space-y-2 py-2.5 text-black/40 lg:max-w-112.5 lg:rounded-lg ${multiRow ? "lg:flex" : ""}`}
            >
              {multiRows.map((row, i) => (
                <IconRow key={i} icons={iconRows[i] ?? []} {...row} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full grow lg:min-h-[600px] lg:max-w-1/2 lg:min-w-50">
        <PhotoCarousel
          className={"flex w-full grow"}
          photos={data?.gallery?.photos}
          tagline={data?.gallery?.tagline}
          activePhotoIndex={activePhotoIndex}
          setActivePhotoIndex={setActivePhotoIndex}
        />
      </div>
    </section>
  );
};

export default AboutPage;
