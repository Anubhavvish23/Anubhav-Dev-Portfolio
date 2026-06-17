import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import ContactCard from './ContactCard';
import SocialButtons from './SocialButtons';

interface ContactProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const contact_form_email =
  import.meta.env.VITE_CONTACT_FORM_EMAIL || 'anubhavsanjay01@gmail.com';

const MagicContactSparkles: React.FC<{ magicMode: boolean }> = ({ magicMode }) => {
  const [sparkle_seeds, set_sparkle_seeds] = useState(Array.from({ length: 8 }, () => Math.random()));

  const respawn_sparkle = (idx: number) => {
    set_sparkle_seeds(seeds => {
      const new_seeds = [...seeds];
      new_seeds[idx] = Math.random();
      return new_seeds;
    });
  };

  if (!magicMode) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {sparkle_seeds.map((seed, i) => {
        const start_left = 20 + Math.random() * 60;
        const start_top = 30 + Math.random() * 40;
        const size = 6 + Math.random() * 6;
        return (
          <motion.div
            key={i + '-' + seed}
            className="absolute bg-blue-400/30 rounded-full"
            style={{
              width: size,
              height: size,
              left: `${start_left}%`,
              top: `${start_top}%`,
            }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.1, 0.6] }}
            transition={{ duration: 2.5 + Math.random(), ease: 'easeInOut' }}
            onAnimationComplete={() => respawn_sparkle(i)}
          />
        );
      })}
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ magicMode = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [title_pos, set_title_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [desc_pos, set_desc_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [form_pos, set_form_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [contact_info_pos, set_contact_info_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [social_links_pos, set_social_links_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      set_title_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_desc_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_form_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_contact_info_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_social_links_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    const chaos_title = () => {
      set_title_pos({
        x: getRandom(-40, 40),
        y: getRandom(-20, 20),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(chaos_title, getRandom(3000, 6000)));
    };

    const fall_desc = () => {
      set_desc_pos({
        x: getRandom(-30, 30),
        y: getRandom(-15, 15),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fall_desc, getRandom(4000, 7000)));
    };

    const spin_form = () => {
      set_form_pos({
        x: getRandom(-20, 20),
        y: getRandom(-8, 8),
        rotate: getRandom(-8, 8),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(spin_form, getRandom(5000, 8000)));
    };

    const bounce_contact_info = () => {
      set_contact_info_pos({
        x: getRandom(-15, 15),
        y: getRandom(-6, 6),
        rotate: getRandom(-6, 6),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(bounce_contact_info, getRandom(5000, 8000)));
    };

    const chaos_social_links = () => {
      set_social_links_pos({
        x: getRandom(-15, 15),
        y: getRandom(-6, 6),
        rotate: getRandom(-8, 8),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(chaos_social_links, getRandom(5000, 8000)));
    };

    timers.push(window.setTimeout(chaos_title, 1000));
    timers.push(window.setTimeout(fall_desc, 2000));
    timers.push(window.setTimeout(spin_form, 3000));
    timers.push(window.setTimeout(bounce_contact_info, 3500));
    timers.push(window.setTimeout(chaos_social_links, 4000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  const [form_data, set_form_data] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [focused_field, set_focused_field] = useState<string | null>(null);
  const [is_submitting, set_is_submitting] = useState(false);
  const [submit_status, set_submit_status] = useState<'idle' | 'success' | 'error'>('idle');
  const [submit_message, set_submit_message] = useState('');

  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    set_form_data({
      ...form_data,
      [e.target.name]: e.target.value
    });
    if (submit_status !== 'idle') {
      set_submit_status('idle');
      set_submit_message('');
    }
  };

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    set_is_submitting(true);
    set_submit_status('idle');
    set_submit_message('');

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contact_form_email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form_data.name,
            email: form_data.email,
            subject: form_data.subject,
            message: form_data.message,
            _subject: `Portfolio contact: ${form_data.subject}`,
            _template: 'table',
            _captcha: 'false',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === 'false' || data.success === false) {
        throw new Error(data.message || 'Failed to send message');
      }

      set_submit_status('success');
      set_submit_message('Message sent successfully. I will get back to you soon.');
      set_form_data({ name: '', email: '', subject: '', message: '' });
      set_focused_field(null);
    } catch {
      set_submit_status('error');
      set_submit_message('Could not send your message. Please use the email link on the right.');
    } finally {
      set_is_submitting(false);
    }
  };

  const contact_info = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      hint: "Click to send an email",
      href: `mailto:${contact_form_email}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      hint: "Click to call",
      href: "tel:+919880502538"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      hint: "India",
      href: null
    }
  ];

  return (
    <section id="contact" className={`pt-24 pb-24 sm:pt-28 sm:pb-28 relative bg-white dark:bg-black text-slate-900 dark:text-white overflow-x-hidden scroll-mt-20 ${magicMode ? 'scale-x-[-1]' : ''}`}>
      <MagicContactSparkles magicMode={magicMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="title text-4xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white select-none"
            animate={magicMode ? { ...title_pos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-4"
            animate={magicMode ? { ...desc_pos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start justify-items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <ContactCard>
                <motion.div
                  animate={magicMode ? { ...form_pos } : {}}
                  transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                  style={{ position: magicMode ? 'relative' : undefined }}
                >
                  <h3 className="title text-xl font-bold text-slate-900 dark:text-white mb-5">Send Message</h3>

                  <form onSubmit={handle_submit} className="space-y-4">
                    <div className="relative">
                      <motion.input
                        type="text"
                        name="name"
                        value={form_data.name}
                        onChange={handle_input_change}
                        onFocus={() => set_focused_field('name')}
                        onBlur={() => set_focused_field(null)}
                        className="w-full bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#262626] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                        placeholder="Your Name"
                        required
                        whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
                      />
                      <motion.label
                        className={`absolute left-3 text-slate-500 pointer-events-none transition-all duration-300 ${
                          focused_field === 'name' || form_data.name
                            ? '-top-2 text-xs bg-gray-50 dark:bg-[#0a0a0a] px-2 text-blue-500'
                            : 'top-2.5 text-sm'
                        }`}
                      >
                        Your Name
                      </motion.label>
                    </div>

                    <div className="relative">
                      <motion.input
                        type="email"
                        name="email"
                        value={form_data.email}
                        onChange={handle_input_change}
                        onFocus={() => set_focused_field('email')}
                        onBlur={() => set_focused_field(null)}
                        className="w-full bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#262626] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                        placeholder="Your Email"
                        required
                        whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
                      />
                      <motion.label
                        className={`absolute left-3 text-slate-500 pointer-events-none transition-all duration-300 ${
                          focused_field === 'email' || form_data.email
                            ? '-top-2 text-xs bg-gray-50 dark:bg-[#0a0a0a] px-2 text-blue-500'
                            : 'top-2.5 text-sm'
                        }`}
                      >
                        Your Email
                      </motion.label>
                    </div>

                    <div className="relative">
                      <motion.input
                        type="text"
                        name="subject"
                        value={form_data.subject}
                        onChange={handle_input_change}
                        onFocus={() => set_focused_field('subject')}
                        onBlur={() => set_focused_field(null)}
                        className="w-full bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#262626] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                        placeholder="Subject"
                        required
                        whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
                      />
                      <motion.label
                        className={`absolute left-3 text-slate-500 pointer-events-none transition-all duration-300 ${
                          focused_field === 'subject' || form_data.subject
                            ? '-top-2 text-xs bg-gray-50 dark:bg-[#0a0a0a] px-2 text-blue-500'
                            : 'top-2.5 text-sm'
                        }`}
                      >
                        Subject
                      </motion.label>
                    </div>

                    <div className="relative">
                      <motion.textarea
                        name="message"
                        value={form_data.message}
                        onChange={handle_input_change}
                        onFocus={() => set_focused_field('message')}
                        onBlur={() => set_focused_field(null)}
                        rows={4}
                        className="w-full bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#262626] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                        placeholder="Your Message"
                        required
                        whileHover={magicMode ? { scale: 1.02, rotate: 1 } : {}}
                      />
                      <motion.label
                        className={`absolute left-3 text-slate-500 pointer-events-none transition-all duration-300 ${
                          focused_field === 'message' || form_data.message
                            ? '-top-2 text-xs bg-gray-50 dark:bg-[#0a0a0a] px-2 text-blue-500'
                            : 'top-2.5 text-sm'
                        }`}
                      >
                        Your Message
                      </motion.label>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={is_submitting}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-2.5 px-5 rounded-lg text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={magicMode && !is_submitting ? { scale: 1.05, rotate: 3 } : { scale: 1.02 }}
                      whileTap={magicMode && !is_submitting ? { scale: 0.95 } : { scale: 0.98 }}
                    >
                      {is_submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {is_submitting ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    {submit_message && (
                      <p
                        className={`text-sm text-center ${
                          submit_status === 'success'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {submit_message}
                      </p>
                    )}
                  </form>
                </motion.div>
              </ContactCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[340px] space-y-6"
            >
              <motion.div
                animate={magicMode ? { ...contact_info_pos } : {}}
                transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                <h3 className="title text-xl font-bold text-slate-900 dark:text-white mb-4 text-center md:text-left">Contact Information</h3>

                <div className="space-y-3">
                  {contact_info.map((info, index) => {
                    const card_content = (
                      <>
                        <div className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300 flex-shrink-0">
                          {info.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{info.label}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{info.hint}</p>
                        </div>
                      </>
                    );

                    if (!info.href) {
                      return (
                        <motion.div
                          key={info.label}
                          className="flex items-center gap-3 p-3 glass rounded-xl"
                          initial={{ opacity: 0, y: 12 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                        >
                          {card_content}
                        </motion.div>
                      );
                    }

                    return (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        className="flex items-center gap-3 p-3 glass rounded-xl hover:glass-strong transition-all duration-300 group cursor-pointer"
                        whileHover={magicMode ? { scale: 1.03, rotate: 2 } : { scale: 1.02 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                      >
                        {card_content}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center md:items-start"
                animate={magicMode ? { ...social_links_pos } : {}}
                transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                <h3 className="title text-xl font-bold text-slate-900 dark:text-white mb-3">Follow Me</h3>
                <SocialButtons />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <img
            src="https://hits.sh/anubhav-dev-portfolio.vercel.app.svg?style=flat-square&label=visitors&color=blue"
            alt="Visitor Counter"
            className="h-5"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
