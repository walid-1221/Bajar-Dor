export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-emerald-50/60 px-4 py-6">
      <div className="mx-auto max-w-4xl animate-pulse space-y-5">
        <div className="h-3 w-48 rounded bg-gray-200" />

        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-20 w-28 rounded-lg bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-white p-5 sm:grid-cols-3">
          <div className="h-20 rounded-lg bg-gray-200" />
          <div className="h-20 rounded-lg bg-gray-200" />
          <div className="h-20 rounded-lg bg-gray-200" />
        </div>

        <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}