import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar'

import {Link} from "react-router-dom";
import restaurantService from "../../services/restaurant-service";
import RestaurantCard from "../../components/cards/restaurant-card/restaurant-card";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        document.title = 'Home'
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const fetchedRestaurants = await restaurantService.fetchRestaurants();
            setRestaurants(fetchedRestaurants);
        } catch (error) {
            setError('Failed to fetch restaurants.')
        } finally {
            setIsLoading(false);
        }
    };

    const renderIndicator = isLoading && restaurants.length === 0 && <h5>Loading...</h5>

    const renderList = !isLoading && restaurants.map((item) => (<Col key={item.id}>
            <RestaurantCard restaurant={item}/>
        </Col>
        ))


    return (
        <>
            <Container as={"main"} role="main" fluid className="layout">
                <Navbar/>
                <div className="bg-light">
                    <Container>
                        <Row>
                            <Col className="mt-5 pt-3 mb-3" style={{height: "15vh"}}>
                                <h3>Faqja me e madhe per porosi te ushqimeve online</h3>
                                <p>Porosit ushqimet e preferuara, nga restorantet e preferuara.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className='pb-5'>
                    <Row>
                        <Col className="mt-5 mb-3">
                            <h4>Restorantet</h4>
                        </Col>
                    </Row>
                    {renderIndicator}
                    <Row xs={1} md={3} lg={4} sm={2} className="g-3">
                        {renderList}
                        {error && <h4 className='text-danger'>{error}</h4>}
                    </Row>
                </Container>
            </Container>
            {/*<Footer/>*/}
        </>
    )
}
