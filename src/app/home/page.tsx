'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Components
import HeroVideo from '@/components/features/HeroVideo';
import FloatingDonateButton from '@/components/ui/FloatingDonateButton';
import ChatbotButton from '@/components/features/ChatbotButton';

// Home Components
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import EventsSection from '@/components/home/EventsSection';
import DailyActivitiesSection from '@/components/home/DailyActivitiesSection';
import VolunteerOpportunities from '@/components/home/VolunteerOpportunities';
import ImpactSection from '@/components/home/ImpactSection';
import FeaturedCauses from '@/components/home/FeaturedCauses';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  // For parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setMounted(true);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for stats section
    if (statsRef.current) {
      gsap.from('.stat-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    // Animation for events section
    if (eventsRef.current) {
      gsap.from('.event-card', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: eventsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Mock data for causes
  const causes = [
    {
      id: 1,
      title: 'Clean Water Initiative',
      description: 'Providing clean water access to remote villages',
      image: '/images/causes/water.jpg',
      raised: 15000,
      goal: 25000,
      donors: 123
    },
    {
      id: 2,
      title: 'Education for All',
      description: 'Supporting underprivileged children with quality education',
      image: '/images/causes/education.jpg',
      raised: 28000,
      goal: 50000,
      donors: 245
    },
    {
      id: 3,
      title: 'Healthcare Access',
      description: 'Mobile medical camps for rural communities',
      image: '/images/causes/healthcare.jpg',
      raised: 12000,
      goal: 30000,
      donors: 98
    }
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Charity Gala',
      date: 'April 15, 2025',
      time: '7:00 PM - 10:00 PM',
      location: 'Grand Ballroom, Metropolis Hotel',
      image: '/images/events/gala.jpg',
      description: 'Join us for an elegant evening of entertainment and fundraising to support our global initiatives.',
      featured: true
    },
    {
      id: 2,
      title: 'Charity Run for Education',
      date: 'May 5, 2025',
      time: '8:00 AM - 12:00 PM',
      location: 'Central Park',
      image: '/images/events/run.jpg',
      description: 'Participate in our 5K/10K charity run to raise funds for educational programs in underprivileged areas.',
      featured: true
    },
    {
      id: 4,
      title: 'Charity Run for Hospital',
      date: 'May 5, 2025',
      time: '8:00 AM - 12:00 PM',
      location: 'Central Park',
      image: '/images/events/run.jpg',
      description: 'Participate in our 5K/10K charity run to raise funds for educational programs in underprivileged areas.',
      featured: true
    },
    {
      id: 3,
      title: 'Tech for Good Hackathon',
      date: 'May 22-23, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Innovation Hub',
      image: '/images/events/hackathon.jpg',
      description: 'Developers and designers team up to create technological solutions for humanitarian challenges.',
      featured: false
    }
  ];
  
  // Mock data for daily activities
  const dailyActivities = [
    {
      id: 1,
      title: 'Food Distribution',
      time: 'Daily, 12:00 PM - 2:00 PM',
      location: 'Various Community Centers',
      description: 'Our volunteers distribute nutritious meals to those in need across the city.',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      id: 2,
      title: 'After-School Learning Program',
      time: 'Weekdays, 3:30 PM - 5:30 PM',
      location: 'Community Education Centers',
      description: 'Providing tutoring and enrichment activities for underprivileged children.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    {
      id: 3,
      title: 'Senior Care Visits',
      time: 'Daily, 10:00 AM - 12:00 PM',
      location: 'Various Senior Living Facilities',
      description: 'Volunteers provide companionship and assistance to elderly individuals.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
      id: 4,
      title: 'Free Medical Checkups',
      time: '9:00 AM - 1:00 PM',
      location: 'Mobile Health Clinics',
      description: 'Providing basic health screenings and consultations in underserved areas.',
      days: ['Tuesday', 'Thursday', 'Saturday']
    }
  ];

  if (!mounted) return null;

  return (
    <main className="overflow-hidden">
      <HeroSection heroRef={heroRef} heroTextY={heroTextY} heroOpacity={heroOpacity} />
      
      {/* Featured Upcoming Event Alert Banner - Now positioned after Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">Next Event: Annual Charity Gala - April 15, 2025</span>
            </div>
            <Link 
              href="/events/charity-gala" 
              className="flex items-center text-white hover:text-blue-100 transition"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <StatsSection statsRef={statsRef} />
      <EventsSection eventsRef={eventsRef} upcomingEvents={upcomingEvents} />
      <DailyActivitiesSection dailyActivities={dailyActivities} />
      <VolunteerOpportunities />
      <ImpactSection />
      <FeaturedCauses causes={causes} />
      <TestimonialsSection />
      <CallToAction />
      <NewsletterSection />
      
      {/* Floating Donation Button & AI Chatbot */}
      <FloatingDonateButton />
      <ChatbotButton />
    </main>
  );
}