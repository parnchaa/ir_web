import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './Navibar.css';


class Navibar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        
        return (
                <Navbar color="light" light expand="md" className="navbar1">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" id="nav" navbar>
                            <NavItem>
                                <NavLink href="/Event">เหตุการณ์</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/SearchSticker">ค้นหาข้อมูลผู้ขอสติกเกอร์</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Addsticker">เพิ่มข้อมูลผู้ขอสติกเกอร์</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Staff">ข้อมูลพนักงาน</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Rule">กฎองค์กร</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Location">พื้นที่จอดรถ</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
        );

    }

}

export default Navibar;