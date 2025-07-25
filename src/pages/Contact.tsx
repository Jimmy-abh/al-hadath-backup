import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Send, Clock, Facebook, Linkedin, CheckCircle, AlertCircle, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, type ContactFormData, isValidEmail, sanitizeInput } from '../lib/supabase';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: new Date(),
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+964');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Get today's date as Date object
  const getTodayDate = () => new Date();

  // Country codes for phone validation
  const countryCodes = [
    { code: '+964', country: 'IQ', name: language === 'en' ? 'Iraq' : 'العراق' },
    { code: '+1', country: 'US', name: language === 'en' ? 'United States' : 'الولايات المتحدة' },
    { code: '+44', country: 'GB', name: language === 'en' ? 'United Kingdom' : 'المملكة المتحدة' },
    { code: '+971', country: 'AE', name: language === 'en' ? 'UAE' : 'الإمارات' },
    { code: '+966', country: 'SA', name: language === 'en' ? 'Saudi Arabia' : 'السعودية' },
    { code: '+965', country: 'KW', name: language === 'en' ? 'Kuwait' : 'الكويت' },
    { code: '+973', country: 'BH', name: language === 'en' ? 'Bahrain' : 'البحرين' },
    { code: '+974', country: 'QA', name: language === 'en' ? 'Qatar' : 'قطر' },
    { code: '+968', country: 'OM', name: language === 'en' ? 'Oman' : 'عمان' },
    { code: '+962', country: 'JO', name: language === 'en' ? 'Jordan' : 'الأردن' },
    { code: '+961', country: 'LB', name: language === 'en' ? 'Lebanon' : 'لبنان' },
    { code: '+963', country: 'SY', name: language === 'en' ? 'Syria' : 'سوريا' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const sanitizedName = sanitizeInput(formData.name);
    if (!sanitizedName) {
      newErrors.name = language === 'en' ? 'Name is required' : 'الاسم مطلوب';
    } else if (sanitizedName.length < 2) {
      newErrors.name = language === 'en' ? 'Name must be at least 2 characters' : 'يجب أن يكون الاسم على الأقل حرفين';
    }
    
    const sanitizedEmail = sanitizeInput(formData.email);
    if (!sanitizedEmail) {
      newErrors.email = language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!isValidEmail(sanitizedEmail)) {
      newErrors.email = language === 'en' ? 'Email is invalid' : 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.eventType) {
      newErrors.eventType = language === 'en' ? 'Event type is required' : 'نوع الفعالية مطلوب';
    }
    
    const sanitizedMessage = sanitizeInput(formData.message);
    if (!sanitizedMessage) {
      newErrors.message = language === 'en' ? 'Message is required' : 'الرسالة مطلوبة';
    } else if (sanitizedMessage.length < 10) {
      newErrors.message = language === 'en' ? 'Message must be at least 10 characters' : 'يجب أن تكون الرسالة على الأقل 10 أحرف';
    }
    
    // Validate phone number if provided
    if (formData.phone.trim()) {
      const cleanPhoneNumber = formData.phone.replace(/\D/g, '');
      const fullPhoneNumber = selectedCountryCode + cleanPhoneNumber;
      const selectedCountry = countryCodes.find(c => c.code === selectedCountryCode);
      
      try {
        const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber, selectedCountry?.country);
        if (!phoneNumber?.isValid()) {
          newErrors.phone = language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح';
        }
      } catch (error) {
        newErrors.phone = language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح';
      }
    }
    
    // Validate event date (no past dates)
    if (formData.eventDate instanceof Date) {
      const selectedDate = formData.eventDate;
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      
      if (selectedDate < today) {
        newErrors.eventDate = language === 'en' ? 'Event date cannot be in the past' : 'تاريخ الفعالية لا يمكن أن يكون في الماضي';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const contactData: ContactFormData = {
        full_name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone.trim() ? 
          sanitizeInput(selectedCountryCode + formData.phone.replace(/\D/g, '')) : 
          null,
        event_type: formData.eventType,
        preferred_date: formData.eventDate instanceof Date ? formData.eventDate.toISOString().split('T')[0] : null,
        message: sanitizeInput(formData.message),
      };
      
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactData]);
      
      if (error) {
        throw error;
      }
      
      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: new Date(),
        message: '',
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setFormData({
      ...formData,
      phone: value,
    });
    
    // Real-time validation
    if (value.trim()) {
      const fullPhoneNumber = selectedCountryCode + value;
      const selectedCountry = countryCodes.find(c => c.code === selectedCountryCode);
      
      try {
        const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber, selectedCountry?.country);
        if (!phoneNumber?.isValid()) {
          setErrors({
            ...errors,
            phone: language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح',
          });
        } else {
          // Clear error if valid
          const newErrors = { ...errors };
          delete newErrors.phone;
          setErrors(newErrors);
        }
      } catch (error) {
        setErrors({
          ...errors,
          phone: language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح',
        });
      }
    } else {
      // Clear error when field is empty
      setErrors({
        ...errors,
        phone: '',
      });
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code);
    setShowCountryDropdown(false);
    
    // Re-validate phone number with new country context
    if (formData.phone.trim()) {
      const fullPhoneNumber = code + formData.phone.replace(/\D/g, '');
      const selectedCountry = countryCodes.find(c => c.code === code);
      
      try {
        const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber, selectedCountry?.country);
        if (!phoneNumber?.isValid()) {
          setErrors({
            ...errors,
            phone: language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح',
          });
        } else {
          // Clear error if valid
          const newErrors = { ...errors };
          delete newErrors.phone;
          setErrors(newErrors);
        }
      } catch (error) {
        setErrors({
          ...errors,
          phone: language === 'en' ? 'Invalid phone number format' : 'تنسيق رقم الهاتف غير صحيح',
        });
      }
    } else {
      // Clear error when no phone number
      setErrors({
        ...errors,
        phone: '',
      });
    }
  };

  return (
    <div className="bg-dark-200 pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/headway-F2KRf_QfCqw-unsplash.jpg"
            alt="Contact us"
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
              {language === 'en' ? 'Get In Touch' : 'تواصل معنا'}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
              {language === 'en' 
                ? 'Ready to bring your vision to life? Let\'s discuss your event and create something extraordinary together.'
                : 'مستعد لتحقيق رؤيتك؟ دعنا نناقش فعاليتك وننشئ شيئاً استثنائياً معاً.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
       isSubmitting={isSubmitting}
       submitStatus={submitStatus}
       errors={errors}
        selectedCountryCode={selectedCountryCode}
        showCountryDropdown={showCountryDropdown}
        countryCodes={countryCodes}
        handlePhoneChange={handlePhoneChange}
        handleCountryCodeChange={handleCountryCodeChange}
        setShowCountryDropdown={setShowCountryDropdown}
        getTodayDate={getTodayDate}
        setFormData={setFormData}
      />

      {/* Map Section */}
      <MapSection />

      {/* Office Hours */}
      <OfficeHoursSection />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          setSubmitStatus('idle');
        }} 
      />
    </div>
  );
};

const ContactSection: React.FC<{
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errors: Record<string, string>;
  selectedCountryCode: string;
  showCountryDropdown: boolean;
  countryCodes: any[];
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountryCodeChange: (code: string) => void;
  setShowCountryDropdown: (show: boolean) => void;
  getTodayDate: () => string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}> = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isSubmitting, 
  submitStatus, 
  errors,
  selectedCountryCode,
  showCountryDropdown,
  countryCodes,
  handlePhoneChange,
  handleCountryCodeChange,
  setShowCountryDropdown,
  getTodayDate,
  setFormData
}) => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'en' ? 'Visit Us' : 'زُرنا',
      content: language === 'en' 
        ? 'Baghdad, Iraq\nAl-Muhandiseen District\nPalestine Street, Opposite Al-Nakheel Mall'
        : 'بغداد، العراق\nمنطقة المهندسين\nشارع فلسطين، مقابل مول النخيل',
    },
    {
      icon: Phone,
      title: language === 'en' ? 'Call Us' : 'اتصل بنا',
      content: '+964 783 344 5511\n+964 771 360 6413',
    },
    {
      icon: Mail,
      title: language === 'en' ? 'Email Us' : 'راسلنا',
      content: 'info@alhadathevents.com\nsupport@alhadathevents.com',
    },
  ];

  const eventTypes = [
    { value: '', label: language === 'en' ? 'Select event type' : 'اختر نوع الفعالية' },
    { value: 'conference', label: language === 'en' ? 'Conference' : 'مؤتمر' },
    { value: 'corporate', label: language === 'en' ? 'Corporate Event' : 'فعالية مؤسسية' },
    { value: 'cultural', label: language === 'en' ? 'Cultural Event' : 'فعالية ثقافية' },
    { value: 'exhibition', label: language === 'en' ? 'Exhibition' : 'معرض' },
    { value: 'other', label: language === 'en' ? 'Other' : 'أخرى' },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6" id="contact-form-section">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'Let\'s Start Planning' : 'لنبدأ التخطيط'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter leading-relaxed">
            {language === 'en' 
              ? 'Share your vision with us and we\'ll create a proposal tailored to your needs'
              : 'شاركنا رؤيتك وسننشئ اقتراحاً مصمماً لاحتياجاتك'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ x: language === 'en' ? -50 : 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: language === 'en' ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-playfair font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-beige-200 font-inter whitespace-pre-line text-sm sm:text-base" dir={info.title.includes('Call') || info.title.includes('اتصل') ? 'ltr' : language === 'ar' ? 'rtl' : 'ltr'}>
                    {info.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg font-playfair font-semibold text-white mb-4">
                {language === 'en' ? 'Follow Us' : 'تابعنا'}
              </h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a
                  href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label={language === 'en' ? 'Contact us on WhatsApp' : 'تواصل معنا عبر واتساب'}
                  className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors group"
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/alhadthevent?igsh=YTZ1bmVkMjQxaG4w"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label={language === 'en' ? 'Follow us on Instagram' : 'تابعنا على إنستغرام'}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors group"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://facebook.com/alhadathevents"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label={language === 'en' ? 'Follow us on Facebook' : 'تابعنا على فيسبوك'}
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors group"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/alhadathevents"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label={language === 'en' ? 'Follow us on LinkedIn' : 'تابعنا على لينكد إن'}
                  className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: language === 'en' ? 50 : -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: language === 'en' ? 50 : -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Success/Error Messages */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center space-x-3 rtl:space-x-reverse"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-100 font-inter">
                  {language === 'en' 
                    ? 'There was an error sending your message. Please try again or contact us directly.'
                    : 'حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
                  }
                </p>
              </motion.div>
            )}
            
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-beige-100 mb-2">
                    {language === 'en' ? 'Full Name *' : 'الاسم الكامل *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-dark-50 border rounded-lg text-white placeholder-beige-300 focus:border-teal-500 focus:outline-none transition-colors text-sm sm:text-base ${
                      errors.name ? 'form-error border-red-500' : 'border-teal-500/20'
                    }`}
                    placeholder={language === 'en' ? 'Your full name' : 'اسمك الكامل'}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-beige-100 mb-2">
                    {language === 'en' ? 'Email Address *' : 'عنوان البريد الإلكتروني *'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-dark-50 border rounded-lg text-white placeholder-beige-300 focus:border-teal-500 focus:outline-none transition-colors text-sm sm:text-base ${
                      errors.email ? 'form-error border-red-500' : 'border-teal-500/20'
                    }`}
                    placeholder={language === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.com'}
                    dir="ltr"
                    maxLength={100}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-beige-100 mb-2 relative">
                    {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                  </label>
                  <div className="relative">
                    {/* Country Code Dropdown */}
                    <div className="absolute left-0 top-0 bottom-0 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="h-full px-3 bg-dark-300 border-r border-teal-500/20 rounded-l-lg text-white hover:bg-dark-200 transition-colors flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <span className="text-sm font-mono">{selectedCountryCode}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-dark-50 border border-teal-500/20 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto min-w-[200px]">
                          {countryCodes.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountryCodeChange(country.code)}
                              className="w-full px-3 py-2 text-left text-white hover:bg-teal-500/20 transition-colors flex items-center justify-between text-sm"
                            >
                              <span>{country.name}</span>
                              <span className="font-mono text-beige-300">{country.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full pl-20 pr-4 py-3 bg-dark-50 border rounded-lg text-white placeholder-beige-300 focus:border-teal-500 focus:outline-none transition-colors text-sm sm:text-base ${
                        errors.phone ? 'form-error border-red-500' : 'border-teal-500/20'
                      }`}
                      placeholder="XXX XXX XXXX"
                      dir="ltr"
                      maxLength={15}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-beige-100 mb-2">
                    {language === 'en' ? 'Event Type *' : 'نوع الفعالية *'}
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-dark-50 border rounded-lg text-white focus:border-teal-500 focus:outline-none transition-colors text-sm sm:text-base ${
                      errors.eventType ? 'form-error border-red-500' : 'border-teal-500/20'
                    }`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-dark-50">
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-sm text-red-400">{errors.eventType}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-beige-100 mb-2">
                  {language === 'en' ? 'Preferred Event Date' : 'تاريخ الفعالية المفضل'}
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.eventDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setFormData({ ...formData, eventDate: date });
                        // Clear error when date changes
                        if (errors.eventDate) {
                          setErrors({ ...errors, eventDate: '' });
                        }
                      }
                    }}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className={`w-full px-4 py-3 bg-dark-50 border rounded-lg text-white focus:border-teal-500 focus:outline-none transition-colors text-sm sm:text-base cursor-pointer ${
                      errors.eventDate ? 'form-error border-red-500' : 'border-teal-500/20'
                    }`}
                    placeholderText={language === 'en' ? 'Select event date' : 'اختر تاريخ الفعالية'}
                    popperClassName="date-picker-popper"
                    calendarClassName="date-picker-calendar"
                  />
                </div>
                {errors.eventDate && (
                  <p className="mt-1 text-sm text-red-400">{errors.eventDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-beige-100 mb-2">
                  {language === 'en' ? 'Tell us about your event *' : 'أخبرنا عن فعاليتك *'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-dark-50 border rounded-lg text-white placeholder-beige-300 focus:border-teal-500 focus:outline-none transition-colors resize-none text-sm sm:text-base ${
                    errors.message ? 'form-error border-red-500' : 'border-teal-500/20'
                  }`}
                  placeholder={language === 'en' 
                    ? 'Share your vision, budget, number of guests, and any special requirements...'
                    : 'شاركنا رؤيتك، الميزانية، عدد الضيوف، وأي متطلبات خاصة...'
                  }
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  maxLength={1000}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors inline-flex items-center justify-center group shadow-lg hover:shadow-xl text-base sm:text-lg"
                aria-label={isSubmitting ? (language === 'en' ? 'Sending message...' : 'جاري الإرسال...') : (language === 'en' ? 'Send message' : 'أرسل الرسالة')}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                    {language === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                  </>
                ) : (
                  <>
                    {language === 'en' ? 'Send Message' : 'أرسل الرسالة'}
                    <Send className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SuccessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative max-w-md w-full bg-dark-100 rounded-xl border border-teal-500/20 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label={language === 'en' ? 'Close modal' : 'إغلاق النافذة'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          {/* Success Message */}
          <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-4">
            {language === 'en' ? 'Thank You!' : 'شكرًا لك!'}
          </h3>
          
          <p className="text-beige-100 font-inter leading-relaxed text-sm sm:text-base">
            {language === 'en' 
              ? 'Your message has been sent. We\'ll get back to you soon.'
              : 'تم إرسال رسالتك وسنقوم بالرد عليك قريبًا.'
            }
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const MapSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
            {language === 'en' ? 'Find Us' : 'اعثر علينا'}
          </h2>
          <p className="text-lg sm:text-xl text-beige-100 max-w-4xl mx-auto font-inter mb-8 leading-relaxed">
            {language === 'en' 
              ? 'Visit our office in the heart of Baghdad to discuss your event in person'
              : 'زُر مكتبنا في قلب بغداد لمناقشة فعاليتك شخصياً'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Map Title */}
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
              {language === 'en' ? 'Our Location' : 'موقعنا'}
            </h3>
          </div>
          
          {/* Google Maps Embed */}
          <div className="relative rounded-xl overflow-hidden border border-teal-500/20 shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.5033435829228!2d44.36453217514455!3d33.30565405678397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f4941e8be31%3A0xd867ab1e0aa02cf2!2z2LTYsdmD2Kkg2KfZhNit2K_YqyDZhNiq2YbYuNmK2YUg2KfZhNmF2KTYqtmF2LHYp9iqINmI2KfZhNmF2LnYp9ix2LYgXyDYp9mE2K3Yp9ix2KzZitip!5e0!3m2!1sen!2siq!4v1752083450051!5m2!1sen!2siq" 
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-80 sm:h-96 lg:h-[450px]"
              title={language === 'en' ? 'Al-Hadath Events Location' : 'موقع الحدث للفعاليات'}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const OfficeHoursSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const hours = [
    { 
      dayEn: 'Sunday – Thursday', 
      dayAr: 'الأحد - الخميس',
      timeEn: '9:00 AM – 6:00 PM',
      timeAr: '٩:٠٠ صباحاً - ٦:٠٠ مساءً'
    },
    { 
      dayEn: 'Friday', 
      dayAr: 'الجمعة',
      timeEn: '9:00 AM – 2:00 PM',
      timeAr: '٩:٠٠ صباحاً - ٢:٠٠ ظهراً'
    },
    { 
      dayEn: 'Saturday', 
      dayAr: 'السبت',
      timeEn: 'By Appointment Only',
      timeAr: 'بموعد مسبق فقط'
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-teal-900 to-teal-700">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ x: language === 'en' ? -50 : 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: language === 'en' ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4 sm:mb-6">
              {language === 'en' ? 'Office Hours' : 'ساعات العمل'}
            </h2>
            <p className="text-lg sm:text-xl text-beige-100 mb-8 font-inter leading-relaxed">
              {language === 'en' 
                ? 'Visit us during our office hours or schedule a consultation at your convenience'
                : 'زُرنا خلال ساعات العمل أو حدد موعداً للاستشارة في الوقت المناسب لك'
              }
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=9647833445511&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 hover:bg-beige-100 font-semibold text-base sm:text-lg rounded-lg transition-colors shadow-lg hover:shadow-xl"
              aria-label={language === 'en' ? 'Schedule consultation via WhatsApp' : 'حدد موعد استشارة عبر واتساب'}
            >
              <MessageCircle className={`w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 ${language === 'ar' ? 'phone-icon' : ''}`} />
              {language === 'en' ? 'Schedule Consultation' : 'حدد موعد استشارة'}
            </a>
          </motion.div>

          <motion.div
            initial={{ x: language === 'en' ? 50 : -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: language === 'en' ? 50 : -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {hours.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Clock className={`w-5 h-5 text-beige-100 ${language === 'ar' ? 'phone-icon' : ''}`} />
                  <span className="text-white font-inter font-medium text-sm sm:text-base">
                    {language === 'en' ? schedule.dayEn : schedule.dayAr}
                  </span>
                </div>
                <span className="text-beige-100 font-inter text-sm sm:text-base">
                  {language === 'en' ? schedule.timeEn : schedule.timeAr}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;