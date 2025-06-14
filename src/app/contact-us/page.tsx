import { Metadata } from 'next';
import ContactUsClient from '../../components/ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us | Zingvel',
  description: 'Get in touch with Zingvel travel experts. Contact us for inquiries, support, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | Zingvel',
    description: 'Get in touch with Zingvel travel experts. Contact us for inquiries, support, or partnership opportunities.',
    images: ['/contact/hero.jpg'],
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
