
import React from "react";

const CashLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coin background circle */}
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      
      {/* Dollar sign */}
      <path
        d="M15.5,10.5c0,1.66-1.34,3-3,3s-3-1.34-3-3s1.34-3,3-3V5c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6H15.5z"
        fill="white"
      />
      <path
        d="M13,7h-2v2h2V7z M13,15h-2v2h2V15z"
        fill="white"
      />
    </svg>
  );
};

export default CashLogo;
