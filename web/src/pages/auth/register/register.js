import React from 'react'
import { Col, Container, Nav, Row } from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import { Link, NavLink, Outlet } from "react-router-dom";
import useLocalization from '../../../hooks/use-localization';

export default function Register() {
    const { locale } = useLocalization();
    const registerLocale = locale["register"];

    return (
        <>
            <Navbar />
            <Container className="h-100">
                <Row className="d-flex h-100 justify-content-center align-content-center">
                    <Col sm={4}>
                        <Row className="mb-3">
                            <Col sm={12} className="mb-3">
                                <h4>{registerLocale.title}</h4>
                            </Col>
                            <Col>
                                <Nav variant="pills" defaultActiveKey="customer" className="navbar-light">
                                    <Nav.Item>
                                        <Nav.Link to="customer" as={NavLink}>{registerLocale.tabs.customer}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link to="restaurant" as={NavLink}>{registerLocale.tabs.restaurant}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Outlet />
                        <Col className="p-0 mt-5 text-center">
                            {registerLocale.haveAnAccount.text} <Link to="/login">{registerLocale.haveAnAccount.linkTitle}</Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
