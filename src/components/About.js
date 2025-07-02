import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Code, Heart, Zap } from 'lucide-react';
const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const cards = [
        {
            icon: _jsx(Code, { className: "w-8 h-8" }),
            title: "Developer",
            description: "Crafting clean, efficient code with modern technologies and best practices."
        },
        {
            icon: _jsx(Heart, { className: "w-8 h-8" }),
            title: "Designer",
            description: "Creating beautiful, user-centered interfaces that delight and engage."
        },
        {
            icon: _jsx(Zap, { className: "w-8 h-8" }),
            title: "Innovator",
            description: "Always exploring new technologies and pushing the boundaries of what's possible."
        }
    ];
    return (_jsx("section", { id: "about", className: "py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "title text-4xl font-bold text-slate-900 dark:text-white", children: "About Me" }), _jsx("p", { className: "text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed", children: "I'm a passionate full-stack developer with a love for creating innovative digital solutions. My journey in tech is driven by curiosity, creativity, and a commitment to excellence." })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.2 }, className: "space-y-6", children: [_jsxs("div", { className: "glass rounded-2xl p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "My Story" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 leading-relaxed mb-4", children: "Started my journey in computer science with a fascination for how technology can solve real-world problems. Over the years, I've developed expertise in both frontend and backend technologies, always staying curious about emerging trends and best practices." }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 leading-relaxed", children: "When I'm not coding, you'll find me exploring new frameworks, contributing to open source projects, or sharing knowledge with the developer community." })] }), _jsxs(motion.div, { className: "flex items-center gap-3 text-slate-600 dark:text-slate-300", whileHover: { scale: 1.05 }, children: [_jsx(motion.div, { animate: { y: [0, -5, 0] }, transition: { duration: 2, repeat: Infinity }, children: _jsx(MapPin, { className: "w-6 h-6 text-blue-400" }) }), _jsx("span", { className: "text-lg", children: "Based in India" })] })] }), _jsx(motion.div, { initial: { opacity: 0, x: 50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.4 }, className: "space-y-6", children: cards.map((card, index) => (_jsx(motion.div, { className: "glass rounded-xl p-6 hover:glass-strong transition-all duration-300 cursor-pointer group", initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5, delay: 0.6 + index * 0.1 }, whileHover: {
                                    scale: 1.02,
                                    rotateY: 5,
                                    rotateX: 5,
                                }, style: { transformStyle: 'preserve-3d' }, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(motion.div, { className: "text-blue-400 group-hover:text-purple-400 transition-colors duration-300", whileHover: {
                                                scale: 1.2,
                                                rotate: 360,
                                            }, transition: { duration: 0.5 }, children: card.icon }), _jsxs("div", { children: [_jsx("h4", { className: "text-xl font-semibold text-slate-900 dark:text-white mb-2", children: card.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-300", children: card.description })] })] }) }, card.title))) })] }), _jsxs(motion.div, { className: "mt-16 text-center", initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 0.8 }, children: [_jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-8", children: "Core Values" }), _jsx("div", { className: "flex justify-center gap-8 flex-wrap", children: ['Innovation', 'Quality', 'Collaboration', 'Growth'].map((value, index) => (_jsxs(motion.div, { className: "relative", whileHover: { scale: 1.1 }, children: [_jsx(motion.div, { className: "w-16 h-16 rounded-full bg-black flex items-center justify-center cursor-pointer", animate: {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 180, 360]
                                        }, transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: index * 0.5
                                        }, whileHover: {
                                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                                        }, children: _jsx("span", { className: "text-white font-bold text-sm", children: value[0] }) }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-sm mt-2", children: value })] }, value))) })] })] }) }));
};
export default About;
