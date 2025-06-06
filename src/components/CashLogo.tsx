
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
      {/* Dollar sign */}
      <path
        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13.41,16.09V18h-2.67v-1.93
        c-1.71-0.36-3.16-1.46-3.27-3.4h1.96c0.1,1.05,0.82,1.87,2.65,1.87c1.96,0,2.4-0.98,2.4-1.59c0-0.83-0.44-1.61-2.67-2.14
        c-2.48-0.6-4.18-1.62-4.18-3.67c0-1.72,1.39-2.84,3.11-3.21V2h2.67v1.95c1.86,0.45,2.79,1.86,2.85,3.39H14.3
        c-0.05-1.11-0.64-1.87-2.22-1.87c-1.5,0-2.4,0.68-2.4,1.64c0,0.84,0.65,1.39,2.67,1.91s4.18,1.39,4.18,3.91
        C16.53,14.55,15.39,15.65,13.41,16.09z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CashLogo;
