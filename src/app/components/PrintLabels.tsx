import { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Check,
  ChevronRight,
} from "lucide-react";
import { BusinessDateBottomSheet } from "./BusinessDateBottomSheet";
import { IDFormatBottomSheet } from "./IDFormatBottomSheet";
import { PrintModeBottomSheet } from "./PrintModeBottomSheet";
import { PrinterDialog } from "./PrinterDialog";
import { PrintIcon } from "./icons/PrintIcon";

interface PrintLabelsProps {
  onBack: () => void;
  onNavigateToScan: (
    date: string,
    idFormat: string,
    printMode: string,
    printerConnected: boolean,
  ) => void;
  selectedDate: string;
  selectedIDFormat: string;
  selectedPrintMode: string;
  onDateChange: (date: string) => void;
  onIDFormatChange: (format: string) => void;
  onPrintModeChange: (mode: string) => void;
}

export function PrintLabels({
  onBack,
  onNavigateToScan,
  selectedDate,
  selectedIDFormat,
  selectedPrintMode,
  onDateChange,
  onIDFormatChange,
  onPrintModeChange,
}: PrintLabelsProps) {
  const [selectedPrinter, setSelectedPrinter] = useState(
    "Printer name 01",
  );
  const [printerConnected, setPrinterConnected] =
    useState(true);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showIDFormatPicker, setShowIDFormatPicker] =
    useState(false);
  const [showPrintModePicker, setShowPrintModePicker] =
    useState(false);
  const [showPrinterDialog, setShowPrinterDialog] =
    useState(false);

  const isFormComplete =
    selectedDate &&
    selectedIDFormat &&
    selectedPrintMode &&
    printerConnected;

  const handleScanSKU = () => {
    if (isFormComplete) {
      onNavigateToScan(
        selectedDate,
        selectedIDFormat,
        selectedPrintMode,
        printerConnected,
      );
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-[#656565] border-b border-white/10 px-4 py-3 flex items-center justify-between pt-[24px] pr-[16px] pb-[12px] pl-[16px]">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
          aria-label="Back"
        >
          <ChevronLeft
            size={24}
            className="text-white"
            strokeWidth={2}
          />
        </button>

        <h2
          className="text-white"
          style={{ fontSize: "17px" }}
        >
          Repricing
        </h2>

        <button
          onClick={() => setShowPrinterDialog(true)}
          className="w-9 h-9 flex items-center justify-center hover:bg-black/10 rounded transition-colors relative"
          aria-label={printerConnected ? "Printer connected" : "Printer disconnected"}
        >
          <PrintIcon
            size={20}
            className="text-white"
          />
          <div
            className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
              printerConnected ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {printerConnected ? (
              <Check size={10} className="text-white" strokeWidth={3} />
            ) : (
              <span className="text-white text-[10px] font-bold leading-none">✕</span>
            )}
          </div>
        </button>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col bg-[rgb(28,28,28)]">
        <div className="flex-1 px-[20px] py-[24px] flex flex-col justify-start">
          {/* Instructional Text */}
          <p
            className="text-white/70 text-center mb-5 leading-snug"
            style={{ fontSize: "14px" }}
          >
            Select the business date and the ID format to start
            printing
          </p>

          <div className="px-4">
            {/* Business Date Selection */}
            <div className="mb-6">
              <label
                className="text-white/90 mb-2 block text-center"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Select the business date
              </label>
              <button
                onClick={() => setShowDatePicker(true)}
                className="w-full border border-white/20 rounded-[8px] py-3 px-5 flex items-center justify-between hover:bg-[#333333] transition-colors bg-[#1c1c1c]"
              >
                <span
                  className="text-white"
                  style={{ fontSize: "15px" }}
                >
                  {selectedDate}
                </span>
                <Calendar
                  size={20}
                  className="text-white/60"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* ID Format Selection */}
            <div className="mb-6">
              <label
                className="text-white/90 mb-2 block text-center"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Select the ID format
              </label>
              <button
                onClick={() => setShowIDFormatPicker(true)}
                className="w-full border border-white/20 rounded-[8px] py-3 px-5 flex items-center justify-between hover:bg-[#333333] transition-colors bg-[#1c1c1c]"
              >
                <span
                  className="text-white"
                  style={{ fontSize: "15px" }}
                >
                  {selectedIDFormat}
                </span>
                <ChevronRight
                  size={20}
                  className="text-white/60"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Print Mode Selection */}
            <div className="">
              <label
                className="text-white/90 mb-2 block text-center"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Select print mode
              </label>
              <button
                onClick={() => setShowPrintModePicker(true)}
                className="w-full border border-white/20 rounded-[8px] py-3 px-5 flex items-center justify-between hover:bg-[#333333] transition-colors bg-[#1c1c1c]"
              >
                <span
                  className="text-white"
                  style={{ fontSize: "15px" }}
                >
                  {selectedPrintMode}
                </span>
                <ChevronRight
                  size={20}
                  className="text-white/60"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          disabled={!isFormComplete}
          onClick={handleScanSKU}
          className={`w-full py-4 font-medium transition-all ${
            isFormComplete
              ? "bg-[#A99E85] text-white"
              : "bg-gray-800/50 text-white/40 cursor-not-allowed"
          }`}
          style={{ fontSize: "16px" }}
        >
          Scan SKU to print
        </button>
      </div>

      {/* Bottom Sheets and Dialogs */}
      {showDatePicker && (
        <BusinessDateBottomSheet
          selectedDate={selectedDate}
          onSelect={(date) => {
            onDateChange(date);
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showIDFormatPicker && (
        <IDFormatBottomSheet
          selectedFormat={selectedIDFormat}
          onSelect={(format) => {
            onIDFormatChange(format);
            setShowIDFormatPicker(false);
          }}
          onClose={() => setShowIDFormatPicker(false)}
        />
      )}

      {showPrintModePicker && (
        <PrintModeBottomSheet
          selectedMode={selectedPrintMode}
          onSelect={(mode) => {
            onPrintModeChange(mode);
            setShowPrintModePicker(false);
          }}
          onClose={() => setShowPrintModePicker(false)}
        />
      )}

      {showPrinterDialog && (
        <PrinterDialog
          selectedPrinter={selectedPrinter}
          onSelect={(printer) => {
            setSelectedPrinter(printer);
            setPrinterConnected(true);
            setShowPrinterDialog(false);
          }}
          onClose={() => setShowPrinterDialog(false)}
        />
      )}
    </div>
  );
}