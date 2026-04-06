import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
