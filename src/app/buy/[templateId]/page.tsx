'use client'

import { useState } from 'react'
import { templates } from '@/lib/templates'
import { notFound, useRouter, useParams } from 'next/navigation'
import { ResumePreview } from '@/components/ResumePreview'
import { defaultResumeData } from '@/lib/resumeSchema'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Check, ArrowRight, Loader2 } from 'lucide-react'
import { CheckoutButton } from '@/components/CheckoutButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { addPurchasedTemplate, addPurchasedTemplateLocally } from '@/services/user'

export default function BuyPage() {
  const params = useParams<{ templateId: string }>()
  const template = templates.find(t => t.id === params.templateId)
  const { user } = useAuth();
  const [coupon, setCoupon] = useState('')
  const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(template?.price)
  const { toast } = useToast()
  const router = useRouter()
  const [isFreeLoading, setIsFreeLoading] = useState(false);

  if (!template || template.type !== 'paid') {
    notFound()
  }

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'FIRST100') {
      setDiscountedPrice(0)
      toast({
        title: 'Coupon Applied!',
        description: 'You get this template for free!',
      })
    } else {
      setDiscountedPrice(template?.price)
      toast({
        variant: 'destructive',
        title: 'Invalid Coupon',
        description: 'The coupon code you entered is not valid.',
      })
    }
  }

  const handleGetForFree = async () => {
    setIsFreeLoading(true);
    try {
      // Always store locally regardless of login status
      await addPurchasedTemplateLocally(template.id);
      
      // If user is logged in, also try to update Firestore
      if (user) {
    try {
        await addPurchasedTemplate(user.uid, template.id);
          console.log('Successfully added to Firestore');
        } catch (error) {
          console.warn('Failed to save to Firestore, but template is available locally:', error);
          // Continue with local storage only
        }
      } else {
        // If not logged in, prompt them to do so but continue anyway
        toast({
          title: "Not Logged In",
          description: "Template added locally. Sign in to access your templates on any device.",
        });
      }
      
        toast({
            title: "Success!",
            description: "You're being redirected to the editor.",
        });
      
        router.push(`/editor/${template.id}`);
    } catch(error) {
      console.error("Failed to save template:", error);
        toast({
            variant: "destructive",
            title: "Claiming Failed",
            description: "Could not claim template. Please try again.",
        });
    } finally {
        setIsFreeLoading(false);
    }
  }

  const TemplateComponent = template.component

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {template.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{template.description}</p>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>One-Time Purchase</CardTitle>
              <CardDescription>Get lifetime access to this premium template.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-6">
                {discountedPrice === 0 ? (
                    <>
                        <span className="line-through text-muted-foreground">₹{template.price}</span>
                        <span className="ml-2">₹0</span>
                    </>
                ) : (
                    <span>₹{template.price}</span>
                )}
                {discountedPrice === 0 && <span className="text-lg font-normal text-primary"> (100% off!)</span>}
                {discountedPrice !== 0 && <span className="text-lg font-normal text-muted-foreground"> one-time fee</span>}
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4" /> Professional, recruiter-approved design</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4" /> Full access to the AI-powered editor</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4" /> Unlimited PDF & Image downloads</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4" /> Secure payment via Razorpay</li>
              </ul>
              
              {discountedPrice !== 0 && (
                <div className="flex gap-2 mb-4">
                  <Input 
                    placeholder="Enter coupon code" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1"
                    aria-label="Coupon code"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                </div>
              )}
              
              {discountedPrice === 0 ? (
                <Button onClick={handleGetForFree} className="w-full" size="lg" disabled={isFreeLoading}>
                    {isFreeLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Template for Free <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <CheckoutButton templateId={template.id} templateName={template.name} templatePrice={discountedPrice} />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="order-first md:order-last">
            <h2 className="text-xl font-bold mb-4 text-center">Live Preview</h2>
            <div className="sticky top-20">
                <ResumePreview>
                    <TemplateComponent data={defaultResumeData} />
                </ResumePreview>
            </div>
        </div>
      </div>
    </div>
  )
}
