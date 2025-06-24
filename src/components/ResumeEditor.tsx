'use client';

import { templates } from '@/lib/templates';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  defaultResumeData,
  resumeDataSchema,
  type ResumeData
} from '@/lib/resumeSchema';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { Wand2, PlusCircle, Trash2, Loader, Download, Eye, Edit } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { ResumePreview } from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateSummary } from '@/ai/flows/generateSummary';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Stepper, { Step } from '@/components/Stepper';
import { cn } from '@/lib/utils';


export function ResumeEditor({ templateId }: { templateId: string }) {
  const [isAiLoading, startAiTransition] = useTransition();
  const { toast } = useToast();
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isLgScreen, setIsLgScreen] = useState(false);

  const template = useMemo(() => templates.find((t) => t.id === templateId), [templateId]);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeDataSchema),
    defaultValues: defaultResumeData,
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control: form.control,
    name: 'awards',
  });

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(`resumeData-${templateId}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(resumeDataSchema.parse(parsedData));
      } catch (error) {
        console.error("Failed to parse saved resume data", error);
        form.reset(defaultResumeData);
      }
    }

    const mediaQuery = window.matchMedia(`(min-width: 1024px)`);
    setIsLgScreen(mediaQuery.matches);
    const handleResize = (e: MediaQueryListEvent) => setIsLgScreen(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };

  }, [templateId, form]);

  const watchedData = form.watch();

  useEffect(() => {
    if (isClient) {
      const subscription = form.watch((value) => {
        localStorage.setItem(`resumeData-${templateId}`, JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, templateId, isClient]);


  const handleGenerateSummary = () => {
    const jobTitle = form.getValues('personal.title');
    const skills = form.getValues('skills').join(', ');

    if (!jobTitle) {
      toast({
        variant: 'destructive',
        title: 'Job title is missing',
        description: 'Please enter a job title to generate a summary.',
      });
      return;
    }

    startAiTransition(async () => {
      try {
        const result = await generateSummary({ jobTitle, experience: skills });
        form.setValue('summary', result.summary, { shouldValidate: true, shouldDirty: true });
        toast({
          title: 'Summary Generated!',
          description: 'The professional summary has been updated.',
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'AI Generation Failed',
          description: 'Could not generate summary. Please try again.',
        });
      }
    });
  };

  const handleDownload = async (format: 'pdf' | 'png') => {
    // On mobile, ensure the preview is visible before capturing
    if (!isLgScreen && mobileView === 'editor') {
        setMobileView('preview');
        // Wait a moment for the view to switch and render
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const element = resumePreviewRef.current;
    if (!element) return;

    toast({ title: 'Generating Download...', description: `Your ${format.toUpperCase()} is being prepared.` });

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
    });

    if (format === 'png') {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `resume-${templateId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`resume-${templateId}.pdf`);
    }
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Template not found.</p>
      </div>
    );
  }

  const { design } = watchedData;
  const sectionVisibilityKeys = Object.keys(defaultResumeData.design.sectionVisibility);


  const TemplateComponent = template.component;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
       {!isLgScreen && (
            <Button
                variant="default"
                size="icon"
                className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg lg:hidden"
                onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')}
            >
                {mobileView === 'editor' ? <Eye className="h-6 w-6" /> : <Edit className="h-6 w-6" />}
                <span className="sr-only">{mobileView === 'editor' ? 'Show Preview' : 'Back to Editor'}</span>
            </Button>
        )}

      <div className={cn("bg-muted/40 flex-col", {
          "flex": isLgScreen || mobileView === 'editor',
          "hidden": !isLgScreen && mobileView === 'preview',
      })}>
        <div className="p-8 pb-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Your Resume</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleDownload('png')}><Download className="mr-2 h-4 w-4" /> PNG</Button>
              <Button onClick={() => handleDownload('pdf')}><Download className="mr-2 h-4 w-4" /> PDF</Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
            <Stepper
                backButtonText="Previous"
                nextButtonText="Next"
                stepCircleContainerClassName="bg-card border-none"
                onFinalStepCompleted={() => {
                    if (!isLgScreen) {
                        setMobileView('preview');
                    }
                }}
                >
                <Step>
                    <h3 className="font-bold text-lg mb-4">Personal Details</h3>
                    <div className="space-y-4">
                        <Input {...form.register('personal.name')} placeholder="Full Name" />
                        <Input {...form.register('personal.title')} placeholder="Job Title (e.g. Full Stack Developer)" />
                        <Input {...form.register('personal.photoUrl')} placeholder="Photo URL" />
                        <Input {...form.register('personal.email')} placeholder="Email Address" />
                        <Input {...form.register('personal.phone')} placeholder="Phone Number" />
                        <Input {...form.register('personal.location')} placeholder="Location (e.g. San Francisco, CA)" />
                        <Input {...form.register('personal.linkedin')} placeholder="Website/LinkedIn Profile URL" />
                        <Input {...form.register('personal.initials')} placeholder="Initials (e.g. JD)" />
                    </div>
                </Step>
                <Step>
                    <h3 className="font-bold text-lg mb-4">Professional Summary</h3>
                    <div className="space-y-2">
                        <Textarea {...form.register('summary')} rows={8} placeholder="Write a brief summary about your professional background..."/>
                        <Button type="button" variant="outline" onClick={handleGenerateSummary} disabled={isAiLoading}>
                        {isAiLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Generate with AI
                        </Button>
                    </div>
                </Step>
                 <Step>
                    <h3 className="font-bold text-lg mb-4">Work Experience</h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {experienceFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-3 relative bg-background">
                            <Input {...form.register(`experience.${index}.title`)} placeholder="Job Title" />
                            <Input {...form.register(`experience.${index}.company`)} placeholder="Company" />
                            <Input {...form.register(`experience.${index}.duration`)} placeholder="Duration (e.g. Jan 2021 - Present)" />
                            <Textarea {...form.register(`experience.${index}.description.0`)} placeholder="Description of your role and achievements..." />
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    <Button type="button" variant="outline" className="mt-4" onClick={() => appendExperience({ title: '', company: '', duration: '', description: [''] })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                </Step>
                 <Step>
                    <h3 className="font-bold text-lg mb-4">Education</h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {educationFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-3 relative bg-background">
                            <Input {...form.register(`education.${index}.degree`)} placeholder="Degree (e.g. B.S. in Computer Science)" />
                            <Input {...form.register(`education.${index}.institution`)} placeholder="Institution (e.g. University of Technology)" />
                            <Input {...form.register(`education.${index}.duration`)} placeholder="Duration (e.g. 2014 - 2018)" />
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        ))}
                    </div>
                     <Button type="button" variant="outline" className="mt-4" onClick={() => appendEducation({ degree: '', institution: '', duration: '' })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                </Step>
                 <Step>
                    <h3 className="font-bold text-lg mb-4">Skills & Awards</h3>
                    <div className="space-y-6">
                        <div>
                             <Label className="mb-2 block">Skills</Label>
                            <Textarea 
                                {...form.register('skills')} 
                                placeholder="Enter skills, separated by commas (e.g. React, Node.js, Python)"
                                onChange={(e) => form.setValue('skills', e.target.value.split(',').map(s => s.trim()))}
                                />
                        </div>
                        <div>
                            <Label className="mb-2 block">Awards</Label>
                             <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                                {awardFields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-lg space-y-3 relative bg-background">
                                    <Input {...form.register(`awards.${index}.name`)} placeholder="Award Name" />
                                    <Input {...form.register(`awards.${index}.date`)} placeholder="Date (e.g. 2022)" />
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeAward(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" className="mt-4" onClick={() => appendAward({ name: '', date: '' })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Award
                            </Button>
                        </div>
                    </div>
                </Step>
                 <Step>
                    <h3 className="font-bold text-lg mb-4">Design &amp; Layout</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <Input type="color" {...form.register('design.accentColor')} className="h-10 p-1 w-full"/>
                        </div>
                        <div className="space-y-2">
                        <Label>Font Family</Label>
                        <Select onValueChange={(value) => form.setValue('design.fontFamily', value)} defaultValue={design.fontFamily}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Inter">Inter (Sans-serif)</SelectItem>
                            <SelectItem value="Lora">Lora (Serif)</SelectItem>
                            <SelectItem value="Space Grotesk">Space Grotesk (Display)</SelectItem>
                            <SelectItem value="Source Code Pro">Source Code Pro (Monospace)</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label>Font Size: {design.fontSize}%</Label>
                        <Slider
                            defaultValue={[design.fontSize]}
                            min={80}
                            max={120}
                            step={5}
                            onValueChange={(value) => form.setValue('design.fontSize', value[0])}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label>Section Visibility</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {sectionVisibilityKeys.map((key) => (
                            <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                id={`vis-${key}`}
                                checked={form.watch(`design.sectionVisibility.${key}`)}
                                onCheckedChange={(checked) => form.setValue(`design.sectionVisibility.${key}`, !!checked)}
                                />
                                <Label htmlFor={`vis-${key}`} className="capitalize font-normal text-sm">{key}</Label>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </Step>
            </Stepper>
        </div>

      </div>

      <div className={cn("items-center justify-center p-8 bg-gray-900", {
          "flex": isLgScreen || mobileView === 'preview',
          "hidden": !isLgScreen && mobileView === 'editor'
      })}>
        <div className="w-full max-w-4xl mx-auto">
          <ResumePreview ref={resumePreviewRef}>
            <TemplateComponent data={watchedData} />
          </ResumePreview>
        </div>
      </div>
    </div>
  );
}