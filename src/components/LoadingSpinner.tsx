import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-200 flex items-center justify-center z-50 backdrop-blur-sm transition-colors duration-300">
      <div className="text-center">
        {/* Enhanced Loading Animation */}
        <motion.div 
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-teal-500/20 border-t-teal-500 rounded-full mx-auto"
          />
          
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-2 border-teal-400/30 border-b-teal-400 rounded-full"
          />
          
          {/* Center Logo */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src="/hadath-icon.png"
              alt="Al-Hadath Events"
              className="w-6 h-6 object-contain"
            />
          </motion.div>
        </motion.div>
        
        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-teal-500 dark:text-teal-400 font-playfair text-xl font-semibold mb-2 transition-colors duration-300">
            {language === 'en' ? 'Al-Hadath Events' : 'الحدث للفعاليات'}
          </h3>
          <p className="text-gray-600 dark:text-beige-200 font-inter text-sm transition-colors duration-300">
            {language === 'en' ? 'Loading your experience...' : 'جاري تحميل تجربتك...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;