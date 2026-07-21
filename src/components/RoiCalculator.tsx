import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, TrendingUp, Calculator, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { APP_METADATA } from '../data';

export const RoiCalculator: React.FC = () => {
  const [sessionPrice, setSessionPrice] = useState<number>(1500);
  const [extraClients, setExtraClients] = useState<number>(5);
  const [paybackSessions, setPaybackSessions] = useState<number>(3);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(7500);
  const [sixMonthsIncome, setSixMonthsIncome] = useState<number>(45000);
  const [netProfit, setNetProfit] = useState<number>(40500);

  useEffect(() => {
    // Break even sessions count (round to 1 decimal place or ceiling)
    const payback = Math.ceil(APP_METADATA.priceCurrent / (sessionPrice || 1));
    const monthly = sessionPrice * extraClients;
    const sixMonths = monthly * 6;
    const net = sixMonths - APP_METADATA.priceCurrent;

    setPaybackSessions(payback);
    setMonthlyIncome(monthly);
    setSixMonthsIncome(sixMonths);
    setNetProfit(net);
  }, [sessionPrice, extraClients]);

  return (
    <section id="roi-calculator" className="bg-graphite-900 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-turquoise-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-turquoise-400 font-bold block">Финансовый расчет</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Рассчитайте <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-teal-400">окупаемость обучения</span>
          </h2>
          <p className="text-sm sm:text-base text-graphite-400 max-w-xl mx-auto">
            Обучение инструментальному массажу — это не расход, а вложение с быстрой окупаемостью. Убедитесь сами с помощью интерактивного калькулятора.
          </p>
        </div>

        {/* Calculator Card Container */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column: Sliders */}
            <div className="md:col-span-7 p-6 sm:p-10 space-y-8 border-b md:border-b-0 md:border-r border-graphite-800/80">
              <div className="flex items-center space-x-3 pb-3 border-b border-graphite-800/50">
                <Calculator className="w-5 h-5 text-turquoise-400" />
                <h3 className="font-display font-semibold text-white">Входные показатели</h3>
              </div>

              {/* Slider 1: Session Price */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-graphite-300 font-medium">Цена вашего сеанса массажа</label>
                  <span className="text-base font-mono font-bold text-turquoise-400">{sessionPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="6000"
                  step="100"
                  value={sessionPrice}
                  onChange={(e) => setSessionPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-graphite-800 rounded-lg appearance-none cursor-pointer accent-turquoise-500"
                />
                <div className="flex justify-between text-[11px] text-graphite-500 font-mono">
                  <span>800 ₽</span>
                  <span>3 000 ₽</span>
                  <span>6 000 ₽</span>
                </div>
              </div>

              {/* Slider 2: Additional clients in a month */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-graphite-300 font-medium">Дополнительно клиентов в месяц</label>
                  <span className="text-base font-mono font-bold text-turquoise-400">+{extraClients} чел.</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={extraClients}
                  onChange={(e) => setExtraClients(Number(e.target.value))}
                  className="w-full h-1.5 bg-graphite-800 rounded-lg appearance-none cursor-pointer accent-turquoise-500"
                />
                <div className="flex justify-between text-[11px] text-graphite-500 font-mono">
                  <span>1 клиент</span>
                  <span>12 клиентов</span>
                  <span>25 клиентов</span>
                </div>
              </div>

              {/* Helper text block */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start space-x-3">
                <Coins className="w-4 h-4 text-turquoise-400 shrink-0 mt-0.5" />
                <p className="text-xs text-graphite-400 leading-relaxed font-sans">
                  * Наличие в вашем прайсе уникальной методики инструментального массажа привлекает до 5–10 новых клиентов в первый же месяц благодаря сарафанному радио и мгновенному результату.
                </p>
              </div>
            </div>

            {/* Right Column: Outcomes Display */}
            <div className="md:col-span-5 p-6 sm:p-10 bg-white/5 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                {/* Payback procedures */}
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-turquoise-400 font-semibold">ОКУПАЕМОСТЬ КУРСА</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-mono font-bold text-white">{paybackSessions}</span>
                    <span className="text-sm text-graphite-300">сеансов массажа</span>
                  </div>
                  <p className="text-xs text-graphite-300">
                    При цене {sessionPrice} ₽ за сеанс курс окупается всего за <span className="text-white font-bold">{paybackSessions} {paybackSessions === 1 ? 'процедуру' : paybackSessions < 5 ? 'процедуры' : 'процедур'}</span>!
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-graphite-800" />

                {/* Income details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-graphite-300">Доп. доход в месяц:</span>
                    <span className="text-base font-mono font-bold text-white">+{monthlyIncome.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-graphite-300">Доп. доход за 6 мес:</span>
                    <span className="text-base font-mono font-bold text-white">+{sixMonthsIncome.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  
                  {/* Big Profit Indicator */}
                  <div className="bg-turquoise-500/10 border border-turquoise-500/20 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-turquoise-400 font-mono uppercase tracking-wider block">ЧИСТАЯ ВЫГОДА</span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-turquoise-400 block">{netProfit.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <TrendingUp className="w-8 h-8 text-turquoise-400/30" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  const el = document.getElementById('pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-graphite-950 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-turquoise-500/10 flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <span>Окупить курс за {paybackSessions} сеанса</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
