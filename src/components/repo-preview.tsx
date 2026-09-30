import { useEffect, useMemo, useState } from "react";
import { Folder } from "lucide-react";
import { SiGithub, SiGitlab } from "@icons-pack/react-simple-icons";

export type RepoType = "github" | "gitlab";

// Whether `type` is a host useRepoData can fetch from.
export const isRepoType = (type: string | null | undefined): type is RepoType =>
  type === "github" || type === "gitlab";

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

export const formatCount = (n: number): string => {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
};

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

// Shared so a repo shown in several places (every mobile card, then the
// modal) only costs one request against the unauthenticated rate limit.
// Failed requests are dropped so the next caller retries.
const repoCache = new Map<string, Promise<NormalizedRepo>>();

const fetchRepo = (
  apiUrl: string,
  accept: string,
  source: string,
): Promise<NormalizedRepo> => {
  let request = repoCache.get(apiUrl);
  if (!request) {
    request = fetch(apiUrl, { headers: { Accept: accept } }).then(
      async (res) => {
        if (!res.ok) throw new Error(`${source} API error: ${res.status}`);
        return normalizeData(await res.json());
      },
    );
    request.catch(() => repoCache.delete(apiUrl));
    repoCache.set(apiUrl, request);
  }
  return request;
};

export const useRepoData = (url: string, type: string) => {
  const parsedGitHubUrl = useMemo(() => parseGitHubUrl(url), [url]);
  const parsedGitLabPath = useMemo(() => parseGitLabProjectPath(url), [url]);
  const [data, setData] = useState<NormalizedRepo | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Nothing to load for an unsupported type.
  const [loading, setLoading] = useState(() => isRepoType(type));

  useEffect(() => {
    let abort = false;
    async function go() {
      if (!isRepoType(type)) {
        setLoading(false);
        return;
      }
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
      try {
        const repo =
          type === "github"
            ? await fetchRepo(
                parsedGitHubUrl,
                "application/vnd.github+json",
                "GitHub",
              )
            : await fetchRepo(
                `https://gitlab.com/api/v4/projects/${parsedGitLabPath}`,
                "application/json",
                "GitLab",
              );
        if (!abort) setData(repo);
      } catch (e) {
        if (!abort) setError((e as Error)?.message ?? "Failed to load repo");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    go();
    return () => {
      abort = true;
    };
  }, [type, parsedGitHubUrl, parsedGitLabPath]);

  return { data, error, loading };
};
