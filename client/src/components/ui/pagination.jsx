import React from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { Row, DropdownButton, Dropdown, Pagination } from 'react-bootstrap';

export default function MyPagination({ pageItems, allItems, pagination, onSetPageItems }) {
  const { t } = useTranslation();
  return (
    <Row className="mx-0">
      <DropdownButton className="col-sm-4" id="dropdown-page-items-button" title={t('pagination.title')}>
        <Dropdown.Item key={`ddi_5`} active={pageItems === 5} onClick={() => onSetPageItems(5)}>{t('pagination.button5')}</Dropdown.Item>
        <Dropdown.Item key={`ddi_10`} active={pageItems === 10} onClick={() => onSetPageItems(10)}>{t('pagination.button10')}</Dropdown.Item>
        <Dropdown.Item key={`ddi_50`} active={pageItems === 50} onClick={() => onSetPageItems(50)}>{t('pagination.button50')}</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item key={`ddi_all`} active={pageItems === allItems} onClick={() => onSetPageItems(allItems)}>{t('pagination.all')}</Dropdown.Item>
      </DropdownButton>
      <Pagination className="col-sm-8 d-flex justify-content-end" key={`pagi`}>{pagination}</Pagination>
    </Row>
  )
}