import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import MenuListItem from '../../list-items/menu-list-item/menu-list-item'
import MenuList from '../../lists/menu-list/menu-list'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MenuItemsForm from './menu-items-form/menu-items-form';

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().min(3, 'Too Short!').required('Required'),
});

export default function MenuDetailsModal(props) {
  const { menu, show, onHide } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      onSubmit(data)
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      menuItems
    }
    props.onSubmit(updatedData)
  }
  
  const [menuItems, setMenuItems] = useState([]);

  const onAddItem = (data) => {
    const newItem = {
      name: data.itemName,
      description: data.itemDescription,
      price: data.itemPrice
    }

    setMenuItems([
      ...menuItems,
      {
        item: newItem
      }
    ])
  }

  useEffect(() => {
    // setName(menu?.name)
    formik.setFieldValue('name', menu?.name);
    setMenuItems(menu?.menuItems ?? [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu])

  useEffect(() => {
    return () => formik.resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const { values, handleSubmit, handleChange, errors, touched } = formik;

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control placeholder="Enter menu name" name='name' value={values.name} onChange={handleChange} />
              <label className='text-danger'>{errors.name && touched.name && errors.name}</label>
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
              <MenuItemsForm onSubmit={onAddItem} />
            </MenuList>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
