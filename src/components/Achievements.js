import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Trophy, Star, Zap, Code, Rocket, Users, BookOpen, Briefcase, Crown, Medal, Activity, Globe, Bot, Brain, Laptop2, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
const FloatingIcon = ({ children, delay = 0 }) => (_jsx("div", { className: "absolute animate-bounce opacity-20", style: {
        animationDelay: `${delay}s`,
        animationDuration: '3s'
    }, children: children }));
const Achievements = () => {
    const [inView, setInView] = React.useState(false);
    const [activeYear, setActiveYear] = React.useState(0);
    React.useEffect(() => {
        const timer = setTimeout(() => setInView(true), 100);
        return () => clearTimeout(timer);
    }, []);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveYear(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const achievementsTimeline = [
        {
            year: '2023',
            theme: 'Foundation',
            icon: _jsx(Star, { className: "w-6 h-6" }),
            items: [
                { icon: _jsx(Trophy, { className: "w-5 h-5" }), text: 'Won my first hackathon (Robotics/IoT).' },
                { icon: _jsx(Zap, { className: "w-5 h-5" }), text: 'Built a line-following robot using Raspberry Pi.' },
                { icon: _jsx(Code, { className: "w-5 h-5" }), text: 'Started building projects with Arduino, C, and embedded systems.' },
                { icon: _jsx(Rocket, { className: "w-5 h-5" }), text: 'Entered the world of hackathons and tech competitions.' },
            ]
        },
        {
            year: '2024',
            theme: 'Breakthrough',
            icon: _jsx(Rocket, { className: "w-6 h-6" }),
            items: [
                { icon: _jsx(Globe, { className: "w-5 h-5" }), text: 'Represented my college at Delhi Startup Mahakumbh, addressed by PM Modi and top founders.' },
                { icon: _jsx(Trophy, { className: "w-5 h-5" }), text: 'Won a robotics hackathon.' },
                { icon: _jsx(Briefcase, { className: "w-5 h-5" }), text: 'Completed an internship at RC Labs as a Software Developer.' },
                { icon: _jsx(UserCheck, { className: "w-5 h-5" }), text: 'Took Arduino sessions and Linux VirtualBox workshops for juniors.' },
                { icon: _jsx(Users, { className: "w-5 h-5" }), text: 'Conducted hands-on training in IoT and robotics at campus.' },
                { icon: _jsx(Laptop2, { className: "w-5 h-5" }), text: 'Built ERP systems and launched AI & web-based projects.' },
                { icon: _jsx(BookOpen, { className: "w-5 h-5" }), text: 'Learned MERN stack, Django, and contributed to full-stack apps.' },
            ]
        },
        {
            year: '2025',
            theme: 'Leadership',
            icon: _jsx(Crown, { className: "w-6 h-6" }),
            items: [
                { icon: _jsx(Briefcase, { className: "w-5 h-5" }), text: 'Interned as a Product Management Intern at Gully Group.' },
                { icon: _jsx(Users, { className: "w-5 h-5" }), text: 'Conducted a Hackathon at my college as lead organizer.' },
                { icon: _jsx(Medal, { className: "w-5 h-5" }), text: 'Received Best Upcoming Engineer 2025 (Multiple Awards).' },
                { icon: _jsx(Activity, { className: "w-5 h-5" }), text: 'Led multiple Drone workshops and technical sessions.' },
                { icon: _jsx(Bot, { className: "w-5 h-5" }), text: 'Created advanced AI applications: Datasheet AI, Sanskrit GPT, MediBot, and more.' },
                { icon: _jsx(Brain, { className: "w-5 h-5" }), text: 'Completed advanced courses in AI, Full Stack Dev, FastAPI, and LLMs.' },
                { icon: _jsx(Globe, { className: "w-5 h-5" }), text: 'Reinvited to Delhi tech events for achievements in AI and product dev.' },
            ]
        }
    ];
    const stats = [
        { number: "50+", label: "Projects Completed", icon: _jsx(Code, { className: "w-6 h-6" }) },
        { number: "3+", label: "Years Experience", icon: _jsx(Trophy, { className: "w-6 h-6" }) },
        { number: "100+", label: "GitHub Contributions", icon: _jsx(Activity, { className: "w-6 h-6" }) },
        { number: "15+", label: "Technologies Mastered", icon: _jsx(Sparkles, { className: "w-6 h-6" }) }
    ];
    return (_jsxs("section", { id: "achievements", className: "py-24 bg-white dark:bg-black text-slate-900 dark:text-white relative overflow-hidden min-h-screen", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx(FloatingIcon, { delay: 0, children: _jsx("div", { className: "top-20 left-20 relative", children: _jsx(Code, { className: "w-8 h-8 text-gray-300" }) }) }), _jsx(FloatingIcon, { delay: 1, children: _jsx("div", { className: "top-40 right-32 relative", children: _jsx(Rocket, { className: "w-10 h-10 text-gray-300" }) }) }), _jsx(FloatingIcon, { delay: 2, children: _jsx("div", { className: "bottom-32 left-1/4 relative", children: _jsx(Trophy, { className: "w-7 h-7 text-gray-300" }) }) }), _jsx(FloatingIcon, { delay: 1.5, children: _jsx("div", { className: "bottom-40 right-20 relative", children: _jsx(Brain, { className: "w-9 h-9 text-gray-300" }) }) }), _jsx("div", { className: "absolute top-16 left-16 w-32 h-32 border-2 border-gray-200 rounded-full animate-spin opacity-30", style: { animationDuration: '20s' } }), _jsx("div", { className: "absolute bottom-16 right-16 w-48 h-48 border-2 border-gray-200 rounded-full animate-spin opacity-20", style: { animationDuration: '25s', animationDirection: 'reverse' } }), _jsx("div", { className: "absolute top-1/2 left-8 w-24 h-24 border-2 border-gray-200 rotate-45 animate-pulse opacity-20" })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [_jsxs("div", { className: `text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`, children: [_jsx("h2", { className: "title text-6xl md:text-8xl mb-6 text-slate-900 dark:text-white", children: "Achievements" }), _jsxs("div", { className: "flex justify-center items-center gap-4 mb-8", children: [_jsx("div", { className: "w-12 h-1 bg-slate-900 dark:bg-white animate-pulse" }), _jsx(Sparkles, { className: "w-6 h-6 text-slate-900 dark:text-white animate-spin", style: { animationDuration: '3s' } }), _jsx("div", { className: "w-12 h-1 bg-slate-900 dark:bg-white animate-pulse" })] }), _jsx("p", { className: "text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium", children: "A structured timeline of growth, innovation, and leadership in technology" })] }), _jsxs("div", { className: "relative mb-24", children: [_jsxs("div", { className: "absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-900 dark:bg-white h-full rounded-full", children: [_jsx("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping" }), _jsx("div", { className: "absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse" }), _jsx("div", { className: "absolute top-2/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse", style: { animationDelay: '1s' } }), _jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping", style: { animationDelay: '2s' } })] }), _jsx("div", { className: "space-y-32", children: achievementsTimeline.map((yearBlock, idx) => (_jsxs("div", { className: `relative transition-all duration-1000 delay-${idx * 200} ${inView ? 'opacity-100 translate-x-0' : `opacity-0 ${idx % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`}`, children: [_jsxs("div", { className: "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0", children: [_jsx("div", { className: `w-6 h-6 rounded-full border-4 border-slate-900 dark:border-white transition-all duration-500 ${activeYear === idx ? 'bg-slate-900 dark:bg-white animate-pulse shadow-lg' : 'bg-white dark:bg-slate-900'}` }), _jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: _jsx("div", { className: `transition-all duration-500 ${activeYear === idx ? 'text-white animate-bounce' : 'text-slate-900 dark:text-white'}`, children: yearBlock.icon }) })] }), _jsxs("div", { className: `grid grid-cols-1 lg:grid-cols-2 gap-12 ${idx % 2 === 0 ? '' : 'lg:grid-cols-2'}`, children: [_jsx("div", { className: `${idx % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:order-2 lg:pl-20'}`, children: _jsx("div", { className: "inline-block group", children: _jsxs("div", { className: `bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:rotate-1`, children: [_jsxs("div", { className: "flex items-center gap-6 mb-4", children: [_jsx("div", { className: `p-4 bg-slate-900 dark:bg-white text-white rounded-2xl group-hover:scale-110 transition-all duration-300 ${activeYear === idx ? 'animate-pulse' : ''}`, children: yearBlock.icon }), _jsxs("div", { children: [_jsx("div", { className: "text-5xl font-black text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300", children: yearBlock.year }), _jsx("div", { className: "text-sm uppercase tracking-wider text-slate-600 dark:text-slate-300 font-bold mt-1", children: yearBlock.theme })] })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors duration-300", children: [_jsx("span", { className: "w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-pulse" }), _jsx("span", { children: "MILESTONE" })] }) })] }) }) }), _jsx("div", { className: `${idx % 2 === 0 ? 'lg:pl-20' : 'lg:order-1 lg:pr-20'}`, children: _jsx("div", { className: "bg-white dark:bg-black rounded-3xl p-8 transition-all duration-300 shadow-2xl hover:scale-102 hover:-rotate-1", children: _jsx("div", { className: "space-y-6", children: yearBlock.items.map((item, i) => (_jsxs("div", { className: "flex items-start gap-4 group hover:translate-x-4 transition-all duration-300 p-3 rounded-xl", style: { animationDelay: `${i * 0.1}s` }, children: [_jsx("div", { className: "p-3 bg-transparent text-slate-900 dark:text-white rounded-xl group-hover:scale-110 transition-all duration-300 mt-1", children: item.icon }), _jsx("p", { className: "text-slate-900 dark:text-white leading-relaxed transition-colors duration-300 font-medium", children: item.text }), _jsx(ArrowRight, { className: "w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2" })] }, i))) }) }) })] })] }, yearBlock.year))) })] }), _jsx("div", { className: "absolute top-1/4 left-0 w-3 h-40 bg-gradient-to-b from-transparent via-slate-900 to-transparent opacity-30 rounded-full animate-pulse" }), _jsx("div", { className: "absolute bottom-1/4 right-0 w-3 h-40 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 opacity-30 rounded-full animate-pulse", style: { animationDelay: '1s' } })] })] }));
};
export default Achievements;
