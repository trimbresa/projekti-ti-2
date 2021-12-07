import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

import './restaurant-card.scss';

export default function RestaurantCard({ restaurant }) {
    const { id, restaurantName, pictureUrl = 'https://via.placeholder.com/210x200.png', description } = restaurant;
    return <Card>
        <Card.Img
            variant="top"
            src={pictureUrl}
            className="bg-dark restaurant-card"
        />
        <Card.Body>
            <Card.Title>{restaurantName || 'Untitled'}</Card.Title>
            <Button variant="primary" as={Link} to={`/${id}`}>View More</Button>
        </Card.Body>
    </Card>
}
