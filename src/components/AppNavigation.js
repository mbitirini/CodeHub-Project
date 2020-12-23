import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function AppNavigation() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Code.Hub Dashboard</Navbar.Brand>
            <Nav className="ml-auto" >
                <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                <Nav.Link as={Link} to="/addnewcourse">Add new course</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default AppNavigation;
