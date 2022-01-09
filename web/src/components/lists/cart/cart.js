import React, { useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import useApp from '../../../hooks/use-app';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import ConfirmationDialog from '../../modals/confirmation-dialog/confirmation-dialog';

export default function Cart() {
  const { cart, setCart } = useApp();
  const [checkoutDialog, setCheckoutDialog] = useState(false);

  const currencyFormatter = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'EUR' });

  const renderTotalPrice = () => {
    let total = 0;
    cart.map(cartItem => total += cartItem.quantity * cartItem.itemDetails.item.price);
    return currencyFormatter.format(total);
  }

  const removeFromCart = (cartItem) => {
    if (cartItem.quantity === 1) {
      const filteredCart = cart.filter(item => item.itemDetails.id !== cartItem.itemDetails.id);
      setCart(filteredCart)
    } else {
      const foundCartItemIndex = cart.findIndex(item => item.itemDetails.id === cartItem.itemDetails.id);
      const updatedCart = [
        ...cart.slice(0, foundCartItemIndex),
        {
          ...cartItem,
          quantity: cartItem.quantity -= 1
        },
        ...cart.slice(foundCartItemIndex + 1),
      ]

      setCart(updatedCart);
    }
  }

  const checkoutConfirm = () => {
    setCheckoutDialog(true);
  }

  const onCheckoutConfirm = () => {
    alert('order has been placed.');
    // TODO - Implement purchase functionality
    setCheckoutDialog(false);
    setCart([]);
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title className='mb-0'>
            Cart
          </Card.Title>
        </Card.Header>
        <Card.Body className='px-2'>
          <ListGroup variant="flush">
            {cart.length === 0 && <h5 className='text-center mb-0'>Empty</h5>}
            {cart.map((cartItem, index) => <ListGroup.Item
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
        {cart.length > 0 && <Card.Footer>
          <Row className='align-items-center'>
            <Col>
              <h5 className='mb-0'>Total: {renderTotalPrice()}</h5>
            </Col>
            <Col className='d-flex justify-content-end px-1'>
              <Button onClick={checkoutConfirm}>
                <FaCartPlus className='mb-1' /> Checkout
              </Button>
            </Col>
          </Row>
        </Card.Footer>}
      </Card>
      <ConfirmationDialog show={checkoutDialog} onHide={setCheckoutDialog} onConfirm={onCheckoutConfirm} title='Warning!' message='Are you sure you want to checkout?' />
    </>
  )
}
