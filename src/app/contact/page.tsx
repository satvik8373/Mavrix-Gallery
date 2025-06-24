import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <p className="text-muted-foreground">Have a question or feedback? We'd love to hear from you.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Name" />
              <Input type="email" placeholder="Email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Your message" rows={5} />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
