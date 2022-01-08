import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import authService from "../../../services/auth-service";
import useApp from "../../../hooks/use-app";
import useLocalization from '../../../hooks/use-localization';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const appContext = useApp();
    const { locale } = useLocalization();

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            setError('');
            const res = await authService.login(email, password);
            if (res.message) {
                return setError(res.message);
            }
            localStorage.setItem('token', res.token);
            appContext.setIsAuthed(true);
            document.location.href = '/';
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const loginLocale = locale["login"];

    return (
        <>
            <Navbar />
            <Container className="h-100">
                <Row className="d-flex h-100 justify-content-center align-content-center">
                    <Col sm={4}>
                        <h4>{loginLocale.title}</h4>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{loginLocale.inputs.email.label}</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={loginLocale.inputs.email.placeholder}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{loginLocale.inputs.password.label}</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder={loginLocale.inputs.password.placeholder}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Col sm={12}>
                                <p className='text-danger'>{error}</p>
                            </Col>
                            <Button variant="primary" type="submit" disabled={isSubmitting} >
                                {isSubmitting ? loginLocale.inputs.submitting : loginLocale.inputs.submit}
                            </Button>
                            <Col className="p-0 mt-5 text-center">
                                {loginLocale.dontHaveAccount.text} <Link to="/register/customer">{loginLocale.dontHaveAccount.linkTitle}</Link>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
