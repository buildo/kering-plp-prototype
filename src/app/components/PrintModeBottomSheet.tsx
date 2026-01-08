import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PrintModeBottomSheetProps {
  selectedMode: string;
  onSelect: (mode: string) => void;
  onClose: () => void;
}

const PRINT_MODES = [
  'Fast print (single SKU)',
  'Printing list (multi SKU)',
];

export function PrintModeBottomSheet({ selectedMode, onSelect, onClose }: PrintModeBottomSheetProps) {
  const [tempMode, setTempMode] = useState(selectedMode);
  const [isClosing, setIsClosing] = useState(false);

  const handleConfirm = () => {
    onSelect(tempMode);
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
            Select print mode
          </h3>
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
          {PRINT_MODES.map((mode) => {
            const isSelected = tempMode === mode;
            
            return (
              <button
                key={mode}
                onClick={() => setTempMode(mode)}
                className={`w-full py-4 px-5 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-[#656565] text-white'
                    : 'bg-[#1c1c1c] text-white/70 hover:bg-[#333333]'
                }`}
                style={{ fontSize: '15px' }}
              >
                {mode}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="px-5 pb-6 pt-4 border-t border-white/10 space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#A99E85] hover:bg-[#948a75] text-white py-3.5 rounded-lg font-medium transition-colors"
            style={{ fontSize: '16px' }}
          >
            Confirm
          </button>
          <button
            onClick={handleClose}
            className="w-full text-white hover:text-white/70 py-2 font-medium transition-colors"
            style={{ fontSize: '15px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}