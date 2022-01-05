import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import MenuListItem from '../../list-items/menu-list-item/menu-list-item'
import MenuList from '../../lists/menu-list/menu-list'

export default function MenuItemsModal(props) {
  const { menu, show, onHide } = props;

  const [name, setName] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  // new menu item
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState(0);

  const onChangeName = (event) => setName(event.target.value)

  const onChangeItemDescription = (event) => setItemDescription(event.target.value)
  const onChangeItemName = (event) => setItemName(event.target.value)
  const onChangeItemPrice = (event) => setItemPrice(event.target.value)

  const onAddItem = () => {
    const newItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice
    }

    console.log(newItem)

    setMenuItems([
      ...menuItems,
      {
        item: newItem
      }
    ])
  }

  useEffect(() => {
    setName(menu?.name)
    setMenuItems(menu?.menuItems ?? [])
  }, [menu])

  return (
    <Modal show={show} onHide={onHide} backdrop="static" size='md'>
      <Modal.Header closeButton>
        <Modal.Title>Menu items </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card className='mt-4 mb-5'>
              <Card.Header>Add menu item</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control placeholder="Enter menu item name" price={itemName} onChange={onChangeItemName} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={itemDescription} onChange={onChangeItemDescription} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control placeholder="Enter menu item price" price={itemPrice} onChange={onChangeItemPrice} />
                </Form.Group>
                <Col className='d-flex justify-content-end mt-4'>
                  <Button variant="primary" onClick={onAddItem}>Add</Button>
                </Col>
              </Card.Body>
            </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}
