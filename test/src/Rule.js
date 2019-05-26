import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Rule.css'
import Ruletable from './Ruletable'

var ruledata = [];

class Rule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rule: []
        }
    }
    componentDidMount() {
        fetch('http://54.169.164.58:5000/rule')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ rule: myJson })
                console.log("rule", this.state.rule)
            });
    }

    render() {

        return (
            <div>
                <Header />
                <Navibar />
                <Ruletable ruledata={this.state.rule} />


                {/* <Form>
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

                </Form> */}

                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form> */}




            </div>

        );

    }

}

export default Rule;