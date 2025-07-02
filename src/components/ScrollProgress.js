import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = scrollPx / winHeightPx;
            setScrollProgress(scrolled);
        };
        window.addEventListener('scroll', updateScrollProgress);
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white z-50 origin-left", style: { scaleX: scrollProgress }, initial: { scaleX: 0 } }), _jsx(motion.div, { className: "fixed bottom-8 right-8 z-40", initial: { opacity: 0, scale: 0 }, animate: {
                    opacity: scrollProgress > 0.1 ? 1 : 0,
                    scale: scrollProgress > 0.1 ? 1 : 0
                }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "relative w-16 h-16", children: [_jsxs("svg", { className: "w-16 h-16 transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#000", strokeWidth: "8", fill: "none", className: "dark:stroke-white" }), _jsx(motion.circle, { cx: "50", cy: "50", r: "40", stroke: "#000", strokeWidth: "8", fill: "none", strokeLinecap: "round", strokeDasharray: `${2 * Math.PI * 40}`, style: {
                                        strokeDashoffset: 2 * Math.PI * 40 * (1 - scrollProgress)
                                    }, className: "dark:stroke-white" })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "text-xs font-bold text-black dark:text-white", children: [Math.round(scrollProgress * 100), "%"] }) })] }) })] }));
};
export default ScrollProgress;
