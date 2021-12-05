import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar'

export default function Dashboard() {

  return (
    <Container fluid>
      <Navbar />
      <Container>
        <Row>
          <Col className="mt-5 mb-3">
            <h4>Dashboard</h4>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
