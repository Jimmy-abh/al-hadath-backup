import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = '/hadath-icon.png',
  url = window.location.href,
}) => {
  const { language } = useLanguage();

  const defaultTitle = language === 'en' 
    ? 'Al-Hadath Events - Premium Event Planning & Production'
    : 'الحدث للفعاليات - تنظيم وإنتاج الفعاليات المتميز';

  const defaultDescription = language === 'en'
    ? 'Iraq\'s premier event planning and production company. Creating extraordinary experiences with cultural authenticity since 2015.'
    : 'شركة العراق الرائدة في تنظيم وإنتاج الفعاليات، تخلق تجارب استثنائية بأصالة ثقافية منذ 2015.';

  const defaultKeywords = language === 'en'
    ? 'event planning, Iraq, Baghdad, conferences, corporate events, cultural events, production'
    : 'تنظيم الفعاليات، العراق، بغداد، المؤتمرات، الفعاليات المؤسسية، الفعاليات الثقافية، الإنتاج';

  React.useEffect(() => {
    // Update document title
    document.title = title || defaultTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', description || defaultDescription);
    updateMetaTag('keywords', keywords || defaultKeywords);
    
    // Open Graph tags
    updatePropertyTag('og:title', title || defaultTitle);
    updatePropertyTag('og:description', description || defaultDescription);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:type', 'website');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || defaultTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', image);

    // Language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [title, description, keywords, image, url, language, defaultTitle, defaultDescription, defaultKeywords]);

  return null;
};

export default SEOHead;