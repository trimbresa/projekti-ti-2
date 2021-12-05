import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const RestaurantHeader = ({restaurant}) => {
    return (
        <Row style={{height: 300, backgroundImage: `url('${restaurant?.imageURL}')`}}
             className="restaurant-details-header">
            <div className="restaurant-details-header-fade">
                <Row className="h-100 align-items-end pb-4">
                    <Col className="p-0">
                        <Container>
                            <Row>
                                <Col className="p-0 pt-4 text-light">
                                    <h2>{restaurant?.name}</h2>
                                    <p>Pejton Prishtinë Prishtine 10000</p>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </div>
        </Row>
    );
}

RestaurantHeader.propTypes = {};

export default RestaurantHeader;
