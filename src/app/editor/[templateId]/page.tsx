'use client';
import { templates } from '@/lib/templates';
import { notFound, useRouter, useParams } from 'next/navigation';
import { ResumeEditor } from '@/components/ResumeEditor';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getPurchasedTemplates } from '@/services/user';


function EditorAuthorization({ templateId }: { templateId: string }) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    const template = templates.find(t => t.id === templateId);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            // This is already handled by the layout, but as a safeguard.
            router.push(`/login?redirect=/editor/${templateId}`);
            return;
        }

        if (!template) {
            notFound();
            return;
        }

        async function checkAuthorization() {
            if (template.type === 'free') {
                setIsAuthorized(true);
            } else {
                const purchased = await getPurchasedTemplates(user!.uid);
                if (purchased.includes(templateId)) {
                    setIsAuthorized(true);
                } else {
                    router.push(`/buy/${templateId}`);
                }
            }
            setLoading(false);
        }

        checkAuthorization();
    }, [user, authLoading, router, templateId, template]);
    
    // The main editor layout already shows a loader, so we can just show another one
    // while we check for purchase authorization.
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!isAuthorized) {
        // This case should be handled by redirects, but as a fallback shows loader
        // while redirecting.
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return <ResumeEditor templateId={templateId} />;
}


export default function EditorPage() {
  const params = useParams<{ templateId: string }>();
  const template = templates.find((t) => t.id === params.templateId);

  if (!template) {
    notFound();
  }

  return <EditorAuthorization templateId={template.id} />;
}
