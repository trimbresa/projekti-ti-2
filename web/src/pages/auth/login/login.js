import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import authService from "../../../services/auth-service";
import useApp from "../../../hooks/use-app";
import useLocalization from '../../../hooks/use-localization';
import * as Yup from 'yup';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
});

export default function Login() {
    const [error, setError] = useState('');
    const appContext = useApp();
    const { locale } = useLocalization();

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (data, { setSubmitting }) => {
            setSubmitting(true)
            onSubmit(data);
        }
    });

    const { values, handleSubmit, handleChange, errors, touched, setSubmitting, isSubmitting } = formik;

    const onSubmit = async (data) => {
        setError('')
        try {
            setError('');
            const res = await authService.login(data.email, data.password);
            if (res.message) {
                throw new Error(res.message);
            }
            localStorage.setItem('token', res.token);
            appContext.setIsAuthed(true);
            document.location.href = '/';
        } catch (error) {
            setError('Invalid credentials');
        } finally {
            setSubmitting(false);
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>{loginLocale.inputs.email.label}</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={loginLocale.inputs.email.placeholder}
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <label className='text-danger'>{errors.email && touched.email && errors.email}</label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>{loginLocale.inputs.password.label}</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder={loginLocale.inputs.password.placeholder}
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <label className='text-danger'>{errors.password && touched.password && errors.password}</label>
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
