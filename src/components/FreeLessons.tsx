import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Clock, X, Lock, CheckCircle, Award } from 'lucide-react';
import { FREE_LESSONS, FALLBACK_IMAGES } from '../data';
import { FreeLesson } from '../types';
import { SafeImage } from './SafeImage';

const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  
  // Already an embed URL
  if (url.includes('video_ext.php') || url.includes('/embed/')) {
    return url;
  }
  
  // VK Video parsing (both vk.com and vkvideo.ru)
  if (url.includes('vk.com/video') || url.includes('vkvideo.ru/video')) {
    // Match pattern like video-181945322_456239144
    const match = url.match(/video(-?\d+)_(\d+)/);
    if (match) {
      const oid = match[1];
      const id = match[2];
      
      // Extract access hash / list token which is required to play VK videos in iframes
      let hash = '';
      const hashMatch = url.match(/[?&]hash=([^&]+)/);
      const listMatch = url.match(/[?&]list=([^&]+)/);
      if (hashMatch) {
        hash = hashMatch[1];
      } else if (listMatch) {
        const listVal = listMatch[1];
        if (listVal.startsWith('ln-')) {
          hash = listVal.substring(3);
        } else {
          hash = listVal;
        }
      }
      
      const hashQuery = hash ? `&hash=${hash}` : '';
      return `https://vk.com/video_ext.php?oid=${oid}&id=${id}${hashQuery}&hd=2&autoplay=1`;
    }
  }
  
  // YouTube parsing
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  }

  return null;
};

export const FreeLessons: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<FreeLesson | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleOpenVideo = (lesson: FreeLesson) => {
    setActiveLesson(lesson);
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setActiveLesson(null);
  };

  return (
    <section id="free-lessons" className="bg-graphite-900 text-white py-20 lg:py-28 relative">
      {/* Background soft blur */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-turquoise-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Подарок перед стартом</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Посмотрите <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">2 бесплатных урока</span> перед покупкой
          </h2>
          <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto">
            Эти уроки были записаны специально для открытого доступа. Оцените качество съемки, подачу материала и практическую ценность методики бесплатно.
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {FREE_LESSONS.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -6 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-turquoise-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              {/* Media Container with play button overlay */}
              <div
                className="relative aspect-video overflow-hidden cursor-pointer bg-black"
                onClick={() => handleOpenVideo(lesson)}
              >
                <SafeImage
                  localSrc={lesson.posterUrl}
                  fallbackSrc={idx === 0 ? FALLBACK_IMAGES.lesson1_poster : FALLBACK_IMAGES.lesson2_poster}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                
                {/* Backdrop dark shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/25 group-hover:from-black/75 group-hover:to-black/35 transition-all duration-300" />

                {/* Free Badge */}
                <div className="absolute top-4 left-4 bg-turquoise-500 text-graphite-950 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  БЕСПЛАТНО
                </div>



                {/* Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-turquoise-500/10 border border-turquoise-400/40 flex items-center justify-center backdrop-blur-sm group-hover:bg-turquoise-500 group-hover:text-graphite-950 transition-all duration-300 shadow-xl shadow-turquoise-500/10">
                    <Play className="w-6 h-6 fill-current text-turquoise-400 group-hover:text-graphite-950 ml-0.5 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Text Information block */}
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-white group-hover:text-turquoise-400 transition-colors">
                    {lesson.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleOpenVideo(lesson)}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-turquoise-400 hover:text-turquoise-300 transition-colors pt-2 group/btn cursor-pointer"
                >
                  <span>Смотреть урок бесплатно</span>
                  <Play className="w-3 h-3 fill-current text-turquoise-400 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Streaming Modal */}
      <AnimatePresence>
        {isVideoPlaying && activeLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-graphite-950 border border-graphite-800 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl relative"
            >
              
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-graphite-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-turquoise-400 font-bold tracking-widest">Бесплатный видеоурок</span>
                  <h4 className="text-sm sm:text-base font-semibold text-white mt-1 line-clamp-1">{activeLesson.title}</h4>
                </div>
                <button
                  onClick={handleCloseVideo}
                  className="p-2 rounded-lg bg-graphite-900 hover:bg-graphite-800 text-graphite-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-video bg-black">
                {getEmbedUrl(activeLesson.videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(activeLesson.videoUrl)!}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                    allowFullScreen
                    title={activeLesson.title}
                  />
                ) : (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    poster={activeLesson.posterUrl}
                  >
                    {/* Attempt to load the user's uploaded video, fall back to free preview if not found */}
                    <source src={activeLesson.videoUrl} type="video/mp4" />
                    <source src={activeLesson.fallbackUrl} type="video/mp4" />
                    Ваш браузер не поддерживает встроенный плеер.
                  </video>
                )}
              </div>

              {/* Promo Banner below video */}
              <div className="p-6 bg-gradient-to-r from-turquoise-950/40 to-graphite-950 border-t border-graphite-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <h5 className="text-xs uppercase font-mono text-turquoise-400 font-bold tracking-widest">Понравилась подача?</h5>
                  <p className="text-sm text-white">Разблокируйте остальные 20+ уроков и пошаговые протоколы со скидкой 50%!</p>
                </div>
                <button
                  onClick={() => {
                    handleCloseVideo();
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-turquoise-500/10 cursor-pointer whitespace-nowrap"
                >
                  Начать обучение за 4500 ₽
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
