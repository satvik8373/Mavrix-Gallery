import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star, Linkedin } from 'lucide-react'
import type { ResumeData } from '@/lib/resumeSchema'
import { SkillBar } from '../SkillBar';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; accentColor?: string }> = ({ title, children, className, accentColor }) => (
  <section className={`mb-5 ${className}`}>
    <h2 className="font-headline text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor, opacity: 0.8 }}>{title}</h2>
    {children}
  </section>
);

const Job: React.FC<{ title: string; company: string; duration: string; description: string[]; accentColor?: string }> = ({ title, company, duration, description, accentColor }) => (
  <div className="mb-3 break-inside-avoid">
    <div className="flex justify-between items-baseline">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 font-mono">{duration}</p>
    </div>
    <p className="text-xs text-gray-600 mb-1">{company}</p>
    <ul className="list-none text-xs text-gray-500 space-y-1">
      {description.map((item, index) => <li key={index} className="flex gap-1.5"><span style={{color: accentColor, opacity: 0.7}}>›</span>{item}</li>)}
    </ul>
  </div>
);

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-gray-50 font-body text-gray-800 w-full h-full text-sm" style={wrapperStyle}>
      <header className="bg-gray-100 p-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-4xl font-bold text-gray-900">{personal.name}</h1>
          <p className="text-lg text-gray-700 mt-1">{personal.title}</p>
        </div>
        <div className="text-right text-xs space-y-1 text-gray-600">
           <div className="flex items-center justify-end gap-1.5"><span>{personal.email}</span> <Mail size={12} /></div>
           <div className="flex items-center justify-end gap-1.5"><span>{personal.phone}</span> <Phone size={12} /></div>
           <div className="flex items-center justify-end gap-1.5"><span>/{personal.linkedin.split('/').pop()}</span> <Linkedin size={12} /></div>
        </div>
      </header>

      <div className="p-8 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          {sectionVisibility.summary && (
            <Section title="About Me" accentColor={accentColor}>
                <p className="text-xs text-gray-600">
                    {summary}
                </p>
            </Section>
          )}
          {sectionVisibility.skills && (
            <Section title="Skills" accentColor={accentColor}>
                <div className="space-y-1.5">
                    {skills.map(skill => (
                        <div key={skill}>
                            <p className="text-xs font-medium">{skill}</p>
                            <SkillBar />
                        </div>
                    ))}
                </div>
            </Section>
          )}
          {sectionVisibility.education && (
             <Section title="Education" accentColor={accentColor}>
              {education.map(edu => (
                <div className="text-xs" key={edu.dataId}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.duration}</p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
            {sectionVisibility.experience && (
              <Section title="Experience" accentColor={accentColor}>
                   {experience.map(job => (
                     <Job 
                        key={job.dataId}
                        title={job.title}
                        company={job.company}
                        duration={job.duration}
                        description={job.description}
                        accentColor={accentColor}
                    />
                   ))}
              </Section>
            )}
        </div>

      </div>
    </div>
  )
}
