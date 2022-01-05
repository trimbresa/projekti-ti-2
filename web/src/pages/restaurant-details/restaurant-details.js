import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/navbar";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import RestaurantHeader from "../../components/headers/restaurant-header/restaurant-header";
import MenuList from "../../components/lists/menu-list/menu-list";
import MenuListItem from "../../components/list-items/menu-list-item/menu-list-item";

import restaurantService from "../../services/restaurant-service";

import './restaurant-details-styles.scss';
import menuService from '../../services/menu-service';
import MenuDetailsModal from '../../components/modals/menu-details-modal/menu-details-modal';

const RestaurantDetails = () => {
    const { restaurant_id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menus, setMenus] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const onModalHide = () => {
        setModalVisible(false)
        setSelectedMenu(null);
    }

    const onEdit = (selected) => {
        setSelectedMenu(selected);
    }

    const onAddNew = () => {
        setSelectedMenu({});
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
        }
        if (restaurant_id && restaurant) {
            fetchRestaurantMenus();
        }
    }, [restaurant_id, restaurant])

    return (
        <>
            <Navbar />
            <Container fluid className="layout">
                <RestaurantHeader restaurant={restaurant} />
                <Container className='mb-5'>
                    <Row className="py-4 mb-3">
                        <Col md={5}>
                            <Row>
                                <Col>
                                    <h4>Menu</h4>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button variant="success" onClick={onAddNew}>+ Add New</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {menus.map(menu => <Row key={menu.id} className='mb-5'>
                        <Col md={5}>
                            <Row className='align-items-center py-3 justify-space-between'>
                                <Col>
                                    <h5>{menu.name}</h5>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button variant="secondary" className='edit-btn' onClick={() => onEdit(menu)}>Edit</Button>
                                    <Button variant="danger">Delete</Button>
                                </Col>
                            </Row>
                            <MenuList>
                                {menu.menuItems.map(menuItem => (
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
            <MenuDetailsModal show={selectedMenu && true} menu={selectedMenu} onHide={onModalHide} />
        </>
    );
}

export default RestaurantDetails;
