import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface ContactProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Magic sparkles for background (standalone component)
const MagicContactSparkles: React.FC<{ magicMode: boolean }> = ({ magicMode }) => {
  const [sparkleSeeds, setSparkleSeeds] = useState(Array.from({ length: 12 }, () => Math.random()));

  // Helper to respawn a sparkle
  const respawnSparkle = (idx: number) => {
    setSparkleSeeds(seeds => {
      const newSeeds = [...seeds];
      newSeeds[idx] = Math.random();
      return newSeeds;
    });
  };

  return (
    <>
      {magicMode && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {sparkleSeeds.map((seed, i) => {
            const startLeft = Math.random() * 100;
            const startTop = Math.random() * 100;
            const angle = Math.random() * 2 * Math.PI;
            const distance = 40 + Math.random() * 40;
            const endLeft = Math.min(100, Math.max(0, startLeft + Math.cos(angle) * distance * 0.7));
            const endTop = Math.min(100, Math.max(0, startTop + Math.sin(angle) * distance));
            const size = 8 + Math.random() * 10;
            const duration = 2.5 + Math.random() * 1.5;
            return (
              <motion.div
                key={i + '-' + seed}
                className="absolute bg-blue-400/40 rounded-full shadow-lg"
                style={{
                  width: size,
                  height: size,
                  left: `${startLeft}%`,
                  top: `${startTop}%`,
                  filter: 'blur(1.5px) drop-shadow(0 0 6px #a5b4fc)'
                }}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  left: `${startLeft}%`,
                  top: `${startTop}%`
                }}
                animate={{
                  opacity: [0.7, 1, 0],
                  scale: [0.7, 1.2, 0.5],
                  left: [`${startLeft}%`, `${endLeft}%`],
                  top: [`${startTop}%`, `${endTop}%`]
                }}
                transition={{
                  duration,
                  ease: 'easeInOut',
                }}
                onAnimationComplete={() => respawnSparkle(i)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const Contact: React.FC<ContactProps> = ({ magicMode = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Enhanced Chaotic Magic Mode state
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [formPos, setFormPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [contactInfoPos, setContactInfoPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [socialLinksPos, setSocialLinksPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setFormPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setContactInfoPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setSocialLinksPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    // Chaotic title animation
    const chaosTitle = () => {
      setTitlePos({
        x: getRandom(-60, 60),
        y: getRandom(-30, 30),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosTitle, getRandom(2000, 4000)));
    };

    // Falling description
    const fallDesc = () => {
      setDescPos({
        x: getRandom(-40, 40),
        y: getRandom(-15, 15),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.85, 1.15)
      });
      timers.push(window.setTimeout(fallDesc, getRandom(2500, 5000)));
    };

    // Spinning form
    const spinForm = () => {
      setFormPos({
        x: getRandom(-35, 35),
        y: getRandom(-12, 12),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(spinForm, getRandom(3000, 6000)));
    };

    // Bouncing contact info
    const bounceContactInfo = () => {
      setContactInfoPos({
        x: getRandom(-25, 25),
        y: getRandom(-8, 8),
        rotate: getRandom(-8, 8),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(bounceContactInfo, getRandom(2200, 4500)));
    };

    // Chaotic social links
    const chaosSocialLinks = () => {
      setSocialLinksPos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-12, 12),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosSocialLinks, getRandom(2800, 5500)));
    };

    // Start all chaotic animations
    chaosTitle();
    fallDesc();
    spinForm();
    bounceContactInfo();
    chaosSocialLinks();

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  // Continuous rotation for extra chaos
  const continuousRotate = magicMode ? {
    rotate: [0, 360],
    transition: { duration: 15, repeat: Infinity, ease: "linear" }
  } : {};

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
    <section id="contact" className={`py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white ${magicMode ? 'scale-x-[-1]' : ''}`}>
      {/* Magic sparkles background */}
      <MagicContactSparkles magicMode={magicMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="title text-5xl font-bold mb-8 text-slate-900 dark:text-white"
            animate={magicMode ? { ...titlePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            animate={magicMode ? { ...descPos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div 
              className="glass rounded-2xl p-8"
              animate={magicMode ? { ...formPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
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
                    whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
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
                    whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
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
                    whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
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
                    whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
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
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors duration-300 flex items-center justify-center gap-2"
                  whileHover={magicMode ? { scale: 1.1, rotate: 5 } : { scale: 1.02 }}
                  whileTap={magicMode ? { scale: 0.9, rotate: -5 } : { scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <motion.div
              animate={magicMode ? { ...contactInfoPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              <h3 className="title text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:glass-strong transition-all duration-300 group"
                    whileHover={magicMode ? { scale: 1.05, rotate: 3 } : { scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300"
                      whileHover={magicMode ? { scale: 1.3, rotate: 360 } : { scale: 1.1 }}
                      animate={magicMode ? continuousRotate : {}}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{info.label}</p>
                      <p className="text-slate-600 dark:text-slate-300">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              animate={magicMode ? { ...socialLinksPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              <h3 className="title text-2xl font-bold text-slate-900 dark:text-white mb-4">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-full hover:glass-strong transition-all duration-300 group"
                    whileHover={magicMode ? { scale: 1.3, rotate: 15 } : { scale: 1.1 }}
                    whileTap={magicMode ? { scale: 0.8, rotate: -15 } : { scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <motion.div
                      className="text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors duration-300"
                      whileHover={magicMode ? { rotate: 360 } : {}}
                    >
                      {social.icon}
                    </motion.div>
                  </motion.a>
                ))}
              </div>
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