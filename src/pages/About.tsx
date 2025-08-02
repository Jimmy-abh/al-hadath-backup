import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Award, Lightbulb, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-dark-200 pt-20 lg:pt-24 scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/headway-F2KRf_QfCqw-unsplash.jpg"
            alt="About us"
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
              {t('aboutTitle')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
              {language === 'en' 
                ? 'Crafting extraordinary moments since 2015, we are Iraq\'s premier event planning and production company'
                : 'نصنع لحظات استثنائية منذ 2015، نحن شركة العراق الرائدة في تنظيم وإنتاج الفعاليات'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <MissionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Behind the Scenes Gallery */}
      <GallerySection />

      {/* Stats Section */}
      <StatsSection />
    </div>
  );
};

const MissionSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
              {language === 'en' ? 'Our Mission' : 'مهمتنا'}
            </h2>
            <p className="text-base sm:text-lg text-beige-100 mb-6 sm:mb-8 font-inter leading-relaxed">
              {language === 'en' 
                ? 'To create extraordinary experiences that exceed expectations and leave lasting impressions.'
                : 'إنشاء تجارب استثنائية تتجاوز التوقعات وتترك انطباعات دائمة'
              }
            </p>
            <p className="text-sm sm:text-base text-beige-200 font-inter leading-relaxed mb-8 sm:mb-10">
              {language === 'en'
                ? 'We believe that every event tells a story, and we are here to help you tell yours in the most beautiful and memorable way possible. Our commitment to excellence and attention to detail has made us the trusted choice for discerning clients across Iraq.'
                : 'نؤمن بأن كل فعالية تحكي قصة، ونحن هنا لمساعدتك على حكاية قصتك بأجمل وأكثر الطرق التي لا تُنسى. التزامنا بالتميز والاهتمام بالتفاصيل جعلنا الخيار الموثوق للعملاء المميزين في جميع أنحاء العراق.'
              }
            </p>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-playfair font-bold text-teal-400 mb-2">500+</div>
                <div className="text-beige-200 font-inter text-sm sm:text-base">
                  {language === 'en' ? 'Events Delivered' : 'فعالية منجزة'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-playfair font-bold text-teal-400 mb-2">8+</div>
                <div className="text-beige-200 font-inter text-sm sm:text-base">
                  {language === 'en' ? 'Years Experience' : 'سنوات خبرة'}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 1 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 1 }}
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

const ValuesSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const values = [
    {
      icon: Target,
      title: language === 'en' ? 'Professional Excellence' : 'التميز المهني',
      description: language === 'en' 
        ? 'We pour our heart into every project, ensuring each event reflects our passion for excellence.'
        : 'نضع قلبنا في كل مشروع، مما يضمن أن كل فعالية تعكس شغفنا بالتميز.',
    },
    {
      icon: Award,
      title: language === 'en' ? 'Cultural Authenticity' : 'الأصالة الثقافية',
      description: language === 'en' 
        ? 'Every detail matters. We meticulously plan and execute each element to perfection.'
        : 'كل التفاصيل مهمة. نخطط وننفذ كل عنصر بعناية فائقة لتحقيق الكمال.',
    },
    {
      icon: Lightbulb,
      title: language === 'en' ? 'Innovation & Technology' : 'الابتكار والتقنية',
      description: language === 'en' 
        ? 'We work closely with our clients, making their vision our shared goal.'
        : 'نعمل بشكل وثيق مع عملائنا، جاعلين رؤيتهم هدفنا المشترك.',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'End-to-End Excellence' : 'التميز الشامل',
      description: language === 'en' 
        ? 'We strive for nothing less than exceptional quality in everything we do.'
        : 'نسعى لتحقيق الجودة الاستثنائية في كل ما نقوم به.',
    },
  ];

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
            {language === 'en' ? 'Our Values' : 'قيمنا'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'The principles that guide us in creating unforgettable experiences'
              : 'المبادئ التي ترشدنا في إنشاء تجارب لا تُنسى'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-playfair font-semibold text-white mb-4">
                {value.title}
              </h3>
              <p className="text-beige-200 font-inter leading-relaxed text-sm sm:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const team = [
    {
      name: t('teamMember1Name'),
      nameAr: t('teamMember1NameAr'),
      role: t('teamMember1Role'),
      roleAr: t('teamMember1RoleAr'),
      image: 'https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//DrAlaa.png',
      scale: 'scale-90',
      position: 'object-top',
    },
    {
      name: t('teamMember2Name'),
      nameAr: t('teamMember2NameAr'),
      role: t('teamMember2Role'),
      roleAr: t('teamMember2RoleAr'),
      image: 'https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Mahmoud.png',
      scale: 'scale-100',
      position: 'object-center',
    },
    {
      name: t('teamMember3Name'),
      nameAr: t('teamMember3NameAr'),
      role: t('teamMember3Role'),
      roleAr: t('teamMember3RoleAr'),
      image: 'https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Thoalnorain.png',
      scale: 'scale-90',
      position: 'object-top',
    },
    {
      name: t('teamMember4Name'),
      nameAr: t('teamMember4NameAr'),
      role: t('teamMember4Role'),
      roleAr: t('teamMember4RoleAr'),
      image: 'https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Amin%20Raed.png',
      scale: 'scale-90',
      position: 'object-top',
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
            {language === 'en' ? 'Meet Our Team' : 'تعرف على فريقنا'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'The talented professionals behind every successful event'
              : 'المهنيون الموهوبون وراء كل فعالية ناجحة'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 group">
                <img
                  src={member.image}
                  alt={language === 'en' ? member.name : member.nameAr}
                  className={`w-full h-64 object-cover ${member.position || 'object-center'} ${member.scale || 'scale-100'} group-hover:scale-105 transition-transform duration-500 rounded-xl`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-playfair font-semibold text-white mb-2">
                {language === 'en' ? member.name : member.nameAr}
              </h3>
              <p className="text-teal-400 font-inter text-sm sm:text-base">
                {language === 'en' ? member.role : member.roleAr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const galleryImages = [
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-1.JPG",
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-2.jfif",
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-3.jfif",
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-4.JPG",
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-5.JPG",
    "https://eznbpoxfishlsawvnmio.supabase.co/storage/v1/object/public/alhadathevents//Behind-the-Scenes-6.JPG",
  ];

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
            {language === 'en' ? 'Behind the Scenes' : 'خلف الكواليس'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'A glimpse into our creative process and the magic we create'
              : 'نظرة على عمليتنا الإبداعية والسحر الذي نصنعه'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src={image}
                alt={`Behind the scenes ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { 
      number: '500+', 
      label: language === 'en' ? 'Events Delivered' : 'فعالية منجزة'
    },
    { 
      number: '8+', 
      label: language === 'en' ? 'Years Experience' : 'سنوات خبرة'
    },
    { 
      number: '50+', 
      label: language === 'en' ? 'Corporate Clients' : 'عميل مؤسسي'
    },
    { 
      number: '100%', 
      label: language === 'en' ? 'Client Satisfaction' : 'رضا العملاء'
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-teal-900 to-teal-700">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-beige-100 font-inter text-sm sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;