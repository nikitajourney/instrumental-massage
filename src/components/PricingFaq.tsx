import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, HelpCircle, ChevronDown, Send, Lock, Gift, Star, Phone, Smartphone, MessageCircle, Heart, User, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { FAQS, APP_METADATA } from '../data';
import { InquiryFormData } from '../types';

export const PricingFaq: React.FC = () => {
  // FAQ accordion open state
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Form states
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    messenger: 'telegram'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [tgConfigured, setTgConfigured] = useState<boolean | null>(null);
  const [tgError, setTgError] = useState<string | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Пожалуйста, введите ваше имя');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setFormError('Пожалуйста, введите корректный номер телефона');
      return;
    }
    if (!formData.email?.trim() || !formData.email.includes('@')) {
      setFormError('Пожалуйста, введите корректный Email адрес');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        messenger: formData.messenger,
        coursePrice: APP_METADATA.priceCurrent
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        if (data.notifications && data.notifications.telegram) {
          setTgConfigured(data.notifications.telegram.configured);
        }
        if (data.errors && data.errors.length > 0) {
          const errText = data.errors.find((err: string) => err.toLowerCase().includes('telegram'));
          if (errText) {
            setTgError(errText);
          }
        }
        // Save locally to simulate durable application saving
        const existingInquiries = JSON.parse(localStorage.getItem('massage_inquiries') || '[]');
        existingInquiries.push({
          ...formData,
          price: APP_METADATA.priceCurrent,
          date: new Date().toISOString()
        });
        localStorage.setItem('massage_inquiries', JSON.stringify(existingInquiries));
      } else {
        setFormError(data.error || 'Произошла ошибка при отправке заявки.');
      }
    })
    .catch((err) => {
      console.error(err);
      setFormError('Не удалось связаться с сервером для отправки заявки.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleResetForm = () => {
    setFormData({ name: '', phone: '', email: '', messenger: 'telegram' });
    setIsSubmitted(false);
    setTgConfigured(null);
    setTgError(null);
  };

  return (
    <section id="pricing" className="bg-graphite-900 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-turquoise-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-deepblue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION 12: PRICING & REGISTRATION FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto mb-28">
          
          {/* Price Value Proposition (Left) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-turquoise-500/10 text-turquoise-400 px-3 py-1.5 rounded-lg border border-turquoise-500/20 text-xs font-semibold font-mono tracking-wider uppercase">
              <Gift className="w-4 h-4" />
              <span>Специальное предложение</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Начните обучение <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">сегодня</span>
              </h2>
              <p className="text-sm sm:text-base text-graphite-400 leading-relaxed font-sans">
                Инвестируйте в свое профессиональное будущее и долголетие в профессии. Скидка 50% действует ограниченное время. Доступ ко всем материалам — 6 месяцев. Вы сможете проходить уроки в своем темпе с телефона или ПК.
              </p>
            </div>

            {/* Inclusions checklist */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-graphite-200">Полный доступ ко всем 20+ HD-видеоурокам</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-graphite-200">Пошаговые протоколы на все зоны тела</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-graphite-200">Именной электронный сертификат сразу после тестов</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-graphite-200">Доступ на 6 месяцев и техподдержка в чате</span>
              </div>
            </div>

            {/* Total value callout */}
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center space-x-5">
              <div className="text-4xl">💆‍♂️</div>
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-turquoise-400 font-bold block">Здоровье рук — бесценно</span>
                <p className="text-xs text-graphite-400 mt-1">
                  Стоимость одного приема ортопеда при травме суставов кисти превышает стоимость данного онлайн-курса в разы.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Form Card (Right) */}
          <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-turquoise-500 to-teal-500 text-graphite-950 text-[10px] font-mono font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
              СКИДКА 50% ОГРАНИЧЕНА
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="pricing-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left space-y-1.5 border-b border-graphite-800 pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-turquoise-400 font-semibold">Оформить заявку</span>
                    <div className="flex items-baseline justify-center sm:justify-start space-x-3">
                      <span className="text-3xl font-mono font-bold text-white">{APP_METADATA.priceCurrent} ₽</span>
                      <span className="text-sm line-through text-graphite-600 font-mono">{APP_METADATA.priceOriginal} ₽</span>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Input 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-graphite-400 font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-turquoise-400" />
                      <span>Ваше Имя</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-900 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-sans"
                    />
                  </div>

                  {/* Input 2: Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-graphite-400 font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-turquoise-400" />
                      <span>Телефон</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+7 (999) 000-00-00"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-900 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-mono"
                    />
                  </div>

                  {/* Input 3: Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-graphite-400 font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-turquoise-400" />
                      <span>Электронная почта (Email)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@mail.ru"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-900 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-sans"
                    />
                  </div>

                  {/* Input 3: Messenger Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-graphite-400 font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-turquoise-400" />
                      <span>Предпочтительный способ связи</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'telegram', label: 'Telegram' },
                        { id: 'max', label: 'Max' },
                        { id: 'viber', label: 'Viber' },
                        { id: 'phone', label: 'Звонок' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, messenger: item.id as any }))}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold font-sans transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer ${
                            formData.messenger === item.id
                              ? 'bg-turquoise-500/10 border-turquoise-500 text-turquoise-400 shadow-sm'
                              : 'bg-graphite-900 border-graphite-800 text-graphite-400 hover:text-white hover:border-graphite-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-extrabold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-turquoise-500/20 flex items-center justify-center space-x-2.5 disabled:opacity-50 cursor-pointer text-sm tracking-wide uppercase"
                    id="submit-form-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-graphite-950 border-t-transparent rounded-full animate-spin" />
                        <span>Обработка платежа...</span>
                      </>
                    ) : (
                      <>
                        <span>Оставить заявку на обучение</span>
                        <Send className="w-4 h-4 text-graphite-950" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1 pb-1">
                    <a
                      href="https://monecle.com/buy/96990"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-turquoise-400 hover:text-turquoise-300 transition-colors font-semibold underline decoration-turquoise-400/30 hover:decoration-turquoise-300 inline-block"
                    >
                      Оплатить напрямую в один клик без формы
                    </a>
                  </div>

                  {/* Secure note */}
                  <div className="flex items-center justify-center space-x-2 text-[11px] text-graphite-500 font-sans">
                    <Lock className="w-3.5 h-3.5 text-graphite-600" />
                    <span>Безопасная оплата. Ваши персональные данные защищены.</span>
                  </div>

                  {/* Legal consent disclaimer */}
                  <div className="text-[10px] text-graphite-500 font-sans text-center px-2 leading-relaxed border-t border-graphite-850/60 pt-3">
                    Нажимая кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с{' '}
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: { type: 'privacy' } }))}
                      className="text-turquoise-400 hover:underline inline cursor-pointer font-semibold"
                    >
                      Политикой конфиденциальности
                    </button>{' '}
                    и{' '}
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: { type: 'offer' } }))}
                      className="text-turquoise-400 hover:underline inline cursor-pointer font-semibold"
                    >
                      Договором оферты
                    </button>
                    {'.'}
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="space-y-3 pt-3 border-t border-graphite-800/85">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-graphite-400 uppercase tracking-wider">
                        Или свяжитесь напрямую без формы:
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href="https://t.me/massagecourseonline"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-turquoise-400 hover:bg-turquoise-500/5 transition-all duration-200 group text-center"
                      >
                        <MessageCircle className="w-4 h-4 text-turquoise-400 group-hover:scale-110 transition-transform duration-200 mb-1 shrink-0" />
                        <span className="text-[10px] font-semibold text-graphite-200 group-hover:text-white transition-colors">Telegram</span>
                      </a>
                      <a
                        href="https://max.ru/u/f9LHodD0cOLn5O61OFC7o-wpv8Oj8zmByLURYebcGWW6hpSB7f24X0ykiQA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-turquoise-400 hover:bg-turquoise-500/5 transition-all duration-200 group text-center"
                      >
                        <User className="w-4 h-4 text-turquoise-400 group-hover:scale-110 transition-transform duration-200 mb-1 shrink-0" />
                        <span className="text-[10px] font-semibold text-graphite-200 group-hover:text-white transition-colors">Max</span>
                      </a>
                      <a
                        href="tel:+790909100"
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-turquoise-400 hover:bg-turquoise-500/5 transition-all duration-200 group text-center"
                      >
                        <Phone className="w-4 h-4 text-turquoise-400 group-hover:scale-110 transition-transform duration-200 mb-1 shrink-0" />
                        <span className="text-[10px] font-semibold text-graphite-200 group-hover:text-white transition-colors">Телефон</span>
                      </a>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-turquoise-500/10 border border-turquoise-400/30 text-turquoise-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Регистрация успешна!</h3>
                    <p className="text-sm text-graphite-300 leading-relaxed max-w-sm mx-auto font-sans">
                      Уважаемый(а) <span className="text-white font-semibold">{formData.name}</span>, ваша заявка на курс успешно принята! Для мгновенного получения доступа, пожалуйста, перейдите к оплате курса ниже:
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <a
                      href="https://monecle.com/buy/96990"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center space-x-2 bg-gradient-to-r from-turquoise-400 to-teal-500 hover:from-turquoise-500 hover:to-teal-600 text-graphite-950 font-extrabold py-4 rounded-xl shadow-xl shadow-turquoise-500/20 transition-all cursor-pointer text-sm uppercase tracking-wider text-center"
                    >
                      <span>Оплатить курс (4500 ₽)</span>
                      <ArrowRight className="w-5 h-5 text-graphite-950" />
                    </a>
                  </div>

                  <div className="p-4 bg-graphite-900 border border-graphite-800 rounded-2xl max-w-xs mx-auto space-y-2">
                    <span className="text-[10px] text-turquoise-400 font-mono font-bold uppercase tracking-widest block">Канал связи</span>
                    <p className="text-xs text-white">
                      Наш куратор свяжется с вами через <span className="font-bold text-turquoise-400 uppercase">{formData.messenger}</span> по номеру <span className="font-mono text-turquoise-400 font-semibold">{formData.phone}</span> в течение 10 минут.
                    </p>
                  </div>

                  {tgConfigured === false && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-2xl text-left space-y-1.5 max-w-xs mx-auto font-sans">
                      <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Telegram не настроен</span>
                      </span>
                      <p className="text-[11px] leading-relaxed text-graphite-300">
                        Заявка сохранена, но не отправлена в Telegram. Задайте <b>TELEGRAM_BOT_TOKEN</b> и <b>TELEGRAM_CHAT_ID</b> в настройках секретов в Google AI Studio.
                      </p>
                    </div>
                  )}

                  {tgError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-2xl text-left space-y-1.5 max-w-xs mx-auto font-sans">
                      <span className="font-bold text-red-400 flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-red-550 shrink-0" />
                        <span>Ошибка Telegram</span>
                      </span>
                      <p className="text-[11px] leading-relaxed text-graphite-300">
                        {tgError}. Пожалуйста, проверьте верность токена бота и Chat ID.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleResetForm}
                    className="text-xs text-graphite-500 hover:text-turquoise-400 transition-colors font-semibold underline cursor-pointer"
                  >
                    Заполнить еще одну заявку
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ================= SECTION 13: FAQ ACCORDION ================= */}
        <div id="faq" className="max-w-4xl mx-auto mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Ответы на вопросы</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Часто задаваемые <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">вопросы</span>
            </h2>
            <p className="text-sm text-graphite-400 font-sans">
              Собрали самые популярные вопросы от массажистов, планирующих обучение нашей технике.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between text-white font-sans font-semibold text-sm sm:text-base focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="w-4 h-4 text-turquoise-400 shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-graphite-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-turquoise-400' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-graphite-400 leading-relaxed border-t border-graphite-900 pt-4 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 14: FINAL FOOTER CTA ================= */}
        <div className="text-center max-w-4xl mx-auto border-t border-graphite-800/80 pt-16 pb-6">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              Освойте инструментальный массаж и{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">
                сохраните руки в профессии
              </span>
            </h3>
            
            <p className="text-xs sm:text-sm text-graphite-400 font-sans max-w-md mx-auto">
              Нажмите кнопку ниже, чтобы перейти к форме регистрации и гарантировать себе скидку 50%. Начните практиковать бережный подход к своим рукам уже завтра!
            </p>

            <a
              href="https://monecle.com/buy/96990"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-turquoise-500/20 transition-all cursor-pointer text-sm"
              id="final-cta-btn"
            >
              <span>Оплатить обучение за 4500 ₽</span>
              <Check className="w-4 h-4 text-graphite-950" />
            </a>
          </div>

          {/* Humble clean legal footer */}
          <div className="mt-20 pt-8 border-t border-graphite-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[10px] text-graphite-500 font-sans">
            <div className="space-y-1 text-left">
              <p className="text-graphite-300 font-semibold">© 2026 Школа массажа Дмитрия Катаева</p>
              <p>ИП КАТАЕВ ДМИТРИЙ СЕРГЕЕВИЧ | ИНН: 741518264009</p>
              <p>Тел. <a href="tel:+790909100" className="hover:text-turquoise-400 transition-colors font-mono font-semibold">+7 (909) 091-00</a></p>
            </div>
            <div className="space-y-1.5 md:text-right text-left">
              <p>Не является медицинским пособием. Оздоровительные и физкультурные техники.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-start md:justify-end">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: { type: 'privacy' } }))}
                  className="hover:text-turquoise-400 transition-colors cursor-pointer"
                >
                  Политика конфиденциальности
                </button>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: { type: 'offer' } }))}
                  className="hover:text-turquoise-400 transition-colors cursor-pointer"
                >
                  Договор оферты
                </button>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: { type: 'refund' } }))}
                  className="hover:text-turquoise-400 transition-colors cursor-pointer"
                >
                  Условия возврата и гарантия
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
