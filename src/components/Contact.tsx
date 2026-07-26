import React, { memo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Loader2, Github, Instagram } from 'lucide-react';
import { ease_out, motion_duration, motion_stagger } from '../utils/motion';

interface Contact_props {
  magicMode?: boolean;
}

const contact_form_email =
  import.meta.env.VITE_CONTACT_FORM_EMAIL || 'anubhavsanjay01@gmail.com';

const is_valid_email = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const open_mailto_fallback = (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const subject = encodeURIComponent(
    payload.subject.trim() || `Portfolio message from ${payload.name.trim() || 'visitor'}`
  );
  const body = encodeURIComponent(
    [
      payload.message.trim(),
      '',
      '—',
      `From: ${payload.name.trim() || 'Anonymous'}`,
      `Email: ${payload.email.trim()}`,
    ].join('\n')
  );
  window.location.href = `mailto:${contact_form_email}?subject=${subject}&body=${body}`;
};

const social_links = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Anubhavvish23',
    brand: '#ffffff',
    icon: Github,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/gro.with.anubhav?igsh=Z3llYnYyMmtkYjRt',
    brand: '#e4405f',
    icon: Instagram,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${contact_form_email}`,
    brand: '#0b4c8c',
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Phone',
    href: 'tel:+919880502538',
    brand: '#0b4c8c',
    icon: Phone,
  },
];

const Blank_input = ({
  name,
  value,
  placeholder,
  type = 'text',
  required = true,
  wide = false,
  on_change,
}: {
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  on_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [focused, set_focused] = useState(false);

  return (
    <span className={`contact-editorial__blank ${wide ? 'is-wide' : ''} ${focused || value ? 'is-active' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={on_change}
        onFocus={() => set_focused(true)}
        onBlur={() => set_focused(false)}
        placeholder={placeholder}
        required={required}
        autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
        aria-label={placeholder}
      />
      <span className="contact-editorial__blank-line" aria-hidden />
    </span>
  );
};

const Contact: React.FC<Contact_props> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const in_view = useInView(section_ref, { once: true, amount: 0.2 });

  const [form_data, set_form_data] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honey: '',
  });
  const [message_focused, set_message_focused] = useState(false);
  const [is_submitting, set_is_submitting] = useState(false);
  const [submit_status, set_submit_status] = useState<'idle' | 'success' | 'error'>('idle');
  const [submit_message, set_submit_message] = useState('');

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    set_form_data({
      ...form_data,
      [event.target.name]: event.target.value,
    });
    if (submit_status !== 'idle') {
      set_submit_status('idle');
      set_submit_message('');
    }
  };

  const handle_submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form_data.honey) {
      set_submit_status('success');
      set_submit_message('Message sent. I will get back to you soon.');
      return;
    }

    const trimmed_email = form_data.email.trim();
    const trimmed_name = form_data.name.trim();
    const trimmed_subject = form_data.subject.trim() || 'Portfolio inquiry';
    const trimmed_message = form_data.message.trim();

    if (!trimmed_name || !trimmed_message) {
      set_submit_status('error');
      set_submit_message('Please fill in your name and message.');
      return;
    }

    if (!is_valid_email(trimmed_email)) {
      set_submit_status('error');
      set_submit_message('Please enter a valid email address.');
      return;
    }

    set_is_submitting(true);
    set_submit_status('idle');
    set_submit_message('');

    const payload = {
      name: trimmed_name,
      email: trimmed_email,
      subject: trimmed_subject,
      message: trimmed_message,
    };

    try {
      const form_body = new FormData();
      form_body.append('name', payload.name);
      form_body.append('email', payload.email);
      form_body.append('_replyto', payload.email);
      form_body.append('subject', payload.subject);
      form_body.append('message', payload.message);
      form_body.append('_subject', `Portfolio contact: ${payload.subject}`);
      form_body.append('_template', 'table');
      form_body.append('_captcha', 'false');
      form_body.append('_honey', '');

      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contact_form_email)}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: form_body,
        }
      );

      const raw_text = await response.text();
      let data: { success?: boolean | string; message?: string } = {};
      try {
        data = raw_text ? JSON.parse(raw_text) : {};
      } catch {
        data = {};
      }

      const response_message = String(data.message || raw_text || '');
      const needs_activation = /activat/i.test(response_message);
      const failed =
        !response.ok ||
        data.success === 'false' ||
        data.success === false ||
        needs_activation;

      if (failed) {
        if (needs_activation) {
          set_submit_status('error');
          set_submit_message(
            'First-time setup: check your inbox (and spam) for a FormSubmit activation link, then try again.'
          );
          return;
        }
        throw new Error(response_message || 'Failed to send message');
      }

      set_submit_status('success');
      set_submit_message('Message sent. I will get back to you soon.');
      set_form_data({ name: '', email: '', subject: '', message: '', honey: '' });
    } catch {
      open_mailto_fallback(payload);
      set_submit_status('error');
      set_submit_message(
        'Opening your email app as a backup. You can also email me at anubhavsanjay01@gmail.com.'
      );
    } finally {
      set_is_submitting(false);
    }
  };

  return (
    <section
      ref={section_ref}
      id="contact"
      className="contact-editorial relative scroll-mt-20 bg-[#050505] text-white"
    >
      <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
        {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
          <span
            key={left}
            className="editorial-guide editorial-guide--dark contact-editorial__guide"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <div className="contact-editorial__inner relative z-10">
        <motion.header
          className="contact-editorial__header"
          initial={{ opacity: 0, y: 36 }}
          animate={in_view ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: motion_duration.enter, ease: ease_out }}
        >
          <p className="contact-editorial__eyebrow">Get In Touch</p>
          <h2 className="contact-editorial__title">
            Let&apos;s create
            <br />
            something
            <br />
            together.
          </h2>
        </motion.header>

        <div className="contact-editorial__layout">
          <motion.form
            className="contact-editorial__form"
            onSubmit={handle_submit}
            initial={{ opacity: 0, y: 36 }}
            animate={in_view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: motion_duration.enter, delay: motion_stagger, ease: ease_out }}
          >
            <p className="contact-editorial__madlibs">
              Hi, I&apos;m{' '}
              <Blank_input
                name="name"
                value={form_data.name}
                placeholder="your name"
                on_change={handle_input_change}
              />
              , and I&apos;d like to talk about{' '}
              <Blank_input
                name="subject"
                value={form_data.subject}
                placeholder="a project"
                wide
                on_change={handle_input_change}
              />
              .
            </p>

            <label className="contact-editorial__field">
              <span className="contact-editorial__field-label">Email</span>
              <span className={`contact-editorial__underline ${form_data.email ? 'is-active' : ''}`}>
                <input
                  type="email"
                  name="email"
                  value={form_data.email}
                  onChange={handle_input_change}
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <span className="contact-editorial__underline-line" aria-hidden />
              </span>
            </label>

            <input
              type="text"
              name="honey"
              value={form_data.honey}
              onChange={handle_input_change}
              className="contact-editorial__honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <label className="contact-editorial__field">
              <span className="contact-editorial__field-label">Message</span>
              <span
                className={`contact-editorial__underline is-textarea ${message_focused || form_data.message ? 'is-active' : ''}`}
              >
                <textarea
                  name="message"
                  value={form_data.message}
                  onChange={handle_input_change}
                  onFocus={() => set_message_focused(true)}
                  onBlur={() => set_message_focused(false)}
                  placeholder="Tell me what you're building..."
                  rows={3}
                  required
                />
                <span className="contact-editorial__underline-line" aria-hidden />
              </span>
            </label>

            <button type="submit" className="contact-editorial__submit ui-pill-arrow" disabled={is_submitting}>
              {is_submitting ? (
                <>
                  <Loader2 className="contact-editorial__submit-spin" size={14} />
                  Sending
                </>
              ) : (
                <>
                  Send Message
                  <span className="contact-editorial__submit-arrow ui-pill-arrow__glyph" aria-hidden>
                    →
                  </span>
                </>
              )}
            </button>

            {submit_message && (
              <p
                className={`contact-editorial__status ${
                  submit_status === 'success' ? 'is-success' : 'is-error'
                }`}
              >
                {submit_message}
              </p>
            )}
          </motion.form>

          <motion.aside
            className="contact-editorial__aside"
            initial={{ opacity: 0, y: 28 }}
            animate={in_view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: motion_duration.enter, delay: motion_stagger * 2, ease: ease_out }}
          >
            <p className="contact-editorial__aside-title">Follow</p>
            <div className="contact-editorial__socials">
              {social_links.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-editorial__social"
                    style={{ ['--social-brand' as string]: social.brand }}
                    aria-label={social.label}
                  >
                    <Icon strokeWidth={1.5} size={18} />
                  </a>
                );
              })}
            </div>
          </motion.aside>
        </div>

        <p className="contact-editorial__visitors">
          Visitors:{' '}
          <img
            src="https://hits.sh/anubhav-dev-portfolio.vercel.app.svg?style=flat-square&label=&color=0B4C8C&labelColor=050505"
            alt="visitor count"
            className="contact-editorial__hits"
          />
        </p>
      </div>
    </section>
  );
};

export default memo(Contact);
