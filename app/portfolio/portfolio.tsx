'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform, AnimatePresence, useSpring, useAnimationFrame } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { Inter } from 'next/font/google'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiPython, SiDjango, SiPostgresql, SiFastapi, SiJquery, SiGit, SiTailwindcss, SiHtml5, SiCss3, SiBootstrap, SiJira, SiFlask, SiJinja, SiGoogleanalytics, SiGunicorn, SiNginx } from 'react-icons/si'
import { FaNodeJs, FaAws, FaGithub, FaLinkedin } from 'react-icons/fa'
import { useForm } from '@formspree/react';
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

const skills = [
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
  { name: 'JQuery', icon: SiJquery, color: '#0769AD' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'SQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React & React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  { name: 'Flask', icon: SiFlask, color: '#000000' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Jinja', icon: SiJinja, color: '#B41717' },
  // { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'AWS S3 & EC2', icon: FaAws, color: '#FF9900' },
  { name: 'Nginx', icon: SiNginx, color: '#009639' },
  { name: 'Gunicorn',   icon: SiGunicorn, color: '#499848' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Jira', icon: SiJira, color: '#0052CC' },
  // { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
]

const projects = [
  {
    title: "Tasky",
    description: "Tasky is a full-stack task management platform for organizing your daily tasks and boosting productivity.",
    link: "http://taskyfe.s3-website-us-east-1.amazonaws.com/login",
    image: "/assets/tasky.png", // Added leading slash
    tags: ['React', 'Vite', 'Bootstrap', 'Django', 'SQLite', 'PyJWT', 'AWS S3/EC2', 'Demo'],
  },
  {
    title: "Silbiger Family Tree",
    description: "The Silbiger Family Tree is a database of over 1,200 family members. It is designed to document the genealogy of the Silbiger family.",
    link: "https://silbiger.onrender.com/",
    image: "/assets/silbiger.gif", // Added leading slash
    tags: ['Node.js', 'PostgreSQL', 'Bootstrap', 'JWT','⚠️⏳ Render Free Tier' ],
    
  },
  {
    title: "JTimes.org",
    description: "The JTimes web app builds on the Hebcal API by incorporating a current location feature to display information about upcoming holidays.",
    link: "https://shabbat-shalom.github.io/",
    image: "/assets/jtimes.png", // Added leading slash
    tags: ['HTML', 'CSS', 'JavaScript', 'Geolocation', 'Hebcal API', 'GitHub Pages'],
  },
];

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState('home')
  const controls = useAnimation()
  const { scrollYProgress: globalScrollProgress } = useScroll()

  const [showFullWidthNav, setShowFullWidthNav] = useState(false)

  useEffect(() => {
    const unsubscribe = globalScrollProgress.onChange(v => {
      setShowFullWidthNav(v >= 0.5)
    })
    return () => unsubscribe()
  }, [globalScrollProgress])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight
    const pageHeight = document.documentElement.scrollHeight

    if (scrollPosition >= pageHeight - 50) {
      // User is at the bottom of the page
      setActiveSection('contact')
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const { offsetTop, offsetHeight } = section
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

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Blog', href: 'blog' },
    { name: 'Contact', href: 'contact' },
  ]

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

  const [formState, handleSubmit] = useForm("xdoqynqr");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-purple-200 via-white to-blue-200 text-[#1d1d1f] ${inter.className}`}>
      {/* Header */}
      <AnimatePresence initial={false}>
        {showFullWidthNav ? (
          <motion.header
            key="full-width-nav"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-sm font-medium cursor-pointer transition-colors duration-300 py-2"
                    style={{ color: activeSection === item.href ? '#06c' : '#1d1d1f' }}
                    whileHover={{ color: '#06c', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.header>
        ) : (
          <motion.header
            key="pill-nav"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4"
          >
            <motion.div 
              className="bg-[#f5f5f7]/60 backdrop-blur-md rounded-full shadow-xl shadow-black/20 w-full max-w-[calc(100vw-1rem)] sm:max-w-3xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <ScrollArea className="w-full p-1 overflow-x-auto">
                <nav ref={navRef} className="flex justify-between relative px-2 min-w-max">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-300 px-2 py-1 rounded-full flex-shrink-0 relative z-10 whitespace-nowrap"
                      onHoverStart={() => setHoveredItem(item.name)}
                      onHoverEnd={() => setHoveredItem(null)}
                      style={{
                        color: activeSection === item.href ? '#06c' : '#1d1d1f',
                      }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 rounded-full bg-blue-100/70"
                    initial={false}
                    animate={{
                      width: hoveredItem ? getItemWidth(hoveredItem) : 0,
                      x: hoveredItem ? getItemPosition(hoveredItem) : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </nav>
              </ScrollArea>
            </motion.div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-200 via-white to-blue-200 opacity-90" />
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-20" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-4xl"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl p-2 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Justin Silbiger
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl mb-8 text-[#86868b]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Software Engineer || Web Developer
            </motion.p>
            
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="text-base sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={40} className="text-[#000000]" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-50" />
            <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-20" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 pt-0 sm:pt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>
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
                      className="text-base sm:text-lg md:text-xl leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Creating this portfolio has shown me just how powerful software can be in creating solutions to real-world problems. I love the challenge of learning something new with each project, and I'm excited to keep building impactful solutions that drive positive change.
                    </motion.p>
                  </motion.div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <motion.a
                      href="https://docs.google.com/document/d/1ssK1KnwAC2wxaHqBeF1HRci9A_Bz3JhhwrFeddVM24Y/edit?usp=sharing"
                      className="text-base sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block text-center"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download CV
                    </motion.a>
                    <motion.a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('projects');
                      }}
                      className="text-base sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full bg-[#f5f5f7] text-[#1d1d1f] inline-block text-center"
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

        
        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="relative py-16 sm:py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills
            </motion.h2>
            <div className="relative">
              <motion.div 
                className="flex space-x-4 sm:space-x-8"
                style={{ x: smoothX }}
              >
                {[...skills, ...skills, ...skills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center justify-center"
                  >
                    <skill.icon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4" style={{ color: skill.color }} />
                    <h3 className="text-sm sm:text-lg font-semibold text-center">{skill.name}</h3>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl p-1 sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Projects
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative w-full h-48"> {/* Set a fixed height */}
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-[#e8e8ed] text-[#1d1d1f]"
                          whileHover={{ scale: 1.1, backgroundColor: '#0071e3', color: '#ffffff' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-[#86868b] mb-4 text-sm sm:text-base flex-grow">{project.description}</p>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 font-semibold mt-auto"
                      whileHover={{ x: 5 }}
                    >
                      Deployed Project
                      <ExternalLink size={16} className="ml-1" />
                    </motion.a>
                  </div>
                </motion.div>
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
                className="inline-flex items-center justify-center text-lg font-semibold py-3 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="mr-2 text-xl" />
                See More on GitHub
                <ExternalLink size={20} className="ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        
        <section id="blog" className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-5xl p-2 font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              My Blog
            </motion.h2>
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl mb-8 text-[#1d1d1f]">
                A collection of thoughts on some of my previous work and ideas for future projects.
              </p>
              <motion.a
                href="/blog"
                className="inline-flex items-center justify-center text-lg font-semibold py-3 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Visit My Blog
                <ExternalLink size={20} className="ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.h2>
            <div className="max-w-3xl mx-auto px-4">
              {formState.succeeded ? (
                <motion.p
                  className="text-xl text-center text-green-600"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  📨 Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              ) : (
                <motion.form
                  action="https://formspree.io/f/xdoqynqr"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <input
                      id="name"
                      type="text" 
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-[#d2d2d7] focus:outline-none focus:border-blue-600 transition-colors duration-300 bg-gray-50 text-gray-900"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label htmlFor="email" className="block mb-2 font-medium">Your email:</label>
                    <input
                      id="email"
                      type="email" 
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-[#d2d2d7] focus:outline-none focus:border-blue-600 transition-colors duration-300 bg-gray-50 text-gray-900"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label htmlFor="message" className="block mb-2 font-medium">Your message:</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-[#d2d2d7] focus:outline-none focus:border-blue-600 transition-colors duration-300 bg-gray-50 text-gray-900"
                      required
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full text-lg font-semibold py-3 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {formState.submitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </div>
        </section>

        <footer className="relative py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.h2>
            <motion.div
              className="flex justify-center space-x-6 mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/JustinSilbiger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaGithub size={32} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/justinzs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaLinkedin size={32} />
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 py-4 "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-center text-white opacity-60">
              &copy; 2024 Justin Z. Silbiger. All rights reserved.
            </p>
          </motion.div>
        </footer>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{
          scaleX: globalScrollProgress,
          transformOrigin: "0%",
        }}
      />
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