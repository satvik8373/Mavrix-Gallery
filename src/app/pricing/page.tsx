import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { templates } from "@/lib/templates";

export default function PricingPage() {
  const freeTemplates = templates.filter(t => t.type === 'free');
  const paidTemplates = templates.filter(t => t.type === 'paid');

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Simple, Transparent Pricing</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Choose the plan that's right for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Perfect for getting started.</CardDescription>
            <div className="text-4xl font-bold pt-4">₹0</div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2"><Check className="text-green-500" /> All basic editing features</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" /> Access to {freeTemplates.length} free template(s)</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" /> PDF and Image downloads</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" /> AI-powered summary generation</li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary flex flex-col">
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Unlock our best designs.</CardDescription>
            <div className="text-4xl font-bold pt-4">₹49 <span className="text-lg font-normal text-muted-foreground">/ template</span></div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2"><Check className="text-primary" /> All basic editing features</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> Access to {paidTemplates.length} premium templates</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> One-time payment per template</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> PDF and Image downloads</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> AI-powered summary generation</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/">Browse Premium Templates</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
