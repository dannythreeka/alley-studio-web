import { Metadata } from 'next';
import { metadata as enMetadata } from './metadata';

// Export metadata
export const metadata: Metadata = enMetadata;

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
