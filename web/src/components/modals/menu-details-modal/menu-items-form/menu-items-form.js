import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const initialValues = {
  itemName: '',
  itemDescription: '',
  itemPrice: '',
  itemCategory: '',
};

const validationSchema = Yup.object().shape({
  itemName: Yup.string().trim().min(3, 'Too Short!').max(255, 'Too long!').required('Required'),
  itemDescription: Yup.string().trim().min(5, 'Too Short!').max(255, 'Too long!').required('Required'),
  itemPrice: Yup.number().min(0, 'Invalid').required('Required'),
  itemCategory: Yup.string().max(255, 'Too long!').trim(),
});

export default function MenuItemsForm(props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data, { resetForm }) => {
      props.onSubmit(data);
      resetForm();
    },
  });

  const { values, handleSubmit, handleChange, errors, touched } = formik;

  return <div>
    <Card className='mt-3 mb-2'>
      <Card.Body>
        <h6 className='mb-3'>New menu item</h6>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Control placeholder="Name" size='sm' name='itemName' value={values.itemName} onChange={handleChange} />
                <label className='text-danger'>{errors.itemName && touched.itemName && errors.itemName}</label>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Control size='sm' placeholder="Price" type='number' name='itemPrice' value={values.itemPrice} onChange={handleChange} />
                <label className='text-danger'>{errors.itemPrice && touched.itemPrice && errors.itemPrice}</label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Control as="textarea" size='sm' placeholder='Description' name='itemDescription' rows={3} value={values.itemDescription} onChange={handleChange} />
                <label className='text-danger text-sm'>{errors.itemDescription && touched.itemDescription && errors.itemDescription}</label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control placeholder="Category" size='sm' name='itemCategory' value={values.itemCategory} onChange={handleChange} />
                <label className='text-danger text-sm'>{errors.itemCategory && touched.itemCategory && errors.itemCategory}</label>
              </Form.Group>
            </Col>
          </Row>
        </form>
      </Card.Body>
    </Card>
    <Col>
      <Button className='mt-2 mb-3 col-12' onClick={handleSubmit} variant='success'>+ Add item</Button>
    </Col>
  </div>
}
