import { useState } from 'react';
import { Check, Settings, ChevronDown } from 'lucide-react';

interface PrinterDialogProps {
  selectedPrinter: string;
  onSelect: (printer: string) => void;
  onClose: () => void;
}

const PRINTERS = [
  'Printer name 01',
  'Printer name 02',
  'Printer name 03',
];

export function PrinterDialog({ selectedPrinter, onSelect, onClose }: PrinterDialogProps) {
  const [tempPrinter, setTempPrinter] = useState(selectedPrinter);
  const [isClosing, setIsClosing] = useState(false);

  const handleConfirm = () => {
    onSelect(tempPrinter);
  };

  const handleGoToSettings = () => {
    // In a real app, this would open native iOS settings
    alert('Opening printer settings...');
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
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
          <h3 className="text-white text-center" style={{ fontSize: '17px' }}>
            Select printer
          </h3>
        </div>

        {/* Printer List */}
        <div className="flex-1 overflow-y-auto py-2">
          {PRINTERS.map((printer) => {
            const isSelected = tempPrinter === printer;
            
            return (
              <button
                key={printer}
                onClick={() => setTempPrinter(printer)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span 
                  className={`${isSelected ? 'text-white' : 'text-white/70'}`}
                  style={{ fontSize: '15px' }}
                >
                  {printer}
                </span>
                {isSelected && (
                  <Check size={18} className="text-[#656565]" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 pt-3 space-y-3 border-t border-white/10">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#A99E85] hover:bg-[#948a75] text-white py-3.5 rounded-lg font-medium transition-colors"
            style={{ fontSize: '16px' }}
          >
            Confirm
          </button>
          <button
            onClick={handleGoToSettings}
            className="w-full flex items-center justify-center gap-2 text-white hover:text-white/70 py-2 font-medium transition-colors"
            style={{ fontSize: '15px' }}
          >
            <Settings size={16} strokeWidth={2} />
            Go to settings
          </button>
        </div>
      </div>
    </div>
  );
}