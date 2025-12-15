import { X } from "lucide-react";
import NavbarSearch from "./NavbarSearch";

export default function MobileSearchModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] bg-white dark:bg-[#0F172A]">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-lg">Ara</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="p-4">
        <NavbarSearch autoFocus />
      </div>
    </div>
  );
}
