import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    contact: 'Contact',
    
    // Home Page
    heroTitle: 'Creating Extraordinary Events Across Iraq',
    heroSubtitle: 'Professional event management and production services in Iraq',
    heroDescription: 'Transform your vision into reality with Al-Hadath Events – where Iraqi expertise meets international standards.',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'From intimate gatherings to grand celebrations, we bring your vision to life.',
    conferences: 'Conferences & Exhibitions',
    conferencesDesc: 'Professional conference management and exhibition planning with cutting-edge technology.',
    corporate: 'Corporate Events',
    corporateDesc: 'Professional corporate events that elevate your brand.',
    cultural: 'Cultural Events',
    culturalDesc: 'Spectacular cultural events and entertainment shows.',
    production: 'Event Production',
    productionDesc: 'Complete audiovisual production and technical support for your events.',
    servicesHeroDesc: 'Comprehensive event planning and production services tailored to your unique needs.',
    whatWeDoBest: 'What We Do Best',
    whatWeDoSubtitle: 'Choose from our specialized services designed to make your event extraordinary.',
    readyToStart: 'Ready to Get Started?',
    readyToStartDesc: 'Contact us today to discuss your event and receive a personalized proposal.',
    
    // About
    aboutTitle: 'About Al-Hadath Events',
    missionTitle: 'Our Mission',
    missionText: 'To create extraordinary experiences that exceed expectations and leave lasting impressions',
    aboutExtended: 'With years of experience in the Iraqi market, we understand the cultural nuances and requirements that make each event unique. Our team of dedicated professionals works tirelessly to ensure every detail is perfect.',
    
    // Team Members
    teamMember1Name: 'Dr. Alaa Hussein Rashid',
    teamMember1NameAr: 'الدكتور علاء حسين رشيد',
    teamMember1Role: 'Chairman',
    teamMember1RoleAr: 'رئيس مجلس الإدارة',
    teamMember2Name: 'Mr. Mahmoud Hussein',
    teamMember2NameAr: 'السيد محمود حسين',
    teamMember2Role: 'CEO',
    teamMember2RoleAr: 'الرئيس التنفيذي',
    teamMember3Name: 'Mr. Thunorain Tabra',
    teamMember3NameAr: 'السيد ثونورين طبرا',
    teamMember3Role: 'PR Director',
    teamMember3RoleAr: 'مدير العلاقات العامة',
    teamMember4Name: 'Mr. Ameen Raed Nazar',
    teamMember4NameAr: 'السيد أمين رائد نزار',
    teamMember4Role: 'Media',
    teamMember4RoleAr: 'الإعلام',
    
    // Testimonials
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Don\'t just take our word for it – hear from our satisfied clients',
    testimonial1: 'Al-Hadath Events made our conference in Baghdad absolutely perfect. Every detail was flawlessly executed.',
    testimonial1Name: 'Dr. Ahmad Al-Rashid',
    testimonial1Title: 'University of Mashreq',
    testimonial2: 'Professional, creative, and reliable. Our corporate event exceeded all expectations.',
    testimonial2Name: 'Salam Al-Baghdadi',
    testimonial2Title: 'Iraq Private Banks League',
    testimonial3: 'The best event planning company in Iraq. Their attention to detail is unmatched.',
    testimonial3Name: 'Dr. Omar Al-Basri',
    testimonial3Title: 'Wasit Provincial Council',
    
    // Final CTA
    finalCtaTitle: 'Ready to Create Something Amazing?',
    finalCtaDescription: 'Let\'s discuss your vision and bring it to life with our expert team',
    
    // Contact
    contactTitle: 'Get In Touch',
    whatsappContact: 'Contact via WhatsApp',
    
    // Footer
    companyName: 'Al-Hadath Events',
    companyDescription: 'Iraq\'s premier event planning and production company, creating extraordinary experiences with cultural authenticity since 2015.',
    quickLinks: 'Quick Links',
    servicesFooter: 'Services',
    contactInfo: 'Contact',
    followUs: 'Follow Us',
    allRightsReserved: '© 2025 Al-Hadath Events. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // Common
    learnMore: 'Learn More',
    viewPortfolio: 'View Portfolio',
    getQuote: 'Get Quote',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'حولنا',
    services: 'خدماتنا',
    portfolio: 'أعمالنا',
    contact: 'تواصل معنا',
    
    // Home Page
    heroTitle: 'نصنع فعاليات استثنائية في جميع أنحاء العراق',
    heroSubtitle: 'خدمات إدارة وإنتاج الفعاليات الاحترافية في العراق',
    heroDescription: 'حوّل رؤيتك إلى واقع مع الحدث للفعاليات - حيث تلتقي الخبرة العراقية بالمعايير العالمية',
    
    // Services
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'من الاجتماعات الحميمة إلى الاحتفالات الكبرى، نحقق رؤيتك',
    conferences: 'المؤتمرات والمعارض',
    conferencesDesc: 'إدارة المؤتمرات الاحترافية وتنظيم المعارض بأحدث التقنيات',
    corporate: 'الفعاليات المؤسسية',
    corporateDesc: 'الفعاليات المؤسسية الاحترافية التي ترتقي بعلامتك التجارية',
    cultural: 'الفعاليات الثقافية',
    culturalDesc: 'الفعاليات الثقافية الرائعة والعروض الترفيهية',
    production: 'إنتاج الفعاليات',
    productionDesc: 'إنتاج صوتي بصري كامل ودعم تقني لفعالياتك',
    servicesHeroDesc: 'خدمات تخطيط وإنتاج الفعاليات الشاملة المصممة لاحتياجاتك الفريدة.',
    whatWeDoBest: 'ما نقدمه بأفضل شكل',
    whatWeDoSubtitle: 'اختر من خدماتنا المتخصصة المصممة لجعل فعاليتك استثنائية.',
    productionDesc: 'إنتاج صوتي بصري كامل ودعم تقني لتجارب لا تُنسى',
    readyToStart: 'مستعد للبدء؟',
    readyToStartDesc: 'تواصل معنا اليوم لمناقشة فعاليتك والحصول على اقتراح شخصي',
    
    // About
    aboutTitle: 'عن الحدث للفعاليات',
    missionTitle: 'مهمتنا',
    missionText: 'إنشاء تجارب استثنائية تتجاوز التوقعات وتترك انطباعات دائمة',
    aboutExtended: 'مع سنوات من الخبرة في السوق العراقية، نفهم الفروق الثقافية والمتطلبات التي تجعل كل فعالية فريدة. يعمل فريقنا من المحترفين المتفانين بلا كلل لضمان كمال كل التفاصيل.',
    
    // Team Members
    teamMember1Name: 'الدكتور علاء حسين رشيد',
    teamMember1NameAr: 'الدكتور علاء حسين رشيد',
    teamMember1Role: 'رئيس مجلس الإدارة',
    teamMember1RoleAr: 'رئيس مجلس الإدارة',
    teamMember2Name: 'السيد محمود حسين',
    teamMember2NameAr: 'السيد محمود حسين',
    teamMember2Role: 'الرئيس التنفيذي',
    teamMember2RoleAr: 'الرئيس التنفيذي',
    teamMember3Name: 'السيد ثونورين طبرا',
    teamMember3NameAr: 'السيد ثونورين طبرا',
    teamMember3Role: 'مدير العلاقات العامة',
    teamMember3RoleAr: 'مدير العلاقات العامة',
    teamMember4Name: 'السيد أمين رائد نزار',
    teamMember4NameAr: 'السيد أمين رائد نزار',
    teamMember4Role: 'الإعلام',
    teamMember4RoleAr: 'الإعلام',
    
    // Testimonials
    testimonialsTitle: 'ماذا يقول عملاؤنا',
    testimonialsSubtitle: 'لا تكتفِ بكلامنا – اسمع من عملائنا الراضين',
    testimonial1: 'جعلت الحدث للفعاليات مؤتمرنا في بغداد مثالياً تماماً. تم تنفيذ كل التفاصيل بشكل لا تشوبه شائبة.',
    testimonial1Name: 'د. أحمد الرشيد',
    testimonial1Title: 'جامعة المشرق',
    testimonial2: 'مهني، مبدع، وموثوق. فعاليتنا المؤسسية تجاوزت كل التوقعات.',
    testimonial2Name: 'سلام البغدادي',
    testimonial2Title: 'رابطة المصارف الخاصة العراقية',
    testimonial3: 'أفضل شركة تنظيم فعاليات في العراق. اهتمامهم بالتفاصيل لا يضاهى.',
    testimonial3Name: 'د. عمر البصري',
    testimonial3Title: 'مجلس محافظة واسط',
    
    // Final CTA
    finalCtaTitle: 'مستعد لإنشاء شيء مذهل؟',
    finalCtaDescription: 'دعنا نناقش رؤيتك ونحققها مع فريقنا الخبير',
    
    // Contact
    contactTitle: 'تواصل معنا',
    whatsappContact: 'تواصل عبر واتساب',
    
    // Footer
    companyName: 'الحدث للفعاليات',
    companyDescription: 'شركة العراق الرائدة في تنظيم وإنتاج الفعاليات، تخلق تجارب استثنائية بأصالة ثقافية منذ 2015.',
    quickLinks: 'روابط سريعة',
    servicesFooter: 'الخدمات',
    contactInfo: 'معلومات التواصل',
    followUs: 'تابعنا',
    allRightsReserved: '© 2025 الحدث للفعاليات. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    
    // Common
    learnMore: 'اعرف المزيد',
    viewPortfolio: 'عرض الأعمال',
    getQuote: 'احصل على عرض سعر',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};