import { Bell } from "lucide-react";

export default function NotificationBox() {
  return (
    <div className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#223044] transition cursor-pointer">
      <Bell size={20} className="text-white" />
    </div>
  );
}
