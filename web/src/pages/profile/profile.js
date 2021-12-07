import React, {useEffect} from 'react';
import {Button, Col, Container, Row, Form, Card} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import userService from "../../services/user-service";
import appContext from "../../context/app-context";
import useApp from "../../hooks/use-app";
import RestaurantProfile from "./restaurant-profile/restaurant-profile";
import CustomerProfile from "./customer-profile/customer-profile";

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile - eFood'
    }, [])

    return (
        <>
            <Navbar/>
            <Container className="h-100 layout">
                <Row className='pt-5'>
                    <Col>
                        <Row>
                            <Col lg={6} className="mb-4">
                                <CustomerProfile/>
                            </Col>
                            <Col lg={4}>
                                <RestaurantProfile/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

Profile.propTypes = {};

export default Profile;
