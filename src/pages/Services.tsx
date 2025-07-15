import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mic, Building, Music, Video, Check, ArrowRight, Compass, Edit3, RotateCcw, Target, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  const services = [
    {
      id: 'conferences',
      title: language === 'en' ? 'Conferences & Exhibitions' : 'المؤتمرات والمعارض',
      icon: Mic,
      color: 'from-pink-500 to-red-500',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      description: language === 'en' 
        ? 'Professional conference management and exhibition planning with cutting-edge technology.'
        : 'إدارة المؤتمرات الاحترافية وتنظيم المعارض بأحدث التقنيات',
      features: [
        language === 'en' ? 'Complete conference planning and coordination' : 'تخطيط وتنسيق المؤتمرات الكامل',
        language === 'en' ? 'Venue selection and setup' : 'اختيار وإعداد المكان',
        language === 'en' ? 'Speaker management and coordination' : 'إدارة وتنسيق المتحدثين',
        language === 'en' ? 'Audio-visual equipment and technical support' : 'المعدات السمعية البصرية والدعم التقني',
        language === 'en' ? 'Registration and attendee management' : 'إدارة التسجيل والحضور',
        language === 'en' ? 'Catering and hospitality services' : 'خدمات الضيافة والطعام',
        language === 'en' ? 'Marketing and promotional support' : 'الدعم التسويقي والترويجي',
        language === 'en' ? 'Post-event analysis and reporting' : 'تحليل وتقارير ما بعد الفعالية',
      ],
    },
    {
      id: 'corporate',
      title: language === 'en' ? 'Corporate Events' : 'الفعاليات المؤسسية',
      icon: Building,
      color: 'from-blue-500 to-indigo-500',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      description: language === 'en' 
        ? 'Professional corporate events that elevate your brand and engage your audience.'
        : 'الفعاليات المؤسسية الاحترافية التي ترتقي بعلامتك التجارية وتشرك جمهورك',
      features: [
        language === 'en' ? 'Conference and seminar organization' : 'تنظيم المؤتمرات والندوات',
        language === 'en' ? 'Product launch events' : 'فعاليات إطلاق المنتجات',
        language === 'en' ? 'Corporate retreats and team building' : 'الخلوات المؤسسية وبناء الفرق',
        language === 'en' ? 'Award ceremonies and galas' : 'حفلات الجوائز والمأدبات',
        language === 'en' ? 'Trade shows and exhibitions' : 'المعارض التجارية والمعارض',
        language === 'en' ? 'Executive meetings and dinners' : 'الاجتماعات التنفيذية والعشاء',
        language === 'en' ? 'Company anniversaries' : 'الذكرى السنوية للشركة',
        language === 'en' ? 'Networking events' : 'فعاليات التواصل',
      ],
    },
    {
      id: 'cultural',
      title: language === 'en' ? 'Cultural Events' : 'الفعاليات الثقافية',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      image: '/images/pexels-vjapratama-935835 (1).jpg',
      description: language === 'en' 
        ? 'Spectacular cultural events and entertainment shows that captivate audiences.'
        : 'الفعاليات الثقافية الرائعة والعروض الترفيهية التي تأسر الجماهير',
      features: [
        language === 'en' ? 'Traditional Iraqi celebrations and festivals' : 'الاحتفالات والمهرجانات العراقية التقليدية',
        language === 'en' ? 'Art exhibitions and cultural showcases' : 'المعارض الفنية والعروض الثقافية',
        language === 'en' ? 'Music concerts and performances' : 'الحفلات الموسيقية والعروض',
        language === 'en' ? 'Literary events and book launches' : 'الفعاليات الأدبية وإطلاق الكتب',
        language === 'en' ? 'Religious and spiritual gatherings' : 'التجمعات الدينية والروحية',
        language === 'en' ? 'Heritage preservation events' : 'فعاليات الحفاظ على التراث',
        language === 'en' ? 'Community festivals and parades' : 'المهرجانات المجتمعية والمواكب',
        language === 'en' ? 'Educational and awareness campaigns' : 'الحملات التعليمية والتوعوية',
      ],
    },
    {
      id: 'production',
      title: language === 'en' ? 'Event Production' : 'إنتاج الفعاليات',
      icon: Video,
      color: 'from-green-500 to-teal-500',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      description: language === 'en' 
        ? 'Complete audiovisual production and technical support for unforgettable experiences.'
        : 'إنتاج صوتي بصري كامل ودعم تقني لتجارب لا تُنسى',
      features: [
        language === 'en' ? 'Professional sound systems and audio engineering' : 'أنظمة الصوت المهنية والهندسة الصوتية',
        language === 'en' ? 'Advanced lighting design and installation' : 'تصميم وتركيب الإضاءة المتقدمة',
        language === 'en' ? 'Stage design and construction' : 'تصميم وبناء المسارح',
        language === 'en' ? 'Live streaming and video production' : 'البث المباشر وإنتاج الفيديو',
        language === 'en' ? 'Photography and videography services' : 'خدمات التصوير الفوتوغرافي والفيديو',
        language === 'en' ? 'Special effects and entertainment' : 'المؤثرات الخاصة والترفيه',
        language === 'en' ? 'Technical crew and equipment management' : 'إدارة الطاقم التقني والمعدات',
        language === 'en' ? 'Post-production and editing services' : 'خدمات ما بعد الإنتاج والتحرير',
      ],
    },
  ];

  // Handle hash navigation and tab switching
  const handleHashNavigation = useCallback((hash: string) => {
    if (hash) {
      const serviceIndex = services.findIndex(service => service.id === hash);
      if (serviceIndex !== -1) {
        setActiveTab(serviceIndex);
        
        // Smooth scroll to the service tabs section after a brief delay
        setTimeout(() => {
          const tabsSection = document.getElementById('services-tabs');
          if (tabsSection) {
            tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }, [services]);

  // Handle URL hash on component mount and hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    handleHashNavigation(hash);
  }, [location.hash, handleHashNavigation]);

  // Listen for custom hash navigation events from footer links
  useEffect(() => {
    const handleCustomHashNavigation = (event: CustomEvent) => {
      handleHashNavigation(event.detail.hash);
    };

    window.addEventListener('hashNavigation', handleCustomHashNavigation as EventListener);
    
    return () => {
      window.removeEventListener('hashNavigation', handleCustomHashNavigation as EventListener);
    };
  }, [handleHashNavigation]);


  return (
    <div className="bg-dark-200 pt-20 lg:pt-24 scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/headway-F2KRf_QfCqw-unsplash.jpg"
            alt="Our services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-200/80" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 sm:mb-6">
              {t('services')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
              {language === 'en' 
                ? 'Comprehensive event planning and production services tailored to your unique needs'
                : 'خدمات تخطيط وإنتاج الفعاليات الشاملة المصممة لاحتياجاتك الفريدة'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
      <ServicesTabsSection services={services} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Service Details */}
      <ServiceDetailsSection services={services} activeTab={activeTab} />

      {/* Process Section */}
      <ProcessSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

const ServicesTabsSection: React.FC<{
  services: any[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
}> = ({ services, activeTab, setActiveTab }) => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services-tabs" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'What We Do Best' : 'ما نقدمه بأفضل شكل'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'Choose from our specialized services designed to make your event extraordinary'
              : 'اختر من خدماتنا المتخصصة المصممة لجعل فعاليتك استثنائية'
            }
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              id={service.id}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                activeTab === index
                  ? 'bg-teal-500 text-white shadow-lg ring-2 ring-teal-400/50'
                  : 'bg-dark-50 text-white hover:bg-dark-300 border border-teal-500/20'
              }`}
              aria-label={`${language === 'en' ? 'Select' : 'اختر'} ${service.title}`}
            >
              <service.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-inter font-medium">{service.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceDetailsSection: React.FC<{
  services: any[];
  activeTab: number;
}> = ({ services, activeTab }) => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const activeService = services[activeTab];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
              <div>
                <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${activeService.color} rounded-xl flex items-center justify-center`}>
                    <activeService.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white">
                    {activeService.title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-beige-100 mb-6 sm:mb-8 font-inter leading-relaxed">
                  {activeService.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {activeService.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 mt-1 flex-shrink-0" />
                      <span className="text-beige-200 font-inter text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-200/50 to-transparent rounded-xl" />
              </div>
            </div>

            {/* Service Highlights */}
            <div>
              <h4 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-6 sm:mb-8 text-center">
                {language === 'en' ? 'Why Choose Our Services' : 'لماذا تختار خدماتنا'}
              </h4>
              
              {/* Service Benefits */}
              <div className="bg-dark-50 border border-teal-500/20 rounded-xl p-6 sm:p-8 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-lg font-playfair font-semibold text-white mb-2">
                      {language === 'en' ? 'Expert Team' : 'فريق خبير'}
                    </h5>
                    <p className="text-beige-200 font-inter text-sm">
                      {language === 'en' 
                        ? 'Experienced professionals dedicated to your success'
                        : 'محترفون ذوو خبرة مكرسون لنجاحك'
                      }
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-lg font-playfair font-semibold text-white mb-2">
                      {language === 'en' ? 'Custom Solutions' : 'حلول مخصصة'}
                    </h5>
                    <p className="text-beige-200 font-inter text-sm">
                      {language === 'en' 
                        ? 'Tailored services to meet your unique requirements'
                        : 'خدمات مصممة خصيصاً لتلبية متطلباتك الفريدة'
                      }
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-lg font-playfair font-semibold text-white mb-2">
                      {language === 'en' ? '24/7 Support' : 'دعم على مدار الساعة'}
                    </h5>
                    <p className="text-beige-200 font-inter text-sm">
                      {language === 'en' 
                        ? 'Round-the-clock assistance for your peace of mind'
                        : 'مساعدة على مدار الساعة لراحة بالك'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProcessSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      icon: Compass,
      title: language === 'en' ? 'Consultation' : 'الاستشارة',
      description: language === 'en' 
        ? 'We start with a detailed consultation to understand your vision and requirements.'
        : 'نبدأ بالاستشارة التفصيلية لفهم رؤيتك ومتطلباتك',
    },
    {
      icon: Edit3,
      title: language === 'en' ? 'Planning' : 'التخطيط',
      description: language === 'en' 
        ? 'Our team creates a comprehensive plan tailored to your specific needs and budget.'
        : 'يضع فريقنا خطة شاملة مصممة خصيصاً لاحتياجاتك وميزانيتك',
    },
    {
      icon: RotateCcw,
      title: language === 'en' ? 'Coordination' : 'التنسيق',
      description: language === 'en' 
        ? 'We coordinate all aspects of your event, from vendors to logistics.'
        : 'ننسق جميع جوانب فعاليتك، من الموردين إلى اللوجستيات',
    },
    {
      icon: Target,
      title: language === 'en' ? 'Execution' : 'التنفيذ',
      description: language === 'en' 
        ? 'On the day of your event, we ensure everything runs smoothly and perfectly.'
        : 'في يوم فعاليتك، نضمن أن كل شيء يسير بسلاسة وكمال',
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'Our Process' : 'عمليتنا'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'A proven methodology that ensures your event exceeds expectations'
              : 'منهجية مجربة تضمن أن تتجاوز فعاليتك التوقعات'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              {/* Animated Badge Container */}
              <motion.div 
                className="relative mx-auto mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Main Badge */}
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full px-6 py-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:from-teal-400 group-hover:to-teal-500">
                  <step.icon className="w-5 h-5 text-white" />
                  <span className="text-white font-inter font-semibold text-sm whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
                
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </motion.div>
              
              <p className="text-beige-200 font-inter leading-relaxed text-sm sm:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-teal-900 to-teal-700">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'Ready to Get Started?' : 'مستعد للبدء؟'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 mb-8 sm:mb-10 max-w-3xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'Contact us today to discuss your event and receive a personalized proposal'
              : 'تواصل معنا اليوم لمناقشة فعاليتك والحصول على اقتراح شخصي'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 hover:bg-beige-100 font-semibold text-base sm:text-lg rounded-lg transition-colors inline-flex items-center justify-center group shadow-lg hover:shadow-xl"
              onClick={() => {
                setTimeout(() => {
                  const contactForm = document.getElementById('contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              {language === 'en' ? 'Get Quote' : 'احصل على عرض سعر'}
              <ArrowRight className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold text-base sm:text-lg rounded-lg transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label={language === 'en' ? 'Contact us via WhatsApp' : 'تواصل معنا عبر واتساب'}
            >
              {language === 'en' ? 'Contact via WhatsApp' : 'تواصل عبر واتساب'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;