import React, { useEffect, useMemo, useState } from "react";
import ParticleField from "./particle-field";
import { Link, Link2 } from "lucide-react";

const parseOwnerRepo = (url) => {
  try {
    const u = new URL(url);
    if (!/github\.com$/i.test(u.hostname)) return null;
    const [owner, repo] = u.pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
};

const formatCount = (n) => {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
};

const RepoPreview = ({ url, className = "" }) => {
  const parsed = useMemo(() => parseOwnerRepo(url), [url]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let abort = false;
    async function go() {
      if (!parsed) {
        setError("Invalid GitHub URL");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const json = await res.json();
        if (!abort) setData(json);
      } catch (e) {
        if (!abort) setError(e?.message ?? "Failed to load repo");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    go();
    return () => {
      abort = true;
    };
  }, [parsed]);

  if (!loading && error) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={
          "relative flex flex-col text-sm items-center justify-between p-4 max-w-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-black/10 to-gray-200/50 shadow-inner " +
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
          "relative flex items-center justify-between p-4 w-full max-w-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-black/10 to-gray-200/50 shadow-inner " +
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
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col relative max-w-[500px] overflow-hidden p-4 mx-4 rounded-lg shadow-inner bg-gradient-to-br from-black/10 to-gray-200/50 ${className}`}
      aria-label={`Open ${data.full_name} on GitHub`}
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
              <GitHubIcon className="h-5 w-5 text-black/80" />
              <span className="font-medium text-black/90">
                <span>{data.full_name.split("/")[0]}</span>/
                <span className="font-bold">
                  {data.full_name.split("/")[1]}
                </span>
              </span>
              {isArchived && (
                <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  Archived
                </span>
              )}
            </div>

            {data.description && (
              <p className="line-clamp-2 text-sm text-black/70">
                {data.description}
              </p>
            )}
            <div className="flex items-center space-x-4 text-xs text-black/60">
              <span aria-label="stars">
                ★ {formatCount(data.stargazers_count)}
              </span>
              <span aria-label="forks">⑂ {formatCount(data.forks_count)}</span>
              {data.language && (
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-black/40" />
                  {data.language}
                </span>
              )}
              <span>
                Updated {new Date(data.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <img
            src={data.organization.avatar_url}
            alt="org_avatar"
            className="h-[100px] rounded-lg"
          />
        </div>
      </div>
    </a>
  );
};

const GitHubIcon = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      role="img"
    >
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
        -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27
        1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.49 0 1.07-.01 1.93-.01 2.19
        0 .21.15.45.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
};

export default RepoPreview;
