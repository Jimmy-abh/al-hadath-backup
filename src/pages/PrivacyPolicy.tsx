import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-white dark:bg-dark-200 pt-20 lg:pt-24 transition-colors duration-300">
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              {language === 'en' ? (
                <div className="space-y-8 text-gray-600 dark:text-beige-100 font-inter leading-relaxed transition-colors duration-300">
                  <p className="text-lg">
                    At Al-Hadath Events, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
                  </p>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Information We Collect</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Contact information (name, email, phone number)</li>
                      <li>Event details and preferences</li>
                      <li>Communication records</li>
                      <li>Website usage data</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>To provide event planning and production services</li>
                      <li>To communicate about your events and services</li>
                      <li>To improve our services and website</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Data Protection</h2>
                    <p>
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at info@alhadathevents.com or +964 783 344 5511.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-8 text-gray-600 dark:text-beige-100 font-inter leading-relaxed transition-colors duration-300" dir="rtl">
                  <p className="text-lg">
                    في الحدث للفعاليات، نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية. تشرح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية بياناتك.
                  </p>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">المعلومات التي نجمعها</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
                      <li>تفاصيل الفعاليات والتفضيلات</li>
                      <li>سجلات التواصل</li>
                      <li>بيانات استخدام الموقع</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">كيف نستخدم معلوماتك</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>لتقديم خدمات تخطيط وإنتاج الفعاليات</li>
                      <li>للتواصل حول فعالياتك وخدماتنا</li>
                      <li>لتحسين خدماتنا وموقعنا</li>
                      <li>للامتثال للالتزامات القانونية</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">حماية البيانات</h2>
                    <p>
                      نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. يتم تخزين بياناتك بأمان ولا يمكن الوصول إليها إلا من قبل الموظفين المخولين.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">تواصل معنا</h2>
                    <p>
                      إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على info@alhadathevents.com أو +964 783 344 5511.
                    </p>
                  </section>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;