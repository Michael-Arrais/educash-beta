
import React from "react";

const SabiaLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corpo do sabiá simplificado */}
      <path
        d="M7.5,8.5c0,0,2-2.5,4.5-2.5s4.5,2.5,4.5,2.5s1-1.5,2-1.5s2,1,2,2s-1,2-1,2s1,2.5,0,4.5s-2.5,3-2.5,3s-1.5,1-3,1
        s-2-1.5-2-1.5s-1,1.5-2.5,1.5s-3-1-3-1s-1.5-1-1.5-3s0.5-4.5,0.5-4.5s-0.5-1-0.5-2s0.5-2,1.5-2S7.5,8.5,7.5,8.5z"
        fill="currentColor"
      />
      {/* Olho do sabiá */}
      <circle cx="8.5" cy="11" r="0.8" fill="white" />
      {/* Bico do sabiá */}
      <path
        d="M13,14c0,0-0.5,1-1.5,1s-1.5-1-1.5-1"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SabiaLogo;
