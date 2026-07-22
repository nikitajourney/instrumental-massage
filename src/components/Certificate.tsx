import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, HeartHandshake, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { LEARNING_OUTCOMES, FALLBACK_IMAGES } from '../data';
import { SafeImage } from './SafeImage';
import certificatePhoto from '../assets/images/optimized/teacher.webp';

export const Certificate: React.FC = () => {
  return (
    <section id="certificate" className="bg-graphite-950 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Visual background lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-turquoise-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION 7: WHAT YOU WILL LEARN ================= */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Приобретаемые навыки</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Чему <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">вы научитесь</span> на курсе
            </h2>
            <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto">
              Курс разработан так, чтобы вы сразу интегрировали скребок в свою практику и ощутили качественные изменения в работе.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {LEARNING_OUTCOMES.map((outcome, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-turquoise-500/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center font-bold">
                    {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 1 && <Award className="w-5 h-5" />}
                    {idx === 2 && <Sparkles className="w-5 h-5" />}
                    {idx === 3 && <HeartHandshake className="w-5 h-5" />}
                    {idx === 4 && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">{outcome.title}</h4>
                  <p className="text-xs text-graphite-400 leading-relaxed font-sans">{outcome.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 10: CERTIFICATE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 lg:mb-32 max-w-6xl mx-auto">
          
          {/* Text Info (Left) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-turquoise-500/10 text-turquoise-400 px-3 py-1.5 rounded-lg border border-turquoise-500/20 text-xs font-semibold font-mono tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>Подтверждение прохождения</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
              Именной сертификат <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">после обучения</span>
            </h2>

            <p className="text-graphite-400 text-sm sm:text-base leading-relaxed font-sans">
              После просмотра видеоуроков и выполнения промежуточного теста в аккаунте формируется именной электронный сертификат школы о прохождении курса.
            </p>
          </div>

          {/* Image Mockup (Right) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <div className="relative w-full max-w-xl aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
              <SafeImage
                localSrc={certificatePhoto}
                fallbackSrc={FALLBACK_IMAGES.certificate}
                alt="Именной сертификат об окончании курса инструментального массажа"
                className="w-full h-full object-cover p-3 rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>

        {/* ================= SECTION 11: MAIN RESULT ================= */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 bg-turquoise-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-6">
            <div className="p-2.5 rounded-xl bg-turquoise-500/10 text-turquoise-400 w-fit">
              <HeartHandshake className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Главный результат:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">
                Бережная техника работы, новая услуга и уверенная практика
              </span>
            </h3>

            <p className="text-sm sm:text-base text-graphite-300 leading-relaxed font-sans">
              Курс помогает освоить технические приемы работы со скребком, научиться распределять нагрузку на руки и аккуратно внедрить новую услугу в практику. Фактический результат зависит от опыта специалиста, соблюдения техники безопасности и особенностей клиентов.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
