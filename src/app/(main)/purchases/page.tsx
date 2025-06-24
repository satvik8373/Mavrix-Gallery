'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getPurchasedTemplates } from '@/services/user';
import { templates, type Template } from '@/lib/templates';
import { Loader2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumePreview } from '@/components/ResumePreview';
import { defaultResumeData } from '@/lib/resumeSchema';

export default function PurchasesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [purchased, setPurchased] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) {
            return;
        }
        if (!user) {
            router.push('/login?redirect=/purchases');
            return;
        }

        async function fetchPurchases() {
            setLoading(true);
            try {
                const templateIds = await getPurchasedTemplates(user!.uid);
                const purchasedTemplates = templates.filter(t => templateIds.includes(t.id));
                setPurchased(purchasedTemplates);
            } catch (error) {
                console.error("Failed to fetch purchased templates:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPurchases();
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <div className="flex h-[60vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Templates</h1>
                <p className="mt-2 text-lg text-muted-foreground">Access and edit your purchased resume templates.</p>
            </div>

            {purchased.length > 0 ? (
                 <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
                    {purchased.map((template) => {
                        const TemplateComponent = template.component;
                        return (
                         <Link href={`/editor/${template.id}`} key={template.id} className="group relative block">
                            <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="font-headline text-xl pr-2">{template.name}</CardTitle>
                                        <Badge variant="secondary">Purchased</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                  <div className="flex-1">
                                    <ResumePreview>
                                        <TemplateComponent data={defaultResumeData} />
                                    </ResumePreview>
                                  </div>
                                  <Button className="w-full mt-4">
                                        Open Editor <ArrowRight className="ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                         </Link>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">No Templates Purchased Yet</h2>
                    <p className="mt-2 text-muted-foreground">Your premium templates will appear here after purchase.</p>
                    <Button asChild className="mt-6">
                        <Link href="/#templates">Browse Templates</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
