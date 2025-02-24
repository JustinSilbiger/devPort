'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform, AnimatePresence, useSpring, useAnimationFrame, useInView } from 'framer-motion'
import { ChevronDown, ExternalLink, Menu, X, Home, User, Code2, Briefcase, Mail } from 'lucide-react'
import { Inter, Outfit, Space_Grotesk, Manrope } from 'next/font/google'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiPython, SiDjango, SiPostgresql, SiFastapi, SiExpress, SiGit, SiTailwindcss, SiHtml5, SiCss3, SiBootstrap, SiJira, SiFlask, SiGoogleanalytics, SiVercel, SiMui, SiVite, SiFramer, SiRadixui, SiJsonwebtokens, SiSqlite, SiRender } from 'react-icons/si'
import { FaNodeJs, FaAws, FaGithub, FaLinkedin } from 'react-icons/fa'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const inter = Inter({ subsets: ['latin'] })

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
})

const skills = [
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'SQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React & React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  { name: 'Flask', icon: SiFlask, color: '#000000' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'AWS S3 & EC2', icon: FaAws, color: '#FF9900' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Jira', icon: SiJira, color: '#0052CC' },
]

const blurDataURLs = {
  'adco-builders': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  'tasky': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  'silbiger': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  'jtimes': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
}

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  blurDataURL: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: "ADCO Builders",
    description: "ADCO Builders is a modern, responsive website designed to attract new clients by showcasing a construction and home improvement company's services, expertise, and project portfolio. The website emphasizes user-friendly navigation, performance, and compelling visuals to engage potential customers and drive inquiries.",
    link: "https://adcobuilders.vercel.app/",
    image: "/assets/adco-builders.jpg",
    blurDataURL: blurDataURLs['adco-builders'],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive", "SEO", "CI/CD"]
  },
  {
    title: "Tasky",
    description: "Tasky is a full-stack task management platform for organizing your daily tasks and boosting productivity.",
    link: "http://taskyfe.s3-website-us-east-1.amazonaws.com/login",
    image: "/assets/tasky.png",
    blurDataURL: blurDataURLs['tasky'],
    tags: ['React', 'Vite', 'Bootstrap', 'Django', 'SQLite', 'PyJWT', 'AWS S3/EC2', 'Demo'],
  },
  {
    title: "Silbiger Family Tree",
    description: "The Silbiger Family Tree is a database of over 1,200 family members. It is designed to document the genealogy of the Silbiger family.",
    link: "https://silbiger.onrender.com/",
    image: "/assets/silbiger.gif",
    blurDataURL: blurDataURLs['silbiger'],
    tags: ['Node.js', 'PostgreSQL', 'Bootstrap', 'JWT','⚠️⏳ Render Free Tier' ],
  },
  {
    title: "JTimes.org",
    description: "The JTimes web app builds on the Hebcal API by incorporating a current location feature to display information about upcoming holidays.",
    link: "https://shabbat-shalom.github.io/",
    image: "/assets/jtimes.png",
    blurDataURL: blurDataURLs['jtimes'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Geolocation', 'Hebcal API', 'GitHub Pages'],
  },
];

const skillCategories = {
  frontend: {
    title: "Frontend Development",
    skills: [
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'Material UI', icon: SiMui, color: '#007FFF' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ]
  },
  uiFrameworks: {
    title: "UI Frameworks & Libraries",
    skills: [
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
      { name: 'Shadcn/ui', icon: SiRadixui, color: '#000000' },
    ]
  },
  backend: {
    title: "Backend Development",
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'Django', icon: SiDjango, color: '#092E20' },
      { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#000000' },
    ]
  },
  database: {
    title: "Database & Infrastructure",
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
      { name: 'AWS S3', icon: FaAws, color: '#FF9900' },
      { name: 'AWS EC2', icon: FaAws, color: '#FF9900' },
      { name: 'Render', icon: SiRender, color: '#46E3B7' },
    ]
  },
  devops: {
    title: "Tools & DevOps",
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'Jira', icon: SiJira, color: '#0052CC' },
      { name: 'Vercel CI/CD', icon: SiVercel, color: '#000000' },
      { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
    ]
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const scaleOnHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

interface FormError {
  message: string;
  code: string;
}

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xdoqgkwy");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
          Message Sent!
        </h3>
        <p className="font-accent text-gray-600">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 font-body"
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 font-body"
              required
              placeholder="your.email@example.com"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          <div>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 font-body resize-none"
              required
              placeholder="Your message..."
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <motion.button
            type="submit"
            disabled={state.submitting}
            className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {state.submitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </div>

        {state.errors && Object.keys(state.errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl"
          >
            <p className="text-sm text-red-600 font-accent">
              Please fix the errors above and try again.
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

const AnimatedOrb = ({ delay = 0, size = 300, color = "blue", duration = 20 }) => {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-40"
      animate={{
        scale: [1, 1.5, 1],
        x: [0, 150, 0],
        y: [0, 100, 0],
        rotate: [0, 180, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color} 0%, transparent 70%)`,
      }}
    />
  )
}

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 opacity-80" />
      
      {/* Top left orbs */}
      <div className="absolute -top-20 -left-20">
        <AnimatedOrb color="#4f46e5" size={500} delay={0} duration={25} />
        <AnimatedOrb color="#7c3aed" size={400} delay={2} duration={20} />
      </div>
      
      {/* Top right orbs */}
      <div className="absolute -top-40 right-0">
        <AnimatedOrb color="#2563eb" size={600} delay={1} duration={28} />
        <AnimatedOrb color="#7c3aed" size={450} delay={3} duration={22} />
      </div>
      
      {/* Middle left orbs */}
      <div className="absolute top-1/3 -left-20">
        <AnimatedOrb color="#06b6d4" size={550} delay={1.5} duration={24} />
        <AnimatedOrb color="#3b82f6" size={400} delay={2.5} duration={21} />
      </div>
      
      {/* Middle right orbs */}
      <div className="absolute top-1/2 right-0">
        <AnimatedOrb color="#8b5cf6" size={500} delay={2} duration={26} />
        <AnimatedOrb color="#6366f1" size={450} delay={1} duration={23} />
      </div>
      
      {/* Bottom left orbs */}
      <div className="absolute bottom-0 -left-20">
        <AnimatedOrb color="#6366f1" size={600} delay={0.5} duration={27} />
        <AnimatedOrb color="#3b82f6" size={450} delay={2.5} duration={22} />
      </div>
      
      {/* Bottom right orbs */}
      <div className="absolute bottom-0 right-0">
        <AnimatedOrb color="#8b5cf6" size={500} delay={1.5} duration={25} />
        <AnimatedOrb color="#2563eb" size={400} delay={3} duration={20} />
      </div>

      {/* Center orbs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <AnimatedOrb color="#4f46e5" size={700} delay={0} duration={30} />
        <AnimatedOrb color="#7c3aed" size={600} delay={2} duration={25} />
        <AnimatedOrb color="#06b6d4" size={500} delay={1} duration={28} />
      </div>

      {/* Additional floating orbs */}
      <div className="absolute top-1/4 left-1/4">
        <AnimatedOrb color="#3b82f6" size={300} delay={1.5} duration={18} />
      </div>
      <div className="absolute top-3/4 right-1/4">
        <AnimatedOrb color="#6366f1" size={350} delay={2.5} duration={19} />
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ 
          backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANdr6EAAAACHRSTlMzMzMzMzMzM85JBgUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAwSURBVDjLY2AY2mAUAwMDQ7szAwPDKgeGUQOGlgHWFgYGhhVhDAwMK8MYRg0YPAYAADLxDQwCKn3lAAAAAElFTkSuQmCC)',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Enhanced glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-[120px]" />
      
      {/* Color tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
    </div>
  )
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  
  return (
    <motion.div
      ref={ref}
      variants={itemFadeIn}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      whileTap="tap"
      className="relative group h-full"
    >
      <Link href={project.link} target="_blank" className="block h-full">
        <motion.div 
          className="relative h-full overflow-hidden rounded-2xl shadow-lg bg-white"
          variants={scaleOnHover}
        >
          <div className="aspect-[4/3] relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={index < 2}
              placeholder="blur"
              blurDataURL={project.blurDataURL}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
            <p className="font-body text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {project.tags.map((tag: string, tagIndex: number) => (
                <motion.span
                  key={tagIndex}
                  variants={itemFadeIn}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 text-white"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-accent flex items-center justify-center space-x-2">
                <span>View Project</span>
                <ExternalLink size={16} />
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
    >
      <skill.icon
        className="w-8 h-8 mb-2"
        style={{ color: skill.color }}
      />
      <span className="font-body text-sm text-gray-600 text-center">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight pb-1"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="font-accent text-gray-600 text-lg text-center mb-12"
      >
        {subtitle}
      </motion.p>
    </>
  );
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-2xl bg-white/10 hover:bg-white/20"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="w-8 h-8 text-white group-hover:text-blue-200 transition-colors duration-300" />
    </motion.a>
  );
};

const navIcons = {
  home: Home,
  about: User,
  skills: Code2,
  portfolio: Briefcase,
  contact: Mail,
}

interface MobileNavProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      >
        <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-lg px-6 py-2">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = navIcons[item.href as keyof typeof navIcons]
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                    activeSection === item.href
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button (Top Right) */}
      <div className="fixed top-4 right-4 z-50 sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              className="p-2 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg"
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[540px] bg-white/80 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle className="text-2xl font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Navigation
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = navIcons[item.href as keyof typeof navIcons]
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href)
                      setIsOpen(false)
                    }}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${
                      activeSection === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: 'home', icon: '🏠' },
  { name: 'About', href: 'about', icon: '👨‍💻' },
  { name: 'Skills', href: 'skills', icon: '🛠' },
  { name: 'Portfolio', href: 'portfolio', icon: '🚀' },
  { name: 'Contact', href: 'contact', icon: '📬' },
];

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const controls = useAnimation()
  const { scrollYProgress: globalScrollProgress } = useScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  useEffect(() => {
    const handleScrollPosition = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScrollPosition)
    return () => window.removeEventListener('scroll', handleScrollPosition)
  }, [])

  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'portfolio', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight
    const pageHeight = document.documentElement.scrollHeight

    if (scrollPosition >= pageHeight - 50) {
      // User is at the bottom of the page
      setActiveSection('contact')
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const { offsetTop } = section
          if (window.scrollY >= offsetTop - 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial active section
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skillsRef = useRef(null)
  const [autoScrollX, setAutoScrollX] = useState(0)
  const { scrollYProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  })

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -skills.length * 160])
  const combinedX = useTransform(() => scrollX.get() + autoScrollX)
  const smoothX = useSpring(combinedX, { stiffness: 25, damping: 600, restDelta: 0.1 })

  useAnimationFrame((t) => {
    const wrappedScroll = t * 0.05 % (skills.length * 160)
    setAutoScrollX(-wrappedScroll)
  })

  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`min-h-screen text-[#1d1d1f] ${outfit.variable} ${spaceGrotesk.variable} ${manrope.variable} font-sans`}>
      <AnimatePresence>
        {/* Desktop Navigation */}
        <motion.header
          initial={false}
          animate={{
            top: isScrolled ? 0 : '1rem',
            borderRadius: isScrolled ? 0 : '9999px',
            width: isScrolled ? '100%' : 'calc(100% - 2rem)',
            margin: isScrolled ? '0' : '0 1rem',
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
          className="fixed left-0 right-0 z-50 hidden sm:flex justify-center"
        >
          <motion.div 
            animate={{
              borderRadius: isScrolled ? 0 : '9999px',
              maxWidth: isScrolled ? '100%' : 'calc(100vw - 1rem)',
              margin: isScrolled ? '0' : '0 auto',
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
            }}
            className={`bg-white/80 backdrop-blur-xl shadow-xl shadow-black/10 w-full border-b border-gray-100/50 ${
              isScrolled ? '' : 'sm:max-w-3xl mx-auto'
            }`}
          >
            <ScrollArea className={`w-full ${isScrolled ? 'p-3' : 'p-1.5'} overflow-x-auto`}>
              <nav ref={navRef} className="flex justify-center relative px-2 min-w-max max-w-6xl mx-auto">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`flex items-center space-x-1 text-xs sm:text-sm font-medium cursor-pointer px-3 py-1.5 rounded-full flex-shrink-0 relative z-10 whitespace-nowrap ${
                      activeSection === item.href ? 'text-blue-600' : 'text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.span 
                      className={`opacity-70 ${activeSection === item.href ? 'opacity-100' : ''}`}
                      whileHover={{ opacity: 1 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                  </motion.button>
                ))}
                <motion.div
                  className="absolute top-0 left-0 bottom-0 rounded-full bg-blue-50"
                  initial={false}
                  animate={{
                    width: hoveredItem ? getItemWidth(hoveredItem) : 0,
                    x: hoveredItem ? getItemPosition(hoveredItem) : 0,
                    borderRadius: isScrolled ? '0.5rem' : '9999px',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </nav>
            </ScrollArea>
          </motion.div>
        </motion.header>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative">
        {/* Replace the old background with the new animated background */}
        <AnimatedBackground />

        {/* Common section wrapper styles */}
        <div className="relative z-10">
          {/* Update section backgrounds to be more transparent */}
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex flex-col items-center justify-between text-center px-4 pt-20 sm:pt-32">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="z-10 max-w-4xl space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                  }}
                  className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 rounded-full" />
                  <div className="absolute inset-1 bg-gradient-to-tl from-gray-300 via-gray-100 to-white rounded-full" />
                  <motion.img
                    src="/assets/Headshot.jpeg"
                    alt="Justin Silbiger"
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </motion.div>
                
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight pb-1">
                  Justin Silbiger
                </h1>
                
                <p className="font-accent text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Full Stack Developer specializing in modern web technologies and user-centric design
                </p>
                
                <div className="flex justify-center space-x-4 pt-6">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-8 sm:mb-12">
              <button
                onClick={() => scrollToSection('about')}
                className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors duration-300"
              >
                <ChevronDown className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </section>

          {/* Update other sections to use glass morphism */}
          <section id="about" className="relative min-h-screen flex items-center py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.h2>
                <motion.p
                  className="font-accent text-gray-600 text-lg text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Passionate about creating impactful solutions through modern web technologies
                </motion.p>
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
                  <motion.div
                    className="w-full md:w-1/3 flex justify-center md:justify-end order-2 md:order-2 mb-8 md:mb-0 md:sticky md:top-20"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 rounded-full" />
                      <div className="absolute inset-1 bg-gradient-to-tl from-gray-300 via-gray-100 to-white rounded-full" />
                      <motion.img
                        src="/assets/Headshot.jpeg"
                        alt="Justin Silbiger"
                        className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                  <div className="w-full md:w-2/3 order-3 md:order-1">
                    <motion.div
                      className="text-left"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <motion.p 
                        className="font-body text-base sm:text-lg md:text-xl leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
Creating this portfolio has reinforced my passion for leveraging software to solve real-world problems. Every project is an opportunity to learn, innovate, and build something meaningful. I'm excited to continue developing solutions that drive positive change.                      </motion.p>
                    </motion.div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <motion.a
                        href="https://docs.google.com/document/d/1ssK1KnwAC2wxaHqBeF1HRci9A_Bz3JhhwrFeddVM24Y/edit?usp=sharing"
                        className="font-body text-base sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block text-center"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download CV
                      </motion.a>
                      <motion.a
                        href="#portfolio"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection('portfolio');
                        }}
                        className="font-body text-base sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full bg-[#f5f5f7] text-[#1d1d1f] inline-block text-center"
                        whileHover={{ scale: 1.05, backgroundColor: '#e8e8ed' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Projects
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="relative min-h-screen flex items-center py-16 bg-gradient-to-b from-transparent via-white/30 to-transparent backdrop-blur-[2px]">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Technical Skills
                </motion.h2>
                <motion.p
                  className="font-accent text-gray-600 text-lg text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  A comprehensive overview of my technical expertise and tools I work with
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(skillCategories).map(([key, category], categoryIndex) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100"
                    >
                      <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                        {category.title}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {category.skills.map((skill, index) => (
                          <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="portfolio" className="relative min-h-screen py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight pb-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Portfolio
                </motion.h2>
                <motion.p
                  className="font-accent text-gray-600 text-lg text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Showcasing my latest work and development projects
                </motion.p>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(400px,auto)] gap-6 sm:gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                  ))}
                </motion.div>
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="https://github.com/JustinSilbiger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center justify-center text-lg font-semibold py-3 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="mr-2 text-xl" />
                    See More on GitHub
                    <ExternalLink size={20} className="ml-2" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="contact" className="relative min-h-screen flex items-center py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Get in Touch
                </motion.h2>
                <motion.p
                  className="font-accent text-gray-600 text-lg text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Let's discuss your next project or opportunity
                </motion.p>
                <div className="max-w-3xl mx-auto">
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          {/* Footer with enhanced design */}
          <footer className="relative py-16 overflow-hidden bg-gradient-to-b from-transparent to-[rgba(79,70,229,0.2)]">
            {/* Background layers - make more subtle */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-indigo-600/80 opacity-90" />
            <div className="absolute inset-0 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
            
            {/* Content container */}
            <div className="container relative mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Main content */}
                <div className="relative z-10">
                  <motion.h2
                    className="font-display text-4xl sm:text-5xl font-bold mb-8 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Let's Connect
                  </motion.h2>

                  {/* Social links */}
                  <motion.div
                    className="flex justify-center space-x-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <SocialLink
                      href="https://github.com/JustinSilbiger"
                      icon={FaGithub}
                    />
                    <SocialLink
                      href="https://www.linkedin.com/in/justinzs/"
                      icon={FaLinkedin}
                    />
                  </motion.div>

                  {/* Quick links */}
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="font-body px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="mr-2">{item.icon}</span>
                        <span>{item.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Copyright and additional info */}
                  <div className="text-center space-y-4">
                    <motion.p
                      className="font-accent text-sm text-white/80 tracking-wide"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      &copy; 2024 Justin Z. Silbiger. All rights reserved.
                    </motion.p>
                    <motion.p
                      className="font-accent text-xs text-white/60 tracking-wider uppercase"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Built with Next.js, Tailwind CSS, and Framer Motion
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 z-50"
        style={{
          scaleX: globalScrollProgress,
          transformOrigin: "0%",
        }}
      />

      <MobileNav activeSection={activeSection} scrollToSection={scrollToSection} />
    </div>
  )

  function getItemWidth(itemName: string) {
    if (!navRef.current) return 0;
    const item = Array.from(navRef.current.children).find(
      (child) => (child as HTMLElement).textContent === itemName
    ) as HTMLElement | undefined;
    return item ? item.offsetWidth : 0;
  }

  function getItemPosition(itemName: string) {
    if (!navRef.current) return 0;
    const item = Array.from(navRef.current.children).find(
      (child) => (child as HTMLElement).textContent === itemName
    ) as HTMLElement | undefined;
    return item ? item.offsetLeft : 0;
  }
}