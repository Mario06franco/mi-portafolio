'use client'
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import styles from './page.module.css'
import { supabase } from '@/app/lib/supabaseClient'
import emailjs from '@emailjs/browser'

export default function FuturisticPortfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '2%'])

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact me' }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitStatus('sending')
  const form = e.currentTarget as HTMLFormElement

  try {
    // Enviar con EmailJS
    await emailjs.sendForm(
      'service_7e8v74z',    // reemplaza con tu Service ID
      'template_grdpiai',   // reemplaza con tu Template ID
      form,
      'SP4NT53adNx3fqFWj'     // reemplaza con tu Public Key
    )

    // Opcional: guardar en Supabase también
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })
    if (error) throw error

    setSubmitStatus('success')
    form.reset()
  } catch (error) {
    console.error('Error:', error)
    setSubmitStatus('error')
  }
}


  return (
    <div className={styles.container}>
      {/* Fondo futurista */}
      <div className={styles.background}>
        <div className={styles.gradientBg}></div>
        <div className={styles.gridBg}></div>
        <motion.div 
          className={styles.noiseBg}
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Barra de navegación */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`${styles.navButton} ${
                  activeSection === section.id ? styles.navButtonActive : styles.navButtonInactive
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.span
                    layoutId="navIndicator"
                    className={styles.navIndicator}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Hero */}
        <section id="home" className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hello everyone,<br />
              I&apos;m <span className={styles.glowText}>Carlos Mario Franco</span>
            </motion.h1>
            <motion.h2
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Software <span className="text-blue-400">Analyst & Developer</span> Building scalable<br />
              Solutions <span className={`underline ${styles.hoverGlow}`}>For ambitious startups</span>
            </motion.h2>
            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollToSection('contact')}
                className={styles.primaryButton}
              >
                Contact me <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className={styles.secondaryButton}
              >
                See Projects
              </button>
            </motion.div>
          </div>
          <motion.div
            className={styles.heroImageContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.heroImageGlow}></div>
            <div className={styles.heroImage}>
              <Image 
                src="/mario.png" 
                alt="Carlos Mario Franco"
                width={280}
                height={280}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* Sección de contenido */}
        <motion.section
          ref={ref}
          style={{ y }}
          className={styles.contentSection}
          id="content"
        >
          <div className="max-w-6xl mx-auto">
            {/* Home */}
            {activeSection === 'home' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.sectionTitle}>What I Do</h3>
                <div className={styles.cardGrid}>
                  {[
                    {
                      title: "UI/UX Design",
                      description: "Creating intuitive interfaces with modern design systems that delight users and drive engagement."
                    },
                    {
                      title: "Frontend Development",
                      description: "Building performant, accessible web applications with React, Next.js, and modern JavaScript frameworks."
                    },
                    {
                      title: "Technical Consulting",
                      description: "Helping startups choose the right tech stack and architecture for scalable growth."
                    }
                  ].map((item, index) => (
                    <div key={index} className={styles.card}>
                      <h4 className={styles.cardTitle}>{item.title}</h4>
                      <p className={styles.cardText}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* About */}
            {activeSection === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h3 className={styles.sectionTitle}>About Me</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      As a seasoned Software Analyst and Developer with over a decade of experience, I specialize in crafting technology solutions that bridge business needs with technical execution. My career spans software development, systems analysis, and process optimization, where I&apos;ve consistently delivered systems that enhance operational workflows and drive measurable business impact.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      What sets me apart is my ability to analyze complex requirements and translate them into efficient, scalable solutions. With a background that intersects software engineering and logistics, I bring a unique perspective to digital transformation projects, ensuring technical implementations align with real-world operational demands. I take pride in building systems that don&apos;t just function well but create tangible value for organizations and end-users alike.
                    </p>
                    <div className="flex space-x-6">
                      <a href="https://github.com/Mario06franco" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiGithub size={24} />
                      </a>
                      <a href="https://linkedin.com/in/carlos-mario-franco-pulgarin" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiLinkedin size={24} />
                      </a>
                      <a href="mailto:Mariofraco93@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiMail size={24} />
                      </a>
                      <a href="https://wa.me/573127811600" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FaWhatsapp size={24} />
                      </a>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <h4 className={`${styles.cardTitle} mb-6`}>Technical Skills</h4>
                    <div className="space-y-5">
                      {[
                        { skill: 'React.js / Next.js / Node.js', level: 90 },
                        { skill: 'PHP', level: 80 },
                        { skill: 'Python', level: 75 },
                        { skill: 'TypeScript', level: 75 },
                        { skill: 'MongoDB', level: 70 }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300">{item.skill}</span>
                            <span className="text-blue-400">{item.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                              style={{ width: `${item.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.sectionTitle}>My Projects</h3>
                <div className={styles.cardGrid}>
                  {[
                    {
                      title: "E-commerce Platform",
                      description: "Complete e-commerce platform with shopping cart, payment gateway and admin panel.",
                      tags: ["React", "Node.js", "MongoDB", "Stripe"]
                    },
                    {
                      title: "Task Management App",
                      description: "Task management application with drag and drop, team collaboration and real-time notifications.",
                      tags: ["Next.js", "TypeScript", "Firebase"]
                    },
                    {
                      title: "Health Tracking App",
                      description: "Mobile app for health and wellness tracking with custom charts and smart reminders.",
                      tags: ["React Native", "GraphQL", "AWS"]
                    },
                    {
                      title: "Portfolio Website",
                      description: "Custom website for visual artist with interactive gallery and content management system.",
                      tags: ["GSAP", "Three.js", "Sanity.io"]
                    }
                  ].map((project, index) => (
                    <div key={index} className={styles.card}>
                      <h4 className={styles.cardTitle}>{project.title}</h4>
                      <p className={styles.cardText}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-gray-800/50 text-sm rounded-full text-blue-400 border border-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact */}
            {activeSection === 'contact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.sectionTitle}>Contact me</h3>
                <div className={styles.contactGrid}>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.formLabel}>Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows={5}
                        required
                        className={`${styles.formInput} ${styles.formTextarea}`}
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className={styles.submitButton}
                    >
                      Send Message <FiArrowRight className="ml-2" />
                    </button>
                  </form>
                  <div className="space-y-6">
                    <div className={styles.contactInfo}>
                      <h4 className={`${styles.cardTitle} mb-6`}>Contact information</h4>
                      <div className="space-y-4">
                        <div className={styles.contactItem}>
                          <FiMail className={styles.contactIcon} />
                          <span>Mariofraco93@gmail.com</span>
                        </div>
                        <div className={styles.contactItem}>
                          <FiLinkedin className={styles.contactIcon} />
                          <a href="https://linkedin.com/in/carlos-mario-franco-pulgarin-004397305" className="hover:underline">linkedin.com/in/carlosmario</a>
                        </div>
                        <div className={styles.contactItem}>                                                  
                          <FiGithub className={styles.contactIcon} />
                          <a href="https://github.com/Mario06franco" className="hover:underline">github.com/Mario06franco</a>
                        </div> 
                        <div className={styles.contactItem}>                                                  
                          <FaWhatsapp className={styles.contactIcon} />
                          <a href="https://wa.me/573127811600" className="hover:underline">Whatsapp +57 312 781 1600</a>
                        </div>  
                      </div>
                    </div>
                    <div className={styles.contactInfo}>
                      <h4 className={`${styles.cardTitle} mb-6`}>Availability</h4>
                      <p className="text-gray-300 leading-relaxed">
                        I am currently available for challenging new projects and opportunities for collaboration. If you have a project in mind or want to discuss how I can help your team, don&apos;t hesitate to contact me.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>

      {/* Modales de estado de envío */}
      {submitStatus === 'success' && (
        <div className={styles.submitStatus}>
          <div className={styles.submitStatusContent}>
            <div className={styles.successIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Message sent successfully!</h3>
            <p>Thank you for contacting me. I will review your message and get back to you as soon as possible.</p>
            <button 
              className={styles.confirmButton}
              onClick={() => setSubmitStatus('idle')}
            >
              Accept
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={styles.submitStatus}>
          <div className={styles.submitStatusContent}>
            <div className={styles.successIcon} style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3>Error sending</h3>
            <p>There was a problem sending your message. Please try again later.</p>
            <button 
              className={styles.confirmButton}
              style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}
              onClick={() => setSubmitStatus('idle')}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Created by Mario Franco · © {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </div>
  )
}