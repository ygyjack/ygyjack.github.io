import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Table, OverlayTrigger, Popover, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import Api from "./../../api/api";
import Util from "./../../utilities";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import MyPagination from "./../ui/pagination";
import MyModal from "./../ui/modal";
import './../../styles/sass.scss';


export default function Userlist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [key, setKey] = useState('active');
  const [show, setShow] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [activedUsers, setActivedUsers] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState('');
  const [pageItems, setPageItems] = useState(10);
  const [pageOn, setPageOn] = useState(1);
  const [sort, setSort] = useState({
    orderByField : 'createdate',
    reverseSort : false
  });
  const [showModal, setShowModal] = useState(null);
  const modal = {
    title: 'modal.user.title',
    header: 'modal.user.header',
    body: 'modal.user.body',
    cancel: 'modal.user.cancel',
    confirm: 'modal.user.confirm'
  };

  useAuth();
	/***
    * SORT => TABLE
	  * */
  const sortByField = (obj) => {
    setSort({ orderByField: obj.name, reverseSort: !sort.reverseSort });
    setShowAll(Util.sortOrder(showAll, obj.type, obj.name, sort.reverseSort ? 'desc' : 'asc'));
  };

	/***
    * PAGINATION => TABLE
	  * */
  const doPagination = (page = pageOn) => {
    let pages = Math.ceil(showAll.length / pageItems);
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
      pageItems*(pageOn-1)+number < showAll.length && newShow.push(showAll[pageItems*(pageOn-1)+number]);
    }
    setShow(newShow);
  };

  /***
    * PAGINATION => SET PAGE ITEMS
	  * */
  const onPageItems = (items) => {
    setPageItems(items);
    doPagination();
  }

  /***
    * SWITCH TABS
	  * */
  const handleSwitch = (newkey) => {
    setKey(newkey);
    let field = (newkey === 'delete') ? 'deletedate' : 'createdate';
    setSort({ orderByField: field, reverseSort: false });
    setShowAll(Util.sortOrder(newkey === 'active' ? activedUsers : (newkey === 'archive' ? archivedUsers : deletedUsers), 'num', field, 'desc'));
  };

  /***
    * HANDLE => DELETE ACTION
	  * */
  const handleDelete = () => {
    setLoading(true);
    Api.deleteUser(showModal._id)
    .then(res => {
      setShowModal(null);
      Toaster.success(t('user.list.message.success.delete'));
      getUsers();
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * HANDLE => ACTIONS
	  * */
  const handleAction = (type, id) => {
    setLoading(true);
    Api.updateUser({
      id: id,
      archived: (type === 'archive') ? true : false
    })
    .then(res => {
      let user;
      if (type === 'archive') {
        user = activedUsers.filter(user => user._id === id);
        user[0].archived = true;
        archivedUsers.map(item => user.push(item));
        setArchivedUsers(Util.sortOrder(user, 'num', 'createdate', 'desc'));
        user = activedUsers.filter(user => user._id !== id);
        setActivedUsers(user);
        setShowAll(Util.sortOrder(user, 'num', 'createdate', 'desc'));
      } else {
        user = archivedUsers.filter(user => user._id === id);
        user[0].archived = false;
        activedUsers.map(item => user.push(item));
        setActivedUsers(Util.sortOrder(user, 'num', 'createdate', 'desc'));
        user = archivedUsers.filter(user => user._id !== id);
        setArchivedUsers(user);
        setShowAll(Util.sortOrder(user, 'num', 'createdate', 'desc'));
      }
      Toaster.success(t(`user.list.message.success.${type}`));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * GET LIST OF USERS
	  * */
  const getUsers = () => {
    setLoading(true);
    Api.getUsers()
    .then(res => {
      setActivedUsers(Util.sortOrder(res.users.filter(u => !u.archived), 'num', 'createdate', 'desc'));
      setArchivedUsers(Util.sortOrder(res.users.filter(u => u.archived), 'num', 'createdate', 'desc'));
      setDeletedUsers(Util.sortOrder(res.deletedUsers, 'num', 'deletedate', 'desc'));
      Toaster.success(t('user.list.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setShowAll(key === 'active' ? activedUsers : (key === 'archive' ? archivedUsers : deletedUsers));
  }, [activedUsers, archivedUsers, deletedUsers]);

  useEffect(() => {
    doPagination();
  }, [showAll, pageItems, pageOn, sort])
    
  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'user.list.message.label' }} />
      <MyModal show={showModal} modal={modal} onHide={() => setShowModal(null)} onConfirm={() => handleDelete()} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => handleSwitch(k)}>
            <Tab eventKey="active" title={t('user.list.tab.active')}></Tab>
            <Tab eventKey="archive" title={t('user.list.tab.archive')}></Tab>
            <Tab eventKey="delete" title={t('user.list.tab.delete')}></Tab>
            <Tab eventKey="graphic" title={t('user.list.tab.graphic')} disabled></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {t(`user.list.tab.${key}`)}
            { showAll.length > 0 && <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{showAll.length}</Badge> }
          </Card.Title>
          { showAll.length === 0 ?
            <Message show={{ variant: 'warning', content: 'user.list.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="name" onClick={() => sortByField({type:"txt",name:"name"})}>
                          {t('user.field.name')} { sort.orderByField === 'name' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="email" onClick={() => sortByField({type:"txt",name:"email"})}>
                          {t('user.field.email')} { sort.orderByField === 'email' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="phone" onClick={() => sortByField({type:"txt",name:"phone"})}>
                          {t('user.field.phone')} { sort.orderByField === 'phone' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button key="address" variant="light" className="mx-0 fw-bold" disabled>{t('user.field.address')}</Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="createdate" onClick={() => sortByField({type:"num",name:"createdate"})}>
                          {t('user.field.create')} { sort.orderByField === 'createdate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        { key === 'delete' ?
                          <Button variant="outline-danger" className="table-header-sorting" key="deletedate" onClick={() => sortByField({type:"num",name:"deletedate"})}>
                            {t('user.field.delete')} { sort.orderByField === 'deletedate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button> :
                          <Button variant="outline-primary" className="table-header-sorting" key="modifydate" onClick={() => sortByField({type:"num",name:"modifydate"})}>
                            {t('user.field.modify')} { sort.orderByField === 'modifydate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button>
                        }
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        { key === 'delete' && <Button variant="outline-danger" className="table-header-sorting" key="deleteby" onClick={() => sortByField({type:"txt",name:"deleteby"})}>
                          {t('user.field.deleteby')} { sort.orderByField === 'deleteby' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button> }
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((user, index) => <tr key={index}>
                    <td>
                      <FontAwesomeIcon className={ user.gender === 1 ? 'text-danger' : (user.gender === 2 ? 'text-success' : '') } icon="user" /> {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="text-center">
                      { (user.address || user.address2 || user.country || user.postcode) &&
                        <OverlayTrigger key="top" placement="top" overlay={
                          <Popover id={`popover-positioned-top-${user._id}`}>
                            <Popover.Header as="h3">{t('user.field.address')}:</Popover.Header>
                            <Popover.Body>
                              { user.address && <div>{user.address}</div> }
                              { user.address2 && <div>{user.address2}</div> }
                              {/* user.city && <div>{user.city}</div> */}
                              { user.country && <div>{user.country}</div> }
                              { user.postcode && <strong>{user.postcode}</strong> }
                            </Popover.Body>
                          </Popover>
                        } >
                          <Button variant="outline-success" className="mx-0" size="sm"><FontAwesomeIcon icon="home" /></Button>
                        </OverlayTrigger>
                      }
                    </td>
                    <td>
                      <Moment format="YYYY-MM-DD">{user.createdate}</Moment>
                    </td>
                    <td>
                      <Moment format="YYYY-MM-DD HH:mm">{ key === 'delete' ? user.deletedate : user.modifydate }</Moment>
                    </td>
                    { key === 'active' && <td className="text-center">
                      <ButtonGroup aria-label="actions">
                        <Button size="sm" variant="primary" onClick={() => navigate('/usersingle/'+user._id)}><FontAwesomeIcon icon="edit" /></Button>
                        <Button size="sm" variant="warning" onClick={() => handleAction('archive', user._id)}><FontAwesomeIcon icon="folder-minus" /></Button>
                      </ButtonGroup>
                    </td> }
                    { key === 'archive' && <td className="text-center">
                      <ButtonGroup aria-label="actions">
                        <Button size="sm" variant="primary" onClick={() => handleAction('unarchive', user._id)}><FontAwesomeIcon icon="folder-plus" /></Button>
                        <Button size="sm" variant="danger" onClick={() => setShowModal(user)}><FontAwesomeIcon icon="trash-alt" /></Button>
                      </ButtonGroup>
                    </td> }
                    { key === 'delete' && <td>{user.deleteby}</td> }
                  </tr> )}
                </tbody>
              </Table>
              <MyPagination key={`my_pagi`} pageItems={pageItems} allItems={showAll.length} pagination={pagination} onSetPageItems={onPageItems} />
            </>
          }
        </Card.Body>
      </Card> }
    </Container>
  )
}