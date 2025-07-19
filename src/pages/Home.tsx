import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from '../components/OptimizedImage';
import { getOptimizedImageUrl } from '../utils/imageOptimization';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    '/images/headway-F2KRf_QfCqw-unsplash.jpg',
    'https://images.pexels.com/photos/19458717/pexels-photo-19458717.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    '/images/lavi-perchik-FCPV_n0lOxc-unsplash.jpg',
  ];

  // Preload hero images for better performance
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="bg-dark-200 scroll-smooth">
      {/* Hero Section - Enhanced spacing and centering */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-teal-500/60 transition-all duration-300 border border-white/20 hover:border-teal-400/50"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-teal-500/60 transition-all duration-300 border border-white/20 hover:border-teal-400/50"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-teal-400' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content - Perfect vertical centering with proper spacing from navbar */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 pt-32 sm:pt-36 lg:pt-40 pb-32 sm:pb-36 lg:pb-40 hero-content">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white leading-tight mb-4 sm:mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-beige-100 font-inter max-w-4xl mx-auto mb-3 sm:mb-4">
                {t('heroSubtitle')}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-beige-200 max-w-3xl mx-auto font-inter leading-snug mb-6 sm:mb-8 lg:mb-10">
                {t('heroDescription')}
              </p>
              
              {/* Enhanced CTA Button Group with Perfect Alignment */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-6 max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/portfolio"
                    className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 inline-flex items-center justify-center group shadow-lg hover:shadow-xl focus-visible min-w-[200px] h-[52px]"
                  >
                    {t('viewPortfolio')}
                    <ArrowRight className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <a
                    href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-dark-200 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl focus-visible min-w-[200px] h-[52px]"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('whatsappContact')}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <ServicesSection />

      {/* About Preview */}
      <AboutSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: '🏢',
      title: t('conferences'),
      description: t('conferencesDesc'),
      image: '/images/pexels-a-darmel-8134077.jpg',
    },
    {
      icon: '💼',
      title: t('corporate'),
      description: t('corporateDesc'),
      image: '/images/pexels-negativespace-34092.jpg',
    },
    {
      icon: '🎭',
      title: t('cultural'),
      description: t('culturalDesc'),
      image: '/images/pexels-vjapratama-935835 (1).jpg',
    },
    {
      icon: '🎬',
      title: t('production'),
      description: t('productionDesc'),
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {t('servicesTitle')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {t('servicesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group card-hover"
            >
              <div className="relative overflow-hidden rounded-xl bg-dark-50 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-playfair font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-beige-200 text-sm sm:text-base font-inter leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/services"
              className="btn-primary inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-dark-200 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl focus-visible"
            >
              {t('learnMore')}
              <ArrowRight className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6">
              {t('aboutTitle')}
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-semibold text-teal-400 mb-4 sm:mb-6">
              {t('missionTitle')}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-beige-100 mb-6 sm:mb-8 font-inter leading-relaxed">
              {t('missionText')}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-beige-200 font-inter leading-relaxed mb-8 sm:mb-10">
              {t('aboutExtended')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="btn-primary inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl focus-visible"
              >
                {t('learnMore')}
                <ArrowRight className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="/images/Team-image-alhadath.png"
              alt="Al-Hadath Events Team"
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      name: t('testimonial1Name'),
      role: t('testimonial1Title'),
      content: t('testimonial1'),
      rating: 5,
    },
    {
      name: t('testimonial2Name'),
      role: t('testimonial2Title'),
      content: t('testimonial2'),
      rating: 5,
    },
    {
      name: t('testimonial3Name'),
      role: t('testimonial3Title'),
      content: t('testimonial3'),
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-dark-50 border border-teal-500/20 rounded-xl p-6 sm:p-8 hover:border-teal-500/40 transition-all duration-300 shadow-lg hover:shadow-xl card-hover"
            >
              <div className="flex space-x-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-teal-400 fill-current" />
                ))}
              </div>
              <p className="text-beige-100 font-inter leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="text-white font-playfair font-semibold text-base sm:text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-teal-400 text-sm font-inter">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-teal-900 to-teal-700">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 mb-8 sm:mb-10 max-w-3xl mx-auto font-inter leading-relaxed">
            {t('finalCtaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="btn-primary px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 hover:bg-beige-100 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus-visible"
                onClick={() => {
                  setTimeout(() => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                {t('getQuote')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl focus-visible"
              >
                <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('whatsappContact')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PartnersSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Partner logos - exactly 10 logos for diagnostic testing
  const partners = [
    { name: 'Logo 1', logo: '/images/logo1.png' },
    { name: 'Logo 2', logo: '/images/logo2.png' },
    { name: 'Logo 3', logo: '/images/logo3.png' },
    { name: 'Logo 4', logo: '/images/logo4.png' },
    { name: 'Logo 5', logo: '/images/logo5.png' },
    { name: 'Logo 6', logo: '/images/logo6.png' },
    { name: 'Logo 7', logo: '/images/logo7.png' },
    { name: 'Logo 8', logo: '/images/logo8.png' },
    { name: 'Logo 9', logo: '/images/logo9.png' },
    { name: 'Logo 10', logo: '/images/logo10.png' },
  ];
  
  // Debug: Log partners array to console
  console.log('PartnersSection - Partners array:', partners);
  console.log('PartnersSection - Partners length:', partners.length);
  console.log('PartnersSection - inView:', inView);

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];
  console.log('PartnersSection - Duplicated partners length:', duplicatedPartners.length);
  
  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-2">
            {language === 'en' ? 'Trusted Partners' : 'شركاؤنا الموثوقون'}
          </h3>
          <p className="text-beige-200 font-inter text-sm sm:text-base">
            {language === 'en' 
              ? 'Working with leading organizations across Iraq'
              : 'نعمل مع المؤسسات الرائدة في جميع أنحاء العراق'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          {/* Debug: Teal Background Strip for Logo Carousel with explicit dimensions */}
          <div 
            className="bg-teal-700 rounded-xl overflow-hidden py-6 sm:py-8 w-full"
            style={{ minHeight: '120px' }}
          >
            {/* Debug: Carousel track with explicit width and flex layout */}
            <div 
              className="flex animate-scroll items-center h-20 sm:h-24 lg:h-28"
              style={{ 
                width: `${duplicatedPartners.length * 200}px`,
                minWidth: '100%'
              }}
            >
              {/* Debug: Log each partner being rendered */}
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center mx-4 sm:mx-6 lg:mx-8 hover:scale-105 transition-all duration-300 ease-in-out"
                  style={{ 
                    width: '160px',
                    height: '80px',
                    border: '1px solid yellow' // Additional container debug
                  }}
                  onLoad={() => console.log(`Container ${index} rendered for ${partner.name}`)}
                >
                  {/* Debug: Enhanced img with multiple diagnostic styles */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{ 
                      border: '2px solid red',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      minWidth: '60px',
                      minHeight: '40px'
                    }}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Debug: Show partners count */}
          <div className="text-center mt-4 text-white text-sm">
            Debug: {partners.length} partners, {duplicatedPartners.length} total items
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;