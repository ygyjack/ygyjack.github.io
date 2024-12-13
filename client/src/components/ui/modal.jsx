import React from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MyModal({ show, modal, onHide, onConfirm }) {
  const { t } = useTranslation();
  return (
    <Modal show={!!show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t(modal.title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { modal.header && <h3>{t(modal.header)} {!!show && show.email}</h3> }
        {t(modal.body)}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between mx-0">
        <Button variant="warning" onClick={onHide}>
          <FontAwesomeIcon icon="window-close" /> {t(modal.cancel)}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          <FontAwesomeIcon icon="trash-alt" /> {t(modal.confirm)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}