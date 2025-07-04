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
      message: '👋 Hey LinkedIn friend! Thanks for visiting my site! 🎉',
      subMessage: 'I appreciate you taking the time to check out my portfolio!',
      gradient: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-500/20'
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      colors: ['#25D366', '#128C7E', '#075E54', '#34B7F1', '#25D366'],
      message: '👋 Hey WhatsApp friend! Thanks for visiting my site! 💬',
      subMessage: 'Great to see you here! Feel free to reach out!',
      gradient: 'from-green-500 to-green-600',
      borderColor: 'border-green-500/20'
    },
    instagram: {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
      colors: ['#E4405F', '#F77737', '#FCAF45', '#833AB4', '#5851DB'],
      message: '👋 Hey Instagram friend! Thanks for visiting my site! 📸✨',
      subMessage: 'Thanks for checking out my work! Hope you like it!',
      gradient: 'from-pink-500 via-purple-500 to-orange-500',
      borderColor: 'border-pink-500/20'
    }
  };

  useEffect(() => {
    // Debug logging for development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Check if user has already seen the message in this session
    const hasSeenMessage = sessionStorage.getItem('socialMediaVisitorShown');
    if (hasSeenMessage) {
      if (isDevelopment) console.log('Social Media Visitor: Message already shown in this session');
      setHasShown(true);
      return;
    }

    // Check for social media referral
    const detectSocialPlatform = (): string | null => {
      let detectedPlatform: string | null = null;
      
      // Check document.referrer
      const referrer = document.referrer.toLowerCase();
      if (isDevelopment) console.log('Social Media Visitor: Referrer:', referrer);
      
      if (referrer) {
        if (referrer.includes('linkedin.com') || referrer.includes('linked.in')) {
          detectedPlatform = 'linkedin';
        } else if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) {
          detectedPlatform = 'whatsapp';
        } else if (referrer.includes('instagram.com') || referrer.includes('ig.me')) {
          detectedPlatform = 'instagram';
        }
      }

      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get('ref');
      const utmSource = urlParams.get('utm_source');
      const source = urlParams.get('source');
      
      if (isDevelopment) {
        console.log('Social Media Visitor: URL Params:', {
          ref: refParam,
          utm_source: utmSource,
          source: source
        });
      }
      
      if (refParam) {
        const ref = refParam.toLowerCase();
        // Support both full names and short codes
        if (ref === 'linkedin' || ref === 'ln') {
          detectedPlatform = 'linkedin';
        } else if (ref === 'whatsapp' || ref === 'wp') {
          detectedPlatform = 'whatsapp';
        } else if (ref === 'instagram' || ref === 'insta') {
          detectedPlatform = 'instagram';
        }
      }

      if (utmSource) {
        const source = utmSource.toLowerCase();
        if (source === 'linkedin' || source === 'whatsapp' || source === 'instagram') {
          detectedPlatform = source;
        }
      }

      // Additional source parameter check
      if (source) {
        const sourceLower = source.toLowerCase();
        if (sourceLower === 'linkedin' || sourceLower === 'ln') {
          detectedPlatform = 'linkedin';
        } else if (sourceLower === 'whatsapp' || sourceLower === 'wp') {
          detectedPlatform = 'whatsapp';
        } else if (sourceLower === 'instagram' || sourceLower === 'insta') {
          detectedPlatform = 'instagram';
        }
      }

      // Check for hash parameters (for SPA routing)
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const hashRef = hashParams.get('ref');
        if (hashRef) {
          const ref = hashRef.toLowerCase();
          if (ref === 'linkedin' || ref === 'ln') {
            detectedPlatform = 'linkedin';
          } else if (ref === 'whatsapp' || ref === 'wp') {
            detectedPlatform = 'whatsapp';
          } else if (ref === 'instagram' || ref === 'insta') {
            detectedPlatform = 'instagram';
          }
        }
      }

      if (isDevelopment) {
        console.log('Social Media Visitor: Detected Platform:', detectedPlatform);
      }

      return detectedPlatform;
    };

    const detectedPlatform = detectSocialPlatform();
    
    if (detectedPlatform && platforms[detectedPlatform]) {
      if (isDevelopment) {
        console.log('Social Media Visitor: Showing message for', detectedPlatform);
      }
      
      setDetectedPlatform(platforms[detectedPlatform]);
      setShowMessage(true);
      setHasShown(true);
      
      // Mark as shown in session storage
      sessionStorage.setItem('socialMediaVisitorShown', 'true');

      // Trigger confetti animation
      const triggerConfetti = () => {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: platforms[detectedPlatform].colors,
            zIndex: 9999,
          });
        } catch (error) {
          if (isDevelopment) {
            console.error('Social Media Visitor: Confetti error:', error);
          }
        }
      };

      // Delay confetti slightly for better effect
      setTimeout(triggerConfetti, 300);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      if (isDevelopment) {
        console.log('Social Media Visitor: No social media platform detected');
      }
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