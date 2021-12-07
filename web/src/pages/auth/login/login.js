import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import authService from "../../../services/auth-service";
import useApp from "../../../hooks/use-app";

export default function Login() {
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
            setError('');
            const res = await authService.login(email, password);
            if(res.message) {
                return setError(res.message);
            }
            localStorage.setItem('token', res.token);
            appContext.setIsAuthed(true);
            navigation('/', { replace: true })
        } catch(error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Navbar/>
            <Container className="h-100">
                <Row className="d-flex h-100 justify-content-center align-content-center">
                    <Col sm={4}>
                        <h4>Login</h4>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
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

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Col sm={12}>
                                <p className='text-danger'>{error}</p>
                            </Col>
                            <Button variant="primary" type="submit" disabled={isSubmitting} >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Col className="p-0 mt-5 text-center">
                                Don't have an account? <Link to="/register/customer">Register</Link>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
