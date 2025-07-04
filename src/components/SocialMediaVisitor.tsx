import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Linkedin, MessageCircle, Instagram, X } from 'lucide-react';

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  colors: string[];
  message: string;
  subMessage: string;
  gradient: string;
  borderColor: string;
}

const SocialMediaVisitor: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<SocialPlatform | null>(null);

  const platforms: Record<string, SocialPlatform> = {
    linkedin: {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6 text-white" />,
      colors: ['#0077B5', '#00A0DC', '#0073B1', '#006097', '#004B7C'],
      message: 'Thank you for visiting from LinkedIn! 🎉',
      subMessage: 'I appreciate you taking the time to check out my portfolio!',
      gradient: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-500/20'
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      colors: ['#25D366', '#128C7E', '#075E54', '#34B7F1', '#25D366'],
      message: 'Thanks for visiting from WhatsApp! 💬',
      subMessage: 'Great to see you here! Feel free to reach out!',
      gradient: 'from-green-500 to-green-600',
      borderColor: 'border-green-500/20'
    },
    instagram: {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
      colors: ['#E4405F', '#F77737', '#FCAF45', '#833AB4', '#5851DB'],
      message: 'Welcome from Instagram! 📸✨',
      subMessage: 'Thanks for checking out my work! Hope you like it!',
      gradient: 'from-pink-500 via-purple-500 to-orange-500',
      borderColor: 'border-pink-500/20'
    }
  };

  useEffect(() => {
    // Check if user has already seen the message in this session
    const hasSeenMessage = sessionStorage.getItem('socialMediaVisitorShown');
    if (hasSeenMessage) {
      setHasShown(true);
      return;
    }

    // Check for social media referral
    const detectSocialPlatform = (): string | null => {
      // Check document.referrer
      const referrer = document.referrer;
      if (referrer) {
        if (referrer.includes('linkedin.com') || referrer.includes('linked.in')) {
          return 'linkedin';
        }
        if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) {
          return 'whatsapp';
        }
        if (referrer.includes('instagram.com') || referrer.includes('ig.me')) {
          return 'instagram';
        }
      }

      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get('ref');
      const utmSource = urlParams.get('utm_source');
      
      if (refParam) {
        const ref = refParam.toLowerCase();
        if (ref === 'linkedin' || ref === 'whatsapp' || ref === 'instagram') {
          return ref;
        }
      }

      if (utmSource) {
        const source = utmSource.toLowerCase();
        if (source === 'linkedin' || source === 'whatsapp' || source === 'instagram') {
          return source;
        }
      }

      return null;
    };

    const detectedPlatform = detectSocialPlatform();
    
    if (detectedPlatform && platforms[detectedPlatform]) {
      setDetectedPlatform(platforms[detectedPlatform]);
      setShowMessage(true);
      setHasShown(true);
      
      // Mark as shown in session storage
      sessionStorage.setItem('socialMediaVisitorShown', 'true');

      // Trigger confetti animation
      const triggerConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: platforms[detectedPlatform].colors,
          zIndex: 9999,
        });
      };

      // Delay confetti slightly for better effect
      setTimeout(triggerConfetti, 300);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowMessage(false);
  };

  if (hasShown && !showMessage) {
    return null;
  }

  return (
    <AnimatePresence>
      {showMessage && detectedPlatform && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
          }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className={`bg-gradient-to-r ${detectedPlatform.gradient} text-white px-6 py-4 rounded-lg shadow-2xl border ${detectedPlatform.borderColor} backdrop-blur-sm max-w-md mx-auto`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  className="flex-shrink-0"
                >
                  {detectedPlatform.icon}
                </motion.div>
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-semibold text-sm sm:text-base"
                  >
                    {detectedPlatform.message}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/80 text-xs sm:text-sm mt-1"
                  >
                    {detectedPlatform.subMessage}
                  </motion.p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close message"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-white/30 rounded-full mt-3 overflow-hidden"
            >
              <div className="h-full bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialMediaVisitor; 