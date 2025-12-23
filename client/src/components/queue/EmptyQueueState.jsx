import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export const EmptyQueueState = ({ serviceId }) => {
  const queueLink = `${window.location.origin}/queue/${serviceId}`;
    motion;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-dashed p-14 text-center
        border-slate-300 dark:border-[#1f2937]"
    >
      <p className="text-lg text-black font-semibold mb-2">
        No one has joined yet
      </p>
      <p className="text-sm  text-slate-500 dark:text-slate-400 mb-8">
        Share the queue link or wait for users to join.
      </p>

      <button
        onClick={() => navigator.clipboard.writeText(queueLink)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
          bg-[#2563eb] dark:bg-[#3b82f6] text-white font-semibold hover:scale-110 transition-all active:scale-90"
      >
        <Link2 size={16} /> Copy Queue Link
      </button>
    </motion.div>
  );
};
