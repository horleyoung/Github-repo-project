export default function EmptyState({ user }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">
      <p className="font-semibold text-slate-800">No repositories yet</p>
      <p className="mt-1 text-sm">{user} has no public repositories.</p>
    </div>
  );
}