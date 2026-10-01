import { ProjectDisplayMobile } from "./project-display-mobile";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  touch: boolean;
};

// Small-screen list - cards stick and stack as you scroll.
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
