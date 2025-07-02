import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        window.addEventListener('mousemove', updateMousePosition);
        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed top-0 left-0 w-4 h-4 bg-slate-900 rounded-full pointer-events-none z-50 mix-blend-difference", animate: {
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovering ? 1.5 : 1,
                }, transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                } }), _jsx(motion.div, { className: "fixed top-0 left-0 w-8 h-8 border border-slate-400 rounded-full pointer-events-none z-50", animate: {
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 2 : 1,
                }, transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                } })] }));
};
export default CustomCursor;
