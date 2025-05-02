
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
      <path
        d="M18.5,7.5c0,0-2-0.8-3-0.8s-3,0.8-3,0.8S10.5,6.7,9.5,6.7S6.5,7.5,6.5,7.5S5.8,6,5,6S3,7.3,3,8.5
        C3,10,4.5,11,4.5,11s-0.8,1.5-0.8,3s0.8,3,0.8,3S6,18.5,7,18.5s1.5-1,1.5-1s1,0.8,2,0.8s2-0.8,2-0.8s0.5,1,1.5,1s2-1.5,2-1.5
        s0.8-1.5,0.8-3s-0.8-3-0.8-3S17.5,10,18.5,8.5C19.2,7.3,18.5,7.5,18.5,7.5z"
        fill="currentColor"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="white" />
      <path
        d="M13,13.5c0,0-0.5,1.5-2,1.5s-2-1.5-2-1.5"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SabiaLogo;
