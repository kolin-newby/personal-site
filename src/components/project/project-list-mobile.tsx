import { ProjectDisplayMobile } from "./project-display-mobile";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  touch: boolean;
};

// Static list for small screens - no drifting or drag-and-drop.
export const ProjectListMobile = ({ projectList, touch }: Props) => {
  return (
    <ul className={`w-full`}>
      {projectList?.map((item, index) => (
        <ProjectDisplayMobile
          key={item.id}
          index={index}
          count={projectList.length}
          project={item}
          touch={touch}
        />
      ))}
    </ul>
  );
};
