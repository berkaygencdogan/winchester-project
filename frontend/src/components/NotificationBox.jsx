import { Bell } from "lucide-react";

export default function NotificationBox() {
  return (
    <div
      className="
    p-2 rounded-lg cursor-pointer transition
    bg-slate-100 hover:bg-slate-200
    dark:bg-[#1E293B] dark:hover:bg-[#223044]
  "
    >
      <Bell size={20} className="text-slate-700 dark:text-white" />
    </div>
  );
}
