import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/navbar";
import {Col, Container, Row} from "react-bootstrap";

import {useNavigate, useParams} from "react-router-dom";

import RestaurantHeader from "../../components/headers/restaurant-header/restaurant-header";
import MenuList from "../../components/lists/menu-list/menu-list";
import MenuListItem from "../../components/list-items/menu-list-item/menu-list-item";

import restaurantService from "../../services/restaurant-service";

import './restaurant-details-styles.scss';

const RestaurantDetails = () => {
    const {restaurant_id} = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            const foundItem = await restaurantService.getRestaurant(restaurant_id);
            if (!foundItem) {
                navigate("/not-found");
            }
            document.title = `${foundItem.restaurantName || 'Untitled'} - eFood`;
            setRestaurant(foundItem)
        }
        
        fetchRestaurant();
    }, [navigate, restaurant_id])

    return (
        <>
            <Navbar/>
            <Container fluid className="layout">
                <RestaurantHeader restaurant={restaurant}/>
                <Container>
                    <Row className="py-4">
                        <Col>
                            <h4>Menu</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <Row>
                                <h5>Hamburgera</h5>
                            </Row>
                            <MenuList>
                                {[1, 2, 3, 4].map((item, index) => (
                                    <MenuListItem
                                        key={index}
                                        title={`Item ${index}`}
                                        description="Food item"
                                        price="$4.00"
                                    />
                                ))}
                            </MenuList>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default RestaurantDetails;
