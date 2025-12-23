export const QueueSkeleton = () => (
  <div className="pt-32 px-6 max-w-5xl mx-auto animate-pulse">
    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
    <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-10"></div>

    {[1, 2, 3].map(i => (
      <div
        key={i}
        className="flex items-center gap-4 p-5 mb-4 rounded-xl bg-slate-100 dark:bg-[#111827]"
      >
        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        <div className="h-4 w-48 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </div>
    ))}
  </div>
);
