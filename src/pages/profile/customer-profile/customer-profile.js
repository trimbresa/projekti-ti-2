import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import * as Yup from 'yup';
import useApp from "../../../hooks/use-app";
import userService from '../../../services/user-service';

import './customer-profile-styles.scss';

const initialValues = {
    firstName: '',
    lastName: '',
    avatarUrl: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too long!').required('Required'),
    lastName: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too long!').required('Required'),
    avatarUrl: Yup.string().max(255, 'Too long!'),
});

const CustomerProfile = () => {
    const appContext = useApp();

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (data, { resetForm }) => {
            onSubmit(data);
        }
    });
    const { values, handleSubmit, handleChange, errors, touched, setFieldValue, setSubmitting, isSubmitting } = formik;

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            const restaurantData = {
                id: appContext?.profile?.id,
                firstName: data.firstName,
                lastName: data.lastName,
                ...appContext.profile.customer && { avatarUrl: data.avatarUrl }
            }
    
            await userService.updateProfile(restaurantData);
        } catch(error) {
            console.log(error.message)
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        setFieldValue('firstName', appContext.profile.firstName || appContext?.profile?.user?.firstName)
        setFieldValue('lastName', appContext.profile.lastName || appContext?.profile?.user?.lastName)
        setFieldValue('avatarUrl', appContext.profile.customer?.avatarUrl || '')
    }, [appContext, setFieldValue])

    return (
        <Card>
            <Card.Header as="h4" className="border-0 pt-3 bg-transparent">User Profile</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mt-4">
                        <Col className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name='firstName'
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <label>First Name</label>
                            </Form.Floating>
                            <label className='text-danger'>{errors.firstName && touched.firstName && errors.firstName}</label>
                        </Col>
                        <Col className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name='lastName'
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                <label>Last Name</label>
                            </Form.Floating>
                            <label className='text-danger'>{errors.lastName && touched.lastName && errors.lastName}</label>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col md={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={appContext?.profile?.email || appContext?.profile?.user?.email || ''}
                                    disabled
                                    readOnly
                                />
                                <label htmlFor="floatingInputCustom">Email address</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    {!("restaurantName" in appContext.profile) && <Row className={"mt-4"}>
                        <Col md={2}>
                            <Col
                                className="p-0 customer-profile-card-img bg-primary mb-4"
                                style={{ backgroundImage: `url('${values.avatarUrl}')` }}
                            />
                        </Col>
                        <Col>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="text"
                                    placeholder="Avatar URL"
                                    name='avatarUrl'
                                    value={values.avatarUrl}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingInputCustom">Avatar URL</label>
                            </Form.Floating>
                            <label className='text-danger'>{errors.avatarUrl && touched.avatarUrl && errors.avatarUrl}</label>
                        </Col>
                    </Row>}
                    <Button variant="primary" className="mt-3" type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

CustomerProfile.propTypes = {};

export default CustomerProfile;
