import React,{Component} from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Addsticker.css'

class Addsticker extends Component{

    render() {

     return(
         <div>
            <Header/>
            <Navibar/>
            <h1>หน่วยงาน:</h1>
            <h1>Add Sticker</h1>
            <h1>ยังไม่ได้ทำ</h1>


         </div>

     );

    } 

}

export default Addsticker;