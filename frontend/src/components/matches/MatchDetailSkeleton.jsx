import Skeleton from "../ui/Skeleton";

export default function MatchDetailSkeleton() {
  return (
    <div className="p-4 space-y-6">
      {/* TEAMS */}
      <div className="flex justify-center items-center gap-10">
        <Skeleton className="w-14 h-14 rounded-full" />
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-14 h-14 rounded-full" />
      </div>

      {/* STATUS */}
      <Skeleton className="w-32 h-4 mx-auto" />

      {/* TABS */}
      <div className="flex gap-3 justify-center">
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
