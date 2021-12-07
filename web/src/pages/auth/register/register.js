import React from 'react'
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import {NavLink, Outlet} from "react-router-dom";

export default function Register() {
    return (
        <>
            <Navbar/>
            <Container className="h-100">
                <Row className="d-flex h-100 justify-content-center align-content-center">
                    <Col sm={4}>
                        <Row className="mb-3">
                            <Col sm={12} className="mb-3">
                                <h4>Register as </h4>
                            </Col>
                            <Col>
                                <Nav variant="pills" defaultActiveKey="customer" className="navbar-light">
                                    <Nav.Item>
                                        <Nav.Link to="customer" as={NavLink}>Customer</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link to="restaurant" as={NavLink}>Restaurant</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
