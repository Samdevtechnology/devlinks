import React from "react";

const LoadingDots = () => {
  return (
    <div className="relative flex items-center justify-center h-16">
      <style jsx>{`
        @keyframes flash {
          0% {
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow:
              16px 0 rgba(255, 255, 255, 0.2),
              -16px 0 rgba(255, 255, 255, 1);
          }
          50% {
            background-color: rgba(255, 255, 255, 1);
            box-shadow:
              16px 0 rgba(255, 255, 255, 0.2),
              -16px 0 rgba(255, 255, 255, 0.2);
          }
          100% {
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow:
              16px 0 rgba(255, 255, 255, 1),
              -16px 0 rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
      <div
        className="w-2 h-2 rounded-full bg-white"
        style={{
          animation: "flash 0.5s ease-out infinite alternate",
          boxShadow: "16px 0 #fff, -16px 0 #fff",
        }}
      />
    </div>
  );
};

export default LoadingDots;
