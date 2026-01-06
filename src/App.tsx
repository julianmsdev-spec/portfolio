import ThreeScene from './components/ThreeScene';
import Experience3D from './components/Experience3D';
import Skills3D from './components/Skills3D';
import Section from './components/Section';
import resumeData from './data/resume.json';
import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

const SkillCard = ({ skillGroup, variants }: { skillGroup: any, variants: Variants }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5, backgroundColor: 'rgba(152, 255, 152, 0.08)' }}
      style={{
        background: 'rgba(5, 10, 5, 0.6)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(152, 255, 152, 0.1)',
        backdropFilter: 'blur(5px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Skills3D category={skillGroup.name} hovered={hovered} />
      <h3 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', letterSpacing: '1px' }}>{skillGroup.name.toUpperCase()}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' }}>
        {skillGroup.keywords.map((tech: string, i: number) => {
          // Generate random floating parameters for each badge
          const randomDuration = 2 + Math.random() * 4; // Between 2 and 6 seconds
          const randomY = 5 + Math.random() * 10; // Move up/down by 5-15px
          const randomX = -5 + Math.random() * 10; // Move left/right by -5 to 5px

          return (
            <motion.span
              key={i}
              animate={{
                y: [0, -randomY, 0],
                x: [0, randomX, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(152, 255, 152, 0.2)',
                borderColor: 'var(--color-primary)',
                boxShadow: '0 0 8px rgba(152, 255, 152, 0.4)'
              }}
              style={{
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                color: '#e0f2e0',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                display: 'inline-block'
              }}
            >
              {tech}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

function App() {
  const { basics, work, education, skills } = resumeData;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <>
      <ThreeScene />

      <main style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
        {/* Header / Hero - Staggered Layout */}
        <header className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            variants={staggerContainer}
            style={{ width: '100%' }}
          >
            {/* 1. Name: Left Aligned */}
            <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0, color: 'var(--color-primary)', lineHeight: 0.9 }}>
              {basics.name.toUpperCase()}
            </motion.h1>

            {/* 2. Label: Indented */}
            <motion.div variants={fadeInUp} style={{ alignSelf: 'center', margin: '2rem 0', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 'normal', fontFamily: 'var(--font-mono)' }}>&lt;{basics.label} /&gt;</h2>
            </motion.div>

            {/* 3. Summary: More Indented / Right balanced */}
            <motion.div variants={fadeInUp} style={{ marginLeft: 'auto', maxWidth: '600px', textAlign: 'right' }}>
              <p style={{ lineHeight: '1.6', fontSize: '1.2rem', marginBottom: '2rem' }}>
                {basics.summary}
              </p>
              <a href={`mailto:${basics.email}`} style={{
                display: 'inline-block',
                border: '1px solid var(--color-primary)',
                padding: '0.8rem 2rem',
                borderRadius: '4px',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                CONTACT ME
              </a>
            </motion.div>
          </motion.div>
        </header>

        {/* Experience - Central Zig-Zag Timeline */}
        <Section id="experience" title="Experience">
          <div style={{ position: 'relative', padding: '2rem 0' }}>
            {/* Central Line */}
            <div className="timeline-line-container" />

            {work.map((job, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`timeline-row ${isEven ? 'even' : 'odd'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="timeline-icon">
                    <Experience3D type={job.type || 'dev'} />
                  </div>

                  {/* Timeline Dot (Centered) */}
                  <div className="timeline-dot" />

                  {/* Content Card */}
                  <div className="timeline-content" style={{ textAlign: isEven ? 'left' : 'right' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.2rem', color: '#fff' }}>{job.position}</h3>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-secondary)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>{job.name}</h4>
                    <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>{job.startDate} — {job.endDate}</p>
                    <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#ddd' }}>{job.summary}</p>
                    {job.highlights && (
                      <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', listStyle: 'disc', color: '#ccc' }}>
                        {job.highlights.map((highlight, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem' }}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* Skills - Balanced Grid */}
        <Section id="skills" title="Skills">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {skills.map((skillGroup, index) => (
              <SkillCard key={index} skillGroup={skillGroup} variants={fadeInUp} />
            ))}
          </motion.div>
        </Section>

        {/* Education - Alternating Blocks */}
        <Section id="education" title="Education">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: "-50px" }}
              style={{
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(90deg, rgba(5,10,5,0) 0%, rgba(152,255,152,0.05) 50%, rgba(5,10,5,0) 100%)',
                padding: '2rem 0'
              }}
            >
              <div style={{ width: '45%', textAlign: index % 2 === 0 ? 'left' : 'right' }}>
                <h3 style={{ fontSize: '2rem', color: '#fff' }}>{edu.institution}</h3>
                <p style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{edu.studyType}</p>
              </div>
              <div style={{ width: '2px', height: '50px', background: 'var(--color-primary)', opacity: 0.5 }}></div>
              <div style={{ width: '45%', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>{edu.area}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>
                  {edu.courses.join(' • ')}
                </div>
              </div>
            </motion.div>
          ))}
        </Section>

        <footer style={{ textAlign: 'center', padding: '4rem 0', fontSize: '0.9rem', opacity: 0.6 }}>
          <p>© {new Date().getFullYear()} {basics.name}. Built with Bun & Vite.</p>
        </footer>
      </main>
    </>
  )
}

export default App
