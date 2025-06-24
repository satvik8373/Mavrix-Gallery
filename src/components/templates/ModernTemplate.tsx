import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star, Linkedin } from 'lucide-react'
import type { ResumeData } from '@/lib/resumeSchema'
import Image from 'next/image';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string, accentColor?: string }> = ({ title, children, className, accentColor }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="font-headline text-base font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>{title}</h2>
    {children}
  </section>
);

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-white font-body text-gray-700 w-full h-full flex text-sm" style={wrapperStyle}>
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-gray-50 p-6 text-gray-600">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center overflow-hidden">
            {personal.photoUrl ? (
                <Image
                    src={personal.photoUrl}
                    alt={personal.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    data-ai-hint="person face"
                />
            ) : (
                <span className="font-headline text-4xl font-bold" style={{color: 'var(--accent-color)'}}>{personal.initials}</span>
            )}
          </div>
          <h1 className="font-headline text-2xl font-bold text-gray-900">{personal.name}</h1>
          <p className="text-sm mt-1" style={{color: 'var(--accent-color)'}}>{personal.title}</p>
        </div>

        <Section title="Contact" accentColor={accentColor}>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Mail size={14} style={{color: 'var(--accent-color)'}} />
              <span className="truncate">{personal.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} style={{color: 'var(--accent-color)'}} />
              <span>{personal.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={14} style={{color: 'var(--accent-color)'}} />
              <span className="truncate">{personal.linkedin}</span>
            </li>
             <li className="flex items-center gap-2">
              <MapPin size={14} style={{color: 'var(--accent-color)'}} />
              <span>{personal.location}</span>
            </li>
          </ul>
        </Section>

        {sectionVisibility.skills && (
          <Section title="Skills" accentColor={accentColor}>
             <ul className="space-y-1.5 text-xs">
              {skills.map(skill => (
                <li key={skill} className="flex items-center gap-2">
                  <Star size={12} style={{color: 'var(--accent-color)'}} />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
        
        {sectionVisibility.education && (
          <Section title="Education" accentColor={accentColor}>
            {education.map(edu => (
              <div className="text-xs mb-2" key={edu.dataId}>
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p className="text-xs">{edu.duration}</p>
              </div>
            ))}
          </Section>
        )}

      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        {sectionVisibility.summary && (
          <Section title="Profile" className="mt-0" accentColor={accentColor}>
            <p className="text-xs leading-relaxed">
              {summary}
            </p>
          </Section>
        )}

        {sectionVisibility.experience && (
          <Section title="Experience" accentColor={accentColor}>
            <div className="space-y-4">
              {experience.map(job => (
                <div className="text-xs" key={job.dataId}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-gray-800">{job.title}</h3>
                    <span className="text-xs font-mono" style={{color: 'var(--accent-color)'}}>{job.duration}</span>
                  </div>
                  <p className="text-gray-500 mb-1.5">{job.company}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
                    {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>
    </div>
  )
}
