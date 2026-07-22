import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2, ChevronRight, Sparkles, Layers, ListTodo, ShieldAlert, Zap } from 'lucide-react';
import { THEORY_BLOCK_ITEMS, PRACTICE_ZONES, COURSE_INCLUSIONS } from '../data';

export const CourseCurriculum: React.FC = () => {
  const [activeZoneIdx, setActiveZoneIdx] = useState(0);

  return (
    <section id="curriculum" className="bg-graphite-950 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-turquoise-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-deepblue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= THEORY BLOCK (Section 5) ================= */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Теоретический фундамент</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              На теоретическом блоке <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">вы изучите</span>
            </h2>
            <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto">
              Перед началом практических занятий мы заложим прочную научную и медицинскую базу, необходимую для безопасного проведения массажа.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {THEORY_BLOCK_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-turquoise-500/30 transition-all duration-300"
              >
                {/* Index water-mark */}
                <span aria-hidden="true" className="absolute right-4 top-2 text-7xl font-mono font-bold text-graphite-800/30 select-none group-hover:text-turquoise-500/10 transition-colors">
                  0{idx + 1}
                </span>

                <div className="p-2.5 rounded-lg bg-turquoise-500/10 text-turquoise-400 w-fit mb-4 relative z-10">
                  {idx === 0 && <Layers className="w-5 h-5" />}
                  {idx === 1 && <ShieldAlert className="w-5 h-5" />}
                  {idx === 2 && <Zap className="w-5 h-5" />}
                  {idx === 3 && <ListTodo className="w-5 h-5" />}
                </div>

                <div className="relative z-10 space-y-2">
                  <h4 className="font-semibold text-white group-hover:text-turquoise-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-graphite-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= PRACTICE BLOCK (Section 6) ================= */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Полноценная отработка</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Практика: пошаговые протоколы <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">на каждую зону</span>
            </h2>
            <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto">
              Интерактивная программа уроков. Кликните по интересующей вас анатомической зоне, чтобы увидеть подробную схему практического прохождения.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            
            {/* Zone Selector (Left Column) */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x">
              {PRACTICE_ZONES.map((zone, idx) => {
                const isActive = activeZoneIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveZoneIdx(idx)}
                    className={`snap-center shrink-0 w-64 lg:w-full text-left px-5 py-4 rounded-xl font-medium border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white/15 backdrop-blur-md border-white/25 text-turquoise-400 shadow-md shadow-turquoise-500/5'
                        : 'bg-white/5 backdrop-blur-md border-white/5 text-graphite-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-turquoise-400 animate-pulse' : 'bg-graphite-700'}`} />
                      <span className="text-sm sm:text-base font-semibold">{zone.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 hidden lg:block transition-transform duration-300 ${isActive ? 'translate-x-1' : 'text-graphite-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Step Checklist Output (Right Column) */}
            <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZoneIdx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 pb-4 border-b border-graphite-800">
                    <BookOpen className="w-5 h-5 text-turquoise-400" />
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                      Программа отработки: {PRACTICE_ZONES[activeZoneIdx].title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {PRACTICE_ZONES[activeZoneIdx].items.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-start space-x-3 bg-graphite-950/60 border border-graphite-800/40 p-4 rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-turquoise-500/10 text-turquoise-400 flex items-center justify-center font-mono text-xs shrink-0 font-bold border border-turquoise-500/20 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm sm:text-base text-graphite-200 font-sans leading-relaxed">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ================= WHAT IS INCLUDED (Section 8) ================= */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-3xl max-w-5xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Summary Left */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Полная комплектация</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Что конкретно <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-emerald-400">входит в курс?</span>
              </h3>
              <p className="text-sm text-graphite-400 leading-relaxed font-sans">
                Вы приобретаете не просто видеоматериалы, а структурированную цифровую программу с уроками, схемами, протоколами и поддержкой по организационным вопросам.
              </p>
              
              <div className="pt-2 hidden lg:block">
                <div className="w-16 h-1 bg-turquoise-500 rounded" />
              </div>
            </div>

            {/* List Right */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COURSE_INCLUSIONS.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-turquoise-400 shrink-0 mt-1" />
                    <span className="text-sm text-graphite-200 font-sans leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
