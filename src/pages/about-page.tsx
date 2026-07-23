import PhotoCarousel from "@/components/photo-carousel";
import IdleScrollArea from "@/components/idle-scroll-area";
import TextHighlighterContainer from "@/components/text-highlighter-container";
import Button from "@/components/common/button";
import { useGetBio } from "@/hooks/useGetBio";
import {
  renderDocumentNodes,
  type Element as DocumentElement,
} from "@/components/document-renderer";
import { useGetPersonalLinkList } from "@/hooks/useGetPersonalLinkList";
import { useGetIconDisplay } from "@/hooks/useGetIconDisplay";
import { CustomSvg } from "@/components/custom-svg";
import type { Icon } from "@/generated/graphql";

type Props = {
  className?: string;
};

const AboutPage = ({ className = "" }: Props) => {
  const { data: bioData, error: bioError, isError: isBioError } = useGetBio();
  const {
    data: iconDisplayData,
    error: iconDisplayError,
    isError: isIconDisplayError,
  } = useGetIconDisplay();
  const {
    data: linkListData,
    error: linkListError,
    isError: isLinkListError,
  } = useGetPersonalLinkList();

  if (isBioError) console.error("useGetBio error: ", bioError);
  if (isLinkListError) console.error("useGetLinkList error: ", linkListError);
  if (isIconDisplayError)
    console.error("useGetIconDisplay error: ", iconDisplayError);

  const sectionIconDisplayList = (
    input: Icon[],
    rows: number,
    // starts at 1.
    position: number,
  ) => {
    if (position > rows) return [];
    const remainder = input?.length % rows;
    const sectionLengths = (input?.length - remainder) / rows;

    let final = input?.slice(
      (position - 1) * sectionLengths,
      position * sectionLengths,
    );

    if (!final) return [];

    if (remainder === 0 || position > remainder) return final;

    return [...final, input[rows * sectionLengths + (position - 1)]];
  };

  return (
    <div
      id={"about"}
      className={`relative flex lg:h-screen h-full w-full flex-col lg:flex-row items-center pb-5 sm:pb-0 ${className}`}
    >
      <div
        className={
          "flex flex-col items-center lg:h-full w-full lg:justify-center lg:space-y-0"
        }
      >
        <div
          className={
            "flex flex-col space-y-4 text-xs md:text-sm text-shadow p-6 lg:px-12 items-start justify-end max-w-225 lg:min-h-1/2 pb-4 pt-10 lg:pb-0 lg:pt-10"
          }
        >
          <div>
            <TextHighlighterContainer
              className="flex flex-col space-y-2"
              terms={bioData?.bio?.textToHighlight?.map(
                (item) => item.name ?? "",
              )}
              caseSensitive
              holdAfterAllSec={10}
              perWordFillSec={0.45}
            >
              {bioData?.bio?.content &&
                renderDocumentNodes(
                  (bioData.bio.content.document as DocumentElement[]) ?? [],
                )}
            </TextHighlighterContainer>
          </div>

          <div className="flex justify-evenly items-center w-full pt-3 space-x-2">
            {linkListData?.personalLinkList?.links?.map((link) => {
              const {
                label,
                url,
                newTab,
                icon,
                isDownload,
                downloadValue,
                downloadFile,
              } = link;

              return (
                <Button
                  buttonText={label}
                  aria-label={label}
                  href={
                    isDownload && downloadFile?.file?.url
                      ? downloadFile?.file?.url
                      : url
                  }
                  newTab={newTab}
                  download={isDownload && downloadValue ? downloadValue : null}
                  icon={
                    icon?.svg?.file?.url && (
                      <CustomSvg source={icon?.svg?.file?.url ?? ""} />
                    )
                  }
                />
              );
            })}
          </div>
        </div>
        <div
          className={
            "flex w-full lg:w-auto lg:grow items-center justify-center"
          }
        >
          {/* ====================================================== */}
          <div
            className={`relative flex flex-col space-y-3 lg:max-w-112.5 w-full text-black/40 py-3 shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 lg:rounded-lg ${iconDisplayData?.iconDisplay?.icon?.length && iconDisplayData?.iconDisplay?.icon?.length >= 12 && "lg:hidden"}`}
          >
            <div key={"skills-row-all"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={50}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full h-full leading-0"
              >
                <div className="inline-flex items-center">
                  {iconDisplayData?.iconDisplay?.icon?.map((icon, index) => (
                    <CustomSvg
                      source={icon?.svg?.file?.url ?? ""}
                      key={`skill-all-${index}-${icon?.label}`}
                      className={
                        "mx-10 size-10 md:size-14 lg:size-16 opacity-50 hover:opacity-100 transition-opacity"
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
            className={`relative hidden flex-col space-y-3 lg:max-w-112.5 w-full text-black/40 py-4 shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 lg:rounded-lg ${iconDisplayData?.iconDisplay?.icon?.length && iconDisplayData?.iconDisplay?.icon?.length >= 12 && "lg:flex"}`}
          >
            <div key={"skills-row-1"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={80}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full leading-0"
              >
                <div className="inline-flex items-center">
                  {sectionIconDisplayList(
                    iconDisplayData?.iconDisplay?.icon as Icon[],
                    3,
                    1,
                  ).map((icon, index) => (
                    <CustomSvg
                      source={icon?.svg?.file?.url ?? ""}
                      key={`skill-all-${index}-${icon?.label}`}
                      className={
                        "mx-10 size-10 md:size-14 lg:size-16 opacity-50 hover:opacity-100 transition-opacity"
                      }
                    />
                  ))}
                </div>
              </IdleScrollArea>
            </div>
            <div key={"skills-row-2"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={60}
                idleDelay={2000}
                startDirection="backward"
                className="scrollbar-display-none w-full leading-0"
              >
                <div className="inline-flex items-center">
                  {sectionIconDisplayList(
                    iconDisplayData?.iconDisplay?.icon as Icon[],
                    3,
                    2,
                  ).map((icon, index) => (
                    <CustomSvg
                      source={icon?.svg?.file?.url ?? ""}
                      key={`skill-all-${index}-${icon?.label}`}
                      className={
                        "mx-10 size-10 md:size-14 lg:size-16 opacity-50 hover:opacity-100 transition-opacity"
                      }
                    />
                  ))}
                </div>
              </IdleScrollArea>
            </div>
            <div key={"skills-row-3"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={50}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full h-full leading-0"
              >
                <div className="inline-flex items-center">
                  {sectionIconDisplayList(
                    iconDisplayData?.iconDisplay?.icon as Icon[],
                    3,
                    3,
                  ).map((icon, index) => (
                    <CustomSvg
                      source={icon?.svg?.file?.url ?? ""}
                      key={`skill-all-${index}-${icon?.label}`}
                      className={
                        "mx-10 size-10 md:size-14 lg:size-16 opacity-50 hover:opacity-100 transition-opacity"
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
      <PhotoCarousel
        className={"flex lg:max-w-1/2 lg:min-w-50 w-full h-1/2 lg:h-full grow"}
      />
    </div>
  );
};

export default AboutPage;
