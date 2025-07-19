import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/about', label: t('about') },
    { path: '/services', label: t('services') },
    { path: '/portfolio', label: t('portfolio') },
    { path: '/contact', label: t('contact') },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-dark-200/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - 30% larger */}
          <Link to="/" className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center">
              <img
                src="/hadath-icon.png"
                alt="Al-Hadath Events"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-gray-900 dark:text-white font-playfair text-xl sm:text-2xl lg:text-3xl font-bold hidden sm:block transition-colors duration-300">
              {language === 'en' ? 'Al-Hadath Events' : 'الحدث للفعاليات'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 rtl:space-x-reverse">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                    // Ensure scroll to top for mobile navigation
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`text-base font-inter font-medium transition-all duration-300 relative hover:text-teal-400 px-2 whitespace-nowrap focus-visible ${
                    location.pathname === item.path
                      ? 'text-teal-400'
                      : 'text-gray-900 dark:text-white'
                  } focus-visible`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3 lg:space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 text-gray-900 dark:text-white hover:text-teal-400 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 focus-visible"
              aria-label={isDarkMode ? (language === 'en' ? 'Switch to light mode' : 'التبديل إلى الوضع الفاتح') : (language === 'en' ? 'Switch to dark mode' : 'التبديل إلى الوضع الداكن')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-900 dark:text-white hover:text-teal-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 focus-visible"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-inter font-medium rtl:mr-2 rtl:ml-0">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-900 dark:text-white hover:text-teal-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 focus-visible"
              aria-label={isOpen ? (language === 'en' ? 'Close menu' : 'إغلاق القائمة') : (language === 'en' ? 'Open menu' : 'فتح القائمة')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 dark:bg-dark-200/95 backdrop-blur-md border-t border-gray-200 dark:border-teal-500/20 shadow-lg transition-colors duration-300"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                    className={`block text-base font-inter font-medium transition-all duration-300 py-3 px-4 rounded-lg whitespace-nowrap focus-visible ${
                      location.pathname === item.path
                        ? 'text-teal-400 bg-teal-500/10 border-l-2 border-teal-400'
                        : 'text-gray-900 dark:text-white hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;