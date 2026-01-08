import { useState } from 'react';
import { X } from 'lucide-react';

interface TypeSKUDialogProps {
  onConfirm: (sku: string) => void;
  onClose: () => void;
}

export function TypeSKUDialog({ onConfirm, onClose }: TypeSKUDialogProps) {
  const [skuValue, setSkuValue] = useState('');

  const handleConfirm = () => {
    if (skuValue.trim()) {
      onConfirm(skuValue);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-black text-center font-normal" style={{ fontSize: '16px' }}>
          Insert Barcode
        </h3>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={skuValue}
            onChange={(e) => setSkuValue(e.target.value)}
            placeholder="100112292"
            autoFocus
            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-10 text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            style={{ fontSize: '15px' }}
          />
          {skuValue && (
            <button
              onClick={() => setSkuValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-full transition-colors"
              aria-label="Clear"
            >
              <X size={12} className="text-white" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!skuValue.trim()}
          className="w-full py-3 rounded-lg font-medium transition-all bg-[#4a4a4a] hover:bg-[#3a3a3a] text-white disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontSize: '15px' }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}