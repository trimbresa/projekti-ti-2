import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ConfirmationDialog(props) {
  const { title, message, onHide, onConfirm, show, confirming } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mt-3'>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide(false)}>Cancel</Button>
        <Button variant="primary" disabled={confirming} onClick={onConfirm}>{confirming ? 'Confirming...' : 'Confirm'}</Button>
      </Modal.Footer>
    </Modal>
  )
}
