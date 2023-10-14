'use client';

import Main from '@/templates/Main';
import Link from 'next/link';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import EventCard from './components/EventCard';

export default function Home() {
  const onClick = () => console.log('');

  return (
    <Main>
      <Container className="mt-5">
        <h2>Etkinlikler</h2>

        <Nav variant="underline" defaultActiveKey="/today" className="mt-4">
          <Nav.Item>
            <Link href="/today" className="btn btn-primary">
              Bugünkü
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/upcoming" className="btn">
              Yaklaşan
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Item>
              <Link href="/past" className="btn">
                Geçmiş
              </Link>
            </Nav.Item>
          </Nav.Item>
        </Nav>

        <Row xs={1} md={2} className="g-3 mt-4 events">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Col key={idx}>
              <EventCard title="" description="" date="" />
            </Col>
          ))}
        </Row>
      </Container>
    </Main>
  );
}
