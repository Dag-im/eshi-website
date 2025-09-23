import AboutEshi from '@/components/home/about';
import CallToAction from '@/components/home/callToAction';
import FeaturedBlogs from '@/components/home/featuredBlogs';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-indian-khaki via-albescent-white  to-albescent-white">
      <Hero />
      <AboutEshi />
      <Services />
      <FeaturedBlogs />
      <CallToAction />
      {/* Other sections */}
    </main>
  );
}
