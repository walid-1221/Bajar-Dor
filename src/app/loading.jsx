import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200" />
      <GridSkeleton count={8} />
    </div>
  );
}