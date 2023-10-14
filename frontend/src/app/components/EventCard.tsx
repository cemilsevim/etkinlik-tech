import styles from './EventCard.module.scss';
import { Button, Card } from 'react-bootstrap';

export interface IEventCardProps {
  title: string;
  date: string;
  description: string;
}

function EventCard({ title, date, description }: IEventCardProps) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://cdn.webrazzi.com/uploads/2020/02/summit-742_hd.png"
      />
      <Card.Body>
        <Card.Title>Webrazzi Summit</Card.Title>
        <Card.Subtitle className={styles['event-card-subtitle']}>
          25 Ekim 2023
        </Card.Subtitle>
        <Card.Text style={{ padding: '10px 0px' }}>
          Webrazzi Summit, hem online hem de fiziksel olarak gerçekleşecek!
          Türkiye girişimcilik ve teknoloji ekosisteminin buluşma noktası olan
          ve yılda bir kere gerçekleşen Webrazzi Summit'te, her yıl olduğu gibi
          birbirinden önemli yerli ve yabancı konuşmacılara ve binlerce
          katılımcıya ev sahipliği yapacağız. Tercihini online katılımdan yana
          kullanan katılımcılarımız; aynı fiziksel olarak etkinlik alanında
          bulunan katılımcılarımız gibi etkinlikteki tüm içeriğe, online fuaye
          alanına ve networking seçeneklerine erişerek etkinliğin tadını
          çıkarabilecekler. Geç kalmadan Webrazzi Summit'te yerinizi ayırtın
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <span>
          <span style={{ fontWeight: 'bold' }}>50</span> Katılımcı
        </span>
        <Button style={{ marginLeft: '10px' }} variant="dark">
          Hemen Katıl
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default EventCard;
