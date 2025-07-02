import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Scene3D from './components/Scene3D';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllProjects from './components/AllProjects';
import './App.css';
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const handleLoadingComplete = () => {
        setIsLoading(false);
    };
    return (_jsx(ThemeProvider, { children: _jsx(BrowserRouter, { children: _jsxs("div", { className: "relative min-h-screen bg-white dark:bg-gray-900 text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500", children: [isLoading && _jsx(LoadingScreen, { onComplete: handleLoadingComplete }), !isLoading && _jsx(Scene3D, {}), _jsxs("div", { className: "fixed inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white/40 to-white dark:bg-gray-900" }), _jsx(motion.div, { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-gray-800/20 rounded-full blur-3xl", animate: {
                                    x: [0, 100, 0],
                                    y: [0, -100, 0],
                                }, transition: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 dark:bg-gray-800/20 rounded-full blur-3xl", animate: {
                                    x: [0, -100, 0],
                                    y: [0, 100, 0],
                                }, transition: {
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear"
                                } })] }), !isLoading && (_jsxs(_Fragment, { children: [_jsx(CustomCursor, {}), _jsx(Navigation, {}), _jsx(ScrollProgress, {}), _jsx("main", { className: "relative z-10", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsxs(_Fragment, { children: [_jsx(Hero, {}), _jsx(About, {}), _jsx(Skills, {}), _jsx(Projects, {}), _jsx(Achievements, {}), _jsx(Contact, {})] }) }), _jsx(Route, { path: "/projects-all", element: _jsx(AllProjects, {}) })] }) })] }))] }) }) }));
}
export default App;
