"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Import ErrorBoundary dynamically to avoid SSR issues
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

export default function ClientErrorBoundaryWrapper({
  children
}: {
  children: ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
