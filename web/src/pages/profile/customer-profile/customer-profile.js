import React from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import useApp from "../../../hooks/use-app";

const CustomerProfile = () => {
    const appContext = useApp();

    return (
        <Card>
            <Card.Header as="h4" className="border-0 pt-3 bg-transparent">User Profile</Card.Header>
            <Card.Body>
                <Row className="mt-4">
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                disabled
                            />
                            <label>First Name</label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                disabled
                            />
                            <label>Last Name</label>
                        </Form.Floating>
                    </Col>
                </Row>
                <Row className={"mt-2"}>
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                value={appContext?.profile?.user?.email}
                                disabled
                            />
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                disabled
                            />
                            <label htmlFor="floatingInputCustom">Date of birth</label>
                        </Form.Floating>
                    </Col>
                </Row>
                <Button variant="primary" className="mt-3" disabled>Submit</Button>
            </Card.Body>
        </Card>
    );
}

CustomerProfile.propTypes = {};

export default CustomerProfile;
