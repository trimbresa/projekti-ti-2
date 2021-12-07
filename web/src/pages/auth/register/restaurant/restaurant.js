import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Col, Form} from "react-bootstrap";
import useApp from "../../../../hooks/use-app";
import authService from "../../../../services/auth-service";

export default function Restaurant() {
    const [restaurantName, setRestaurantName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigate();
    const appContext = useApp();

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const restaurant = {
                restaurantName,
                pictureUrl,
                email,
                password,
            }

            console.log(restaurant);

            const response  = await authService.registerRestaurant(restaurant);

            if(response.message) {
                return setError('Failed to register.');
            }

            localStorage.setItem('token', response.token);
            appContext.setIsAuthed(true);
            navigation('/', { replace: true });
        } catch (error) {
            setError('Failed to register')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Restaurant name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Restaurant name"
                    value={restaurantName}
                    onChange={(event) => setRestaurantName(event.target.value)}
                    aria-required={true}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Picture URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Picture URL"
                    value={pictureUrl}
                    onChange={(event) => setPictureUrl(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Form.Group>
            <h4 className='text-danger'>{error}</h4>
            <Button variant="primary" type="submit" disabled={isSubmitting} >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Col className="p-0 mt-5 text-center">
                Already have an account? <Link to="/login">Login</Link>
            </Col>
        </Form>
    )
}
