import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Rule.css'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';


class Rule extends Component {
    // componentDidMount() {
    //     fetch('http://localhost:5000/')
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             console.log(JSON.stringify(myJson));
    //         });
    // }


    render() {

        return (
            <div>
                <Header />
                <Navibar />
                
                <Form>
                    <h1>หน่วยงาน:</h1>
                    <Row Form>
                        <Col md={4}>
                            <FormGroup row>
                                <Label for="exampleSelect" md="auto">จำนวนครั้งที่สามารถทำผิด:</Label>
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
                        <Col md={5}>
                            <FormGroup row>
                                <Label for="exampleState" md="auto">ค่าปรับ</Label>
                                <Col md={3}>
                                    <Input type="number" name="price" id="examplePrice" />
                                </Col>
                                <Label>บาท</Label>
                            </FormGroup>
                        </Col>
                        <Col md={3}></Col>

                    </Row>
                    <Row Form>
                        <Col>
                            <FormGroup row>
                                <Label for="select" md="auto">วิธีนับจำนวนครั้งปรับ : </Label>
                                <Col md={3}>
                                    <Input type="select" name="select" id="howToCount">
                                        <option>เริ่มนับใหม่หลังโดนปรับ</option>
                                        <option>นับต่อหลังโดนปรับ</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                </Form>




            </div>

        );

    }

}

export default Rule;