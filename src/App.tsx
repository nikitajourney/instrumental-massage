/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { FreeLessons } from './components/FreeLessons';
import { CourseCurriculum } from './components/CourseCurriculum';
import { Instructor } from './components/Instructor';
import { RoiCalculator } from './components/RoiCalculator';
import { Certificate } from './components/Certificate';
import { Reviews } from './components/Reviews';
import { StudentGallery } from './components/StudentGallery';
import { PricingFaq } from './components/PricingFaq';
import { LeadModal } from './components/LeadModal';
import { LegalModal } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <div className="min-h-screen bg-graphite-950 text-white font-sans selection:bg-turquoise-500 selection:text-white relative overflow-x-hidden">
      {/* Immersive background decoration blur orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-turquoise-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-deepblue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-[80%] -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-turquoise-400/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* 1. Hero / Header Area */}
        <Hero />

        {/* 2 & 3. Problems and Solutions Area */}
        <ProblemSolution />

        {/* 4. Free Lessons Area */}
        <FreeLessons />

        {/* 5, 6, 8. Course Curriculum (Theory, Practice Zones, What's Included) */}
        <CourseCurriculum />

        {/* Course Instructor Details Slide Section */}
        <Instructor />

        {/* 9. ROI Payback Calculator */}
        <RoiCalculator />

        {/* 7, 10, 11. Certificate & Learning outcomes */}
        <Certificate />

        {/* 15. Reviews / Testimonials */}
        <Reviews />

        {/* Photos of our students block */}
        <StudentGallery />

        {/* 12, 13, 14. Pricing, FAQ and lead form */}
        <PricingFaq />
      </div>

      {/* Global premium leads modal form */}
      <LeadModal />

      {/* Interactive legal documents modal */}
      <LegalModal />

      {/* Cookie and analytics consent */}
      <CookieConsent />
    </div>
  );
}
