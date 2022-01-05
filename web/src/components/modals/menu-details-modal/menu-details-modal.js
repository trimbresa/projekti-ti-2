import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import MenuListItem from '../../list-items/menu-list-item/menu-list-item'
import MenuList from '../../lists/menu-list/menu-list'
import MenuItemsModal from '../menu-items-modal/menu-items-modal';

export default function MenuDetailsModal(props) {
  const { menu, show, onHide } = props;

  const [name, setName] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemsModalVisible, setMenuItemsModalVisible] = useState(false);

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

    setMenuItems([
      ...menuItems,
      {
        item: newItem
      }
    ])
    resetForm();
  }

  const resetForm = () => {
    setItemDescription('');
    setItemName('');
    setItemPrice(0);
  }

  useEffect(() => {
    setName(menu?.name)
    setMenuItems(menu?.menuItems ?? [])
  }, [menu])

  const renderMenuItemsForm = <>
    <Card className='mt-3 mb-1'>
      <Card.Body>
        <h6 className='mb-3'>New menu item</h6>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Item name" size='sm' value={itemName} onChange={onChangeItemName} />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Control size='sm' placeholder="Price" type='number' value={itemPrice} onChange={onChangeItemPrice} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control as="textarea" size='sm' placeholder='Item Description' rows={3} value={itemDescription} onChange={onChangeItemDescription} />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    <Button className='mt-2 mb-3' onClick={onAddItem} variant='success'>Add item</Button>
  </>;

  return (
    <>

      <Modal show={show} onHide={onHide} backdrop="static" size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Menu Name</Form.Label>
            <Form.Control placeholder="Enter menu name" value={name} onChange={onChangeName} />
          </Form.Group>
          <MenuList>
            {menuItems.map((menuItem, index) => (
              <MenuListItem
                key={index}
                title={menuItem.item.name}
                description={menuItem.item.description}
                price={`$${menuItem.item.price}`}
              />
            ))}
            {renderMenuItemsForm}
          </MenuList>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
      <MenuItemsModal show={menuItemsModalVisible} onHide={() => setMenuItemsModalVisible(false)} />
    </>
  )
}
