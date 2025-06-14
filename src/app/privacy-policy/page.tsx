import { Metadata } from 'next';
import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zingvel',
  description: 'Learn how Zingvel collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.',
  openGraph: {
    title: 'Privacy Policy | Zingvel',
    description: 'Learn how Zingvel collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.',
    images: ['/legal/privacy-policy.jpg'],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
