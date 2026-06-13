import { Col, Row } from "react-bootstrap";



export default function GalleryHome(ListItem = [{}]) {
    return (
        <Row>
            {ListItem.map((item) => (
                <Col className="p-2" xs={6} md={4} lg={3} key={item.id}>
                <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <Card.Text className="text-success fw-bold">
                            {item.price} Vnd
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
    );
}