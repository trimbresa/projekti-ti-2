import React from 'react';
import {Badge, ListGroup} from "react-bootstrap";

const MenuListItem = ({title, price, description}) => {
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {description}
            </div>
            <Badge variant="primary" bg="success" pill>
                {price}
            </Badge>
        </ListGroup.Item>
    );
}

MenuListItem.propTypes = {};

export default MenuListItem;
