import React from 'react';
import { Badge, Button, ListGroup } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';


const MenuListItem = ({ title, price = 0, description, onDelete, showDeleteAction, itemIndex, onAddToCart }) => {
    const onMenuItemDelete = () => {
        onDelete(itemIndex)
    }
    const currencyFormatter = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'EUR' });

    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            onClick={onAddToCart}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {description}
            </div>
            <Badge variant="primary" bg="success" pill>
                {currencyFormatter.format(price)}
            </Badge>
            {showDeleteAction && <Button size='sm' variant='danger' style={{ marginLeft: 5 }} onClick={onMenuItemDelete}>
                <FaTrash /></Button>}
        </ListGroup.Item>
    );
}

MenuListItem.propTypes = {};

export default MenuListItem;
