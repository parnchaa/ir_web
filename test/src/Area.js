import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Area.css'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import { Row } from 'react-grid-system';

class Area extends Component {

    render() {

        return (
            <div>
                <Header />
                <Navibar />
                <Table>
                    <thead>
                        <tr>
                            <th>หมายเลขพื้นที่</th>
                            <th>ชื่อสถานที่</th>
                            <th>รายละเอียดสถานที่</th>
                            <th>แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>ลานFibo</td>
                            <td>ลานจอดรถสำหรับสติกเกอร์ป้ายเหลือง</td>
                            <td><Button outline color="danger">delete</Button></td>
                        </tr>
                    </tbody>
                </Table>

                <Form class="center">
                    <Row Form>
                        <Col md={2}>
                            <FormGroup row>
                                <Label for="exampleSelect" md="auto">หมายเลขพื้นที่:</Label>
                                <Col md="auto">
                                    <Input type="select" name="select" id="exampleSelect" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row class>
                                <Label for="select" md="auto">ชื่อสถานที่:</Label>
                                <Col md={3}>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </Col>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row Form>
                        <Col>
                            <FormGroup row>
                                <Label for="select" md="auto">รายละเอียดสถานที่:</Label>
                                <Col md={6}>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button class="Button" variant="primary" as="input" type="submit" value="Submit" >เพิ่มพื้นที่</Button>


                </Form>   

            </div>


        );

    }

}

export default Area;