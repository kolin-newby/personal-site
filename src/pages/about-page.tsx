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
import type { Icon, GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  data?: GetSiteDataQuery | undefined;
  touch: boolean;
};

const AboutPage = ({ touch, data }: Props) => {
  const { bio, iconDisplay, personalLinkList } = data ?? {};

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const isPhotoOpen = activePhotoIndex !== null;

  const isLg = useIsLg();

  const sectionIconDisplayList = (
    input: Icon[],
    rows: number,
    // starts at 1.
    position: number
  ) => {
    if (position > rows) return [];
    const remainder = input?.length % rows;
    const sectionLengths = (input?.length - remainder) / rows;

    let final = input?.slice(
      (position - 1) * sectionLengths,
      position * sectionLengths
    );

    if (!final) return [];

    if (remainder === 0 || position > remainder) return final;

    return [...final, input[rows * sectionLengths + (position - 1)]];
  };

  return (
    <section
      id={"about"}
      className="relative flex min-h-dvh w-full snap-start flex-col items-center pt-(--nav-h) lg:flex-row"
    >
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
            {/* ====================================================== */}
            <div
              className={`inset-card relative flex w-full flex-col space-y-3 py-2 text-black/40 lg:max-w-112.5 lg:rounded-lg ${iconDisplay?.icon?.length && iconDisplay?.icon?.length >= 12 && "lg:hidden"}`}
            >
              <div key={"skills-row-all"} className={"w-full overflow-hidden"}>
                <IdleScrollArea
                  axis="x"
                  speed={70}
                  idleDelay={2000}
                  startDirection="forward"
                  className="scrollbar-display-none h-full w-full leading-0"
                >
                  <div className="inline-flex items-center">
                    {iconDisplay?.icon?.map((icon, index) => (
                      <CustomSvg
                        source={icon?.svg?.file?.url ?? ""}
                        key={`skill-all-${index}-${icon?.label}`}
                        className={
                          "mx-10 size-10 opacity-50 transition-opacity hover:opacity-100 md:size-14 lg:size-16"
                        }
                      />
                    ))}
                  </div>
                </IdleScrollArea>
              </div>
            </div>

            {/* single line skill scroller above ^ */}
            {/* triple line skill scroller below \/ */}

            <div
              className={`inset-card relative hidden w-full flex-col space-y-2 py-2.5 text-black/40 lg:max-w-112.5 lg:rounded-lg ${iconDisplay?.icon?.length && iconDisplay?.icon?.length >= 12 && "lg:flex"}`}
            >
              <div key={"skills-row-1"} className={"w-full overflow-hidden"}>
                <IdleScrollArea
                  axis="x"
                  speed={80}
                  idleDelay={2000}
                  startDirection="forward"
                  className="scrollbar-display-none w-full leading-0"
                >
                  <div className="inline-flex items-center">
                    {sectionIconDisplayList(
                      iconDisplay?.icon as Icon[],
                      3,
                      1
                    ).map((icon, index) => (
                      <CustomSvg
                        source={icon?.svg?.file?.url ?? ""}
                        key={`skill-all-${index}-${icon?.label}`}
                        className={
                          "mx-10 size-10 opacity-50 transition-opacity hover:opacity-100 md:size-14 lg:size-16"
                        }
                      />
                    ))}
                  </div>
                </IdleScrollArea>
              </div>
              <div key={"skills-row-2"} className={"w-full overflow-hidden"}>
                <IdleScrollArea
                  axis="x"
                  speed={60}
                  idleDelay={2000}
                  startDirection="backward"
                  className="scrollbar-display-none w-full leading-0"
                >
                  <div className="inline-flex items-center">
                    {sectionIconDisplayList(
                      iconDisplay?.icon as Icon[],
                      3,
                      2
                    ).map((icon, index) => (
                      <CustomSvg
                        source={icon?.svg?.file?.url ?? ""}
                        key={`skill-all-${index}-${icon?.label}`}
                        className={
                          "mx-10 size-10 opacity-50 transition-opacity hover:opacity-100 md:size-14 lg:size-16"
                        }
                      />
                    ))}
                  </div>
                </IdleScrollArea>
              </div>
              <div key={"skills-row-3"} className={"w-full overflow-hidden"}>
                <IdleScrollArea
                  axis="x"
                  speed={50}
                  idleDelay={2000}
                  startDirection="forward"
                  className="scrollbar-display-none h-full w-full leading-0"
                >
                  <div className="inline-flex items-center">
                    {sectionIconDisplayList(
                      iconDisplay?.icon as Icon[],
                      3,
                      3
                    ).map((icon, index) => (
                      <CustomSvg
                        source={icon?.svg?.file?.url ?? ""}
                        key={`skill-all-${index}-${icon?.label}`}
                        className={
                          "mx-10 size-10 opacity-50 transition-opacity hover:opacity-100 md:size-14 lg:size-16"
                        }
                      />
                    ))}
                  </div>
                </IdleScrollArea>
              </div>
            </div>
            {/* ====================================================== */}
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
