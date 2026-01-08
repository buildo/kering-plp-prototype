import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface BusinessDateBottomSheetProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

export function BusinessDateBottomSheet({
  selectedDate, // Expected format: "7 January 2026"
  onSelect,
  onClose,
}: BusinessDateBottomSheetProps) {
  // 1. Keep track of which month the user is currently looking at
  const [viewDate, setViewDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(selectedDate);
  const [isClosing, setIsClosing] = useState(false);

  // Helper to format dates to your string format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const currentMonthLabel = viewDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // 2. Dynamic Calendar Generation
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // Get first day of month and total days in month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for Monday start (JS days are 0=Sun, 1=Mon)
    const startingPadding =
      firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    // Add empty slots for the beginning of the month
    for (let i = 0; i < startingPadding; i++) {
      days.push(null);
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleMonthChange = (direction: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + direction);
    setViewDate(newDate);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`relative w-full h-full bg-[#000000] flex flex-col transition-transform duration-300 ease-out ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ animation: isClosing ? '' : 'slideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#656565] flex items-center justify-center relative">
          <button
            onClick={handleClose}
            className="absolute left-5 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
            aria-label="Close"
          >
            <ChevronDown size={24} className="text-white" strokeWidth={2} />
          </button>
          <h3 className="text-white text-center text-[17px]">
            Select the date
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => handleMonthChange(-1)}
              className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <span className="text-white text-[16px]">
              {currentMonthLabel}
            </span>
            <button
              onClick={() => handleMonthChange(1)}
              className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {["M", "T", "W", "T", "F", "S", "S"].map(
              (day, i) => (
                <div
                  key={i}
                  className="text-center text-white/50 text-xs font-medium py-2"
                >
                  {day}
                </div>
              ),
            )}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays().map((day, index) => {
              if (day === null)
                return <div key={`empty-${index}`} />;

              const dateString = `${day} ${currentMonthLabel}`;
              const isSelected = tempDate === dateString;
              const isToday =
                formatDate(new Date()) === dateString;

              return (
                <button
                  key={day}
                  onClick={() => setTempDate(dateString)}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all text-[14px] ${
                    isSelected
                      ? "bg-[#656565] text-white"
                      : isToday
                        ? "bg-white/10 text-white border border-white/30"
                        : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-8 pt-4 border-t border-white/10 space-y-3">
          <button
            onClick={() => onSelect(tempDate)}
            className="w-full bg-[#A99E85] hover:bg-[#948a75] text-white py-3.5 rounded-xl font-semibold transition-colors text-[16px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}