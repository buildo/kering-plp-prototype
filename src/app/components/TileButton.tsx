interface TileButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function TileButton({
  icon,
  label,
  onClick,
}: TileButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-4 bg-black/30 border border-white/20 aspect-square p-4 hover:bg-black/40 transition-colors active:scale-95 bg-[rgba(28,28,28,0.3)]"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <span
        className="text-white text-center leading-tight"
        style={{ fontSize: "12px", fontWeight: "200" }}
      >
        {label}
      </span>
    </button>
  );
}