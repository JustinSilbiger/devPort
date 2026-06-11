'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimation, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion'
import { ChevronDown, ExternalLink, Menu, X, Home, User, Code2, Briefcase, Mail } from 'lucide-react'
import { Inter, Outfit, Space_Grotesk, Manrope } from 'next/font/google'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiPython, SiDjango, SiPostgresql, SiFastapi, SiExpress, SiGit, SiTailwindcss, SiHtml5, SiCss3, SiBootstrap, SiFramer, SiRadixui, SiJsonwebtokens, SiSqlite, SiRender } from 'react-icons/si'
import { FaNodeJs, FaAws, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { useForm, ValidationError } from '@formspree/react'
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
   'adco-builders': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
   'tasky': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
   'silbiger': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
   'jtimes': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU8PkM5QklCR1JTUzU+XX5mgmRmcnL/2wBDARUXFx4aHR4eHHJCLiYucnJycnJycnJycnJycnJycnJycnL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
}

interface Project {
  title: string
  description: string
  link: string
  image: string
  blurDataURL: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
}

interface Skill {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

interface SkillCardProps {
  skill: Skill
  index: number
}

interface SectionHeaderProps {
  title: string
  subtitle: string
}

interface SocialLinkProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
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
]

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
}

// ✨ FIXED: Modern Framer Motion animations with proper physics & scroll triggers
const fadeInUp = motion(React.forwardRef<HTMLDivElement, any>(({ ref: refProp, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.2, margin: '-100px' })
  
  return (
    <motion.div
      ref={refProp || ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        ease: [0.6, -0.045, 0.055, 0.95], // Custom cubic-bezier for smooth ease-out
        staggerChildren: 0.1
      }}
      {...props}
    />
  )
}), { shouldWrapChildren: true })

const fadeScale = motion(React.forwardRef<HTMLDivElement, any>(({ ref: refProp, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.15, margin: '-80px' })
  
  return (
    <motion.div
      ref={refProp || ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 240,
        damping: 25
      }}
      {...props}
    />
  )
}))

const scaleOnHover = motion(React.forwardRef<any, any>(({ ref: refProp, ...props }) => {
  const handleHoverBegin = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  const handleMouseLeave = () => {}
  
  return (
    <motion.div
      ref={refProp}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      {...props}
    />
  )
}))

const buttonPress = motion(React.forwardRef<HTMLButtonElement, any>(({ ref: refProp, ...props }) => {
  return (
    <motion.button
      ref={refProp}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    />
  )
}))

const cardEntrance = motion(React.forwardRef<HTMLDivElement, any>(({ ref: refProp, ...props }) => {
  const indexVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.52, 0.64, 1], // Custom spring-like easing
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }
  
  return (
    <motion.div
      ref={refProp}
      variants={indexVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    />
  )
}))

const Button = ({ children, variant = "default", size = "md", className = "", ...props }: {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  [key: string]: any
}) => {
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-800",
    outline: "border border-slate-700 bg-transparent text-slate-50 hover:bg-slate-800/50",
    ghost: "text-slate-50 hover:text-slate-400 hover:bg-slate-900"
  }
  
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base"
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center rounded-lg ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/10 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xdoqynqr")
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleSubmit(e)
    } catch(error) {
      console.error('Form submission error:', error)
    }
  }
  
  if (state.succeeded) {
    return (
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 text-center mx-auto max-w-md my-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent! ✅</h3>
        <p className="text-gray-600">I'll get back to you as soon as possible. Thank you for reaching out!</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-6 rounded-2xl bg-slate-50/80 backdrop-blur-sm">
      <ValidationError prop="name" validation={state.errors} className="text-sm text-red-500 mb-2 hidden" />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input required type="text" name="name" id="name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 transition-all outline-none" placeholder="Your name" />
      </div>
      <ValidationError prop="email" validation={state.errors} className="text-sm text-red-500 mb-2 hidden" />
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 transition-all outline-none" placeholder="your@email.com" />
      </div>
      <ValidationError prop="subject" validation={state.errors} className="text-sm text-red-500 mb-2 hidden" />
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input required type="text" name="subject" id="subject" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 transition-all outline-none" placeholder="What's this about?" />
      </div>
      <ValidationError prop="message" validation={state.errors} className="text-sm text-red-500 mb-2 hidden" />
      <div className="h-32">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea required name="message" id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20 transition-all outline-none resize-none" placeholder="Tell me about your project..." />
      </div>
      
      {/* FIXED: Improved button with hover/tap feedback */}
      <motion.button
        type="submit"
        disabled={stateSubmitting || !state.isSubmitting}
        initial={{ opacity: 0 }}
        animate={{ opacity: state.isSubmitting ? 0.7 : 1 }}
        className='w-full h-12 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-75 cursor-pointer ring-2 ring-slate-300 focus-visible:ring-slate-400'
        whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        whileTap={{ scale: 0.98, boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.07)" }}
      >
        {state.isSubmitting ? 'Sending...' : (state.succeeded ? 'Message Sent' : 'Send Message')}
        <motion.span 
          initial={{ opacity: 0, x: 5 }} 
          animate={state.isSubmitting ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          className='inline-block w-4 ml-2'
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="8" r="2" />
            <path d="M3.29 7.91L15.88 3.94c.76-.26.98-1.07.51-1.62l-.53-.58c-.46-.52-1.23-.17-1.5.14L.59 9.52c-1 .56-1.18 1.46 0 1.78l1.7.5h1.59l1.14-1.9z" />
          </svg>
        </motion.span>
      </motion.button>
    </form>
  )
}
