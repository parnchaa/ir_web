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
            <div className="Table-header">เพิ่มข้อมูลผู้ขอสติกเกอร์</div>
            <div className='addSticker'>
                <form className='addStickerForm'>
                    <div className='formRow'>
                    <div className='eachField'>
                        <label>ชื่อ:</label>
                        <input type='text' placeholder='ชื่อ'></input>
                    </div>
                    <div className='eachField'>
                        {/* <label>นามสกุล:</label> */}
                        <input type='text' placeholder='นามสกุล'></input>
                    </div>
                    </div>
                    
                    <div className='eachField'>
                        <label>เบอร์โทรศัพท์:</label>
                        <input type='text' placeholder='เบอร์โทรศัพท์'></input>
                    </div>
                    <div className='eachField'>
                        <label>อีเมล:</label>
                        <input type='text'  placeholder='อีเมล'></input>
                    </div>
                    
                    <div className='eachField'>
                        <label>ที่อยู่:</label>
                        <input type='text' className='addressInput' placeholder='ที่อยู่'></input>
                    </div>
                    <div className='formRow'>
                    <div className='eachField'>
                        <label>ทะเบียนรถ:</label>
                        <input type='text' placeholder='ทะเบียนรถ'></input>
                    </div>
                    <div className='eachField'>
                        <label>สีรถ:</label>
                        <input type='text' placeholder='สีรถ'></input>
                    </div>
                    </div>
                    <div className='formRow'>
                    <div className='eachField'>
                        <label>ยี่ห้อรถ:</label>
                        <input type='text' placeholder='ยี่ห้อรถ'></input>
                    </div>
                    <div className='eachField'>
                        <label>รุ่นรถ:</label>
                        <input type='text' placeholder='รุ่นรถ'></input>
                    </div>
                    </div>
                     <button className="buttonAddsticker" >เพิ่ม</button>
                   
                </form>
            </div>


         </div>

     );

    } 

}

export default Addsticker;