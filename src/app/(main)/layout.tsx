import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Aurora from '@/components/Aurora';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Aurora colorStops={["#87CEEB", "#D8BFD8", "#87CEEB"]} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
