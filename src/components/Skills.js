import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const CIcon = () => (_jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-lg", children: "C" }));
const Skills = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const skills = [
        { name: 'React/Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
        { name: 'Node.js', level: 88, color: 'from-green-500 to-green-400' },
        { name: 'Python', level: 85, color: 'from-yellow-500 to-yellow-400' },
        { name: 'UI/UX Design', level: 82, color: 'from-purple-500 to-pink-500' },
        { name: 'Database Design', level: 80, color: 'from-red-500 to-orange-500' },
    ];
    const techStack = [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Docker', icon: '🐳' },
        { name: 'AWS', icon: '☁️' },
        { name: 'Git', icon: '📚' },
        { name: 'Figma', icon: '🎨' },
        { name: 'C', icon: _jsx(CIcon, {}) },
        { name: 'MERN Stack', icon: '🌐', progress: 92 },
        { name: 'Django', icon: '🦄', progress: 80 },
        { name: 'Full Stack', icon: '🧑‍💻', progress: 95 },
        { name: 'Gen AI', icon: '🤖', progress: 75 },
        { name: 'ML', icon: '📊', progress: 78 },
    ];
    const radialSkills = [
        { name: 'Frontend', percentage: 80 },
        { name: 'Backend', percentage: 80 },
        { name: 'DevOps', percentage: 75 },
        { name: 'Design', percentage: 82 },
    ];
    const stackProgress = [
        { name: 'MERN Stack', icon: '🌐', progress: 92 },
        { name: 'Django', icon: '🦄', progress: 80 },
        { name: 'Full Stack', icon: '🧑‍💻', progress: 95 },
        { name: 'Gen AI', icon: '🤖', progress: 75 },
        { name: 'ML', icon: '📊', progress: 78 },
    ];
    return (_jsx("section", { id: "skills", className: "py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "title text-5xl font-bold mb-6", children: "Skills & Expertise" }), _jsx("p", { className: "text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto", children: "A comprehensive toolkit of modern technologies and frameworks" })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.2 }, className: "space-y-6", children: [_jsx("h3", { className: "text-2xl font-bold mb-8", children: "Technical Proficiency" }), skills.map((skill, index) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-medium", children: skill.name }), _jsxs("span", { className: "text-slate-600 dark:text-slate-300", children: [skill.level, "%"] })] }), _jsx("div", { className: "h-3 bg-slate-200 rounded-full overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-black rounded-full shadow-md border border-white", initial: { width: 0 }, animate: inView ? { width: `${skill.level}%` } : {}, transition: { duration: 1.5, delay: 0.5 + index * 0.1 } }) })] }, skill.name)))] }), _jsxs(motion.div, { initial: { opacity: 0, x: 50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.4 }, className: "space-y-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-8", children: "Expertise Areas" }), _jsx("div", { className: "grid grid-cols-2 gap-8", children: radialSkills.map((skill, index) => (_jsxs(motion.div, { className: "text-center", initial: { opacity: 0, scale: 0 }, animate: inView ? { opacity: 1, scale: 1 } : {}, transition: { duration: 0.8, delay: 0.6 + index * 0.1 }, children: [_jsxs("div", { className: "relative w-24 h-24 mx-auto mb-4", children: [_jsxs("svg", { className: "w-24 h-24 transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "#000", strokeWidth: 8, fill: "none" }), _jsx(motion.circle, { cx: "50", cy: "50", r: "40", stroke: "#000", strokeWidth: 8, fill: "none", strokeLinecap: "round", strokeDasharray: `${2 * Math.PI * 40}`, initial: { strokeDashoffset: 2 * Math.PI * 40 }, animate: inView ? { strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.percentage / 100) } : {}, transition: { duration: 2, delay: 0.8 + index * 0.2 }, style: { filter: 'drop-shadow(0 0 6px #000)' } })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "font-bold", children: [skill.percentage, "%"] }) })] }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 font-medium", children: skill.name })] }, skill.name))) })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 0.8 }, className: "mt-16", children: [_jsx("h3", { className: "text-2xl font-bold text-center mb-2", children: "Technology Stack" }), _jsx("div", { className: "flex flex-wrap justify-center gap-3", children: techStack.filter(t => t.progress === undefined).map((tech, i) => (_jsxs(motion.div, { className: "glass rounded-xl p-4 text-center cursor-pointer group w-40 min-h-[90px] flex flex-col items-center justify-between", initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5, delay: 1 + i * 0.05 }, whileHover: { scale: 1.1, y: -10, rotateY: 15 }, children: [_jsx("div", { className: "text-3xl mb-2 group-hover:animate-bounce", children: tech.icon }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-sm font-medium mb-2", children: tech.name })] }, tech.name))) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10", children: stackProgress.map((stack, index) => (_jsxs(motion.div, { className: "glass rounded-xl p-6 flex flex-col items-center", initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5, delay: 1.5 + index * 0.1 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("span", { className: "text-2xl", children: stack.icon }), _jsx("span", { className: "font-semibold", children: stack.name })] }), _jsx("div", { className: "w-full h-3 bg-slate-200 rounded-full overflow-hidden mt-2", children: _jsx(motion.div, { className: "h-full bg-black rounded-full shadow-md border border-white", initial: { width: 0 }, animate: inView ? { width: `${stack.progress}%` } : {}, transition: { duration: 1.2, delay: 1.7 + index * 0.1 } }) }), _jsxs("div", { className: "w-full flex justify-end text-xs text-slate-700 mt-1 font-mono", children: [stack.progress, "%"] })] }, stack.name))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 2.2 }, className: "mt-16", children: [_jsx("h3", { className: "text-2xl font-bold text-center mb-4", children: "Certifications" }), _jsx("div", { className: "flex flex-wrap justify-center gap-4", children: [
                                        'MERN Stack x2',
                                        'Django',
                                        'Python',
                                        'Full Stack',
                                        'React',
                                        'Next.js',
                                        'Gen AI',
                                    ].map((cert, idx) => (_jsx("div", { className: "glass rounded-xl px-6 py-3 text-slate-800 dark:text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer", style: { minWidth: 120 }, children: cert }, cert))) })] })] })] }) }));
};
export default Skills;
