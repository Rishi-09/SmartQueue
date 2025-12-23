import { motion, AnimatePresence } from "framer-motion";
import { Mycontext } from "../Mycontext";
import { useContext } from "react";
export const QueueList = ({ queue }) => {
  motion;
  const {theme} = useContext(Mycontext);
  return (
    <>
      <div className="space-y-4 h-screen">
        <AnimatePresence>
          {queue.map((entry, idx) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-4 p-5 rounded-2xl border
            ${
              idx === 0
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900"
                : "bg-white dark:bg-[#111827] border-slate-200 dark:border-[#1f2937]"
            }`}
            >
              <span className=  {` font-bold text-lg w-8 ${theme==='dark'?'text-amber-50':'text-slate-950'}`}>#{entry.position}</span>
              <span className={`font-medium ${theme==='dark'?'text-amber-50':'text-slate-950'} `}>
                {entry.userName || "Anonymous"}
              </span>
              {idx === 0 && (
                <span className="ml-auto text-xs font-bold text-blue-600 dark:text-blue-400">
                  Now Serving
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
