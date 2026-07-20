import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="bg-graphite-950 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative ambient background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-turquoise-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Отзывы выпускников</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Результаты тех, кто уже <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">применяет скребки</span> на практике
          </h2>
          <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto font-sans">
            Узнайте, как обучение помогло практикующим специалистам разгрузить суставы рук, повысить прайс и получить восторг клиентов.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 relative hover:border-turquoise-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-turquoise-500/10 transition-colors duration-300">
                <Quote className="w-full h-full" />
              </div>

              <div>
                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-graphite-900 shrink-0">
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback if Unsplash fails or rate limits
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(review.name)}`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{review.name}</h3>
                    <p className="text-xs text-turquoise-400 font-medium mt-0.5">{review.role}</p>
                    <p className="text-[10px] text-graphite-400 uppercase tracking-wider font-mono mt-0.5">{review.experience}</p>
                  </div>
                </div>

                {/* Rating & Highlight Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center text-amber-400 space-x-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-turquoise-400 bg-turquoise-500/10 px-2.5 py-0.5 rounded border border-turquoise-400/20">
                    {review.highlight}
                  </span>
                </div>

                {/* Main Review text */}
                <p className="text-sm text-graphite-200 leading-relaxed font-sans italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Tangible Outcome */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-start space-x-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-graphite-400 uppercase tracking-wider block">Главный результат:</span>
                  <span className="text-sm font-semibold text-emerald-400 block mt-0.5">{review.outcome}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
