export default function RepoCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-4">
      {/* repo name */}
      <div className="h-5 w-1/2 rounded bg-slate-200" />

      {/* description: 2 lines */}
      <div className="mt-3 h-3 w-full rounded bg-slate-200" />
      <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />

      {/* footer: language + stars */}
      <div className="mt-4 flex gap-4">
        <div className="h-3 w-16 rounded bg-slate-200" />
        <div className="h-3 w-10 rounded bg-slate-200" />
      </div>
    </div>
  );
}