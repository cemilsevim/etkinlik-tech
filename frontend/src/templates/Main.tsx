'use client';

import { Container, Navbar } from 'react-bootstrap';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" style={{ fontWeight: 'bold' }}>
            etkinlik.tech
          </Navbar.Brand>
        </Container>
      </Navbar>

      {children}
    </main>
  );
}

export default Main;
