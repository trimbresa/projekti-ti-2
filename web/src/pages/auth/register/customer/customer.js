import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Form} from "react-bootstrap";

export default class Customer extends Component {
    render() {
        return (
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
        )
    }
}
