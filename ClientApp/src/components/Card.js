import Card from 'react-bootstrap/Card';

export default function Cards() {
  return (
    <Card className="card">
      <Card.Body>
        <Card.Title>Lorem ipsum</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus, purus sodales faucibus auctor, justo enim accumsan ante, ac placerat sem est ac tellus. Sed eleifend nulla eget diam scelerisque faucibus. Duis massa tortor, euismod sit amet neque sit amet, porttitor tempus nibh.
        </Card.Text>
        <Card.Link href="#" className='btn button'>Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
