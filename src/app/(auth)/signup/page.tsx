'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertTriangle } from "lucide-react"
import { auth } from "@/lib/firebase"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.72 2.24-4.88 2.24-4.14 0-7.48-3.46-7.48-7.75s3.34-7.75 7.48-7.75c2.29 0 3.83.97 4.7 1.88l2.84-2.76C18.63 1.99 15.96 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c7.02 0 12.04-4.82 12.04-12.24 0-.8-.08-1.57-.2-2.32H12.48z" />
  </svg>
)

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const isFirebaseConfigured = !!auth

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signup(values.email, values.password);
      toast({ title: "Account Created", description: "Welcome! You have been successfully signed up."})
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast({ title: "Account Created", description: "Welcome! You have been successfully signed up."})
      router.push("/")
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message || "An unexpected error occurred.",
        })
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isFirebaseConfigured ? (
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </Form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignup} disabled={isLoading || isGoogleLoading}>
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </div>
        ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Firebase Not Configured</AlertTitle>
              <AlertDescription>
                Please add your Firebase credentials to the <code>.env</code> file.
                See <code>README.md</code> for instructions.
              </AlertDescription>
            </Alert>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
