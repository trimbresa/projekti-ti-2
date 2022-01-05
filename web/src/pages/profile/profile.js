import React, { useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import RestaurantProfile from "./restaurant-profile/restaurant-profile";
import CustomerProfile from "./customer-profile/customer-profile";

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile - eFood'
    }, [])

    return (
        <>
            <Navbar />
            <Container className="h-100 layout">
                <Row className='pt-5'>
                    <Col className='mb-5 pb-5'>
                        <Row>
                            <Col lg={6} className="mb-4">
                                <CustomerProfile />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <RestaurantProfile />
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
