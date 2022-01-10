import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useLocalization from '../../../../hooks/use-localization';
import useApp from '../../../../hooks/use-app';
import authService from '../../../../services/auth-service';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
    ).required("Confirm Password is required"),
});

export default function Customer() {
    const { locale } = useLocalization();
    const registerLocale = locale["register"];
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');
    const appContext = useApp();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            onSubmit(data);
            // resetForm();
        },
    });

    const onSubmit = async (data) => {
        try {
            const response  = await authService.registerCustomer(data.email, data.password);

            if(response.message) {
                return setError('Failed to register.');
            }

            localStorage.setItem('token', response.token);
            appContext.setIsAuthed(true);
            document.location.href = '/';
        } catch (error) {
            setError('Failed to register')
            console.log(error);
        }
    }

    const { values, handleSubmit, handleChange, errors, touched } = formik;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>{registerLocale.customerInputs.email.label}</Form.Label>
                <Form.Control type="email" name='email' value={values.email} placeholder={registerLocale.customerInputs.email.placeholder} onChange={handleChange} />
                <label className='text-danger text-sm'>{errors.email && touched.email && errors.email}</label>
            </Form.Group>

            <Form.Group>
                <Form.Label>{registerLocale.customerInputs.password.label}</Form.Label>
                <Form.Control type="password" name='password' value={values.password} placeholder={registerLocale.customerInputs.password.placeholder} onChange={handleChange} />
                <label className='text-danger text-sm'>{errors.password && touched.password && errors.password}</label>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{registerLocale.customerInputs.confirmPassword.label}</Form.Label>
                <Form.Control type="password" name='confirmPassword' value={values.confirmPassword} placeholder={registerLocale.customerInputs.confirmPassword.placeholder} onChange={handleChange} />
                <label className='text-danger text-sm'>{errors.confirmPassword && (touched.confirmPassword || touched.password) && errors.confirmPassword}</label>
            </Form.Group>
            <Button variant="primary" type="submit">
                {registerLocale.customerInputs.submit}
            </Button>
        </Form>
    )
}
