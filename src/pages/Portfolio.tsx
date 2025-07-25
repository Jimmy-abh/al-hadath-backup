import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Filter, Calendar, MapPin, MessageCircle, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      titleEn: 'Baghdad International Business Conference',
      titleAr: 'مؤتمر بغداد الدولي للأعمال',
      category: 'conferences',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2024',
      images: [
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'A prestigious international business conference bringing together industry leaders and entrepreneurs from across the Middle East to discuss economic opportunities and partnerships.',
      descriptionAr: 'مؤتمر أعمال دولي مرموق يجمع قادة الصناعة ورجال الأعمال من جميع أنحاء الشرق الأوسط لمناقشة الفرص الاقتصادية والشراكات.',
    },
    {
      id: 2,
      titleEn: 'Iraq Private Banks Annual Meeting',
      titleAr: 'الاجتماع السنوي لرابطة المصارف الخاصة العراقية',
      category: 'corporate',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2024',
      images: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Annual gathering of Iraq\'s leading private banks to discuss financial sector developments, regulatory changes, and strategic initiatives for economic growth.',
      descriptionAr: 'التجمع السنوي للمصارف الخاصة الرائدة في العراق لمناقشة تطورات القطاع المصرفي والتغييرات التنظيمية والمبادرات الاستراتيجية للنمو الاقتصادي.',
    },
    {
      id: 3,
      titleEn: 'University of Mashreq Academic Forum',
      titleAr: 'منتدى جامعة المشرق الأكاديمي',
      category: 'conferences',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2023',
      images: [
        'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Academic forum featuring distinguished scholars and researchers presenting cutting-edge research and fostering intellectual discourse in higher education.',
      descriptionAr: 'منتدى أكاديمي يضم علماء وباحثين متميزين يقدمون أحدث الأبحاث ويعززون الحوار الفكري في التعليم العالي.',
    },
    {
      id: 4,
      titleEn: 'Wasit Cultural Heritage Festival',
      titleAr: 'مهرجان التراث الثقافي في واسط',
      category: 'cultural',
      location: language === 'en' ? 'Wasit' : 'واسط',
      year: '2023',
      images: [
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'A vibrant celebration of Iraqi cultural heritage featuring traditional music, dance, crafts, and culinary experiences that showcase the rich history of Wasit province.',
      descriptionAr: 'احتفال نابض بالحياة بالتراث الثقافي العراقي يضم الموسيقى التقليدية والرقص والحرف اليدوية والتجارب الطهوية التي تعرض التاريخ الغني لمحافظة واسط.',
    },
    {
      id: 5,
      titleEn: 'Iraqi Dental Association Conference',
      titleAr: 'مؤتمر نقابة أطباء الأسنان العراقية',
      category: 'conferences',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2024',
      images: [
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Professional conference for dental practitioners featuring the latest advances in dental technology, treatment methods, and continuing education opportunities.',
      descriptionAr: 'مؤتمر مهني لممارسي طب الأسنان يعرض أحدث التطورات في تقنيات طب الأسنان وطرق العلاج وفرص التعليم المستمر.',
    },
    {
      id: 6,
      titleEn: 'Al-Abrar Cultural Foundation Event',
      titleAr: 'فعالية مؤسسة الأبرار الثقافية',
      category: 'cultural',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2023',
      images: [
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Cultural event organized by Al-Abrar Foundation promoting arts, literature, and cultural exchange within the Iraqi community.',
      descriptionAr: 'فعالية ثقافية نظمتها مؤسسة الأبرار لتعزيز الفنون والأدب والتبادل الثقافي داخل المجتمع العراقي.',
    },
    {
      id: 7,
      titleEn: 'Iraqi Hunting Club Annual Gathering',
      titleAr: 'التجمع السنوي لنادي الصيد العراقي',
      category: 'corporate',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2024',
      images: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Annual gathering of the Iraqi Hunting Club members featuring outdoor activities, conservation discussions, and community networking.',
      descriptionAr: 'التجمع السنوي لأعضاء نادي الصيد العراقي يضم أنشطة خارجية ومناقشات حول الحفاظ على البيئة والتواصل المجتمعي.',
    },
    {
      id: 8,
      titleEn: 'Medical Equipment Exhibition',
      titleAr: 'معرض المعدات الطبية',
      category: 'production',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2023',
      images: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Comprehensive exhibition showcasing the latest medical equipment and healthcare technologies for Iraqi healthcare professionals.',
      descriptionAr: 'معرض شامل يعرض أحدث المعدات الطبية وتقنيات الرعاية الصحية للمهنيين الصحيين العراقيين.',
    },
    {
      id: 9,
      titleEn: 'Technology Innovation Summit',
      titleAr: 'قمة الابتكار التقني',
      category: 'production',
      location: language === 'en' ? 'Baghdad' : 'بغداد',
      year: '2024',
      images: [
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ],
      descriptionEn: 'Summit bringing together tech innovators, entrepreneurs, and investors to explore emerging technologies and digital transformation opportunities in Iraq.',
      descriptionAr: 'قمة تجمع مبتكري التكنولوجيا ورجال الأعمال والمستثمرين لاستكشاف التقنيات الناشئة وفرص التحول الرقمي في العراق.',
    },
  ];

  const categories = [
    { id: 'all', labelEn: 'All', labelAr: 'الكل' },
    { id: 'conferences', labelEn: 'Conferences', labelAr: 'المؤتمرات' },
    { id: 'corporate', labelEn: 'Corporate', labelAr: 'المؤسسية' },
    { id: 'cultural', labelEn: 'Cultural', labelAr: 'الثقافية' },
    { id: 'production', labelEn: 'Production', labelAr: 'الإنتاج' },
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="bg-dark-200 pt-20 lg:pt-24 scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/headway-F2KRf_QfCqw-unsplash.jpg"
            alt="Our portfolio"
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
              {language === 'en' ? 'Portfolio' : 'أعمالنا'}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
              {language === 'en' 
                ? 'Discover our collection of exceptional events and memorable experiences'
                : 'اكتشف مجموعتنا من الفعاليات الاستثنائية والتجارب التي لا تُنسى'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <FilterSection 
        categories={categories} 
        filter={filter} 
        setFilter={setFilter} 
      />

      {/* Portfolio Grid */}
      <PortfolioGrid 
        items={filteredItems} 
        setSelectedProject={setSelectedProject} 
      />

      {/* Project Modal */}
      <ProjectModal 
        selectedProject={selectedProject} 
        setSelectedProject={setSelectedProject} 
      />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

const FilterSection: React.FC<{
  categories: any[];
  filter: string;
  setFilter: (filter: string) => void;
}> = ({ categories, filter, setFilter }) => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-beige-100 mb-4 lg:mb-0">
            <Filter className="w-5 h-5" />
            <span className="font-inter text-sm sm:text-base">
              {language === 'en' ? 'Filter by:' : 'تصفية حسب:'}
            </span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-inter font-medium transition-all duration-300 text-sm sm:text-base ${
                filter === category.id
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-dark-50 text-white hover:bg-dark-300 border border-teal-500/20'
              }`}
              aria-label={`${language === 'en' ? 'Filter by' : 'تصفية حسب'} ${language === 'en' ? category.labelEn : category.labelAr}`}
            >
              {language === 'en' ? category.labelEn : category.labelAr}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioGrid: React.FC<{
  items: any[];
  setSelectedProject: (project: any) => void;
}> = ({ items, setSelectedProject }) => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'Our Work' : 'أعمالنا'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'Each project tells a unique story of creativity, precision, and unforgettable moments'
              : 'كل مشروع يحكي قصة فريدة من الإبداع والدقة واللحظات التي لا تُنسى'
            }
          </p>
        </motion.div>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(item)}
              >
                <div className="relative overflow-hidden rounded-xl bg-dark-50 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={language === 'en' ? item.titleEn : item.titleAr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/50 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-playfair font-semibold text-white mb-2">
                      {language === 'en' ? item.titleEn : item.titleAr}
                    </h3>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs sm:text-sm text-beige-200 font-inter">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
                      <svg className="w-6 h-6 text-dark-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProjectModal: React.FC<{
  selectedProject: any;
  setSelectedProject: (project: any) => void;
}> = ({ selectedProject, setSelectedProject }) => {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Defensive check for images array
  const images = selectedProject?.images || [];
  
  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Auto-advance images every 4 seconds
  useEffect(() => {
    if (!selectedProject || images.length <= 1) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [selectedProject, images.length]);

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl w-full bg-dark-100 rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Gallery */}
          <div 
            className="relative h-80 sm:h-96"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={language === 'en' ? (selectedProject.titleEn || '') : (selectedProject.titleAr || '')}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-dark-50 flex items-center justify-center">
                <p className="text-beige-200 font-inter">
                  {language === 'en' ? 'No images available' : 'لا توجد صور متاحة'}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-200/80 to-transparent" />
            
            {/* Navigation Arrows - Desktop */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-teal-400' : 'bg-white/50'
                    }`}
                    aria-label={`${language === 'en' ? 'View image' : 'عرض الصورة'} ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
                {language === 'en' ? (selectedProject.titleEn || '') : (selectedProject.titleAr || '')}
              </h2>
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-beige-200 font-inter">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProject.location || ''}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedProject.year || ''}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-beige-100 font-inter leading-relaxed text-base sm:text-lg">
                {language === 'en' ? (selectedProject.descriptionEn || '') : (selectedProject.descriptionAr || '')}
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="mb-8">
              <div className="bg-dark-50 border border-teal-500/20 rounded-lg p-8 text-center">
                <Play className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <p className="text-beige-200 font-inter">
                  {language === 'en' 
                    ? 'Video content will be available soon'
                    : 'المحتوى المرئي سيكون متاحاً قريباً'
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
                aria-label={language === 'en' ? 'Discuss similar project via WhatsApp' : 'ناقش مشروع مماثل عبر واتساب'}
              >
                <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === 'en' ? 'Discuss Similar Project' : 'ناقش مشروع مماثل'}
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-dark-200 font-semibold rounded-lg transition-colors"
                aria-label={language === 'en' ? 'Close modal' : 'إغلاق النافذة'}
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CTASection: React.FC = () => {
  const { language } = useLanguage();
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
            {language === 'en' ? 'Let\'s Create Your Story' : 'دعنا نصنع قصتك'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 mb-8 sm:mb-10 max-w-3xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'Ready to add your event to our portfolio? Contact us to start planning your unforgettable experience.'
              : 'مستعد لإضافة فعاليتك إلى أعمالنا؟ تواصل معنا لبدء تخطيط تجربتك التي لا تُنسى'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 hover:bg-beige-100 font-semibold text-base sm:text-lg rounded-lg transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label={language === 'en' ? 'Contact us via WhatsApp' : 'تواصل معنا عبر واتساب'}
            >
              <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'en' ? 'Contact via WhatsApp' : 'تواصل عبر واتساب'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;