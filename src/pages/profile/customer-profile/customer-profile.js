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
    avatarUrl: '',
    country: '',
    city: '',
    location: '',
    zipCode: '',
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too long!').required('Required'),
    lastName: Yup.string().trim().min(2, 'Too Short!').max(255, 'Too long!').required('Required'),
    avatarUrl: Yup.string().max(255, 'Too long!'),
    country: Yup.string().max(255, 'Too long!'),
    city: Yup.string().max(255, 'Too long!'),
    location: Yup.string().max(255, 'Too long!'),
    zipCode: Yup.string().max(255, 'Too long!'),
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
                ...appContext.profile.customer && { avatarUrl: data.avatarUrl },
                country: data.country,
                city: data.city,
                location: data.location,
                zipCode: data.zipCode,
            }

            await userService.updateProfile(restaurantData);
        } catch (error) {
            console.log(error.message)
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        setFieldValue('firstName', appContext.profile.firstName || appContext?.profile?.user?.firstName)
        setFieldValue('lastName', appContext.profile.lastName || appContext?.profile?.user?.lastName)
        setFieldValue('avatarUrl', appContext.profile.customer?.avatarUrl || '')
        setFieldValue('country', appContext.profile.address?.country || appContext.profile?.user?.address?.country || '')
        setFieldValue('city', appContext.profile.address?.city || appContext.profile?.user?.address?.city || '')
        setFieldValue('location', appContext.profile.address?.location || appContext.profile?.user?.address?.location || '')
        setFieldValue('zipCode', appContext.profile.address?.zipCode || appContext.profile?.user?.address?.zipCode || '')
    }, [appContext, setFieldValue])

    const isRestaurant = "restaurantName" in appContext.profile && true;

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
                    {!isRestaurant &&
                        <Row className={"mt-4"}>
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
                        </Row>
                    }
                    <Row className={"mt-4"}>
                        <Col>
                            <Card className='border-0'>
                                <Card.Title className="mt-2">Address</Card.Title>
                                <Card.Body className=' p-0'>
                                    <Row className={"mt-2"}>
                                        <Col md={6}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control
                                                    id="floatingInputCustom"
                                                    type="text"
                                                    placeholder="Country"
                                                    name='country'
                                                    value={values.country}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingInputCustom">Country</label>
                                            </Form.Floating>
                                            <label className='text-danger'>{errors.country && touched.country && errors.country}</label>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control
                                                    id="floatingInputCustom"
                                                    type="text"
                                                    placeholder="City"
                                                    name='city'
                                                    value={values.city}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingInputCustom">City</label>
                                            </Form.Floating>
                                            <label className='text-danger'>{errors.city && touched.city && errors.city}</label>
                                        </Col>
                                    </Row>
                                    <Row className={"mt-2"}>
                                        <Col md={6}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control
                                                    id="floatingInputCustom"
                                                    type="text"
                                                    placeholder="Location"
                                                    name='location'
                                                    value={values.location}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingInputCustom">Location</label>
                                            </Form.Floating>
                                            <label className='text-danger'>{errors.location && touched.location && errors.location}</label>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control
                                                    id="floatingInputCustom"
                                                    type="text"
                                                    name='zipCode'
                                                    value={values.zipCode}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingInputCustom">Zip Code</label>
                                            </Form.Floating>
                                            <label className='text-danger'>{errors.zipCode && touched.zipCode && errors.zipCode}</label>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
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
