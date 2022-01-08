import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/navbar";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import { updateItemInArray } from '../../utils/utils';

import RestaurantHeader from "../../components/headers/restaurant-header/restaurant-header";
import MenuList from "../../components/lists/menu-list/menu-list";
import MenuListItem from "../../components/list-items/menu-list-item/menu-list-item";

import restaurantService from "../../services/restaurant-service";

import useAppContext from '../../hooks/use-app';

import './restaurant-details-styles.scss';
import menuService from '../../services/menu-service';
import MenuDetailsModal from '../../components/modals/menu-details-modal/menu-details-modal';
import ConfirmationDialog from '../../components/modals/confirmation-dialog/confirmation-dialog';

const RestaurantDetails = () => {
    const { restaurant_id } = useParams();
    const navigate = useNavigate();
    const { isAuthed, profile } = useAppContext();
    const [restaurant, setRestaurant] = useState(null);
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [deleteMenu, setDeleteMenu] = useState(null);
    const [loading, setLoading] = useState(true);

    const onModalHide = () => {
        setSelectedMenu(null);
    }

    const onEdit = (selected) => {
        setSelectedMenu(selected);
    }

    const onDelete = async (menu) => {
        setDeleteMenu(menu);
    }

    const onAddNew = () => {
        setSelectedMenu({
            name: '',
            menuItems: []
        });
    }

    const onSubmit = async (data) => {
        try {
            const menuItem = { ...data, restaurantId: restaurant_id };
            if (data?.id) {
                const updatedMenu = await menuService.updateMenu(menuItem);
                const updatedMenus = updateItemInArray(menus, updatedMenu, 'id');
                setMenus(updatedMenus);
            } else {
                const createdMenu = await menuService.createMenu(menuItem);
                setMenus([...menus, createdMenu]);
            }

            setSelectedMenu(null);
        } catch (error) {
            console.log(error.message);
            alert('Failed to submit menu!');
        }
    }

    const onDeleteConfirm = async () => {
        try {
            await menuService.deleteMenu({ menuId: deleteMenu.id });
            let updatedMenus = menus.filter(item => item.id !== deleteMenu.id);
            setMenus(updatedMenus);
            setDeleteMenu(null);
        } catch (error) {
            console.log('(RestaurantDetails.onDelete) - Error: ', error.message);
            alert('Failed to delete menu!')
        }
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            const foundItem = await restaurantService.getRestaurant(restaurant_id);
            // if (!foundItem) {
            //     navigate("/not-found");
            // }
            document.title = `${foundItem?.restaurantName || 'Untitled'} - eFood`;
            setRestaurant(foundItem)
        }

        if (restaurant_id) {
            fetchRestaurant();
        }
    }, [navigate, restaurant_id])

    useEffect(() => {
        const fetchRestaurantMenus = async () => {
            const fetchedMenus = await menuService.fetchRestaurantMenus(restaurant_id);
            setMenus(fetchedMenus);
            setLoading(false)
        }
        if (restaurant_id && restaurant) {
            fetchRestaurantMenus();
        }
    }, [restaurant_id, restaurant])

    const hasPrivileges = restaurant_id === profile?.id

    return (
        <>
            <Navbar />
            <Container fluid className="layout">
                <RestaurantHeader restaurant={restaurant} />
                <Container className='mb-5'>
                    <Row className="py-4 mb-3">
                        <Col md={6}>
                            <Row>
                                <Col>
                                    <h4>Menu</h4>
                                </Col>
                                {isAuthed && hasPrivileges && <Col className='d-flex justify-content-end'>
                                    <Button variant="success" onClick={onAddNew}>+ Add New</Button>
                                </Col>}
                            </Row>
                            <Row className='justify-content-center' style={{ position: 'absolute' }}>
                                {loading && <Col>
                                    <Spinner animation="border" role="status" variant="primary">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Col>}
                            </Row>
                        </Col>
                    </Row>
                    {menus.map(menu => <Row key={menu.id} className='mb-5'>
                        <Col md={6}>
                            <Row className='align-items-center py-3 justify-space-between'>
                                <Col>
                                    <h5>{menu.name}</h5>
                                </Col>
                                {isAuthed && hasPrivileges && <Col className='d-flex justify-content-end'>
                                    <Button variant="secondary" className='edit-btn' onClick={() => onEdit(menu)}>Edit</Button>
                                    <Button variant="danger" onClick={() => onDelete(menu)}>Delete</Button>
                                </Col>}
                            </Row>
                            <MenuList>
                                {menu?.menuItems?.map(menuItem => (
                                    <MenuListItem
                                        key={menuItem.id}
                                        title={menuItem.item.name}
                                        description={menuItem.item.description}
                                        price={`$${menuItem.item.price}`}
                                    />
                                ))}
                            </MenuList>
                        </Col>
                    </Row>)}
                </Container>
            </Container>
            {
                hasPrivileges && <>
                    <MenuDetailsModal show={selectedMenu && true} menu={selectedMenu} onHide={onModalHide} onSubmit={onSubmit} />
                    <ConfirmationDialog show={deleteMenu} onHide={setDeleteMenu} title='Warning' message='Are you sure you want to delete this menu?' onConfirm={onDeleteConfirm} />
                </>
            }
        </>
    );
}

export default RestaurantDetails;
