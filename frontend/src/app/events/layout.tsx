import Main from '@/templates/Main';
import { Metadata } from 'next';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'etkinlik.tech detail',
  description: 'Etkinlik detail',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  );
}
