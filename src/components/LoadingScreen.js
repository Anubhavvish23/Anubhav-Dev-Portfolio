import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onComplete, 800);
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 120);
        return () => clearInterval(timer);
    }, [onComplete]);
    if (isComplete)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden", children: [_jsx("div", { className: "ripple-circle ripple-1" }), _jsx("div", { className: "ripple-circle ripple-2" }), _jsx("div", { className: "ripple-circle ripple-3" }), _jsx("div", { className: "ripple-circle ripple-4" }), _jsx("div", { className: "ripple-circle ripple-5" }), _jsxs("div", { className: "text-center space-y-16 relative z-10", children: [_jsx("div", { className: "logo-container", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 120 120", className: "logo-svg", children: [_jsx("path", { d: "M20 90 L30 60 L40 90 M25 75 L35 75 M30 45 L15 90 M30 45 L45 90", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }), _jsx("path", { d: "M85 60 C85 55, 80 50, 75 50 L65 50 C60 50, 55 55, 55 60 C55 65, 60 70, 65 70 L75 70 C80 70, 85 75, 85 80 C85 85, 80 90, 75 90 L65 90 C60 90, 55 85, 55 80", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-light text-white tracking-[0.3em] opacity-80", children: "ANUBHAV S" }), _jsxs("div", { className: "w-64 mx-auto space-y-3", children: [_jsx("div", { className: "h-px bg-gray-800 relative overflow-hidden", children: _jsx("div", { className: "absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out", style: { width: `${progress}%` } }) }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500 font-mono", children: [_jsx("span", { children: "LOADING" }), _jsxs("span", { children: [Math.round(progress), "%"] })] })] })] })] }), _jsx("style", { dangerouslySetInnerHTML: { __html: `
        .ripple-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.08) 0%,
            rgba(0, 0, 0, 0.08) 100%
          );
          backdrop-filter: blur(8px);
          animation: fullscreen-ripple 2s infinite ease-in-out;
        }

        .ripple-1 {
          width: 200px;
          height: 200px;
          border-color: rgba(0, 0, 0, 0.6);
          animation-delay: 0s;
        }

        .ripple-2 {
          width: 300px;
          height: 300px;
          border-color: rgba(0, 0, 0, 0.5);
          animation-delay: 0.2s;
        }

        .ripple-3 {
          width: 400px;
          height: 400px;
          border-color: rgba(0, 0, 0, 0.4);
          animation-delay: 0.4s;
        }

        .ripple-4 {
          width: 500px;
          height: 500px;
          border-color: rgba(0, 0, 0, 0.3);
          animation-delay: 0.6s;
        }

        .ripple-5 {
          width: 600px;
          height: 600px;
          border-color: rgba(0, 0, 0, 0.2);
          animation-delay: 0.8s;
        }

        @keyframes fullscreen-ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
        }

        .logo-container {
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }

        .logo-svg {
          color: #666;
          width: 100%;
          height: 100%;
          animation: color-change 2s infinite ease-in-out;
        }

        @keyframes color-change {
          0% {
            color: #666;
          }
          50% {
            color: rgba(255, 255, 255, 0.9);
          }
          100% {
            color: #666;
          }
        }
      ` } })] }));
};
export default LoadingScreen;
