import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { SafeImage } from './SafeImage';
import dmitryPhoto from '../assets/images/regenerated_image_1784470095818.jpg';
import { FALLBACK_IMAGES } from '../data';

export const Instructor: React.FC = () => {
  const instructorInfo = {
    badge: 'Преподаватель курса',
    title: 'Дмитрий Катаев',
    subtitle: 'Практикующий массажист и сертифицированный инструктор',
    description: 'Ведущий специалист по мягкотканной мобилизации и инструментальному массажу. Создал курс, объединяющий глубокую медицинскую теорию и отточенную годами практику.',
    bullets: [
      { title: 'Более 10 лет опыта', text: 'Успешно совмещает ежедневную частную практику массажа и преподавание авторских методик.' },
      { title: '1500+ учеников', text: 'Обучил более полутора тысяч мастеров, успешно работающих в ведущих клиниках, спа-салонах и фитнес-центрах.' },
      { title: 'Авторские протоколы', text: 'Разработчик уникальных пошаговых карт проработки зон тела, сертифицированных для онлайн-обучения.' }
    ],
    stat: {
      value: '10+ лет',
      label: 'Опыт преподавания'
    }
  };

  return (
    <section id="instructor" className="bg-graphite-900 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background radial soft light decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-turquoise-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Ваш наставник</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Учитесь у <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">лучшего мастера</span> своего дела
          </h2>
          <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto font-sans">
            Дмитрий Катаев делится личным опытом и профессиональными секретами, которые нарабатывались более десяти лет.
          </p>
        </div>

        {/* Info Container */}
        <div className="relative max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Inner Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Slide Left Column (Image Card with floating stats) */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-graphite-950">
                <SafeImage
                  localSrc={dmitryPhoto}
                  fallbackSrc={FALLBACK_IMAGES.teacher}
                  alt="Дмитрий Катаев — преподаватель курса"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Decorative border overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/10 to-transparent opacity-80" />
                
                {/* Floating badge for Dmitry */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-turquoise-500/15 text-turquoise-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Дмитрий Катаев</span>
                      <span className="text-[10px] text-graphite-400 uppercase tracking-widest block font-mono">10+ лет опыта</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Right Column (Interactive Content) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              
              <div className="space-y-6">
                {/* Slide Category Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-turquoise-500/10 text-turquoise-400 border border-turquoise-500/20 shadow-inner uppercase tracking-wider font-mono">
                  ✨ {instructorInfo.badge}
                </span>

                {/* Slide Main Heading */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    {instructorInfo.title}
                  </h3>
                  <p className="text-sm text-turquoise-400 font-medium font-sans">
                    {instructorInfo.subtitle}
                  </p>
                </div>

                {/* Slide Narrative Description */}
                <p className="text-sm sm:text-base text-graphite-300 font-sans leading-relaxed">
                  {instructorInfo.description}
                </p>

                {/* Slide Checkpoints / Bullets */}
                <div className="space-y-3.5 pt-2 border-t border-white/5">
                  {instructorInfo.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-turquoise-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{bullet.title}</h4>
                        <p className="text-xs text-graphite-400 font-sans mt-0.5">{bullet.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Unique Highlight stat */}
                <div className="pt-4 flex items-center space-x-4">
                  <div className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">
                    {instructorInfo.stat.value}
                  </div>
                  <div className="text-xs uppercase text-graphite-400 font-mono tracking-wider font-semibold">
                    {instructorInfo.stat.label}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
