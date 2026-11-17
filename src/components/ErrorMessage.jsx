export default function ErrorMessage({ message, canRetry, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm">{message}</p>
      {canRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}