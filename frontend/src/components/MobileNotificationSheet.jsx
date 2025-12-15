import NavbarNotification from "./NavbarNotification";
import { X } from "lucide-react";

export default function MobileNotificationSheet({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/50">
      <div
        className="
        absolute bottom-0 left-0 right-0
        bg-white dark:bg-[#1E293B]
        rounded-t-2xl
        max-h-[80vh]
        overflow-y-auto
      "
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">Bildirimler</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <NavbarNotification mobile />
      </div>
    </div>
  );
}
