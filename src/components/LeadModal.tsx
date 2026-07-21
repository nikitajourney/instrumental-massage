import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, Smartphone, Send, Lock, CheckCircle, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { APP_METADATA } from '../data';
import { submitLead } from '../services/leadCapture';

interface LeadModalProps {
  defaultPrice?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ defaultPrice = '4500' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    messenger: 'telegram' as 'telegram' | 'max' | 'viber' | 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tgConfigured, setTgConfigured] = useState<boolean | null>(null);
  const [tgError, setTgError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsSuccess(false);
      setErrorMessage('');
      setTgConfigured(null);
      setTgError(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        messenger: 'telegram'
      });
      setIsOpen(true);
    };

    window.addEventListener('open-enroll-modal', handleOpen);
    return () => window.removeEventListener('open-enroll-modal', handleOpen);
  }, []);

  // Listen for Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Пожалуйста, введите ваше имя');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMessage('Пожалуйста, введите корректный номер телефона');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Пожалуйста, введите корректный Email адрес');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        messenger: formData.messenger,
        coursePrice: defaultPrice
      });

      if (data.success) {
        setIsSuccess(true);
        if (data.notifications && data.notifications.telegram) {
          setTgConfigured(data.notifications.telegram.configured);
        }
        if (data.errors && data.errors.length > 0) {
          const errText = data.errors.find((err: string) => err.toLowerCase().includes('telegram'));
          if (errText) {
            setTgError(errText);
          }
        }
      } else {
        setErrorMessage(data.error || 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage('Не удалось отправить заявку автоматически. Напишите нам в Telegram или Max ниже, мы быстро ответим.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-graphite-950/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-graphite-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 overflow-hidden z-10"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-turquoise-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-deepblue-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-graphite-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              id="modal-close"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="lead-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2 text-center sm:text-left pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-turquoise-400 font-semibold block">Регистрация на курс</span>
                    <h3 className="text-2xl font-display font-bold text-white">Начать обучение</h3>
                    <p className="text-xs sm:text-sm text-graphite-400 leading-relaxed font-sans">
                      Заполните форму ниже, чтобы забронировать место на курсе со скидкой 50% по цене <span className="text-white font-bold font-mono">{defaultPrice} ₽</span>.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
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
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-950 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-sans"
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
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-950 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-mono"
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
                      required
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-graphite-950 border border-graphite-800 focus:border-turquoise-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-200 font-sans"
                    />
                  </div>

                  {/* Input 4: Messenger Choice */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-graphite-400 font-bold uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-turquoise-400" />
                      <span>Способ связи</span>
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
                              : 'bg-graphite-950 border-graphite-800/80 text-graphite-400 hover:text-white hover:border-graphite-700'
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
                    id="modal-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-graphite-950 border-t-transparent rounded-full animate-spin" />
                        <span>Обработка заявки...</span>
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

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-graphite-500 font-sans text-center">
                    <Lock className="w-3 h-3 text-graphite-600 shrink-0" />
                    <span>Безопасное соединение. Ваши данные никогда не передаются третьим лицам.</span>
                  </div>

                  {/* Legal consent disclaimer */}
                  <div className="text-[10px] text-graphite-500 font-sans text-center px-2 leading-relaxed border-t border-graphite-850/60 pt-2.5">
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
                  <div className="space-y-3 pt-3 border-t border-graphite-850">
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
                        href="tel:+79090714777"
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
                  key="modal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-turquoise-500/10 border border-turquoise-400/30 text-turquoise-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-8 h-8 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white">Заявка отправлена!</h3>
                    <p className="text-sm text-graphite-300 leading-relaxed max-w-sm mx-auto font-sans">
                      Спасибо, <span className="text-white font-semibold">{formData.name}</span>! Заявка успешно получена. Для мгновенного получения доступа к курсу перейдите к оплате:
                    </p>
                  </div>

                  <div className="p-4 bg-graphite-950 border border-graphite-850 rounded-2xl max-w-xs mx-auto space-y-2">
                    <span className="text-[10px] text-turquoise-400 font-mono font-bold uppercase tracking-widest block">Канал связи</span>
                    <p className="text-xs text-white">
                      Мы свяжемся с вами через <span className="font-bold text-turquoise-400 uppercase">{formData.messenger}</span> по номеру <span className="font-mono text-turquoise-400 font-semibold">{formData.phone}</span> или напишем на <span className="text-turquoise-400 underline">{formData.email}</span>.
                    </p>
                  </div>

                  {tgConfigured === false && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-2xl text-left space-y-1.5 max-w-xs mx-auto font-sans">
                      <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Telegram не настроен</span>
                      </span>
                      <p className="text-[11px] leading-relaxed text-graphite-300">
                        Заявка сохранена, но не отправлена в Telegram. Добавьте переменные <b>TELEGRAM_BOT_TOKEN</b> и <b>TELEGRAM_CHAT_ID</b> в переменные окружения backend-хостинга.
                      </p>
                    </div>
                  )}

                  {tgError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-2xl text-left space-y-1.5 max-w-xs mx-auto font-sans">
                      <span className="font-bold text-red-400 flex items-center space-x-1.5">
                        <AlertCircle className="w-4 h-4 text-red-550 shrink-0" />
                        <span>Ошибка Telegram</span>
                      </span>
                      <p className="text-[11px] leading-relaxed text-graphite-300">
                        {tgError}. Проверьте токен бота и Chat ID.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <a
                      href="https://monecle.com/buy/96990"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center space-x-2 bg-gradient-to-r from-turquoise-400 to-teal-500 hover:from-turquoise-500 hover:to-teal-600 text-graphite-950 font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer text-sm uppercase tracking-wider text-center"
                    >
                      <span>Оплатить курс (4500 ₽)</span>
                      <ArrowRight className="w-5 h-5 text-graphite-950" />
                    </a>
                    
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-graphite-850 hover:bg-graphite-800 text-graphite-400 hover:text-white font-semibold py-3 rounded-xl transition-all cursor-pointer text-xs"
                    >
                      Закрыть окно
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
