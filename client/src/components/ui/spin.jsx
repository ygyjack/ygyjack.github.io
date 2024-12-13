import React from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { Container, Button, Spinner, Card } from 'react-bootstrap';

export default function Spin({ show }) {
  const { t } = useTranslation();
  return (
    <>
      { show.type === "button" &&
        <Button variant={show.variant || "primary"} disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">{t('spin.button')}</span>
          <span> {t('spin.button')} </span>
        </Button>
      }
      { show.type === "card" &&
        <Container>
          <br />
          <Card border={show.variant || "primary"}>
            <Card.Header>{t('spin.card.header')}</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>{t('spin.card.title')}</Card.Title>
              <Card.Title>
                <Spinner animation="border" variant={show.variant || "primary"}/>
              </Card.Title>
              <Card.Text>
                {t('spin.card.text')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      }
    </>
  );
}