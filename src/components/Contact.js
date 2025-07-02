import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
const Contact = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [focusedField, setFocusedField] = useState(null);
    const handleInputChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };
    const contactInfo = [
        {
            icon: _jsx(Mail, { className: "w-6 h-6" }),
            label: "Email",
            value: "anubhavsanjay01@gmail.com",
            href: "mailto:anubhavsanjay01@gmail.com"
        },
        {
            icon: _jsx(Phone, { className: "w-6 h-6" }),
            label: "Phone",
            value: "+91 9880502538",
            href: "tel:+919880502538"
        },
        {
            icon: _jsx(MapPin, { className: "w-6 h-6" }),
            label: "Location",
            value: "India",
            href: "#"
        }
    ];
    const socialLinks = [
        { icon: _jsx(Github, { className: "w-6 h-6" }), href: "https://github.com/Anubhavvish23", label: "GitHub" },
        { icon: _jsx(Linkedin, { className: "w-6 h-6" }), href: "http://www.linkedin.com/in/anubhav-s-14a380229", label: "LinkedIn" },
        { icon: _jsx(Twitter, { className: "w-6 h-6" }), href: "#", label: "Twitter" },
        { icon: _jsx(Instagram, { className: "w-6 h-6" }), href: "https://www.instagram.com/aanubhavv.23?igsh=MXJxOTU1OHFwbnM0ZA==", label: "Instagram" }
    ];
    return (_jsx("section", { id: "contact", className: "py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "title text-4xl font-bold mb-8 text-slate-900 dark:text-white", children: "Get In Touch" }), _jsx("p", { className: "text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto", children: "Ready to bring your ideas to life? Let's collaborate and create something amazing together." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [_jsx(motion.div, { initial: { opacity: 0, x: -50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.2 }, className: "space-y-6", children: _jsxs("div", { className: "glass rounded-2xl p-8", children: [_jsx("h3", { className: "title text-2xl font-bold text-slate-900 dark:text-white mb-6", children: "Send Message" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx(motion.input, { type: "text", name: "name", value: formData.name, onChange: handleInputChange, onFocus: () => setFocusedField('name'), onBlur: () => setFocusedField(null), className: "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300", placeholder: "Your Name", required: true }), _jsx(motion.label, { className: `absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${focusedField === 'name' || formData.name
                                                            ? '-top-2 text-sm bg-white px-2 text-blue-500'
                                                            : 'top-3'}`, animate: {
                                                            y: focusedField === 'name' || formData.name ? -8 : 0,
                                                            scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                                                        }, children: "Your Name" })] }), _jsxs("div", { className: "relative", children: [_jsx(motion.input, { type: "email", name: "email", value: formData.email, onChange: handleInputChange, onFocus: () => setFocusedField('email'), onBlur: () => setFocusedField(null), className: "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300", placeholder: "Your Email", required: true }), _jsx(motion.label, { className: `absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${focusedField === 'email' || formData.email
                                                            ? '-top-2 text-sm bg-white px-2 text-blue-500'
                                                            : 'top-3'}`, animate: {
                                                            y: focusedField === 'email' || formData.email ? -8 : 0,
                                                            scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                                                        }, children: "Your Email" })] }), _jsxs("div", { className: "relative", children: [_jsx(motion.input, { type: "text", name: "subject", value: formData.subject, onChange: handleInputChange, onFocus: () => setFocusedField('subject'), onBlur: () => setFocusedField(null), className: "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300", placeholder: "Subject", required: true }), _jsx(motion.label, { className: `absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${focusedField === 'subject' || formData.subject
                                                            ? '-top-2 text-sm bg-white px-2 text-blue-500'
                                                            : 'top-3'}`, animate: {
                                                            y: focusedField === 'subject' || formData.subject ? -8 : 0,
                                                            scale: focusedField === 'subject' || formData.subject ? 0.85 : 1,
                                                        }, children: "Subject" })] }), _jsxs("div", { className: "relative", children: [_jsx(motion.textarea, { name: "message", value: formData.message, onChange: handleInputChange, onFocus: () => setFocusedField('message'), onBlur: () => setFocusedField(null), rows: 5, className: "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none", placeholder: "Your Message", required: true }), _jsx(motion.label, { className: `absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${focusedField === 'message' || formData.message
                                                            ? '-top-2 text-sm bg-white px-2 text-blue-500'
                                                            : 'top-3'}`, animate: {
                                                            y: focusedField === 'message' || formData.message ? -8 : 0,
                                                            scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                                                        }, children: "Your Message" })] }), _jsxs(motion.button, { type: "submit", className: "w-full glass-strong py-4 rounded-lg text-slate-900 font-semibold flex items-center justify-center gap-3 hover:neon-blue transition-all duration-300 ripple", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Send, { className: "w-5 h-5" }), "Send Message"] })] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 50 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.8, delay: 0.4 }, className: "space-y-8", children: [_jsxs("div", { className: "glass rounded-2xl p-8", children: [_jsx("h3", { className: "title text-2xl font-bold text-slate-900 mb-6", children: "Contact Information" }), _jsx("div", { className: "space-y-6", children: contactInfo.map((info, index) => (_jsxs(motion.a, { href: info.href, className: "flex items-center gap-4 text-slate-600 hover:text-slate-900 transition-colors duration-300 group", initial: { opacity: 0, x: 20 }, animate: inView ? { opacity: 1, x: 0 } : {}, transition: { duration: 0.5, delay: 0.6 + index * 0.1 }, whileHover: { x: 10 }, children: [_jsx(motion.div, { className: "p-3 bg-black rounded-lg text-white group-hover:scale-110 transition-transform duration-300", whileHover: { rotate: 360 }, transition: { duration: 0.5 }, children: React.cloneElement(info.icon, { color: 'white' }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-500", children: info.label }), _jsx("p", { className: "font-medium", children: info.value })] })] }, info.label))) })] }), _jsxs("div", { className: "glass rounded-2xl p-8", children: [_jsx("h3", { className: "title text-2xl font-bold text-slate-900 mb-6", children: "Follow Me" }), _jsx("div", { className: "flex gap-4", children: socialLinks.map((social, index) => (_jsx(motion.a, { href: social.href, className: "p-4 glass-strong rounded-lg text-slate-600 hover:text-slate-900 transition-all duration-300 group", initial: { opacity: 0, scale: 0 }, animate: inView ? { opacity: 1, scale: 1 } : {}, transition: { duration: 0.5, delay: 0.8 + index * 0.1 }, whileHover: {
                                                    scale: 1.1,
                                                    y: -5,
                                                    rotate: [0, -10, 10, 0]
                                                }, whileTap: { scale: 0.9 }, children: social.icon }, social.label))) })] }), _jsxs(motion.div, { className: "glass rounded-2xl p-8 text-center", initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 1 }, children: [_jsx(motion.div, { className: "w-4 h-4 bg-green-500 rounded-full mx-auto mb-4", animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity } }), _jsx("h4", { className: "text-lg font-semibold text-slate-900 mb-2", children: "Available for Work" }), _jsx("p", { className: "text-slate-600 text-sm", children: "Currently accepting new projects and collaborations" })] })] })] })] }) }));
};
export default Contact;
