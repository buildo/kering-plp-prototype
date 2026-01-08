import {
  Boxes,
  ArrowUp,
  ArrowLeftRight,
  Package,
  ClipboardCheck,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { TileButton } from "./components/TileButton";
import { StatusBar } from "./components/StatusBar";
import { PrintLabels } from "./components/PrintLabels";
import { RepricingScan } from "./components/RepricingScan";
import backgroundImage from "figma:asset/f959a20718a7644ff6db1de4999d9ab4e4f4053e.png";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "printLabels" | "repricingScan"
  >("home");

  // Store configuration data
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "d MMMM yyyy"));
  const [selectedIDFormat, setSelectedIDFormat] = useState("Barcode 10 digits");
  const [selectedPrintMode, setSelectedPrintMode] = useState(
    "Fast print (single SKU)"
  );
  const [printerConnected, setPrinterConnected] = useState(true);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {/* iPhone SE Container */}
      <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
        {currentScreen === "home"
          ? (
          <>
            {/* Status Bar Overlay */}
            <StatusBar />

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-[#000000]">
              <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full overflow-y-scroll">
              {/* Header */}
              <header className="pt-14 pb-10 px-6 text-center bg-[rgb(28,28,28)]">
                <h1
                  className="text-white mb-1"
                  style={{
                    fontSize: "28px",
                    fontWeight: "300",
                    letterSpacing: "0.25em",
                  }}
                >
                  BALENCIAGA
                </h1>
                <div
                  className="text-white/95 mb-0.5"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  20116
                </div>
                <div
                  className="text-white/70"
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  Milano Galleria
                </div>
              </header>

              {/* Grid */}
              <div className="flex-1 px-5 pb-8 bg-[rgb(28,28,28)]">
                <div className="grid grid-cols-2 gap-3.5 max-w-md mx-auto">
                  <TileButton
                    icon={
                      <Boxes
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Receiving"
                  />
                  <TileButton
                    icon={
                      <ArrowUp
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Sending"
                  />
                  <TileButton
                    icon={
                      <ArrowLeftRight
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="My requests"
                  />
                  <TileButton
                    icon={
                      <Package
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Package stockout"
                  />
                  <TileButton
                    icon={
                      <Boxes
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Cycle & Inventory"
                  />
                  <TileButton
                    icon={
                      <Tag
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Repricing"
                    onClick={() =>
                      setCurrentScreen("printLabels")
                    }
                  />
                  <TileButton
                    icon={
                      <ClipboardCheck
                        size={52}
                        strokeWidth={1}
                        className="text-white"
                      />
                    }
                    label="Reservation"
                  />
                </div>
              </div>
            </div>
          </>
        ) : currentScreen === "printLabels" ? (
          <PrintLabels
            onBack={() => setCurrentScreen("home")}
            onNavigateToScan={(date, idFormat, printMode, printer) => {
              setSelectedDate(date);
              setSelectedIDFormat(idFormat);
              setSelectedPrintMode(printMode);
              setPrinterConnected(printer);
              setCurrentScreen("repricingScan");
            }}
            selectedDate={selectedDate}
            selectedIDFormat={selectedIDFormat}
            selectedPrintMode={selectedPrintMode}
            onDateChange={setSelectedDate}
            onIDFormatChange={setSelectedIDFormat}
            onPrintModeChange={setSelectedPrintMode}
          />
        ) : (
          <RepricingScan
            onBack={() => setCurrentScreen("printLabels")}
            onHome={() => setCurrentScreen("home")}
            onChangeSummary={() => setCurrentScreen("printLabels")}
            selectedDate={selectedDate}
            selectedIDFormat={selectedIDFormat}
            selectedPrintMode={selectedPrintMode}
            printerConnected={printerConnected}
          />
        )}
      </div>
    </div>
  );
}