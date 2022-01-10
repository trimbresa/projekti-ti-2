import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import useLocalization from '../../../hooks/use-localization';

export default function ConfirmationDialog(props) {
  const { title, message, onHide, onConfirm, show, confirming } = props;
  const { locale } = useLocalization();
  const confirmationDialogLocale = locale.components.shared;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='mt-3'>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide(false)}>{confirmationDialogLocale.cancel}</Button>
        <Button variant="primary" disabled={confirming} onClick={onConfirm}>{confirming ? confirmationDialogLocale.confirming : confirmationDialogLocale.confirm}</Button>
      </Modal.Footer>
    </Modal>
  )
}
