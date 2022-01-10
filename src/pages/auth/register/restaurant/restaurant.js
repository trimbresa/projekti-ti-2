import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import useApp from "../../../../hooks/use-app";
import authService from "../../../../services/auth-service";
import useLocalization from '../../../../hooks/use-localization';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    restaurantName: '',
    pictureUrl: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = Yup.object().shape({
    restaurantName: Yup.string().min(3, 'Should contain at least 3 letters').required('Required'),
    pictureUrl: Yup.string(),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Password is required'),
});


export default function Restaurant() {
    const [error, setError] = useState('');
    const appContext = useApp();

    const { locale } = useLocalization();
    const registerLocale = locale["register"];

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (data, { setSubmitting }) => {
            setSubmitting(true)
            onSubmit(data);
        },
    });

    const { values, handleSubmit, handleChange, errors, touched, setSubmitting, isSubmitting } = formik;

    const onSubmit = async (data) => {
        try {
            const restaurant = {
                restaurantName: data.restaurantName,
                pictureUrl: data.pictureUrl,
                email: data.email,
                password: data.password,
            }

            const response = await authService.registerRestaurant(restaurant);

            if (response.message) {
                throw new Error('Failed to register');
            }

            localStorage.setItem('token', response.token);
            appContext.setIsAuthed(true);
            document.location.href = '/';
        } catch (error) {
            setError('Failed to register')
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>{registerLocale.restaurantInputs.restaurantName.label}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={registerLocale.restaurantInputs.restaurantName.placeholder}
                    name='restaurantName'
                    value={values.restaurantName}
                    onChange={handleChange}
                />
                <label className='text-danger'>{errors.restaurantName && touched.restaurantName && errors.restaurantName}</label>
            </Form.Group>
            <Form.Group>
                <Form.Label>{registerLocale.restaurantInputs.pictureUrl.label}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={registerLocale.restaurantInputs.pictureUrl.placeholder}
                    name='pictureUrl'
                    value={values.pictureUrl}
                    onChange={handleChange}
                />
                <label className='text-danger'>{errors.pictureUrl && touched.pictureUrl && errors.pictureUrl}</label>
            </Form.Group>
            <Form.Group>
                <Form.Label>{registerLocale.restaurantInputs.email.label}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={registerLocale.restaurantInputs.email.placeholder}
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                />
                <label className='text-danger'>{errors.email && touched.email && errors.email}</label>
            </Form.Group>
            <Form.Group>
                <Form.Label>{registerLocale.restaurantInputs.password.label}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={registerLocale.restaurantInputs.password.placeholder}
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                />
                <label className='text-danger'>{errors.password && touched.password && errors.password}</label>
            </Form.Group>
            <h4 className='text-danger'>{error}</h4>
            <Button variant="primary" type="submit" disabled={isSubmitting} >
                {isSubmitting ? registerLocale.restaurantInputs.submitting : registerLocale.restaurantInputs.submit}
            </Button>
        </Form>
    )
}
