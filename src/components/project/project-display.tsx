import type { Project } from "@/generated/graphql";
import { useGradientColor } from "@/common/gradient-color";
import { RepoIcon } from "../repo";

type Props = {
  project: Project;
};

export const ProjectDisplay = ({ project }: Props) => {
  const bgColor = useGradientColor();

  return (
    <div className={`relative flex flex-col rounded-2xl p-1 ${bgColor}`}>
      <div className="flex flex-col rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex flex-row items-center gap-2">
          <RepoIcon type={project.repository?.type} className="inline" />
          <h2 className="inline font-bold">{project.title}</h2>
        </div>
      </div>
      <div className="flex items-center justify-center py-2">
        <span className="opacity-60">{project.projectContext}</span>
      </div>
    </div>
  );
};
