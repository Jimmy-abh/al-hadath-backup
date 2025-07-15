import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-dark-300 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/hadath-icon.png"
                  alt="Al-Hadath Events"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className="text-white font-playfair text-lg lg:text-xl font-bold">
                {t('companyName')}
              </span>
            </div>
            <p className="text-beige-100 text-sm sm:text-base font-inter leading-relaxed">
              {t('companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-teal-400 font-playfair text-lg lg:text-xl font-semibold">
              {t('quickLinks')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { path: '/', label: t('home') },
                { path: '/about', label: t('about') },
                { path: '/services', label: t('services') },
                { path: '/portfolio', label: t('portfolio') },
                { path: '/contact', label: t('contact') },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-beige-100 hover:text-teal-400 text-sm sm:text-base font-inter transition-colors"
                  onClick={() => {
                    // Ensure proper scroll to top with delay for route change
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-teal-400 font-playfair text-lg lg:text-xl font-semibold">
              {t('servicesFooter')}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { key: 'conferences', label: t('conferences') },
                { key: 'corporate', label: t('corporate') },
                { key: 'cultural', label: t('cultural') },
                { key: 'production', label: t('production') },
              ].map((service) => (
                <Link
                  key={service.key}
                  to={`/services#${service.key}`}
                  className="block text-beige-100 hover:text-teal-400 text-sm sm:text-base font-inter transition-colors"
                  onClick={() => {
                    // Navigate to services with specific section
                    setTimeout(() => {
                      // Trigger hash navigation event for Services page
                      window.dispatchEvent(new CustomEvent('hashNavigation', { 
                        detail: { hash: service.key } 
                      }));
                    }, 100);
                  }}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-teal-400 font-playfair text-lg lg:text-xl font-semibold">
              {t('contactInfo')}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 mt-1 flex-shrink-0" />
                <span className="text-beige-100 text-sm sm:text-base font-inter">
                  {language === 'en' ? 'Baghdad, Iraq' : 'بغداد، العراق'}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className={`w-4 h-4 sm:w-5 sm:h-5 text-teal-400 flex-shrink-0 ${language === 'ar' ? 'phone-icon' : ''}`} />
                <span className="text-beige-100 text-sm sm:text-base font-inter" dir="ltr">
                  +964 783 344 5511
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 flex-shrink-0" />
                <span className="text-beige-100 text-sm sm:text-base font-inter">
                  info@alhadathevents.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <h4 className="text-base font-playfair font-semibold text-white mb-4">
                {t('followUs')}
              </h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a
                  href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/alhadthevent?igsh=YTZ1bmVkMjQxaG4w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/share/19Dou3Zs2b/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors group"
                  aria-label={language === 'en' ? 'Follow us on Facebook' : 'تابعنا على فيسبوك'}
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/alhadth-event/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors group"
                  aria-label={language === 'en' ? 'Follow us on LinkedIn' : 'تابعنا على لينكد إن'}
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-teal-500/20 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-beige-100 text-sm sm:text-base font-inter text-center sm:text-left">
              {t('allRightsReserved')}
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link
                to="/privacy-policy"
                className="text-beige-100 hover:text-teal-400 text-sm font-inter transition-colors"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                to="/terms-of-service"
                className="text-beige-100 hover:text-teal-400 text-sm font-inter transition-colors"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;