import AboutEshi from '@/components/home/about';
import CallToAction from '@/components/home/callToAction';
import FeaturedBlogs from '@/components/home/featuredBlogs';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';

const heroBg = {
  src: 'https://images.unsplash.com/photo-1708417135873-1e997cb491bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  alt: 'ESHI Consulting background',
};

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-indian-khaki via-albescent-white  to-albescent-white">
      <Hero bgImage={heroBg} />
      <AboutEshi />
      <Services />
      <FeaturedBlogs />
      <CallToAction />
      {/* Other sections */}
    </main>
  );
}
