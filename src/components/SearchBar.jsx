export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex gap-2">
      <input
        value={value}
        onChange={onChange}
        placeholder="Search a GitHub username"
        aria-label="GitHub username"
        className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
      />
      <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
        Search
      </button>
    </form>
  );
}