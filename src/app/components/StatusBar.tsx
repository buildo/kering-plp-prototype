import { X } from "lucide-react";
import { useState } from "react";

type StatusType = "available" | "unavailable";

interface StatusPillProps {
  label: string;
  status: StatusType;
}

function StatusPill({ label, status }: StatusPillProps) {
  const bgColor =
    status === "available" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} rounded-full px-2.5 py-1 flex items-center gap-1.5`}
    >
      <span className="text-white text-[10px] font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function StatusBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="absolute top-2 left-0 right-0 h-10 z-50 bg-gray-900/95 backdrop-blur-sm border border-white flex items-center justify-center px-3 py-1 bg-[rgba(28,28,28,0.95)]">
      {/* Status Pills */}
      <div className="flex items-center align-center  gap-2">
        <StatusPill label="NET" status="available" />
        <StatusPill label="TMR" status="available" />
        <StatusPill label="API" status="available" />
        <StatusPill label="BT" status="available" />
      </div>
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-1.5 top-1.5 w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
        aria-label="Close status bar"
      >
        <X size={18} strokeWidth={2} className="text-white" />
      </button>
    </div>
  );
}