import type { ResumeData } from '@/lib/resumeSchema'
import { Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react'

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <section className="mb-4">
    <h2 className="font-headline text-base font-bold uppercase tracking-wider text-gray-700 border-b border-gray-300 pb-1 mb-2 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {children}
  </section>
);

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-white p-8 font-body text-gray-800 w-full h-full text-sm" style={wrapperStyle}>
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-bold text-gray-900">{personal.name}</h1>
        <p className="text-base font-semibold mt-1" style={{ color: 'var(--accent-color)' }}>{personal.title}</p>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex items-center gap-2 text-xs">
          <Mail size={12} style={{ color: 'var(--accent-color)' }} />
          <span>{personal.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone size={12} style={{ color: 'var(--accent-color)' }} />
          <span>{personal.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Linkedin size={12} style={{ color: 'var(--accent-color)' }} />
          <span>{personal.linkedin}</span>
        </div>
         <div className="flex items-center gap-2 text-xs col-span-3">
          <MapPin size={12} style={{ color: 'var(--accent-color)' }} />
          <span>{personal.location}</span>
        </div>
      </div>

      <main>
        {sectionVisibility.summary && (
          <Section title="Summary">
            <p className="text-xs leading-relaxed">{summary}</p>
          </Section>
        )}

        {sectionVisibility.experience && (
          <Section title="Experience" icon={<Briefcase size={16} />}>
            {experience.map(job => (
              <div key={job.dataId} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">{job.title}</h3>
                  <p className="text-xs text-gray-500">{job.duration}</p>
                </div>
                <p className="text-xs font-semibold text-gray-700 mb-1">{job.company}</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {job.description.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {sectionVisibility.education && (
          <Section title="Education" icon={<GraduationCap size={16} />}>
            {education.map(edu => (
              <div key={edu.dataId} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">{edu.degree}</h3>
                  <p className="text-xs text-gray-500">{edu.duration}</p>
                </div>
                <p className="text-xs font-semibold text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </Section>
        )}

        {sectionVisibility.skills && (
          <Section title="Skills" icon={<Star size={16} />}>
            <p className="text-xs text-gray-600">
              {skills.join(' · ')}
            </p>
          </Section>
        )}
      </main>
    </div>
  )
}
