import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";

export default class Register extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <Container className="h-100">
                    <Row className="d-flex h-100 justify-content-center align-content-center">
                        <Col sm={4}>
                            <h4>Register</h4>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Col className="p-0 mt-5 text-center">
                                    Already have an account? <Link to="/login">Login</Link>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
