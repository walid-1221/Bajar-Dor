import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-emerald-50/60 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex animate-pulse items-center gap-4 rounded-xl border border-gray-100 bg-white p-5">
          <div className="h-12 w-12 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-3 w-52 rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-5">
          <GridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}