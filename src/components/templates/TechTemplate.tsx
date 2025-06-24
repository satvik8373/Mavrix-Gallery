import type { ResumeData } from '@/lib/resumeSchema';
import { Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap, Star, Code } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string, accentColor?: string }> = ({ title, children, className, accentColor }) => (
  <section className={`mb-5 ${className}`}>
    <h2 className="font-headline text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: accentColor }}>
      <Code size={14} />
      {title}
    </h2>
    {children}
  </section>
);

export function TechTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-gray-900 text-gray-200 font-code w-full h-full flex text-sm" style={wrapperStyle}>
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-gray-800/50 p-6 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="font-headline text-2xl font-bold text-white">{personal.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>{personal.title}</p>
        </div>

        <div className="flex-1 space-y-4 text-xs">
            <div>
              <h3 className="font-bold mb-1" style={{ color: 'var(--accent-color)' }}>CONTACT</h3>
              <ul className="space-y-1.5">
                  <li className="flex items-center gap-2"><Mail size={12} /> {personal.email}</li>
                  <li className="flex items-center gap-2"><Phone size={12} /> {personal.phone}</li>
                  <li className="flex items-center gap-2"><Linkedin size={12} /> {personal.linkedin}</li>
                  <li className="flex items-center gap-2"><MapPin size={12} /> {personal.location}</li>
              </ul>
            </div>
            
            {sectionVisibility.skills && (
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--accent-color)' }}>SKILLS</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(skill => (
                    <span key={skill} className="bg-gray-700 px-2 py-0.5 rounded text-[10px] font-medium" style={{ color: 'var(--accent-color)' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {sectionVisibility.education && (
              <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--accent-color)' }}>EDUCATION</h3>
                  {education.map(edu => (
                    <div key={edu.dataId}>
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <p className="text-gray-400">{edu.institution}</p>
                      <p className="text-gray-500 text-[10px]">{edu.duration}</p>
                    </div>
                  ))}
              </div>
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6">
        {sectionVisibility.summary && (
          <Section title="Profile" accentColor={accentColor}>
            <p className="text-xs leading-relaxed font-body text-gray-400">
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
                    <h3 className="font-bold text-sm text-white">{job.title}</h3>
                    <span className="text-xs" style={{ color: 'var(--accent-color)' }}>{job.duration}</span>
                  </div>
                  <p className="text-gray-400 mb-1.5">{job.company}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed text-gray-400 font-body">
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
