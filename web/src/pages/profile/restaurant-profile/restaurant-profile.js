import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import useApp from "../../../hooks/use-app";


import { FaArrowRight } from 'react-icons/fa';
import userService from "../../../services/user-service";
import './restaurant-profile-styles.scss';

const RestaurantProfile = () => {
    const appContext = useApp();
    const [restaurantName, setRestaurantName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setRestaurantName(appContext?.profile?.restaurantName)
        setPictureUrl(appContext?.profile?.pictureUrl)
    }, [appContext])

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)

        try {
            const restaurantData = {
                id: appContext?.profile?.id,
                restaurantName,
                pictureUrl
            }

            await userService.updateProfile(restaurantData);
            await appContext.fetchUserData();

            setIsSubmitting(false)
        } catch (error) {
            console.log(error.message);
            setIsSubmitting(false)
        }
    }

    return (
        <Card as={"form"} onSubmit={onSubmit}>
            <Card.Header as="h4" className="border-0 pt-3 bg-transparent">Restaurant Profile</Card.Header>
            <Card.Body>
                <Row>
                    <Col
                        className="p-0 restaurant-profile-card-img"
                        style={{ backgroundImage: `url('${pictureUrl}')` }}
                    />
                </Row>
                <Row className="mt-4">
                    <Col md={8}>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Restaurant Name"
                                value={restaurantName}
                                onChange={(event) => setRestaurantName(event.target.value)}
                            />
                            <label htmlFor="floatingInputCustom">Restaurant Name</label>
                        </Form.Floating>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Picture URL"
                                value={pictureUrl}
                                onChange={(event) => setPictureUrl(event.target.value)}
                            />
                            <label htmlFor="floatingInputCustom">Picture URL</label>
                        </Form.Floating>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button as={Link} to={`/${appContext.profile.id}`} variant='info'>Preview <FaArrowRight/></Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

RestaurantProfile.propTypes = {};

export default RestaurantProfile;
