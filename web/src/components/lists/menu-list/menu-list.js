import React from 'react';
import {ListGroup} from "react-bootstrap";

const MenuList = (props) => {
    return (
        <ListGroup as="ol" numbered>
            {props.children}
        </ListGroup>
    );
}

export default MenuList;
