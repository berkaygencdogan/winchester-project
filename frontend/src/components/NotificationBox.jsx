import { Bell } from "lucide-react";

function NotificationBox() {
  return (
    <div className="fixed top-4 right-6 bg-white/20 backdrop-blur-md p-3 rounded-lg cursor-pointer">
      <Bell size={22} />
    </div>
  );
}

export default NotificationBox;
