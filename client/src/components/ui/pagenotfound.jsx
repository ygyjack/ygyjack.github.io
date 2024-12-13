import React from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button} from 'react-bootstrap';
import PNF from '../../images/404.jpg';

export default function PageNotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
    <Row>
      <Col>
        <div className="text-center">
          <img src={PNF} alt="{t('pagenotfound.button')}" />
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>{t('pagenotfound.button')}</Button>
        </div>
      </Col>
    </Row>
  </Container>
  )
}