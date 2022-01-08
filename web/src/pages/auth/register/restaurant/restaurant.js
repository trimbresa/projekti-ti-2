import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";
import useApp from "../../../../hooks/use-app";
import authService from "../../../../services/auth-service";
import useLocalization from '../../../../hooks/use-localization';

export default function Restaurant() {
    const [restaurantName, setRestaurantName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const appContext = useApp();

    const { locale } = useLocalization();
    const registerLocale = locale["register"];

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
            document.location.href = '/';
        } catch (error) {
            setError('Failed to register')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>{registerLocale.restaurantInputs.restaurantName.label}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={registerLocale.restaurantInputs.restaurantName.placeholder}
                    value={restaurantName}
                    onChange={(event) => setRestaurantName(event.target.value)}
                    aria-required={true}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{registerLocale.restaurantInputs.pictureUrl.label}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={registerLocale.restaurantInputs.pictureUrl.placeholder}
                    value={pictureUrl}
                    onChange={(event) => setPictureUrl(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{registerLocale.restaurantInputs.email.label}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={registerLocale.restaurantInputs.email.placeholder}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{registerLocale.restaurantInputs.password.label}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={registerLocale.restaurantInputs.password.placeholder}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Form.Group>
            <h4 className='text-danger'>{error}</h4>
            <Button variant="primary" type="submit" disabled={isSubmitting} >
                {isSubmitting ? registerLocale.restaurantInputs.submitting : registerLocale.restaurantInputs.submit}
            </Button>
        </Form>
    )
}
