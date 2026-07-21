import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, RotateCcw } from 'lucide-react';

type DocType = 'privacy' | 'offer' | 'refund';

export const LegalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DocType>('privacy');

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ type: DocType }>) => {
      if (e.detail && e.detail.type) {
        setActiveTab(e.detail.type);
      }
      setIsOpen(true);
    };

    window.addEventListener('open-legal-modal' as any, handleOpen as any);
    return () => window.removeEventListener('open-legal-modal' as any, handleOpen as any);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const tabs: { id: DocType; label: string; icon: any }[] = [
    { id: 'privacy', label: 'Политика конфиденциальности', icon: Shield },
    { id: 'offer', label: 'Договор оферты', icon: FileText },
    { id: 'refund', label: 'Гарантия и возврат', icon: RotateCcw },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-graphite-950/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-3xl bg-graphite-900 border border-white/10 rounded-3xl overflow-hidden z-10 flex flex-col max-h-[85vh] shadow-2xl shadow-black/80"
          >
            {/* Header decor */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-turquoise-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-deepblue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="p-6 border-b border-graphite-800/80 relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-sans tracking-tight text-white flex items-center space-x-2">
                  <span>Юридические документы</span>
                </h3>
                <p className="text-xs text-graphite-400 mt-0.5">Школа массажа Дмитрия Катаева | ИП Катаев Д.С.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-graphite-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-graphite-800/80 bg-graphite-950/40 relative z-10 p-2 overflow-x-auto gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all shrink-0 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-turquoise-500/10 text-turquoise-400 border border-turquoise-500/20 shadow-sm'
                        : 'text-graphite-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 font-sans text-xs sm:text-sm text-graphite-300 leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-graphite-800 scrollbar-track-transparent">
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">ПОЛИТИКА В ОТНОШЕНИИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h4>
                  <p className="text-[11px] text-graphite-500 font-mono">Последнее обновление: Июль 2026 г. | Разработано в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных»</p>
                  
                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">1. Общие положения</h5>
                    <p>
                      Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей (далее — «Пользователь»), оставляющих свои контактные данные на сайте Школы массажа Дмитрия Катаева (далее — «Оператор» / «Школа»).
                    </p>
                    <p>
                      Оператором персональных данных является <strong>ИП КАТАЕВ ДМИТРИЙ СЕРГЕЕВИЧ</strong> (ИНН: 741518264009). Мы уделяем приоритетное внимание конфиденциальности и безопасности ваших данных.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">2. Какую информацию мы собираем</h5>
                    <p>При заполнении формы обратной связи или формы оплаты курса на Сайте, Пользователь добровольно предоставляет следующие сведения:</p>
                    <ul className="list-disc list-inside pl-2 space-y-1">
                      <li>Имя (для персонализации общения);</li>
                      <li>Номер телефона (для звонков или отправки сообщений);</li>
                      <li>Адрес электронной почты (Email);</li>
                      <li>Предпочитаемый способ связи / мессенджер (Telegram, WhatsApp, Viber, Phone);</li>
                      <li>Системные метаданные (точное UTC время отправки заявки).</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">3. Цели и способы обработки персональных данных</h5>
                    <p>Сбор данных осуществляется исключительно в целях:</p>
                    <ul className="list-disc list-inside pl-2 space-y-1">
                      <li>Оперативной связи с Пользователем для уточнения деталей участия в обучении;</li>
                      <li>Предоставления бесплатного доступа к урокам и методическим материалам;</li>
                      <li>Организации и технического обеспечения онлайн-обучения;</li>
                      <li>Выставления счетов и приема безопасной оплаты через банковские эквайринги.</li>
                    </ul>
                    <p className="p-3 bg-graphite-950 rounded-xl border border-white/5 text-[12px] text-graphite-400 leading-relaxed font-mono">
                      <strong>Примечание об обработке заявок:</strong> Для быстрой обработки обращения данные из формы могут передаваться администратору курса через служебные каналы связи: email-уведомление, Telegram-бот или выбранный Пользователем мессенджер. Данные используются только для связи по заявке, оплаты и предоставления доступа к обучению.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">4. Согласие Пользователя и защита данных</h5>
                    <p>
                      Нажимая кнопки «Оформить», «Начать обучение» или «Отправить» на Сайте, Пользователь дает безоговорочное согласие на обработку своих персональных данных в соответствии с настоящей Политикой. Мы используем передовые методы шифрования данных SSL для защиты информации при ее передаче.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">5. Срок хранения данных и отзыв согласия</h5>
                    <p>
                      Персональные данные хранятся и обрабатываются до достижения целей обработки или до момента отзыва согласия Пользователем. Пользователь вправе в любой момент отозвать свое согласие на обработку, обратившись к нам по официальному телефону <a href="tel:+79090714777" className="text-turquoise-400 hover:underline">+7 (909) 071-47-77</a> или направив письменный запрос.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'offer' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">ПУБЛИЧНАЯ ОФЕРТА О ПРЕДОСТАВЛЕНИИ ИНФОРМАЦИОННО-ОБУЧАЮЩИХ УСЛУГ</h4>
                  <p className="text-[11px] text-graphite-500 font-mono">Последнее обновление: Июль 2026 г. | Регулируется Гражданским кодексом Российской Федерации</p>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">1. Предмет договора-оферты</h5>
                    <p>
                      Исполнитель в лице <strong>ИП КАТАЕВ ДМИТРИЙ СЕРГЕЕВИЧ</strong> обязуется предоставить Заказчику (любому лицу, совершившему акцепт оферты) доступ к онлайн-курсу инструментального массажа лица и тела (видеоматериалы, методические инструкции, чек-листы), а Заказчик обязуется оплатить данные услуги в соответствии с установленным тарифом.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">2. Акцепт Оферты</h5>
                    <p>
                      Акцептом (полным и безоговорочным принятием условий договора) является совершение Заказчиком одного или нескольких действий на сайте: заполнение регистрационной формы, нажатие кнопки согласия и произведение полной или частичной оплаты услуг Исполнителя.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">3. Стоимость услуг и порядок расчетов</h5>
                    <p>
                      Стоимость доступа к полному онлайн-курсу составляет <strong>4 500 рублей</strong> (со скидкой 50%). Все расчеты производятся в рублях РФ через сертифицированные платежные системы, обеспечивающие безопасность интернет-платежей.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">4. Права и обязанности сторон</h5>
                    <p><strong>Исполнитель обязуется:</strong> Предоставить качественный доступ к курсу в течение 24 часов после успешного прохождения оплаты. Оказывать информационную поддержку.</p>
                    <p><strong>Заказчик обязуется:</strong> Не распространять учебные материалы (видео, тексты) третьим лицам без письменного согласия Исполнителя, соблюдать авторские права.</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">5. Реквизиты Исполнителя</h5>
                    <div className="p-4 bg-graphite-950 rounded-2xl border border-white/5 space-y-1 text-xs text-graphite-400 font-mono">
                      <p className="text-white font-bold font-sans">ИП КАТАЕВ ДМИТРИЙ СЕРГЕЕВИЧ</p>
                      <p>ИНН: 741518264009</p>
                      <p>ОГРНИП: 321745600078123</p>
                      <p>Телефон для связи: +7 (909) 071-47-77</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'refund' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">ГАРАНТИЯ КАЧЕСТВА И УСЛОВИЯ ВОЗВРАТА СРЕДСТВ</h4>
                  <p className="text-[11px] text-graphite-500 font-mono">Действует на территории РФ в соответствии с Законом РФ «О защите прав потребителей»</p>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">1. Наша 100% гарантия качества</h5>
                    <p>
                      Мы абсолютно уверены в эффективности нашей авторской методики инструментального массажа. Школа Дмитрия Катаева стремится к тому, чтобы каждый студент остался доволен обучением и смог сразу же окупить вложения в курс в своей ежедневной практике.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">2. Сроки и условия возврата средств</h5>
                    <p>
                      В соответствии со ст. 32 Закона РФ «О защите прав потребителей» и ст. 782 ГК РФ, Заказчик может расторгнуть договор и запросить возврат оплаченных денежных средств в любое время, оплатив Исполнителю фактически понесенные расходы.
                    </p>
                    <p className="p-3 bg-turquoise-500/5 rounded-xl border border-turquoise-500/10 text-turquoise-300">
                      <strong>Безопасный период возврата:</strong> В течение <strong>14 календарных дней</strong> с момента покупки мы предоставляем гарантию возврата средств в полном объеме, если учебные материалы вам не подошли и вы еще не приступали к просмотру основных видеоуроков.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">3. Как запросить возврат</h5>
                    <p>Для оформления возврата средств выполните следующие шаги:</p>
                    <ol className="list-decimal list-inside pl-2 space-y-1.5">
                      <li>Свяжитесь напрямую с Исполнителем или менеджером поддержки Максимом удобным для вас способом:
                        <ul className="list-disc list-inside pl-4 mt-1 text-xs text-graphite-400 space-y-0.5 font-mono">
                          <li>Телефон: <a href="tel:+79090714777" className="text-turquoise-400 hover:underline">+7 (909) 071-47-77</a></li>
                          <li>Max: <a href="https://max.ru/u/f9LHodD0cOLn5O61OFC7o-wpv8Oj8zmByLURYebcGWW6hpSB7f24X0ykiQA" target="_blank" rel="noopener noreferrer" className="text-turquoise-400 hover:underline">Поддержка Максима (Max)</a></li>
                        </ul>
                      </li>
                      <li>Предоставьте подтверждение оплаты (электронный чек платежной системы);</li>
                      <li>Укажите причину (это поможет нам улучшать курс для будущих студентов).</li>
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-turquoise-400 text-xs uppercase tracking-wider">4. Сроки перечисления средств</h5>
                    <p>
                      После подтверждения заявки денежные средства автоматически возвращаются на банковскую карту, с которой была совершена оплата, в течение <strong>5–10 рабочих дней</strong> (точный срок зависит от вашего банка).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-graphite-800/80 bg-graphite-950/20 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-graphite-500 font-sans text-center sm:text-left">
                ИП Катаев Д.С. ИНН 741518264009. Все права защищены © 2026.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto bg-graphite-800 hover:bg-graphite-700 text-white font-semibold py-2 px-6 rounded-xl transition-all cursor-pointer text-xs"
              >
                Понятно, закрыть
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
