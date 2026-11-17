export default function RepoCard({ repo }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <a href={repo.html_url} target="_blank" rel="noreferrer"
         className="text-lg font-semibold text-blue-600 hover:underline">
        {repo.name}
      </a>
    
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
        {repo.description || "No description available"}
      </p>

      <div className="mt-4 flex gap-4 text-xs text-slate-500">
        <span>{repo.language ? repo.language : "Language not specified"}</span>
        <span>{repo.stargazers_count ?? "-"}</span>
      </div>
    </div>
  );
}