import { Metadata } from 'next';
import AboutClient from '../../components/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Zingvel',
  description: 'Learn about Zingvel, our story, mission, and the team behind our travel experiences platform.',
  openGraph: {
    title: 'About Us | Zingvel',
    description: 'Learn about Zingvel, our story, mission, and the team behind our travel experiences platform.',
    images: ['/about/hero.jpg'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
