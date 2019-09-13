import React,{Component} from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Addsticker.css'

class Addsticker extends Component{
    state = {
        carOwnerFname: '',
        carOwnerLname:'',
        carOwnerTel:'',
        carOwnerEmail:'',
        carOwmerAddress:'',
        licensePlate:'',
        carColor:'',
        brandCar:'',
        modelCar:''
    }

    // handleAddStricker = event => {
    //     this.onAfterAddStaff()
    // }

    onAfterAddStaff = event =>{
        console.log("ddd")
        const {carOwnerFname,carOwnerLname,carOwnerTel,carOwnerEmail,carOwmerAddress,licensePlate,carColor,brandCar,modelCar} = this.state
          const url = 'http://localhost:5000/addSticker';
          const bodyData = JSON.stringify({
            carOwnerFname: carOwnerFname,
            carOwnerLname: carOwnerLname,
            carOwnerTel: carOwnerTel,
            carOwnerEmail: carOwnerEmail,
            carOwmerAddress: carOwmerAddress,
            licensePlate: licensePlate,
            carColor: carColor,
            brandCar: brandCar,
            modelCar: modelCar
          });
          console.log(bodyData,'bodyData')
          const othepram = {
              headers: {
                  "content-type": "application/json; charset=UTF-8"
              },
              body: bodyData,
              method: "POST"
          };
          fetch(url, othepram)
              .then(data => console.log(data))
            //   .then(response => {
            //     this.getData();
            //   })
              .catch(error => {});
      }

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value)
      }

    render() {
        console.log("name:"+ this.state.carOwnerFname);
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
                        <input type='text' placeholder='ชื่อ' name="carOwnerFname"  onChange={event => this.handleChange(event)}></input>
                    </div>
                    <div className='eachField'>
                        {/* <label>นามสกุล:</label> */}
                        <input type='text' placeholder='นามสกุล' name='carOwnerLname' onChange={event => this.handleChange(event)}></input>
                    </div>
                    </div>
                    
                    <div className='eachField'>
                        <label>เบอร์โทรศัพท์:</label>
                        <input type='text' placeholder='เบอร์โทรศัพท์' name='carOwnerTel' onChange={event => this.handleChange(event)}></input>
                    </div>
                    <div className='eachField'>
                        <label>อีเมล:</label>
                        <input type='text'  placeholder='อีเมล' name='carOwnerEmail' onChange={event => this.handleChange(event)}></input>
                    </div>
                    
                    <div className='eachField'>
                        <label>ที่อยู่:</label>
                        <input type='text' className='addressInput' name='carOwmerAddress' placeholder='ที่อยู่' onChange={event => this.handleChange(event)}></input>
                    </div>
                    <div className='formRow'>
                    <div className='eachField'>
                        <label>ทะเบียนรถ:</label>
                        <input type='text' placeholder='ทะเบียนรถ' name='licensePlate' onChange={event => this.handleChange(event)}></input>
                    </div>
                    <div className='eachField'>
                        <label>สีรถ:</label>
                        <input type='text' placeholder='สีรถ' name='carColor' onChange={event => this.handleChange(event)}></input>
                    </div>
                    </div>
                    <div className='formRow'>
                    <div className='eachField'>
                        <label>ยี่ห้อรถ:</label>
                        <input type='text' placeholder='ยี่ห้อรถ' name='brandCar' onChange={event => this.handleChange(event)}></input>
                    </div>
                    <div className='eachField'>
                        <label>รุ่นรถ:</label>
                        <input type='text' placeholder='รุ่นรถ' name='modelCar' onChange={event => this.handleChange(event)}></input>
                    </div>
                    </div>
                     <button className="buttonAddsticker" onClick={event => this.onAfterAddStaff(event)} >เพิ่ม</button>

                   
                </form>
            </div>


         </div>

     );

    } 

}

export default Addsticker;