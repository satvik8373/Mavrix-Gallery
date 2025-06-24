import type { ResumeData } from '@/lib/resumeSchema';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';

const SkillBarVisual = ({ level, color }: { level: number; color: string }) => (
    <div className="h-1 w-full bg-gray-300 rounded-full">
      <div 
        className="h-1 rounded-full" 
        style={{ width: `${level}%`, backgroundColor: color }}
      />
    </div>
)

export function VisualCvTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, awards, design } = data;
  const { sectionVisibility, fontFamily, fontSize, accentColor } = design;

  const wrapperStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}%`,
    '--accent-color': accentColor,
  } as React.CSSProperties;

  const skillLevels: { [key: string]: number } = {
    'Illustrator': 80,
    'Photoshop': 90,
    'Indesign': 70,
    'Ms Word': 95,
  };

  return (
    <div className="bg-white w-full h-full font-sans text-xs relative flex flex-col" style={wrapperStyle}>
      {/* Header */}
      <div className="relative h-36">
        <div className="absolute inset-0 bg-[#2C3E50] z-0">
           <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M1440 100H0V0c.05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80v100z" fill="var(--accent-color)"></path>
           </svg>
        </div>
        <div className="absolute inset-0 px-8 pt-6 flex items-start justify-between z-10">
          <div>
            <h1 className="text-white text-3xl font-bold uppercase tracking-wider">{personal.name}</h1>
            <p className="text-white/80 text-base tracking-widest mt-1">{personal.title}</p>
          </div>
          <div className="w-28 h-28 rounded-full ring-4 ring-white/50 bg-white overflow-hidden shrink-0">
             {personal.photoUrl && (
                <Image
                src={personal.photoUrl}
                alt={personal.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
                data-ai-hint="man face"
                />
             )}
          </div>
        </div>
      </div>
      
      {/* Body */}
      <main className="flex-1 grid grid-cols-12">
        {/* Left Column */}
        <div className="col-span-5 bg-gray-100 p-6 -mt-10 z-0">
          {sectionVisibility.summary && (
            <section className="mt-10 mb-4">
                  <h2 className="font-bold text-base mb-2 border-b-2 pb-1" style={{color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>Profile</h2>
                  <p className="text-gray-600 leading-snug text-[11px]">{summary}</p>
            </section>
          )}

          {sectionVisibility.skills && (
            <section className="mb-4">
                <h2 className="font-bold text-base mb-2 border-b-2 pb-1" style={{color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>Skills</h2>
                <div className="space-y-2">
                    {skills.slice(0, 4).map(skill => (
                        <div key={skill}>
                            <p className="font-medium text-xs">{skill}</p>
                            <SkillBarVisual level={skillLevels[skill] || 80} color={accentColor} />
                        </div>
                    ))}
                </div>
            </section>
          )}

           <section>
                <h2 className="font-bold text-base mb-2 border-b-2 pb-1" style={{color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>Language</h2>
                <div className="space-y-1 text-xs">
                    <p className="font-medium">English <span className="float-right font-mono text-gray-400">- - - - -</span></p>
                    <p className="font-medium">Spanish <span className="float-right font-mono text-gray-400">- - - . .</span></p>
                    <p className="font-medium">French  <span className="float-right font-mono text-gray-400">- - . . .</span></p>
                </div>
           </section>
        </div>

        {/* Right Column */}
        <div className="col-span-7 p-6 pt-4">
          {sectionVisibility.education && (
            <section className="mb-4">
                <h2 className="font-bold text-base mb-2 border-b-2 pb-1" style={{color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>Education</h2>
                 {education.map(edu => (
                    <div key={edu.dataId} className="mb-3">
                        <p className="font-semibold text-gray-500 text-[11px]">{edu.duration}</p>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-gray-600 text-[11px]">{edu.institution}</p>
                    </div>
                ))}
            </section>
          )}
          {sectionVisibility.experience && (
             <section>
                <h2 className="font-bold text-base mb-2 border-b-2 pb-1" style={{color: 'var(--accent-color)', borderColor: 'var(--accent-color)'}}>Experience</h2>
                {experience.map(job => (
                    <div key={job.dataId} className="mb-3">
                        <p className="font-semibold text-gray-500 text-[11px]">{job.duration}</p>
                        <h3 className="font-bold">{job.title}</h3>
                        <p className="text-gray-600 text-[11px]">{job.description.join(', ')}</p>
                    </div>
                ))}
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
       <div className="relative h-20 mt-auto">
         <div className="absolute inset-0 bg-[#2C3E50] z-0">
             <svg className="absolute top-0 left-0 w-full h-auto" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{transform: 'scaleY(-1)'}}>
                <path d="M1440 100H0V0c.05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80 .05 44.11 44.11 80 98.05 80 53.95 0 97.9-35.89 98-80v100z" fill="var(--accent-color)"></path>
             </svg>
         </div>
          <div className="relative z-10 text-white flex items-center justify-around h-full px-6 text-[10px]">
            <div className="flex items-center gap-1">
                <Phone size={12} /> <span>{personal.phone}</span>
            </div>
             <div className="flex items-center gap-1">
                <Mail size={12} /> <span>{personal.email}</span>
            </div>
             <div className="flex items-center gap-1">
                <Globe size={12} /> <span>{personal.linkedin}</span>
            </div>
             <div className="flex items-center gap-1">
                <MapPin size={12} /> <span>{personal.location}</span>
            </div>
          </div>
          {sectionVisibility.awards && (
            <div className="absolute -top-16 right-6 text-white p-3 w-52 shadow-lg" style={{ backgroundColor: 'var(--accent-color)' }}>
                <h2 className="font-bold text-base mb-1 text-center border-b border-white/50 pb-1">Awards</h2>
                <div className="space-y-1 mt-2 text-[11px]">
                {awards.slice(0,2).map(award => (
                    <div key={award.dataId} className="flex justify-between">
                        <span className="font-semibold">{award.date}</span>
                        <span>{award.name}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
       </div>
    </div>
  )
}
