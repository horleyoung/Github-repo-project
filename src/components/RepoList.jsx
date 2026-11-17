import { useState, useEffect, useCallback } from "react";
import EmptyState from "./EmptyState";
import RepoCardSkeleton from "./RepoCardSkeleton";
import RepoCard from "./RepoCard";
import ErrorMessage from "./ErrorMessage";

const ERRORS = {
  NETWORK: {
    message: "Couldn't reach GitHub. Check your connection.",
    canRetry: true,
  },
  NOT_FOUND: {
    message:
      "No GitHub user with that name. Check the spelling and search again.",
    canRetry: false,
  },
  RATE_LIMIT: {
    message:
      "GitHub's request limit was reached. Retrying won't help for about an hour.",
    canRetry: false,
  },
  SERVER: { message: "Server error. Please try again later.", canRetry: true },
};

async function fetchRepos(user) {
  const demo = new URLSearchParams(window.location.search).get("state");

  if (demo === "loading") return new Promise(() => {});
  if (demo === "error") throw { code: "SERVER" };
  if (demo === "empty") return [];

  const res = await fetch(`https://api.github.com/users/${user}/repos`);

  if (res.status === 404) throw { code: "NOT_FOUND" };
  // add: 403 -> RATE_LIMIT
  if (res.status === 403) throw { code: "RATE_LIMIT" };
  // add: any other !res.ok -> SERVER
  if (!res.ok) throw { code: "SERVER" };

  return res.json(); // the array of repos
}

function RepoList({ user }) {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  const load = useCallback(() => {
    setState({ status: "loading", data: null, error: null });

    fetchRepos(user)
      .then((data) => {
        const status = data.length > 0 ? "success" : "empty";
        setState({ status, data, error: null });
      })
      .catch((e) => {
        setState({ status: "error", data: null, error: e.code ?? "NETWORK" });
        // e is whatever fetchRepos threw, e.g. { code: "NOT_FOUND" }
        // setState(...) with status "error" and the code stored in error
      });
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  if (state.status === "loading") {
    return (
      <div role="status" aria-busy="true" className="grid gap-4 sm:grid-cols-2">
        {/* 6 skeletons, using the Array.from you already understand */}
        {Array.from({ length: 6 }, (_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (state.status === "error") {
    const info = ERRORS[state.error] ?? ERRORS.SERVER;
    // look up ERRORS using state.error, then render <ErrorMessage ... onRetry={load} />
    return (
      <ErrorMessage
        message={info.message}
        canRetry={info.canRetry}
        onRetry={load}
      />
    );
  }
  if (state.status === "empty") {
    // render <EmptyState user={user} />
    return <EmptyState user={user} />;
  }
  //  success: grid of RepoCards, using state.data.map(...);
  const totalStars = state.data.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );

  return (
    <>
      <p className="mb-4 text-sm text-slate-600">
        Total stars across these {state.data.length} repositories: {totalStars}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {state.data.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  );
}

export default RepoList;
