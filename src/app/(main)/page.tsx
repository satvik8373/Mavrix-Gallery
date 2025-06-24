
import Link from 'next/link';
import {
  Card as ShadCard,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { templates } from '@/lib/templates';
import { ResumePreview } from '@/components/ResumePreview';
import { defaultResumeData } from '@/lib/resumeSchema';
import {
  ArrowRight,
  LayoutTemplate,
  Wand2,
  Download,
  Eye,
  Lock,
  LogIn,
} from 'lucide-react';
import CardSwap, { Card } from '@/components/CardSwap';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4">
            Powered by Generative AI
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build Your Perfect Resume, Faster
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Create a professional resume that stands out. Our AI assistant and beautiful templates make it easy to impress recruiters and land your dream job.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#templates">
                Choose a Template <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 sm:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="max-w-lg">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Create Your Resume in 3 Simple Steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From zero to a professional resume in minutes. Our intuitive process makes it easy to build a standout resume.
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <LayoutTemplate className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">1. Select a Template</h3>
                    <p className="mt-1 text-muted-foreground">
                      Choose from our collection of professionally designed free and premium templates.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <Wand2 className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">2. Customize with AI</h3>
                    <p className="mt-1 text-muted-foreground">
                      Fill in your details and let our AI help you write a compelling professional summary.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <Download className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">3. Download & Impress</h3>
                    <p className="mt-1 text-muted-foreground">
                      Export your finished resume as a high-quality PDF or PNG, ready for job applications.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: CardSwap Component */}
            <div className="relative h-[450px] lg:h-[600px] w-full">
              <CardSwap
                cardDistance={50}
                verticalDistance={60}
                skewAmount={4}
                easing="power"
              >
                <Card className="bg-card flex flex-col items-center justify-center p-6 text-center border-border">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                    <LayoutTemplate className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-headline">Select a Template</h3>
                  <p className="text-muted-foreground">
                    Browse professionally designed templates.
                  </p>
                </Card>
                <Card className="bg-card flex flex-col items-center justify-center p-6 text-center border-border">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                    <Wand2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-headline">Customize with AI</h3>
                  <p className="text-muted-foreground">
                    Let our AI help you craft the perfect summary.
                  </p>
                </Card>
                <Card className="bg-card flex flex-col items-center justify-center p-6 text-center border-border">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                    <Download className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-headline">Download & Impress</h3>
                  <p className="text-muted-foreground">
                    Export your resume in PDF or PNG format.
                  </p>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>
      
      {/* Templates Section */}
      <section id="templates" className="py-16 sm:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Find Your Perfect Template
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Whether you're a recent graduate or a seasoned professional, we have a design for you.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
                {templates.map((template) => {
                const TemplateComponent = template.component;
                const href = template.type === 'free' ? `/editor/${template.id}` : `/buy/${template.id}`;
                
                return (
                    <Link href={href} key={template.id} className="group relative block">
                    <ShadCard className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                        <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="font-headline text-xl pr-2">{template.name}</CardTitle>
                            <Badge variant={template.type === 'paid' ? 'default' : 'secondary'} className="flex-shrink-0">
                            {template.type === 'paid' ? `₹${template.price}` : 'Free'}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground pt-1">{template.description}</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <ResumePreview>
                                <TemplateComponent data={defaultResumeData} />
                            </ResumePreview>
                          </div>
                        </CardContent>
                    </ShadCard>
                    </Link>
                );
                })}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything You Need to Succeed
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Powerful features designed to make your job hunt easier.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI-Powered Content</h3>
                <p className="mt-1 text-muted-foreground">
                  Beat writer's block. Generate professional summaries in seconds.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Beautiful Templates</h3>
                <p className="mt-1 text-muted-foreground">
                  Choose from a selection of recruiter-approved resume designs.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Live Preview</h3>
                <p className="mt-1 text-muted-foreground">
                  See your changes in real-time. What you see is what you get.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Instant Downloads</h3>
                <p className="mt-1 text-muted-foreground">
                  Export your resume as a high-quality PDF or PNG file instantly.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Secure & Private</h3>
                <p className="mt-1 text-muted-foreground">
                  Your data is yours. We use Firebase to securely manage your account.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Free Account</h3>
                <p className="mt-1 text-muted-foreground">
                  Sign up for a free account to save and manage your resumes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-t from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Land Your Dream Job?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A great resume is the first step. Let's build yours today.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="#templates">
                    Get Started Now <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </main>
  );
}
