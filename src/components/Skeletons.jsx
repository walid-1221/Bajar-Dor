export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-2.5 w-14 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-2.5 w-16 rounded bg-gray-200" />
          <div className="h-5 w-28 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-14 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}