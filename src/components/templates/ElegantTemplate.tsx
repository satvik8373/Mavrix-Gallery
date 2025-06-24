import type { ResumeData } from '@/lib/resumeSchema';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-5">
    <h2 className="text-center font-headline text-sm font-semibold uppercase tracking-[.2em] text-gray-600 mb-3">{title}</h2>
    {children}
  </section>
);

export function ElegantTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, design } = data;
  const { sectionVisibility, fontFamily, fontSize } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
  } as React.CSSProperties;

  return (
    <div className="bg-white p-8 w-full h-full font-serif text-gray-800 text-sm" style={wrapperStyle}>
      <header className="text-center mb-6 border-b border-gray-200 pb-4">
        <h1 className="font-headline text-3xl font-bold tracking-wide">{personal.name}</h1>
        <p className="text-base text-gray-500 mt-1">{personal.title}</p>
      </header>

      <div className="text-center text-xs text-gray-500 mb-6 space-x-4">
        <span>{personal.email}</span>
        <span>&middot;</span>
        <span>{personal.phone}</span>
        <span>&middot;</span>
        <span>{personal.linkedin}</span>
         <span>&middot;</span>
        <span>{personal.location}</span>
      </div>

      <main>
        {sectionVisibility.summary && (
          <Section title="Profile">
            <p className="text-center text-xs leading-relaxed">
              {summary}
            </p>
          </Section>
        )}
        
        <div className="my-6 border-t border-gray-200" />

        {sectionVisibility.experience && (
          <Section title="Experience">
            {experience.map(job => (
              <div key={job.dataId} className="mb-4 break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-black">{job.title} at {job.company}</h3>
                  <p className="text-xs text-gray-500">{job.duration}</p>
                </div>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {job.description.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}
        
        <div className="my-6 border-t border-gray-200" />

        {sectionVisibility.education && (
          <Section title="Education">
            {education.map(edu => (
              <div key={edu.dataId} className="text-center mb-2">
                  <h3 className="text-sm font-bold">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.institution} ({edu.duration})</p>
              </div>
            ))}
          </Section>
        )}

        <div className="my-6 border-t border-gray-200" />

        {sectionVisibility.skills && (
          <Section title="Skills">
            <p className="text-center text-xs text-gray-500">
              {skills.join(' | ')}
            </p>
          </Section>
        )}
      </main>
    </div>
  )
}
