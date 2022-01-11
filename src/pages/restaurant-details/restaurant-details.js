import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/navbar";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

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
import Cart from '../../components/lists/cart/cart';
import useLocalization from '../../hooks/use-localization';

const RestaurantDetails = () => {
    const { restaurant_id } = useParams();
    const navigate = useNavigate();
    const { isAuthed, profile, cart, setCart } = useAppContext();
    const [restaurant, setRestaurant] = useState(null);
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [deleteMenu, setDeleteMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const { locale } = useLocalization();

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
    const isCustomer = !profile?.restaurantName && true;

    const restaurantDetailsLocale = locale.restaurantDetails;

    const onAddToCart = (item) => {
        const currentRestaurantIndex = cart.findIndex(currentRestaurant => currentRestaurant.restaurantId === restaurant_id);
        let currentCart = [...cart];
        let restaurantCart = null;

        if (currentRestaurantIndex !== -1) {
            restaurantCart = currentCart[currentRestaurantIndex]
        } else {
            restaurantCart = {
                restaurantId: restaurant_id,
                orderDetails: []
            }
            currentCart = [
                ...currentCart,
                restaurantCart
            ]
        }

        const existingItemIndex = restaurantCart.orderDetails?.findIndex(cartItem => cartItem?.itemDetails?.id === item.id);

        
        if (existingItemIndex !== -1) {
            const existingItem = restaurantCart.orderDetails[existingItemIndex];
            restaurantCart.orderDetails = [
                ...restaurantCart.orderDetails.slice(0, existingItemIndex),
                {
                    itemDetails: item,
                    quantity: existingItem.quantity += 1
                },
                ...restaurantCart.orderDetails.slice(existingItemIndex + 1),
            ]
        } else {
            const newOrderItem = {
                itemDetails: item,
                quantity: 1
            }
            restaurantCart.orderDetails.push(newOrderItem);
        }

        currentCart = updateItemInArray(currentCart, restaurantCart, 'restaurantId');

        return setCart(currentCart);
    }

    return (
        <>
            <Navbar />
            <Container fluid className="layout">
                <RestaurantHeader restaurant={restaurant} />
                <Container className='mb-5'>
                    <Row className="py-4">
                        <Col md={6} className='mb-3'>
                            <Row className='mb-4'>
                                <Col>
                                    <h4>{restaurantDetailsLocale.menu}</h4>
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
                            {!loading && menus.length === 0 && <Row className='mt-3'>
                                <Col lg={6} sm={12}>
                                    <Card className='p-3'>
                                        <Card.Title className='mb-0 text-center fs-6'>No menu to show.</Card.Title>
                                    </Card>
                                </Col>
                            </Row>}
                            {menus.map(menu => <Row key={menu.id} className='mb-5'>
                                <Col>
                                    <Row className='align-items-center py-3 justify-space-between'>
                                        <Col>
                                            <h5>{menu.name}</h5>
                                        </Col>
                                        {isAuthed && hasPrivileges && <Col className='d-flex justify-content-end'>
                                            <Button variant="secondary" className='edit-btn' onClick={() => onEdit(menu)}>Edit</Button>
                                            <Button variant="danger" onClick={() => onDelete(menu)}>Delete</Button>
                                        </Col>}
                                    </Row>
                                    <MenuList hoverable={isCustomer && isAuthed}>
                                        {menu?.menuItems?.map(menuItem => (
                                            <MenuListItem
                                                key={menuItem.id}
                                                title={menuItem.item.name}
                                                description={menuItem.item.description}
                                                price={menuItem.item.price}
                                                onAddToCart={() => onAddToCart(menuItem)}
                                            />
                                        ))}
                                    </MenuList>
                                </Col>
                            </Row>)}
                        </Col>
                        {isCustomer && isAuthed && !loading && <Col md={{ span: 4, offset: 1 }} className='mb-3'>
                            <div className='sticky-top bg-white pb-3' style={{ paddingTop: 70 }}>
                                <Cart />
                            </div>
                        </Col>}
                    </Row>
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
