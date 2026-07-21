import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldCheck, Heart, Sparkles, TrendingUp, HandIcon } from 'lucide-react';
import { PROBLEMS, SOLUTIONS, FALLBACK_IMAGES, USER_ASSET_PATHS } from '../data';
import { SafeImage } from './SafeImage';
import scraperImage from '../assets/images/optimized/problem-scraper.webp';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="bg-graphite-950 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-1/2 left-full -translate-x-1/2 w-[600px] h-[600px] bg-turquoise-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 lg:mb-32">
          
          {/* Problem: Left Column text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 text-xs font-semibold font-mono tracking-wider uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Реальность профессии</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
              Руки массажиста — главный инструмент.{' '}
              <span className="text-red-400">Но они не железные.</span>
            </h2>
            
            <p className="text-graphite-400 text-base sm:text-lg leading-relaxed">
              Каждый день практикующий мастер сталкивается с колоссальным давлением на суставы пальцев, запястья и позвоночник. При глубокой работе с крупными клиентами или жесткими триггерами рук попросту не хватает, а усталость накапливается лавинообразно.
            </p>

            <div className="space-y-4 pt-4">
              {PROBLEMS.map((prob, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="flex items-start space-x-3.5 bg-white/5 backdrop-blur-xl border border-white/10 p-4.5 rounded-xl"
                >
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">{prob.title}</h4>
                    <p className="text-sm text-graphite-400 mt-1">{prob.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Problem: Right Column visual */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-graphite-800 shadow-2xl">
              <SafeImage
                localSrc={USER_ASSET_PATHS.practice}
                fallbackSrc={FALLBACK_IMAGES.practice}
                alt="Массажист испытывает усталость рук"
                className="w-full h-full object-cover grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="text-xs text-red-400 font-mono block uppercase font-bold">Опасный синдром</span>
                <p className="text-sm text-graphite-300 mt-1">
                  Свыше 65% массажистов испытывают хронические боли в кистях и пальцах уже на 2-й год активной работы.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Solution: Left Column visual */}
          <div className="lg:col-span-6 lg:order-last space-y-6">
            <div className="inline-flex items-center space-x-2 bg-turquoise-500/10 text-turquoise-400 px-3 py-1.5 rounded-lg border border-turquoise-500/20 text-xs font-semibold font-mono tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Выход есть</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
              Инструментальный массаж помогает работать{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">
                глубже и бережнее к себе
              </span>
            </h2>

            <p className="text-graphite-400 text-base sm:text-lg leading-relaxed">
              Метод инструментального массажа (мобилизации мягких тканей) — это признанный клинический стандарт работы с мягкими тканями. Скребок за счет своей конструкции берет всю тяжелую нагрузку на себя, становясь естественным продолжением вашей руки.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {SOLUTIONS.map((sol, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl hover:border-turquoise-500/30 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-turquoise-500/10 text-turquoise-400 w-fit mb-3">
                    {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 1 && <Sparkles className="w-5 h-5" />}
                    {idx === 2 && <Heart className="w-5 h-5" />}
                    {idx === 3 && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">{sol.title}</h4>
                  <p className="text-xs text-graphite-400 mt-1 leading-relaxed">{sol.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solution: Right Column visual with scraper */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-graphite-800 shadow-2xl">
              <SafeImage
                localSrc={scraperImage}
                fallbackSrc={FALLBACK_IMAGES.scraper}
                alt="Инструмент для массажа скребок"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-transparent" />
              


              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-turquoise-400 animate-pulse" />
                  <span className="text-xs text-turquoise-400 font-mono uppercase font-bold tracking-wider">Эффект метода</span>
                </div>
                <p className="text-xs sm:text-sm text-white leading-relaxed">
                  «Скребок скользит по коже, улавливая даже малейшие спайки и фиброзы фасции. Вы чувствуете руками то, что скрыто в глубине.»
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
