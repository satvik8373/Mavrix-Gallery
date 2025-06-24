import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star, Linkedin } from 'lucide-react'
import type { ResumeData } from '@/lib/resumeSchema'

const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <section className="mb-4">
    <h2 className="font-headline text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {children}
  </section>
);

const Job: React.FC<{ title: string; company: string; duration: string; description: string[] }> = ({ title, company, duration, description }) => (
  <div className="mb-3 break-inside-avoid">
    <h3 className="text-base font-bold text-gray-800">{title}</h3>
    <div className="flex justify-between items-baseline mb-1">
      <p className="font-semibold text-gray-700 text-sm">{company}</p>
      <p className="text-xs text-gray-500">{duration}</p>
    </div>
    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
      {description.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <div className="bg-white p-8 font-body text-gray-800 w-full h-full text-sm" style={wrapperStyle}>
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold text-gray-900">{personal.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{personal.title}</p>
        <div className="flex justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-3 flex-wrap">
          <span className="flex items-center gap-1.5"><Mail size={12} /> {personal.email}</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><Phone size={12} /> {personal.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><Linkedin size={12} /> {personal.linkedin}</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><MapPin size={12} /> {personal.location}</span>
        </div>
      </header>

      <main>
        {sectionVisibility.summary && (
          <Section title="Professional Summary" icon={<Briefcase size={18} />}>
            <p className="text-gray-600 text-sm">
              {summary}
            </p>
          </Section>
        )}
        
        {sectionVisibility.experience && (
          <Section title="Work Experience" icon={<Briefcase size={18} />}>
            {experience.map(job => (
              <Job 
                key={job.dataId}
                title={job.title}
                company={job.company}
                duration={job.duration}
                description={job.description}
              />
            ))}
          </Section>
        )}

        {sectionVisibility.education && (
          <Section title="Education" icon={<GraduationCap size={18} />}>
            {education.map(edu => (
              <div className="mb-3" key={edu.dataId}>
                <h3 className="text-base font-bold text-gray-800">{edu.degree}</h3>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-semibold text-gray-700 text-sm">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.duration}</p>
                </div>
              </div>
            ))}
          </Section>
        )}

        {sectionVisibility.skills && (
          <Section title="Skills" icon={<Star size={18} />}>
            <div className="flex flex-wrap gap-1">
              {skills.map(skill => (
                <span key={skill} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">{skill}</span>
              ))}
            </div>
          </Section>
        )}
      </main>
    </div>
  )
}
