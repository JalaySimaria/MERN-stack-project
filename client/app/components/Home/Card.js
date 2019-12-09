import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CustomCard(props) {
  const { image, title, subtitle, description, rating } = props;
  return <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>
          {title}
          <br />
          <small className="text-muted">{subtitle}</small>
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Rating: {rating}</small>
      </Card.Footer>
    </Card>
    <br />
  </>;
};