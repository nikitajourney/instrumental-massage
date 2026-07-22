import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Layers, Shield, Menu, X, ArrowRight, Play } from 'lucide-react';
import { APP_METADATA, FALLBACK_IMAGES, USER_ASSET_PATHS } from '../data';
import { SafeImage } from './SafeImage';
import heroImage from '../assets/images/optimized/hero.webp';
import { trackGoal } from '../services/analytics';
import { getTrackedMonecleBuyUrl } from '../services/trackingLinks';

export const Hero: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Бесплатные уроки', id: 'free-lessons' },
    { label: 'Программа', id: 'curriculum' },
    { label: 'Преподаватель', id: 'instructor' },
    { label: 'Окупаемость', id: 'roi-calculator' },
    { label: 'Сертификат', id: 'certificate' },
    { label: 'Отзывы', id: 'reviews' },
    { label: 'Цена', id: 'pricing' }
  ];

  return (
    <section className="relative min-h-screen bg-graphite-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-turquoise-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-deepblue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Sticky Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/75 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-turquoise-600 to-turquoise-400 flex items-center justify-center shadow-lg shadow-turquoise-500/20 flex-shrink-0">
              <span className="font-display font-bold text-lg text-graphite-950">ИМ</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white block leading-none">ИНСТРУМЕНТАЛЬНЫЙ</span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-turquoise-400 font-mono uppercase block mt-1 leading-none">МАССАЖ • ОНЛАЙН</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-graphite-400 hover:text-turquoise-400 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header CTA Button */}
          <div className="hidden md:block">
            <a
              href={getTrackedMonecleBuyUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_pay_course', { placement: 'header' })}
              className="bg-transparent hover:bg-turquoise-500/10 text-turquoise-400 hover:text-white border border-turquoise-500/30 hover:border-turquoise-500 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm shadow-turquoise-500/5 cursor-pointer inline-block"
            >
              Оплатить курс
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-graphite-400 hover:text-white hover:bg-graphite-800/50 transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-24 bg-graphite-950/98 backdrop-blur-lg flex flex-col px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-lg font-medium text-graphite-300 border-b border-graphite-800/50 pb-3 hover:text-turquoise-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={getTrackedMonecleBuyUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackGoal('click_pay_course', { placement: 'mobile_menu' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-bold py-4 rounded-xl shadow-lg shadow-turquoise-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer text-center"
              >
                <span>Оплатить за <span className="whitespace-nowrap">{APP_METADATA.priceCurrent}р.</span></span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content */}
      <div className="flex-grow flex items-center pt-28 pb-16 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col space-y-8 z-10 text-center lg:text-left">
              {/* Promo tag */}
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-turquoise-500/10 text-turquoise-400 border border-turquoise-500/20 shadow-inner">
                  ✨ Профессиональное онлайн-обучение
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight text-white">
                Научитесь инструментальному массажу и{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-emerald-400">
                  снизьте нагрузку на руки
                </span>{' '}
                без потери глубины проработки
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-graphite-400 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Онлайн-курс для массажистов: 5 модулей, 7 академических часов, более 20 практических видеоуроков и пошаговые протоколы на каждую зону тела.
              </p>

              {/* Pricing section with timer placeholder */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl max-w-md mx-auto lg:mx-0 shadow-lg">
                <div>
                  <span className="text-xs text-graphite-400 block uppercase tracking-wider font-mono">Специальная цена</span>
                  <div className="flex items-baseline space-x-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white">{APP_METADATA.priceCurrent} ₽</span>
                    <span className="text-sm sm:text-base line-through text-graphite-500 font-mono">{APP_METADATA.priceOriginal} ₽</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-graphite-800" />
                <div>
                  <span className="text-xs text-turquoise-400 font-semibold block uppercase tracking-wider">Скидка 50%</span>
                  <span className="text-xs text-graphite-400 block mt-0.5">Доступ на 6 месяцев</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={getTrackedMonecleBuyUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGoal('click_pay_course', { placement: 'hero' })}
                  className="w-full sm:w-auto bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-bold px-8 py-4.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-turquoise-500/20 flex items-center justify-center space-x-2 cursor-pointer text-center"
                  id="hero-cta-primary"
                >
                  <span>Оплатить курс за <span className="whitespace-nowrap">{APP_METADATA.priceCurrent}р.</span></span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    trackGoal('click_free_lesson', { placement: 'hero' });
                    scrollToSection('free-lessons');
                  }}
                  className="w-full sm:w-auto bg-graphite-800/80 hover:bg-graphite-800 text-white font-medium px-8 py-4.5 rounded-xl border border-graphite-700 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  id="hero-cta-secondary"
                >
                  <Play className="w-4 h-4 fill-current text-turquoise-400" />
                  <span>Смотреть бесплатные уроки</span>
                </button>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative z-10 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/60 group border border-graphite-800">
                
                {/* Main Photo */}
                <SafeImage
                  localSrc={heroImage}
                  fallbackSrc={FALLBACK_IMAGES.hero}
                  alt="Инструментальный массаж спины скребком"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-transparent" />

                {/* Floating Micro-Badge: 5 модулей */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center space-x-2.5 shadow-lg">
                  <div className="p-1.5 rounded-lg bg-turquoise-500/10 text-turquoise-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-graphite-400 block font-mono">Программа</span>
                    <span className="text-xs font-bold text-white block">5 Модулей</span>
                  </div>
                </div>

                {/* Floating Micro-Badge: 20+ уроков */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-turquoise-500/10 text-turquoise-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">20+ Видеоуроков</span>
                      <span className="text-[11px] text-graphite-400 block">Пошаговая практика</span>
                    </div>
                  </div>
                  <div className="bg-turquoise-500/10 text-turquoise-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">
                    HD Качество
                  </div>
                </div>

                {/* Floating Circle Badge: 7 часов */}
                <div className="absolute top-4 right-4 bg-gradient-to-br from-turquoise-500 to-turquoise-600 text-graphite-950 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg shadow-turquoise-500/20 border border-turquoise-400/20">
                  <span className="text-base font-bold font-mono leading-none">7ч</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold font-sans mt-0.5 leading-none">Курс</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Grid Features Bottom Bar */}
      <div className="bg-white/5 backdrop-blur-xl border-t border-b border-white/10 py-8 lg:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {APP_METADATA.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col space-y-1.5 border-l-2 border-turquoise-500/30 pl-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-sm font-semibold text-graphite-200">{stat.label}</span>
                <span className="text-xs text-graphite-500">{stat.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
