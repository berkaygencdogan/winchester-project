export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse rounded-md
        bg-slate-200
        dark:bg-[#1F2937]
        ${className}
      `}
    />
  );
}
