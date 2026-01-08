import { useState } from 'react';
import { ChevronLeft, Camera, Check } from 'lucide-react';
import { TypeSKUDialog } from './TypeSKUDialog';
import { PrinterDialog } from './PrinterDialog';
import { BarcodeIcon } from './icons/BarcodeIcon';
import { SquareGridIcon } from './icons/SquareGridIcon';
import { HouseIcon } from './icons/HouseIcon';
import { PrintIcon } from './icons/PrintIcon';

interface RepricingScanProps {
  onBack: () => void;
  onHome: () => void;
  onChangeSummary: () => void;
  selectedDate: string;
  selectedIDFormat: string;
  selectedPrintMode: string;
  printerConnected: boolean;
}

type ScanMode = 'barcode' | 'rfid';

export function RepricingScan({
  onBack,
  onHome,
  onChangeSummary,
  selectedDate,
  selectedIDFormat,
  selectedPrintMode,
  printerConnected: initialPrinterConnected,
}: RepricingScanProps) {
  const [scanMode, setScanMode] = useState<ScanMode>('barcode');
  const [skuCount, setSkuCount] = useState(0);
  const [showTypeSKU, setShowTypeSKU] = useState(false);
  const [showPrinterDialog, setShowPrinterDialog] = useState(false);
  const [printerConnected, setPrinterConnected] = useState(initialPrinterConnected);
  const [selectedPrinter, setSelectedPrinter] = useState('Printer name 01');

  const isSingleSKU = selectedPrintMode === 'Fast print (single SKU)';
  const isMultiSKU = selectedPrintMode === 'Printing list (multi SKU)';

  const handleSimulateScan = () => {
    if (isSingleSKU) {
      setSkuCount(1);
    } else {
      setSkuCount((prev) => prev + 1);
    }
  };

  const handleClearAll = () => {
    setSkuCount(0);
  };

  const handleManualSKUInput = (sku: string) => {
    if (isSingleSKU) {
      setSkuCount(1);
    } else {
      setSkuCount((prev) => prev + 1);
    }
    setShowTypeSKU(false);
  };

  const handlePrint = () => {
    // Navigate to next screen (print confirmation/summary)
    alert(`Printing ${skuCount} SKU(s)`);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-[#656565] border-b border-white/10 px-4 py-3 flex items-center justify-between pt-[24px] pr-[16px] pb-[12px] pl-[16px] relative">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
            aria-label="Back"
          >
            <ChevronLeft size={24} className="text-white" strokeWidth={2} />
          </button>
          <button
            onClick={onHome}
            className="w-9 h-9 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
            aria-label="Home"
          >
            <HouseIcon size={20} className="text-white" />
          </button>
        </div>

        <h2 className="text-white absolute left-1/2 -translate-x-1/2" style={{ fontSize: '17px' }}>
          Repricing
        </h2>

        <button
          onClick={() => setShowPrinterDialog(true)}
          className="w-9 h-9 flex items-center justify-center hover:bg-black/10 rounded transition-colors relative"
          aria-label={printerConnected ? "Printer connected" : "Printer disconnected"}
        >
          <PrintIcon size={20} className="text-white" />
          <div
            className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
              printerConnected ? 'bg-green-500' : 'bg-red-500'
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

      {/* Header Summary */}
      <div className="bg-gray-900/50 border-b border-white/10 px-5 py-3 flex items-center justify-between gap-2 bg-[rgba(28,28,28,0.5)]">
        <p className="text-white/80 text-xs p-[0px] mx-[8px] my-[0px]">
          Selected: {selectedDate}, {selectedIDFormat}, {selectedPrintMode}
        </p>
        <button
          onClick={onChangeSummary}
          className="text-[rgb(169,158,133)] hover:text-amber-400 text-xs font-medium transition-colors"
        >
          Change
        </button>
      </div>

      {/* Scan Mode Tabs */}
      <div className="px-5 py-4">
        <div className="border-2 border-[#A9A9A9] rounded-xl p-1 flex gap-1">
          <button
            onClick={() => setScanMode('barcode')}
            className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
              scanMode === 'barcode'
                ? 'bg-[#a99e85] text-black'
                : 'bg-black text-white/90'
            }`}
            style={{ fontSize: '10px', letterSpacing: '0.05em' }}
          >
            BARCODE
          </button>
          <button
            onClick={() => setScanMode('rfid')}
            className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
              scanMode === 'rfid'
                ? 'bg-[#a99e85] text-black'
                : 'bg-black text-white/90'
            }`}
            style={{ fontSize: '10px', letterSpacing: '0.05em' }}
          >
            RFID
          </button>
        </div>
      </div>

      {/* Central Scan Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 bg-[rgba(28,28,28,0)]">
        {/* SKU Counter */}
        <button
          onClick={handleSimulateScan}
          className="mb-4 hover:opacity-80 transition-opacity active:scale-95"
        >
          <div
            className="text-white font-bold"
            style={{ fontSize: '100px', lineHeight: '1' }}
          >
            {skuCount}
          </div>
        </button>

        <p className="text-white/60 mb-8 text-center" style={{ fontSize: '15px' }}>
          Press the trigger to start reading
        </p>

        {/* Barcode Single SKU - Extra Options */}
        {scanMode === 'barcode' && isSingleSKU && (
          <div className="flex flex-col gap-4 w-full px-5">
            <span className="text-white/40 text-sm text-center">Or</span>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => alert('Camera scan simulation')}
                className="w-16 h-16 bg-[#5a5a5a] rounded-xl flex items-center justify-center hover:bg-[#666666] transition-colors"
                aria-label="Scan barcode"
              >
                <BarcodeIcon size={32} className="text-white" />
              </button>
              <button
                onClick={() => setShowTypeSKU(true)}
                className="flex-1 h-16 bg-[#5a5a5a] rounded-xl text-white hover:bg-[#666666] transition-colors flex items-center justify-between px-5"
              >
                <span style={{ fontSize: '17px' }}>Type SKU</span>
                <SquareGridIcon size={20} className="text-white/60" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Multi SKU Only */}
      {isMultiSKU && (
        <div className="px-5 pb-5 pt-3 border-t border-white/10 bg-gray-900/50 flex gap-3">
          <button
            onClick={handleClearAll}
            className="flex-1 py-3.5 bg-gray-800/70 border border-white/20 rounded-lg text-white/80 hover:bg-gray-800 transition-colors font-medium"
            style={{ fontSize: '15px' }}
          >
            Clear All
          </button>
          <button
            onClick={handlePrint}
            disabled={skuCount === 0}
            className={`flex-1 py-3.5 rounded-lg font-medium transition-all ${
              skuCount > 0
                ? 'bg-[#a99e85] hover:bg-[#96886f] text-white'
                : 'bg-gray-800/50 text-white/40 cursor-not-allowed'
            }`}
            style={{ fontSize: '14px' }}
          >
            Create Delivery ({skuCount})
          </button>
        </div>
      )}

      {/* Dialogs */}
      {showTypeSKU && (
        <TypeSKUDialog
          onConfirm={handleManualSKUInput}
          onClose={() => setShowTypeSKU(false)}
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