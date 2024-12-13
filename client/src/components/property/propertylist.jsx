import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ButtonGroup, DropdownButton, Button, Dropdown, Badge, Table, Pagination, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Api from "../../api/api";
import Util from "../../utilities";
import Spin from "../ui/spin";
import Message from "../ui/message";
import Checkbox from "../ui/checkbox";
import Toaster from "../ui/toastify";
import MyPagination from "../ui/pagination";
import image from '../../images';
import './../../styles/sass.scss';


export default function Propertylist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { location } = useParams();
  const [totalProperties, setTotalProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [show, setShow] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [key, setKey] = useState(typeof location === 'undefined' ? 'D14' : location);
  const [filtered, setFiltered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState('');
  const [pageItems, setPageItems] = useState(25);
  const [pageOn, setPageOn] = useState(1);
  const [sort, setSort] = useState({
    orderByField : 'createdate',
    reverseSort : true
  });


  useAuth();
	/***
    * SORT => TABLE
	  * */
  const sortByField = (obj) => {
    setSort({ orderByField: obj.name, reverseSort: !sort.reverseSort });
    setProperties(Util.sortOrder(properties, obj.type, obj.name, sort.reverseSort ? 'desc' : 'asc'));
  };

	/***
    * PAGINATION => TABLE
	  * */
  const doPagination = (page = pageOn) => {
    let pages = Math.ceil(properties.length / pageItems);
    if (page > pages) {
      setPageOn(1);
      return;
    }
    let pagination = [];
    pagination.push(<Pagination.First key='pagi_first' disabled={page===1} onClick={() => doPagination(1)} />);
    pagination.push(<Pagination.Prev key='pagi_prev' disabled={page===1} onClick={() => doPagination(pageOn-1)} />);
    page > 3 && pagination.push(<Pagination.Ellipsis key='ellipsis_before' onClick={() => doPagination(pageOn-2)} />);
    for (let number = 1; number <= pages; number++) {
      Math.abs(number-page) <= 2 && pagination.push(
        <Pagination.Item key={`pagi_key_${number}`} active={number === page} onClick={() => doPagination(number)} >
          {number}
        </Pagination.Item>
      );
    }
    (page+3) < pages && pagination.push(<Pagination.Ellipsis key='ellipsis_after' onClick={() => doPagination(pageOn+2)} />);
    pagination.push(<Pagination.Next key='pagi_next' disabled={page===pages} onClick={() => doPagination(pageOn+1)} />);
    pagination.push(<Pagination.Last key='pagi_last' disabled={page===pages} onClick={() => page !== pages && doPagination(pages)} />);
    setPagination(pagination);
    setPageOn(page);
    let newShow = [];
    for (let number = 0; number < pageItems; number++) {
      pageItems*(pageOn-1)+number < properties.length && newShow.push(properties[pageItems*(pageOn-1)+number]);
    }
    setShow(newShow);
  };


  /***
    * HANDLE => RUN CRON JOB TO IMPORT PROPERTIES
	  * */
  const handleImport = () => {
    setLoading(true);
    Api.importProperty()
    .then(res => {
      Toaster.success(t('property.list.message.success.import'));
      getProperties();
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };


  /***
    * HANDLE => DELETE ACTION (ARRAY)
	  * */
  const handleDeleteArray = () => {
    if (selectId.length === 0) {
      Toaster.warn(t('property.list.message.warning.delete'));
      return;
    } else {
      setLoading(true);
      Api.deletePropertyArray(selectId)
      .then(res => {
        setSelectId([]);
        Toaster.success(t('property.list.message.success.delete'));
        getProperties();
      }, err => ApiIssue(err))
      .finally(() => setLoading(false));
    }
  };

  /***
    * HANDLE => CHECK TICK BOX
	  * */
  const handleCheck = (id) => {
    let idArry = selectId;
    selectId.indexOf(id) < 0 ? idArry.push(id) : idArry.splice(selectId.indexOf(id), 1);
    setSelectId(idArry);
    setChecked(!checked)
  }

  /***
    * HANDLE => UPDATE SAVED STATUS (OBJECT)
	  * */
  const handleAction = (action) => {
    setLoading(true);
    Api.updateProperty(action)
    .then(res => {
      setSelectId([]);
      Toaster.success(t('property.list.message.success.edit'));
      getProperties();
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  }

  /***
   * HANDLE REGISTER CHECK => CHECK PROPERTY REGISTER DETAILS
   * */
  const handleRegisterCheck = (type, address) => {
    let url = null;
    if (type === 'street') {
      address = address.substr(address.indexOf(' ')+1, address.length);
      address = address.replace(/ /g, '_');
      url = 'https://propertypriceregisterireland.com/search/address/'+address+'/';
    }
    if (type === 'property') {
      address = address.replace(/ /g, '+');
      url = 'https://propertypriceregisterireland.com/?action=search&county=0&address='+address;
    }
    url && window.open(url, '_blank', 'noreferrer');
  }

	/***
    * GET LIST OF PROPERTIES BY API
	  * */
  const getProperties = () => {
    setLoading(true);
    Api.getProperties()
    .then(res => {
      setTotalProperties(res);
      Toaster.success(t('property.list.message.success.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

	/***
    * FILTER PROPERTIES BY KEY AND OTHERS
	  * */
  const filterProperties = () => {
    let result = totalProperties;
    result = result.filter(r => r.location === key && r);
    result = filtered === 'saved' ? result.filter(r => r.saved && r) : result;
    result = filtered === 'view' ? result.filter(r => r.viewdate && r) : result;
    result = filtered === 'sold' ? result.filter(r => r.soldprice && r) : result;
    setProperties(Util.sortOrder(result, 'num', 'createdate', 'desc'));
  }
  





  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [key, filtered, totalProperties]);

  useEffect(() => {
    doPagination();
  }, [properties, pageItems, pageOn, sort]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'property.list.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="Kilkenny" title={<span>{key === 'Kilkenny' && <FontAwesomeIcon icon="city" />} Kilkenny</span>}></Tab>
            <Tab eventKey="Ongar" title={<span>{key === 'Ongar' && <FontAwesomeIcon icon="city" />} Ongar</span>}></Tab>
            <Tab eventKey="Lucan" title={<span>{key === 'Lucan' && <FontAwesomeIcon icon="city" />} Lucan</span>}></Tab>
            <Tab eventKey="D15" title={<span>{key === 'D15' && <FontAwesomeIcon icon="city" />} Dublin 15</span>}></Tab>
            <Tab eventKey="D14" title={<span>{key === 'D14' && <FontAwesomeIcon icon="city" />} Dublin 14</span>}></Tab>
            <Tab eventKey="D16" title={<span>{key === 'D16' && <FontAwesomeIcon icon="city" />} Dublin 16</span>}></Tab>
            <Tab eventKey="D18" title={<span>{key === 'D18' && <FontAwesomeIcon icon="city" />} Dublin 18</span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between mx-0">
            <span>{t('property.list.title')} - {key} <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{properties.length}</Badge></span>
            <ButtonGroup aria-label="actions">
              <Button variant="warning" onClick={() => handleImport()}><FontAwesomeIcon icon="diagnoses" /> {t('property.list.button.import')}</Button>
              <Button variant="danger" onClick={() => handleDeleteArray()}><FontAwesomeIcon icon="trash-alt" /> {t('property.list.button.delete')}</Button>
            </ButtonGroup>
          </Card.Title>
          { properties.length === 0 ?
            <Message show={{ variant: 'warning', content: 'property.list.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button key="website" variant="light" className="mx-0 fw-bold" disabled>{t('property.field.website')}</Button>
                      </div>
                    </th>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="address" onClick={() => sortByField({ type:"txt", name:"address" })}>
                          {t('property.field.address')} { sort.orderByField === 'address' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="beds" onClick={() => sortByField({ type:"txt", name:"beds" })}>
                          {t('property.field.beds')} { sort.orderByField === 'beds' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="size" onClick={() => sortByField({ type:"txt", name:"size" })}>
                          {t('property.field.sizeBer')} { sort.orderByField === 'size' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="price" onClick={() => sortByField({ type:"txt", name:"price" })}>
                          {t('property.field.price')} { sort.orderByField === 'price' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="createdate" onClick={() => sortByField({ type:"num", name:"createdate" })}>
                          {t('property.field.createdate')} { sort.orderByField === 'createdate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="photo">
                          {t('property.field.photo')}
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="agent">
                          {t('property.field.agent')}
                        </Button>
                      </div>
                    </th>
                    <th className="text-center">
                      <ButtonGroup>
                        <DropdownButton as={ButtonGroup} title={t('property.list.button.filter')} id="bg-nested-dropdown" onSelect={(k) => setFiltered(k)}>
                          <Dropdown.Item eventKey="all">{t('property.list.button.all')}</Dropdown.Item>
                          <Dropdown.Item eventKey="saved">{t('property.list.button.saved')}</Dropdown.Item>
                          <Dropdown.Item eventKey="view">{t('property.list.button.view')}</Dropdown.Item>
                          <Dropdown.Item eventKey="sold">{t('property.list.button.sold')}</Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((item, index) => <tr key={index} className="tr-highlight" >
                    <td className="text-center text-vertical-center" onClick={() => handleCheck(item.propertyid)}>
                      <div key={`${item.propertyid}_checkbox`}>
                        <Checkbox show={{selectId, id: item.propertyid}} />
                      </div>
                    </td>
                    <td className="text-center text-vertical-center" onClick={() => handleCheck(item.propertyid)}>
                      <img src={item.websiteid === 1 ? image.myhome : image.daft} height="40px" alt={t('property.list.alt.website')} />
                    </td>
                    <td>
                      <OverlayTrigger key='right' placement='top' overlay={
                        <Tooltip id={`tooltip-id-${item.propertyid}`}>{item.address}</Tooltip>
                      }>
                        <a href={(item.websiteid === 1 ? 'http://www.myhome.ie' : 'http://www.daft.ie')+item.url} target="_blank" rel="noreferrer">
                          {item.address.substr(0, 50)}{item.address.length>50 && '...'}
                        </a>
                      </OverlayTrigger>
                      <br /><p>{item.note}</p>
                    </td>
                    <td className="text-center text-vertical-center">
                      <ButtonGroup vertical aria-label="actions">
                        <Button variant={'outline-primary'} onClick={() => handleRegisterCheck('property', item.address.substr(0, item.address.indexOf(',')))}>
                          {t('property.list.button.checkProperty')}
                        </Button>
                        <Button variant={'outline-primary'} onClick={() => handleRegisterCheck('street', item.address.substr(0, item.address.indexOf(',')))}>
                          {t('property.list.button.checkStreet')}
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td className="text-center">
                      {item.beds} {item.bath}<br />
                      <strong>{item.type}</strong>
                    </td>
                    <td className="text-center">
                      {item.size}<br />
                      <strong>{item.ber}</strong>
                    </td>
                    <td className="text-center">
                      {item.price}
                      { !!item.bidprice && <span className="text-success font-weight-bold">
                        <br /><NumberFormat value={item.bidprice} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={0} fixedDecimalScale={true} />
                      </span> }
                      { !!item.soldprice && <span className="text-danger font-weight-bold">
                        <br /><NumberFormat value={item.soldprice} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={0} fixedDecimalScale={true} />
                      </span> }
                    </td>
                    <td className="text-center">
                      <Moment format="ddd YYYY-MM-DD HH:mm:ss">{parseInt(item.createdate)}</Moment>
                      { !!item.viewdate && <span className="text-success font-weight-bold">
                        <br /><Moment format="ddd YYYY-MM-DD HH:mm:ss">{parseInt(item.viewdate)}</Moment>
                      </span> }
                      { !!item.solddate && <span className="text-danger font-weight-bold">
                        <br /><Moment format="ddd YYYY-MM-DD HH:mm:ss">{parseInt(item.solddate)}</Moment>
                      </span> }
                    </td>
                    <td className="text-center"><img src={item.photo} className="image-max-5" alt={t('property.list.alt.property')} /></td>
                    <td className="text-center"><img src={item.logourl} className="image-max-5" alt={t('property.list.alt.logourl')} /></td>
                    <td className="text-center text-vertical-center">
                      <ButtonGroup vertical aria-label="actions">
                        <Button variant={item.saved?'success':'outline-success'} className="mx-0" onClick={() => handleAction({ status: 'saved', value:!item.saved, id:item.propertyid })}>
                          <FontAwesomeIcon icon={item.saved?'thumbs-up':'thumbs-down'} /> {t('property.list.button.saved')}
                        </Button>
                        <Button variant={item.soldprice?'danger':'primary'} onClick={() => navigate('/propertysingle/'+item.propertyid)}>
                          <FontAwesomeIcon icon="edit" /> { t('property.list.button.edit') }
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr> )}
                </tbody>
              </Table>
              <MyPagination key={`my_pagi`} pageItems={pageItems} allItems={properties.length} pagination={pagination} onSetPageItems={(items) => setPageItems(items)} />
            </>
          }
        </Card.Body>
      </Card> }
    </Container>
  )
}