import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface IDFormatBottomSheetProps {
  selectedFormat: string;
  onSelect: (format: string) => void;
  onClose: () => void;
}

const ID_FORMATS = [
  'Barcode 10 digits',
  '9 digits Intercode',
  'FMS Variant',
  'Vendor UPC number',
  'EAN 13',
];

export function IDFormatBottomSheet({ selectedFormat, onSelect, onClose }: IDFormatBottomSheetProps) {
  const [tempFormat, setTempFormat] = useState(selectedFormat);
  const [isClosing, setIsClosing] = useState(false);

  const handleConfirm = () => {
    onSelect(tempFormat);
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
            Select the ID format
          </h3>
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto py-3">
          {ID_FORMATS.map((format) => {
            const isSelected = tempFormat === format;
            
            return (
              <button
                key={format}
                onClick={() => setTempFormat(format)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <span 
                  className={`${isSelected ? 'text-white' : 'text-white/70'}`}
                  style={{ fontSize: '15px' }}
                >
                  {format}
                </span>
                {isSelected && (
                  <Check size={18} className="text-[#656565]" strokeWidth={2.5} />
                )}
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