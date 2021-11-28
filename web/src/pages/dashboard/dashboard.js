import React from 'react'
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar'

const restaurants = [
  {
    id: 1,
    name: "Restaruant 1",
    description: "Restaurant 1 description here",
    imageURL: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "Restaruant 2",
    description: "Restaurant 2 description here",
    imageURL: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    name: "Restaruant 3",
    description: "Restaurant 3 description here",
    imageURL: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    name: "Restaruant 4",
    description: "Restaurant 4 description here",
    imageURL: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  }
]

export default function Dashboard() {
  
  return (
    <Container fluid style={{ padding: 0, overflow: 'hidden' }}>
      <Navbar />
      <Container>
        <Row>
          <Col className="mt-5 mb-3">
            <h4>Restaurants</h4>
          </Col>
        </Row>
        <Row xs={1} md={3} lg={4} sm={2} className="g-3">
          {restaurants.map((item, index) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={item.imageURL} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button variant="primary">View More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}
