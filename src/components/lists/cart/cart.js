import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import useApp from '../../../hooks/use-app';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import ConfirmationDialog from '../../modals/confirmation-dialog/confirmation-dialog';
import orderService from '../../../services/order-service';
import useLocalization from '../../../hooks/use-localization';
import { useParams } from 'react-router-dom';
import { updateItemInArray } from '../../../utils/utils';

export default function Cart() {
  const { restaurant_id } = useParams();
  const { cart, setCart } = useApp();
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { locale } = useLocalization();
  const [currentCart, setCurrentCart] = useState([]);

  const currencyFormatter = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'EUR' });

  const renderTotalPrice = () => {
    let total = 0;
    currentCart.map(cartItem => total += cartItem.quantity * cartItem.itemDetails.item.price);
    return currencyFormatter.format(total);
  }

  const removeFromCart = (cartItem) => {
    if (cartItem.quantity === 1) {
      const filteredCarts = cart.filter(restaurantCart => restaurantCart.restaurantId !== restaurant_id);
      setCart(filteredCarts)
    } else {
      const foundCartItemIndex = currentCart.findIndex(item => item.itemDetails.id === cartItem.itemDetails.id);
      const updatedCartDetails = [
        ...cart[foundCartItemIndex].orderDetails.slice(0, foundCartItemIndex),
        {
          ...cartItem,
          quantity: cartItem.quantity -= 1
        },
        ...cart[foundCartItemIndex].orderDetails.slice(foundCartItemIndex + 1),
      ]

      const updatedCurrentCart = [...currentCart];
      updatedCurrentCart.orderDetails = updatedCartDetails;

      const updatedCarts = updateItemInArray(cart, updatedCurrentCart, 'restaurantId');

      console.log(updatedCartDetails)
      
      setCurrentCart(updatedCartDetails);

      setCart(updatedCarts);
    }
  }

  const checkoutConfirm = () => {
    setCheckoutDialog(true);
  }

  const onCheckoutConfirm = async () => {
    setConfirming(true);
    try {
      await orderService.checkoutOrders(currentCart, restaurant_id);
      setCheckoutDialog(false);
      const updatedCart = cart.filter(item => item.restaurantId !== restaurant_id);
      setCurrentCart([]);
      setCart(updatedCart);
      alert('order has been placed.');
    } catch (error) {
      console.log(error.message);
    } finally {
      setConfirming(false);
    }
  }

  useEffect(() => {
    const currentCart = cart.find(item => item.restaurantId === restaurant_id)?.orderDetails ?? [];
    setCurrentCart(currentCart);
  }, [cart, restaurant_id])

  const cartLocale = locale.components.cart;

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title className='mb-0'>{cartLocale.title}</Card.Title>
        </Card.Header>
        <Card.Body className='px-2'>
          <ListGroup variant="flush">
            {currentCart.length === 0 && <h5 className='text-center mb-0'>{cartLocale.empty}</h5>}
            {currentCart.map((cartItem, index) => <ListGroup.Item
              as="li"
              key={index}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="me-auto">
                <div>
                  <span className='fw-bold'>{cartItem.quantity} x </span>
                  {cartItem.itemDetails.item.name}
                </div>
                <span className='text-muted fs-6'>{currencyFormatter.format(cartItem.itemDetails.item.price)}</span>
              </div>
              <Badge variant="success" pill className='bg-success'>
                {currencyFormatter.format(cartItem.itemDetails.item.price * cartItem.quantity)}
              </Badge>
              <Button size='sm' variant='danger' style={{ marginLeft: 10 }} onClick={() => removeFromCart(cartItem)}>
                <IoMdClose className='mb-1' /></Button>
            </ListGroup.Item>)}
          </ListGroup>
        </Card.Body>
        {currentCart.length > 0 && <Card.Footer>
          <Row className='align-items-center'>
            <Col>
              <h5 className='mb-0'>{cartLocale.total}: {renderTotalPrice()}</h5>
            </Col>
            <Col className='d-flex justify-content-end px-1'>
              <Button onClick={checkoutConfirm}>
                <FaCartPlus className='mb-1' /> {cartLocale.checkout}
              </Button>
            </Col>
          </Row>
        </Card.Footer>}
      </Card>
      <ConfirmationDialog show={checkoutDialog} confirming={confirming} onHide={setCheckoutDialog} onConfirm={onCheckoutConfirm} title={cartLocale.checkoutDialog.title} message={cartLocale.checkoutDialog.message} />
    </>
  )
}
