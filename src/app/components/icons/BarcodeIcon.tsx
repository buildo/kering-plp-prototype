export function BarcodeIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M1.88184 18H23.219C24.2567 18 25.1004 17.1689 25.1004 16.1472V1.85278C25.1004 0.831107 24.2567 0 23.219 0H1.88184C0.844651 0 0 0.831107 0 1.85278V16.1472C0 17.1689 0.844144 18 1.88184 18ZM1.11487 1.8528C1.11487 1.43625 1.45891 1.09752 1.88199 1.09752H23.2192C23.6418 1.09752 23.9863 1.43675 23.9863 1.8528V16.1472C23.9863 16.5638 23.6418 16.903 23.2192 16.903H1.88199C1.45891 16.903 1.11487 16.5638 1.11487 16.1472V1.8528Z" fill="currentColor"/>
      <rect x="3.27759" y="3.41748" width="1.11472" height="11.1651" fill="currentColor"/>
      <rect x="5.67139" y="3.41748" width="1.11472" height="11.1651" fill="currentColor"/>
      <rect x="8.02637" y="3.41748" width="1.11472" height="11.1651" fill="currentColor"/>
      <rect x="9.72888" y="3.41748" width="1.8458" height="11.1651" fill="currentColor"/>
      <path d="M12.9032 3.41748H14.0174V14.5825H12.9032V3.41748Z" fill="currentColor"/>
      <path d="M14.2433 3.41748H15.3575V14.5825H14.2433V3.41748Z" fill="currentColor"/>
      <path d="M16.4415 3.41748H17.5557V14.5825H16.4415V3.41748Z" fill="currentColor"/>
      <path d="M19.0435 3.41748H20.1577V14.5825H19.0435V3.41748Z" fill="currentColor"/>
      <path d="M21.0723 3.41748H22.1865V14.5825H21.0723V3.41748Z" fill="currentColor"/>
    </svg>
  );
}
