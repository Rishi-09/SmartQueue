import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/features/createQueueSlice.js";
import { setUser, clearUser } from "../redux/features/userSlice.js";
import { CalendarClock } from "lucide-react";

export const CreateQueue = () => {
  const dispatch = useDispatch();
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const formData = useSelector((state) => state.createQueue.formData);

  // Bootstrap auth
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await api.get("/me", { withCredentials: true });
        dispatch(setUser(res.data.user));
      } catch {
        dispatch(clearUser());
      }
    };
    bootstrapAuth();
  }, [dispatch]);

  // Auto set end time 1 hour after start
  useEffect(() => {
    if (formData.startAt && !formData.endAt) {
      const end = new Date(formData.startAt);
      end.setHours(end.getHours() + 1);
      dispatch(
        updateInput({
          name: "endAt",
          value: end.toISOString().slice(0, 16),
        })
      );
    }
  }, [formData.startAt, formData.endAt, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/queue", formData);
      navigate(`/queue/${response.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create queue. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors
      ${theme === "dark"
        ? "bg-[#0b0f14] text-[#e5e7eb]"
        : "bg-[#fcfcfd] text-[#0f172a]"}`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-4xl p-10 space-y-8 border
        ${theme === "dark"
          ? "bg-[#111827] border-[#1f2937]"
          : "bg-white border-slate-200 shadow-2xl"}`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black">Create a Queue</h1>
          <p className="text-sm text-slate-500">
            Set up a service and start accepting users digitally
          </p>
        </div>

        {/* Service Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Service name</label>
          <input
            type="text"
            required
            placeholder="e.g. Bank Counter A"
            value={formData.name}
            onChange={(e) =>
              dispatch(updateInput({ name: "name", value: e.target.value }))
            }
            className="w-full h-12 rounded-xl px-4 text-sm border outline-none focus:border-blue-500"
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            Start time
            <span className="ml-2 text-xs text-slate-400 font-normal">
              (Select date & time)
            </span>
          </label>
          <div className="relative">
            <input
              ref={startTimeRef}
              type="datetime-local"
              required
              value={formData.startAt}
              onChange={(e) =>
                dispatch(updateInput({ name: "startAt", value: e.target.value }))
              }
              className={`w-full h-12 rounded-xl px-4 pr-11 text-sm border outline-none focus:border-blue-500
              ${theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] text-white"
                : "bg-slate-50 border-slate-200"}`}
            />
            <CalendarClock
              size={18}
              onClick={() => startTimeRef.current?.showPicker()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            End time
            <span className="ml-2 text-xs text-slate-400 font-normal">
              (Select date & time)
            </span>
          </label>
          <div className="relative">
            <input
              ref={endTimeRef}
              type="datetime-local"
              required
              value={formData.endAt}
              onChange={(e) =>
                dispatch(updateInput({ name: "endAt", value: e.target.value }))
              }
              className={`w-full h-12 rounded-xl px-4 pr-11 text-sm border outline-none focus:border-blue-500
              ${theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] text-white"
                : "bg-slate-50 border-slate-200"}`}
            />
            <CalendarClock
              size={18}
              onClick={() => endTimeRef.current?.showPicker()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create Queue
        </button>

        <p className="text-center text-xs text-slate-500">
          Queue will be available instantly after creation
        </p>
      </motion.form>
    </div>
  );
};

export default CreateQueue;
