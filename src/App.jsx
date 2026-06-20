import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [statsInView, setStatsInView] = useState(false)
  const [heroInView, setHeroInView] = useState(false)
  
  const statsRef = useRef(null)
  const heroRef = useRef(null)

  // Track screen size for layout decisions
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Observe stats section to trigger kite animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
        }
      })
    }, { threshold: 0.1 })

    const currentRef = statsRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Observe hero section to trigger text/image animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeroInView(true)
        }
      })
    }, { threshold: 0.1 })

    const currentRef = heroRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Scroll to top on mount, then scroll to main content after 2 seconds
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      const nextSection = document.getElementById('about-us')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])









  return (
    <>
      {/* 2. Full-Screen Intro Video Section */}
      <section className="video-section">
        <img
          src="images/background.png"
          className="fullscreen-video playing"
          alt="Background"
        />
        



      </section>

      {/* 3. Main Site Wrapper */}
      <div className={`main-site-content ${heroInView ? 'visible' : ''}`}>
        
        {/* About Section */}
        <section id="about-us" ref={heroRef} className="hero-section section-padding">
          <div className="hero-glow"></div>
          <div className="hero-container-split-full">
            <div className="hero-text-column">
              <h1 className="hero-main-statement">
                {"Chimminikood is a community space in Kasaragod where young people build friendships, gain confidence, discover opportunities and contribute to their communities.".split(' ').map((word, index) => (
                  <span 
                    key={index} 
                    className="animated-word"
                    style={{ 
                      animationDelay: `${index * 0.035}s`
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <div className="hero-button-group">
                <button onClick={() => {
                  const programs = document.getElementById('programs')
                  if (programs) programs.scrollIntoView({ behavior: 'smooth' })
                }} className="cta-button">Visit Chimminikood</button>
                
                <button onClick={() => {
                  const contact = document.getElementById('contact')
                  if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                }} className="control-btn" style={{ padding: '12px 24px' }}>Support Us</button>
              </div>
            </div>

            <div className="hero-image-column">
              <picture>
                <source media="(max-width: 768px)" srcSet="/images/girls-look-up-mobile.png" />
                <img 
                  src="/images/chim2.webp" 
                  alt="Young people at Chimminikood" 
                  className="hero-side-image"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* Why Chimminikood Section */}
        <section id="programs" className="section-padding">
          <div className="container manifesto-split-container">
            <div className="manifesto-text-column">
              <div className="manifesto-card">
                <span className="manifesto-tag">Why Chimminikood?</span>
                
                <div className="manifesto-problems">
                  <div className="problem-item"><strong>Schools</strong> teach subjects.</div>
                  <div className="problem-item"><strong>Colleges</strong> provide qualifications.</div>
                  <div className="problem-item"><strong>Social media</strong> provides endless noise.</div>
                </div>
                
                <p className="manifesto-body-text">
                  But many young people are still searching for belonging, guidance, opportunities, and real-world experiences that help them grow.
                </p>
                
                <div className="manifesto-solution">
                  <span className="highlight-pill">Chimminikood</span> was created to be that missing space — a place where young people can connect, learn, contribute, and grow together.
                </div>
              </div>
            </div>

            <div className="manifesto-images-column">
              <div className="manifesto-cards-pile">
                <img 
                  src="/images/three/first.png" 
                  alt="Chimminikood Activity 1" 
                  className="manifesto-img-card card-1"
                />
                <img 
                  src="/images/three/second.png" 
                  alt="Chimminikood Activity 2" 
                  className="manifesto-img-card card-2"
                />
                <img 
                  src="/images/three/third.png" 
                  alt="Chimminikood Activity 3" 
                  className="manifesto-img-card card-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="impact" ref={statsRef} className={`hub-visual-section section-padding ${statsInView ? 'animate-kite' : ''}`}>
          <div className="kite-container">
            <img src="/images/kite.png" className="flying-kite" alt="Flying Kite" />
          </div>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Empowered Youth</div>
                <p className="stat-desc">Engaged through workshops, events, and individual hub services.</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">80+</div>
                <div className="stat-label">Workshops & Events</div>
                <p className="stat-desc">Conducted by field experts in arts, software, and mental well-being.</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Open & Safe Space</div>
                <p className="stat-desc">A non-discriminatory zone designed for free self-expression.</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Mentoring Partners</div>
                <p className="stat-desc">Collaborating experts, therapists, designers, and educators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section id="contact" className="section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Visit Us</span>
              <h2 className="section-title">Our Hub & Location</h2>
              <p>Explore our hub layout and find directions to visit Chimminikood in Kasaragod.</p>
            </div>

            <div className="map-split-grid">
              <div className="map-board-wrapper">
                <img 
                  src="/images/board.png" 
                  alt="Chimminikood Hub Board" 
                  className="map-board-image"
                />
              </div>
              
              <div className="map-iframe-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d478438.9224808864!2d75.011443!3d12.514492!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4833c3c7dde29%3A0xfd46cbcb81dde83b!2sChimminikood!5e1!3m2!1sen!2sus!4v1781425511959!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-iframe"
                  title="Chimminikoodu Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-firefly-container">
            <div className="footer-firefly firefly-1"></div>
            <div className="footer-firefly firefly-2"></div>
            <div className="footer-firefly firefly-3"></div>
            <div className="footer-firefly firefly-4"></div>
            <div className="footer-firefly firefly-5"></div>
            <div className="footer-firefly firefly-6"></div>
            <div className="footer-firefly firefly-7"></div>
            <div className="footer-firefly firefly-8"></div>
            <div className="footer-firefly firefly-9"></div>
            <div className="footer-firefly firefly-10"></div>
            <div className="footer-firefly firefly-11"></div>
            <div className="footer-firefly firefly-12"></div>
          </div>
          <div className="footer-content">
            <p className="footer-copyright">
              © 2026 Chimminikood Youth Forum. A registered Section 8 Company. Anchored by Fireflies Community structures
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}

export default App
