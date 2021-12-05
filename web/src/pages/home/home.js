import React, {useEffect} from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar'

import restaurants from './restaurants.json';
import {Link} from "react-router-dom";

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
    }, [])

    return (
        <>
            <Container as={"main"} role="main" fluid className="layout">
                <Navbar />
                <div  className="bg-light">
                    <Container>
                        <Row>
                            <Col className="mt-5 pt-3 mb-3" style={{ height: "15vh" }}>
                                <h3>Faqja me e madhe per porosi te ushqimeve online</h3>
                                <p>Porosit ushqimet e preferuara, nga restorantet e preferuara.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col className="mt-5 mb-3">
                            <h4>Restorantet</h4>
                        </Col>
                    </Row>
                    <Row xs={1} md={3} lg={4} sm={2} className="g-3">
                        {restaurants.map((item) => (
                            <Col key={item.id}>
                                <Card>
                                    <Card.Img variant="top" src={item.imageURL} style={{ maxHeight: 200, width: '100%' }} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to={`/${item.id}`}>View More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
            {/*<Footer/>*/}
        </>
    )
}
