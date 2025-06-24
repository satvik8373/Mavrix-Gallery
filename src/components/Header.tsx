'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, FileText, User, LogOut, ShoppingBag } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const { user, logout } = useAuth();

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">ResumeRender</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-bold">ResumeRender</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/purchases">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Templates</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <nav className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
               <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
