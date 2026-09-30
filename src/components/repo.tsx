import { Folder } from "lucide-react";
import { SiGithub, SiGitlab } from "@icons-pack/react-simple-icons";

// The host's logo, or a plain folder when there's no supported repo.
export const RepoIcon = ({
  type,
  className
}: {
  type: string | null | undefined;
  className?: string;
}) =>
  type === "github" ? (
    <SiGithub className={className} />
  ) : type === "gitlab" ? (
    <SiGitlab className={className} />
  ) : (
    <Folder size={24} className={className} />
  );
