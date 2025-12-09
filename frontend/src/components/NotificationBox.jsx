import { Bell } from "lucide-react";

function NotificationBox() {
  return (
    <div className="fixed top-3 right-30 bg-white/20 backdrop-blur-md p-3 rounded-lg cursor-pointer">
      <Bell size={22} />
    </div>
  );
}

export default NotificationBox;
