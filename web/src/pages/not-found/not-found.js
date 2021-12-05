import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Container className="h-100">
            <Row className="h-100 justify-content-center align-content-center">
                <Col>
                    <h3 className="text-center">404, page not found!</h3>
                </Col>
                <Col sm={12} className="text-center mt-3">
                    <Button as={Link} to="/">Go back to the home page</Button>
                </Col>
            </Row>
        </Container>
    );
}

NotFound.propTypes = {};

export default NotFound;
