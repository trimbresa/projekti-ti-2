import React from 'react';
import {ListGroup} from "react-bootstrap";

const MenuList = (props) => {
    return (
        <ListGroup as="ol" numbered className={`${props.hoverable ? 'list-group-hover' : ''}`}>
            {props.children}
        </ListGroup>
    );
}

export default MenuList;
