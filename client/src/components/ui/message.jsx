import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS

export default function Message({ show }) {
  const { t } = useTranslation();
  return (
    <Alert style={{padding: "0 15px", margin: "5px 0"}} variant={show.variant}>{t(show.content)}</Alert>
  );
}