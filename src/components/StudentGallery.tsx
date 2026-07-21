import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ZoomIn, X, MapPin } from 'lucide-react';
import { SafeImage } from './SafeImage';

import studentPhoto1 from '../assets/images/regenerated_image_1784574022752.png';
import studentPhoto2 from '../assets/images/regenerated_image_1784574157459.png';
import studentPhoto3 from '../assets/images/regenerated_image_1784574155225.png';
import studentPhoto4 from '../assets/images/regenerated_image_1784574159272.png';

interface StudentPhoto {
  id: number;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
}

const STUDENT_PHOTOS: StudentPhoto[] = [
  {
    id: 1,
    name: 'Анастасия',
    city: 'Москва',
    description: 'Отработка эргономичного хвата и техники глубокого инструментального релиза широчайших мышц спины.',
    imageUrl: studentPhoto1
  },
  {
    id: 2,
    name: 'Марина',
    city: 'Санкт-Петербург',
    description: 'Работа со скребком IASTM в шейно-воротниковой зоне без чрезмерной нагрузки на пальцы рук.',
    imageUrl: studentPhoto2
  },
  {
    id: 3,
    name: 'Елена',
    city: 'Новосибирск',
    description: 'Деликатное выглаживание фасциальных укорочений и проработка триггерных зон лопатки.',
    imageUrl: studentPhoto3
  },
  {
    id: 4,
    name: 'Ирина',
    city: 'Краснодар',
    description: 'Локальная мобилизация мягких тканей бедра для быстрого снятия мышечного спазма у спортсмена.',
    imageUrl: studentPhoto4
  }
];

export const StudentGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<StudentPhoto | null>(null);

  return (
    <section id="student-gallery" className="bg-graphite-900 text-white py-20 lg:py-28 relative overflow-hidden border-t border-b border-white/5">
      {/* Background decoration orbs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-turquoise-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-deepblue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-turquoise-500/10 border border-turquoise-400/20 px-3 py-1 rounded-full text-xs font-mono text-turquoise-400 uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Наши студенты в деле</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Практика и <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">проработка навыков</span>
          </h2>
          <p className="text-sm sm:text-base text-graphite-400 max-w-2xl mx-auto font-sans">
            Реальные кадры работы наших учеников. Они берегут свои суставы и добиваются результатов с первых сеансов.
          </p>
        </div>

        {/* 4-Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STUDENT_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-turquoise-500/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => setActivePhoto(photo)}
            >
              {/* Image Container with Zoom Trigger */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-graphite-950">
                <SafeImage
                  localSrc={photo.imageUrl}
                  fallbackSrc="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
                  alt={`Практика студента ${photo.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-graphite-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Simple Photo Caption (No description or extra text) */}
              <div className="p-4 flex items-center justify-center bg-white/[0.02]">
                <span className="font-bold text-white text-sm sm:text-base">{photo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-graphite-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-graphite-900 border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full relative shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full border border-white/10 text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto bg-black relative">
                <SafeImage
                  localSrc={activePhoto.imageUrl}
                  fallbackSrc="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
                  alt={`Практика студента ${activePhoto.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-graphite-900 to-graphite-950">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">{activePhoto.name}</h3>
                    <span className="inline-flex items-center text-xs text-turquoise-400 bg-turquoise-500/10 px-3 py-1 rounded-full border border-turquoise-400/20">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {activePhoto.city}
                    </span>
                  </div>
                  <p className="text-sm text-graphite-300 leading-relaxed font-sans mb-6">
                    {activePhoto.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-graphite-400">
                    <span>Статус обучения</span>
                    <span className="text-turquoise-400 font-semibold">Сертификация пройдена</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-graphite-400">
                    <span>Инструмент</span>
                    <span className="text-white">Скребок IASTM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
