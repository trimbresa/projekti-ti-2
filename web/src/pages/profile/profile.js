import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Badge, Card, Button } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import RestaurantProfile from "./restaurant-profile/restaurant-profile";
import CustomerProfile from "./customer-profile/customer-profile";
import useApp from '../../hooks/use-app';
import { ORDER_STATUS } from '../../config/constants';
import orderService from '../../services/order-service';
import { IoMdClose } from 'react-icons/io';
import ConfirmationDialog from '../../components/modals/confirmation-dialog/confirmation-dialog';

const Profile = () => {
    const { profile } = useApp();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    useEffect(() => {
        document.title = 'Profile - eFood'
    }, [])

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await orderService.fetchCustomerOrders();
            setOrders(orders);
            setLoading(false);
        }
        fetchOrders();
    }, [])

    const deleteOrder = async (orderId) => {
        setConfirmDelete(orderId)
    }

    const onDeleteOrderConfirm = async () => {
        setConfirmingDelete(true);
        try {
            await orderService.deleteOrder(confirmDelete);
            const filteredOrders = orders.filter(item => item.id !== confirmDelete);
            setOrders(filteredOrders);
            setConfirmDelete(null);
            alert('Order has been deleted.');
        } catch (error) {
            console.log(error.message);
        } finally {
            setConfirmingDelete(false);
        }
    }

    const currencyFormatter = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'EUR' });

    const renderOrderStatus = (status) => {
        switch (status) {
            case ORDER_STATUS.OPEN:
                return <Badge variant="info" pill className='bg-info text-capitalize' style={{ marginLeft: 10 }}>
                    {status}
                </Badge>
            case ORDER_STATUS.DELIVERED:
                return <Badge variant="success" pill className='bg-success text-capitalize' style={{ marginLeft: 10 }}>
                    {status}
                </Badge>
            case ORDER_STATUS.CANCELED:
                return <Badge variant="danger" pill className='bg-danger text-capitalize' style={{ marginLeft: 10 }}>
                    {status}
                </Badge>
            default:
                <Badge variant="info" pill className='bg-info text-capitalize' style={{ marginLeft: 10 }}>
                    Open
                </Badge>
        }
    }

    return (
        <>
            <Navbar />
            <Container className="h-100 layout">
                <Row className='pt-5'>
                    <Col className='mb-5 pb-5' lg={6}>
                        <Row>
                            <Col className="mb-4">
                                <CustomerProfile />
                            </Col>
                        </Row>
                        {"restaurantName" in profile && <Row>
                            <Col>
                                <RestaurantProfile />
                            </Col>
                        </Row>}
                    </Col>
                    <Col md={6}>
                        <h4>Previous orders {!loading && `(${orders.length})`}</h4>
                        {orders.length === 0 && !loading && <h5 className='text-center mb-0'>No orders to show.</h5>}
                        {orders.map((item, index) => <Card className='mb-3' key={item.id}>
                            <Card.Header>
                                <Card.Title className='mb-0'>
                                    <Row className='align-items-center'>
                                        <Col>
                                            <div>
                                                #{index + 1}
                                            </div>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <small>Status:</small>
                                            {renderOrderStatus(item.status)}
                                            <Button size='sm' variant='danger' style={{ marginLeft: 10 }} onClick={() => deleteOrder(item.id)}>
                                                <IoMdClose className='mb-1' />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Title>
                            </Card.Header>
                            <ListGroup variant="flush">
                                {item.orderItems.map((orderItem, index) =>
                                    <ListGroup.Item
                                        as="li"
                                        key={`order-item-${index}`}
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="me-auto">
                                            <div>
                                                <span className='fw-bold'>{orderItem.quantity} x </span>
                                                {orderItem.item.name}
                                            </div>
                                            <span className='text-muted fs-6'>{currencyFormatter.format(orderItem.item.price)}</span>
                                        </div>
                                        <Badge variant="success" pill className='bg-success pr-5'>
                                            {currencyFormatter.format(orderItem.quantity * orderItem.item.price)}
                                        </Badge>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>)}
                    </Col>
                </Row>
            </Container>
            <ConfirmationDialog title='Warning' message='Are you sure you want to delete order?' show={confirmDelete && true} confirming={confirmingDelete} onHide={setConfirmDelete} onConfirm={onDeleteOrderConfirm} />
        </>
    );
}

Profile.propTypes = {};

export default Profile;
