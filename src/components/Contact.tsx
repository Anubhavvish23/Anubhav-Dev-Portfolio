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

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "anubhavsanjay01@gmail.com",
      href: "mailto:anubhavsanjay01@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9880502538",
      href: "tel:+919880502538"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "India",
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: "https://github.com/Anubhavvish23", label: "GitHub" },
    { icon: <Linkedin className="w-6 h-6" />, href: "http://www.linkedin.com/in/anubhav-s-14a380229", label: "LinkedIn" },
    { icon: <Twitter className="w-6 h-6" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/aanubhavv.23?igsh=MXJxOTU1OHFwbnM0ZA==", label: "Instagram" }
  ];

  return (
    <section id="contact" className="py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
                      <h2 className="title text-5xl font-bold mb-8 text-slate-900 dark:text-white">Get In Touch</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="title text-3xl font-bold text-slate-900 dark:text-white mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                    placeholder="Your Name"
                    required
                  />
                  <motion.label
                    className={`absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${
                      focusedField === 'name' || formData.name
                        ? '-top-2 text-sm bg-white px-2 text-blue-500'
                        : 'top-3'
                    }`}
                    animate={{
                      y: focusedField === 'name' || formData.name ? -8 : 0,
                      scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    }}
                  >
                    Your Name
                  </motion.label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                    placeholder="Your Email"
                    required
                  />
                  <motion.label
                    className={`absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${
                      focusedField === 'email' || formData.email
                        ? '-top-2 text-sm bg-white px-2 text-blue-500'
                        : 'top-3'
                    }`}
                    animate={{
                      y: focusedField === 'email' || formData.email ? -8 : 0,
                      scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    }}
                  >
                    Your Email
                  </motion.label>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                    placeholder="Subject"
                    required
                  />
                  <motion.label
                    className={`absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${
                      focusedField === 'subject' || formData.subject
                        ? '-top-2 text-sm bg-white px-2 text-blue-500'
                        : 'top-3'
                    }`}
                    animate={{
                      y: focusedField === 'subject' || formData.subject ? -8 : 0,
                      scale: focusedField === 'subject' || formData.subject ? 0.85 : 1,
                    }}
                  >
                    Subject
                  </motion.label>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                    placeholder="Your Message"
                    required
                  />
                  <motion.label
                    className={`absolute left-4 text-slate-500 pointer-events-none transition-all duration-300 ${
                      focusedField === 'message' || formData.message
                        ? '-top-2 text-sm bg-white px-2 text-blue-500'
                        : 'top-3'
                    }`}
                    animate={{
                      y: focusedField === 'message' || formData.message ? -8 : 0,
                      scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    }}
                  >
                    Your Message
                  </motion.label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full glass-strong py-4 rounded-lg text-slate-900 font-semibold flex items-center justify-center gap-3 hover:neon-blue transition-all duration-300 ripple"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="glass rounded-2xl p-8">
              <h3 className="title text-3xl font-bold text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 text-slate-600 hover:text-slate-900 transition-colors duration-300 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="p-3 bg-black rounded-lg text-white group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {React.cloneElement(info.icon, { color: 'white' })}
                    </motion.div>
                    <div>
                      <p className="text-sm text-slate-500">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="glass rounded-2xl p-8">
              <h3 className="title text-3xl font-bold text-slate-900 mb-6">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-4 glass-strong rounded-lg text-slate-600 hover:text-slate-900 transition-all duration-300 group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                      rotate: [0, -10, 10, 0]
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="glass rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Available for Work</h4>
              <p className="text-slate-600 text-sm">
                Currently accepting new projects and collaborations
              </p>
            </motion.div>
          </motion.div>
        </div>
        {/* Visitor Counter Badge - Added at the bottom of Contact page */}
        <div className="flex justify-center items-center text-sm mt-8 mb-4 w-full">
          <img
            src="https://hits.sh/anubhav-dev-portfolio.vercel.app.svg?style=flat-square&label=visitors&color=blue"
            alt="Visitor Counter"
            className="h-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;