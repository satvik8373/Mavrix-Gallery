import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ResumeRender. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
