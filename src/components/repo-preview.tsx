import { useEffect, useMemo, useState } from "react";
import ParticleField from "./particle-field";
import { Link2 } from "lucide-react";
import { SiGithub, SiGitlab } from "@icons-pack/react-simple-icons";

type GitHubRepo = {
  html_url: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  archived: boolean;
  organization?: { avatar_url: string } | null;
};

type GitLabRepo = {
  name: string;
  path_with_namespace: string;
  description: string | null;
  avatar_url: string | null;
  web_url: string;
  forks_count: number;
  star_count: number;
  last_activity_at: string;
  archived: boolean;
};

type NormalizedRepo = {
  name: string;
  description: string | null;
  avatar_url: string | null;
  web_url: string;
  forks_count: number;
  star_count: number;
  last_activity_at: string;
  archived: boolean;
  organization: { avatar_url: string } | null;
  language: string | null;
};

const parseGitHubUrl = (url: string): string => {
  try {
    const u = new URL(url);
    if (!/github\.com$/i.test(u.hostname)) return "";
    const [owner, repo] = u.pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) return "";
    return `https://api.github.com/repos/${owner}/${repo}`;
  } catch {
    return "";
  }
};

const parseGitLabProjectPath = (url: string): string => {
  try {
    const u = new URL(url);
    if (!/gitlab\.com$/i.test(u.hostname)) return "";
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    if (!path) return "";
    return encodeURIComponent(path);
  } catch {
    return "";
  }
};

const formatCount = (n: number): string => {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
};

type Props = {
  url: string;
  type: string;
  className?: string;
};

export const RepoPreview = ({ url, type, className = "" }: Props) => {
  const parsedGitHubUrl = useMemo(() => parseGitHubUrl(url), [url]);
  const parsedGitLabPath = useMemo(() => parseGitLabProjectPath(url), [url]);
  const [data, setData] = useState<NormalizedRepo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const normalizeData = (rawData: GitHubRepo | GitLabRepo): NormalizedRepo => {
    if ("full_name" in rawData) {
      return {
        name: rawData.full_name,
        description: rawData.description,
        avatar_url: null,
        web_url: rawData.html_url,
        forks_count: rawData.forks_count,
        star_count: rawData.stargazers_count,
        last_activity_at: rawData.updated_at,
        archived: rawData.archived,
        organization: rawData.organization ?? null,
        language: rawData.language,
      };
    } else {
      return {
        name: rawData.path_with_namespace,
        description: rawData.description,
        avatar_url: rawData.avatar_url,
        web_url: rawData.web_url,
        forks_count: rawData.forks_count,
        star_count: rawData.star_count,
        last_activity_at: rawData.last_activity_at,
        archived: rawData.archived,
        organization: null,
        language: null,
      };
    }
  };

  useEffect(() => {
    let abort = false;
    async function go() {
      if (type === "github" && !parsedGitHubUrl) {
        setError("Invalid GitHub URL");
        setLoading(false);
        return;
      }
      if (type === "gitlab" && !parsedGitLabPath) {
        setError("Invalid GitLab URL");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      if (type === "github") {
        try {
          const res = await fetch(parsedGitHubUrl, {
            headers: { Accept: "application/vnd.github+json" },
          });
          if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
          const json = await res.json();
          if (!abort) setData(normalizeData(json as GitHubRepo));
        } catch (e) {
          if (!abort) setError((e as Error)?.message ?? "Failed to load repo");
        } finally {
          if (!abort) setLoading(false);
        }
      } else if (type === "gitlab") {
        try {
          const res = await fetch(
            `https://gitlab.com/api/v4/projects/${parsedGitLabPath}`,
            { headers: { Accept: "application/json" } },
          );
          if (!res.ok) throw new Error(`GitLab API error: ${res.status}`);
          const json = await res.json();
          if (!abort) setData(normalizeData(json as GitLabRepo));
        } catch (e) {
          if (!abort) setError((e as Error)?.message ?? "Failed to load repo");
        } finally {
          if (!abort) setLoading(false);
        }
      }
    }
    go();
    return () => {
      abort = true;
    };
  }, [type, parsedGitHubUrl, parsedGitLabPath]);

  if (!loading && error) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={
          "relative flex flex-col text-sm items-center justify-between p-4 max-w-125 overflow-hidden rounded-lg bg-linear-to-br from-black/10 to-gray-200/50 shadow-inner " +
          className
        }
        aria-busy="true"
      >
        <ParticleField
          lum="70%"
          maxParticlesFollowMode={20}
          className="absolute top-0 left-0 w-full h-full z-0"
          speed="slow"
        />
        <div className="flex flex-col z-10">
          <span>Failed to load repository...</span>
          <div className="flex space-x-2">
            <span>Try visiting the url directly</span>
            <Link2 />
          </div>
        </div>
      </a>
    );
  }

  if (loading || !data) {
    return (
      <div
        className={
          "relative flex items-center justify-between p-4 w-full max-w-[500px] overflow-hidden rounded-lg bg-linear-to-br from-black/10 to-gray-200/50 shadow-inner " +
          className
        }
        aria-busy="true"
      >
        <ParticleField
          lum="70%"
          maxParticlesFollowMode={20}
          className="absolute top-0 left-0 w-full h-full z-0"
          speed="slow"
        />
        <div className="space-y-2">
          <div className="h-5 w-56 rounded-lg bg-black/10 animate-pulse" />
          <div className="h-5 w-48 rounded-lg bg-black/10 animate-pulse" />
          <div className="h-5 w-52 rounded-lg bg-black/10 animate-pulse" />
        </div>
        <div className="h-24 aspect-square rounded-lg bg-black/10 animate-pulse" />
      </div>
    );
  }

  const isArchived = data.archived;

  return (
    <a
      href={data.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col relative max-w-[500px] overflow-hidden p-4 mx-4 rounded-lg shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 ${className}`}
      aria-label={`Open ${data.name} on ${type === "gitlab" ? "GitLab" : "GitHub"}`}
    >
      <ParticleField
        lum="70%"
        maxParticlesFollowMode={20}
        className="absolute top-0 left-0 w-full h-full z-0"
        speed="slow"
      />

      <div className="p-4 z-10">
        <div className="flex space-x-4 items-center">
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex items-center space-x-4">
              {type === "github" ? <SiGithub /> : <SiGitlab />}
              <span className="font-medium text-black/90">
                <span>{data.name.split("/")[0]}</span>/
                <span className="font-bold">{data.name.split("/")[1]}</span>
              </span>
              {isArchived && (
                <p className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  Archived
                </p>
              )}
            </div>

            {data.description && (
              <p className="line-clamp-2 text-sm text-black/70">
                {data.description}
              </p>
            )}
            <div className="flex items-center space-x-4 text-xs text-black/60">
              <p aria-label="stars">★ {formatCount(data.star_count)}</p>
              <p aria-label="forks">⑂ {formatCount(data.forks_count)}</p>
              {data.language && (
                <p className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-black/40" />
                  {data.language}
                </p>
              )}
              <p>
                Updated {new Date(data.last_activity_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {type === "github" && data?.organization ? (
            <img
              src={data.organization.avatar_url}
              alt="org_avatar"
              className="h-25 rounded-lg"
            />
          ) : type === "gitlab" && data.avatar_url ? (
            <img
              src={data.avatar_url}
              alt="org_avatar"
              className="h-25 rounded-lg"
            />
          ) : null}
        </div>
      </div>
    </a>
  );
};
