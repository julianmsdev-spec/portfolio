import React from 'react';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
    return (
        <section id={id} className={`container ${className}`} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--color-primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary)' }}>#</span> {title}
            </h2>
            <div className="content">
                {children}
            </div>
        </section>
    );
};

export default Section;
