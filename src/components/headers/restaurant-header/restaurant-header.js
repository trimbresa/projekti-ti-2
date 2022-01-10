import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

const RestaurantHeader = ({ restaurant }) => {
    const renderAddress = (address) => {
        return <p>{address?.location || ''} {address?.city || ''} {address?.country || ''} {address?.zipCode || ''}</p>
    }

    return (
        <Row style={{ height: 300, backgroundImage: `url('${restaurant?.pictureUrl}')` }}
            className="restaurant-details-header">
            <div className="restaurant-details-header-fade">
                <Row className="h-100 align-items-end pb-4">
                    <Col className="p-0">
                        <Container>
                            <Row>
                                <Col className="p-0 pt-4 text-light">
                                    <h2>{restaurant?.restaurantName || ''}</h2>
                                    {renderAddress(restaurant?.user?.address)}
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
