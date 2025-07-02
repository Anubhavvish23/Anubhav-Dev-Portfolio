import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const lastScrollY = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
                setHideNav(true); // scrolling down
            }
            else {
                setHideNav(false); // scrolling up
            }
            lastScrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Contact', href: '#contact' },
    ];
    return (_jsxs(motion.nav, { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-black text-slate-900 dark:text-white ${scrolled ? 'shadow-lg' : ''}`, initial: { y: -100 }, animate: { y: isOpen ? 0 : hideNav ? -100 : 0 }, transition: { duration: 0.5 }, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx(motion.div, { className: "text-2xl font-bold gradient-text", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }), _jsx("div", { className: "hidden md:flex space-x-8", children: navItems.map((item, index) => (_jsxs(motion.a, { href: item.href, className: "relative text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors duration-300", whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: [item.name, _jsx(motion.div, { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500", initial: { scaleX: 0 }, whileHover: { scaleX: 1 }, transition: { duration: 0.3 } })] }, item.name))) }), _jsx(motion.button, { className: "md:hidden text-slate-900 dark:text-white", onClick: () => setIsOpen(!isOpen), whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }) }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "md:hidden bg-white dark:bg-black text-slate-900 dark:text-white shadow-lg", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "px-4 py-4 space-y-4", children: navItems.map((item, index) => (_jsx(motion.a, { href: item.href, className: "block text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors duration-300", onClick: () => setIsOpen(false), initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, whileHover: { x: 10 }, children: item.name }, item.name))) }) })) })] }));
};
export default Navigation;
