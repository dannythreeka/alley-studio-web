import { Metadata } from 'next';
import { metadata as jaMetadata } from './metadata';

// Export metadata
export const metadata: Metadata = jaMetadata;

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
