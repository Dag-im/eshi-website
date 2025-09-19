'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { BorderBeam } from '@/components/magicui/border-beam';

import { Particles } from '@/components/magicui/particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';

const contactInfo = [
  {
    title: 'Email',
    value: 'info@eshi.org',
    icon: <Mail className="w-6 h-6 text-avocado" />,
    link: 'mailto:info@eshi.org',
  },
  {
    title: 'Phone',
    value: '+251 911 234 567',
    icon: <Phone className="w-6 h-6 text-avocado" />,
    link: 'tel:+251911234567',
  },
  {
    title: 'Address',
    value: 'Addis Ababa, Ethiopia',
    icon: <MapPin className="w-6 h-6 text-avocado" />,
    link: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -5, scale: 1.02, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' },
};

export default function ContactUsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission to admin
    try {
      // In a real app, this would POST to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-albescent-white via-indian-khaki to-albescent-white">
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-avocado/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-deco/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-avocado to-deco"
          >
            <AuroraText
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
              colors={[
                'var(--color-deco)',
                'var(--color-avocado)',
                'var(--color-rangitoto)',
              ]}
              speed={1.2}
            >
              Contact Us
            </AuroraText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="text-lg text-rangitoto/80 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Get in touch with ESHI to discuss how we can partner for sustainable
            impact in your community.
          </motion.p>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="relative pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-rangitoto mb-8">
              Get In Touch
            </h2>
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover="hover"
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="relative rounded-2xl bg-deco backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <BorderBeam
                    size={200}
                    duration={i * 4}
                    colorFrom="var(--color-deco)"
                    colorTo="var(--color-avocado)"
                  />
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="p-2 bg-avocado/10 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-rangitoto">
                        {info.title}
                      </h3>
                      <a
                        href={info.link}
                        className="text-lemon-grass hover:text-avocado transition-colors block"
                      >
                        {info.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={itemVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-rangitoto mb-8">
              Send a Message
            </h2>
            <Card className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden">
              <BorderBeam
                size={300}
                duration={10}
                colorFrom="var(--color-avocado)"
                colorTo="var(--color-deco)"
              />
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-rangitoto placeholder-rangitoto/50 focus:border-avocado"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-rangitoto placeholder-rangitoto/50 focus:border-avocado"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="bg-white/20 border-white/30 text-rangitoto placeholder-rangitoto/50 focus:border-avocado"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-rangitoto text-albescent-white hover:bg-avocado transition-all duration-300 py-6 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-avocado font-semibold mt-4"
                  >
                    Message sent successfully! We&apos;ll get back to you soon.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-red-500 font-semibold mt-4"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
