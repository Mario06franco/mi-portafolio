'use client'
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import styles from './page.module.css'
import { supabase } from '@/app/lib/supabaseClient'; // Asegúrate de que la ruta sea correcta

export default function FuturisticPortfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '2%'])

  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Quién Soy' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contáctame' }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message });

    if (error) {
      throw error;
    }

    alert('¡Mensaje enviado con éxito!');
    form.reset(); // Limpia el formulario
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
  }
};

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
        ></motion.div>
      </div>

      {/* Barra de navegación futurista */}
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
        {/* Sección Hero */}
        <section id="home" className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hola, a Todos<br />Yo soy <span className={styles.glowText}>Carlos Mario Franco</span>
            </motion.h1>
            
            <motion.h2
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Un <span className="text-blue-400">Desarrollador Web</span> Que Ayuda<br />
              startups <span className={`underline ${styles.hoverGlow}`}>A lanzarse y crecer</span>
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
                Contactame <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className={styles.secondaryButton}
              >
                Ver Proyectos
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
            {/* Sección Home */}
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

            {/* Sección About */}
            {activeSection === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h3 className={styles.sectionTitle}>Quién Soy</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      Soy un profesional apasionado por la tecnología con más de 10 años de experiencia combinada en desarrollo de software, logística y gestión de proyectos. Mi enfoque multidisciplinario me permite abordar problemas desde diferentes perspectivas y encontrar soluciones innovadoras.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Como Frontend Engineer, me especializo en crear experiencias digitales excepcionales que combinan diseño atractivo con funcionalidad robusta. Mi objetivo es desarrollar productos que no solo cumplan con los requisitos técnicos, sino que también generen un impacto positivo en los usuarios.
                    </p>
                    <div className="flex space-x-6">
                      <a href="https://github.com/Mario06franco" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiGithub size={24} />
                      </a>
                      <a href="https://linkedin.com/in/carlos-mario-franco" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiLinkedin size={24} />
                      </a>
                      <a href="mailto:contacto@carlosmario.dev" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <FiMail size={24} />
                      </a>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <h4 className={`${styles.cardTitle} mb-6`}>Habilidades Técnicas</h4>
                    <div className="space-y-5">
                      {[
                        { skill: 'React / Next.js', level: 90 },
                        { skill: 'TypeScript', level: 85 },
                        { skill: 'UI/UX Design', level: 80 },
                        { skill: 'Node.js', level: 75 },
                        { skill: 'Bases de Datos', level: 70 }
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

            {/* Sección Projects */}
            {activeSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.sectionTitle}>Mis Proyectos</h3>
                <div className={styles.cardGrid}>
                  {[
                    {
                      title: "E-commerce Platform",
                      description: "Plataforma completa de comercio electrónico con carrito de compras, pasarela de pago y panel de administración.",
                      tags: ["React", "Node.js", "MongoDB", "Stripe"]
                    },
                    {
                      title: "Task Management App",
                      description: "Aplicación para gestión de tareas con arrastrar y soltar, colaboración en equipo y notificaciones en tiempo real.",
                      tags: ["Next.js", "TypeScript", "Firebase"]
                    },
                    {
                      title: "Health Tracking App",
                      description: "Aplicación móvil para seguimiento de salud y bienestar con gráficos personalizados y recordatorios inteligentes.",
                      tags: ["React Native", "GraphQL", "AWS"]
                    },
                    {
                      title: "Portfolio Website",
                      description: "Sitio web personalizado para artista visual con galería interactiva y sistema de gestión de contenido.",
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

            {/* Sección Contact */}
            {activeSection === 'contact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.sectionTitle}>Contáctame</h3>
                <div className={styles.contactGrid}>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
  <div className={styles.formGroup}>
    <label htmlFor="name" className={styles.formLabel}>Nombre</label>
    <input 
      type="text" 
      id="name" 
      name="name" // Añade esto
      required
      className={styles.formInput}
    />
  </div>
  <div className={styles.formGroup}>
    <label htmlFor="email" className={styles.formLabel}>Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" // Añade esto
      required
      className={styles.formInput}
    />
  </div>
  <div className={styles.formGroup}>
    <label htmlFor="message" className={styles.formLabel}>Mensaje</label>
    <textarea 
      id="message" 
      name="message" // Añade esto
      rows={5}
      required
      className={`${styles.formInput} ${styles.formTextarea}`}
    ></textarea>
  </div>
  <button 
    type="submit"
    className={styles.submitButton}
  >
    Enviar Mensaje <FiArrowRight className="ml-2" />
  </button>
</form>

                  <div className="space-y-6">
                    <div className={styles.contactInfo}>
                      <h4 className={`${styles.cardTitle} mb-6`}>Información de Contacto</h4>
                      <div className="space-y-4">
                        <div className={styles.contactItem}>
                          <FiMail className={styles.contactIcon} />
                          <span>contacto@carlosmario.dev</span>
                        </div>
                        <div className={styles.contactItem}>
                          <FiLinkedin className={styles.contactIcon} />
                          <a href="https://linkedin.com/in/carlos-mario-franco" className="hover:underline">linkedin.com/in/carlosmario</a>
                        </div>
                        <div className={styles.contactItem}>
                          <FiGithub className={styles.contactIcon} />
                          <a href="https://github.com/Mario06franco" className="hover:underline">github.com/carlosmario</a>
                        </div>
                      </div>
                    </div>
                    <div className={styles.contactInfo}>
                      <h4 className={`${styles.cardTitle} mb-6`}>Disponibilidad</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Actualmente estoy disponible para nuevos proyectos desafiantes y oportunidades de colaboración. Si tienes un proyecto en mente o quieres discutir cómo puedo ayudar a tu equipo, no dudes en contactarme.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}