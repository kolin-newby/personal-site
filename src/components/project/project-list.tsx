import React from "react";
import { ProjectDisplay } from "./project-display";
import { DriftBoard, DriftItem } from "../common/drift-board";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  dragBoundsRef: React.RefObject<HTMLElement | null>;
  touch: boolean;
};

// Desktop list - cards drift around and can be dragged and thrown.
export const ProjectList = ({ projectList, dragBoundsRef, touch }: Props) => {
  return (
    <DriftBoard
      as="ul"
      boundsRef={dragBoundsRef}
      touch={touch}
      className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] items-start gap-4"
    >
      {projectList?.map((item, index) => {
        const key = item.title + "-" + index;
        return (
          <DriftItem key={key} id={key} className="rounded-2xl bg-gray-200">
            <ProjectDisplay project={item} />
          </DriftItem>
        );
      })}
    </DriftBoard>
  );
};
