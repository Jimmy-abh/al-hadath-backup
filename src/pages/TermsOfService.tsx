import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-dark-200 pt-20 lg:pt-24">
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-white mb-8 text-center">
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              {language === 'en' ? (
                <div className="space-y-8 text-beige-100 font-inter leading-relaxed">
                  <p className="text-lg">
                    Welcome to Al-Hadath Events. These Terms of Service govern your use of our services and website. By engaging our services, you agree to these terms.
                  </p>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">Our Services</h2>
                    <p>
                      Al-Hadath Events provides comprehensive event planning and production services including conferences, corporate events, cultural celebrations, and audiovisual production. We tailor our services to meet your specific requirements.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">Client Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Provide accurate and complete information about event requirements</li>
                      <li>Make timely payments according to agreed schedules</li>
                      <li>Obtain necessary permits and approvals</li>
                      <li>Communicate changes or concerns promptly</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">Payment Terms</h2>
                    <p>
                      Payment schedules will be outlined in individual service agreements. We typically require a deposit to secure services, with remaining payments due according to agreed milestones.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">Cancellation Policy</h2>
                    <p>
                      Cancellation terms vary depending on the scope and timing of your event. Specific cancellation policies will be detailed in your service agreement.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">Contact Information</h2>
                    <p>
                      For questions about these terms, please contact us at info@alhadathevents.com or +964 783 344 5511.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-8 text-beige-100 font-inter leading-relaxed" dir="rtl">
                  <p className="text-lg">
                    مرحباً بك في الحدث للفعاليات. تحكم شروط الخدمة هذه استخدامك لخدماتنا وموقعنا الإلكتروني. من خلال التعامل مع خدماتنا، فإنك توافق على هذه الشروط.
                  </p>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">خدماتنا</h2>
                    <p>
                      تقدم الحدث للفعاليات خدمات شاملة لتخطيط وإنتاج الفعاليات بما في ذلك المؤتمرات والفعاليات المؤسسية والاحتفالات الثقافية والإنتاج السمعي البصري. نصمم خدماتنا لتلبية متطلباتك المحددة.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">مسؤوليات العميل</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>تقديم معلومات دقيقة وكاملة حول متطلبات الفعالية</li>
                      <li>سداد المدفوعات في الوقت المحدد وفقاً للجداول المتفق عليها</li>
                      <li>الحصول على التصاريح والموافقات اللازمة</li>
                      <li>التواصل بشأن التغييرات أو المخاوف بسرعة</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">شروط الدفع</h2>
                    <p>
                      سيتم تحديد جداول الدفع في اتفاقيات الخدمة الفردية. نطلب عادة دفعة مقدمة لضمان الخدمات، مع استحقاق المدفوعات المتبقية وفقاً للمعالم المتفق عليها.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">سياسة الإلغاء</h2>
                    <p>
                      تختلف شروط الإلغاء حسب نطاق وتوقيت فعاليتك. سيتم تفصيل سياسات الإلغاء المحددة في اتفاقية الخدمة الخاصة بك.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-playfair font-semibold text-white mb-4">معلومات الاتصال</h2>
                    <p>
                      للأسئلة حول هذه الشروط، يرجى التواصل معنا على info@alhadathevents.com أو +964 783 344 5511.
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

export default TermsOfService;