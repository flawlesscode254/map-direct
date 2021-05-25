import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import './App.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { db } from './Firebase'


 
function Map() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [plate, setPlate] = useState('')
  const [pin, setPin] = useState('')


  const security =  Math.floor((Math.random()*1000000)+1);
  

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -0.369434,
    longitude: 35.281660,
    zoom: 15
  });

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('orders').add({
      name: name,
      email: email,
      phone: phone,
      plate: plate,
      pin: pin,
      code: security
    })
    .then(
      setName(''),
      setEmail(''),
      setPhone(''),
      setPlate(''),
      setPin(''),
    )
    .catch(error => {
      alert(error.message)
    })
    
  }

  return (
    <div>
       <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/duncanii/ckjwkgecw041h17pcso3otkn3"
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <Marker latitude={-0.3666018} longitude={35.2730122} offsetLeft={-12} offsetTop={-24}>
        <div className="marker">
        <Popup trigger={
          <img src="https://img.icons8.com/color/48/fa314a/marker--v2.png" alt="marker"/>
        } position="right center" modal nested>
          <div className="form_one">
            <form action="" className="form_one" onSubmit={sendMessage}>
              <p>Archives Parking</p>
              <input value={name} onChange={(e) => {setName(e.target.value)}} className="fill" type="text" placeholder="Please enter your name"/>
              <input value={email} onChange={(e) => {setEmail(e.target.value)}} className="fill" type="text" placeholder="Please enter your email address"/>
              <input value={phone} onChange={(e) => {setPhone(e.target.value)}} className="fill" type="text" placeholder="Please enter your phone number"/>
              <input value={plate} onChange={(e) => {setPlate(e.target.value)}} type="text" className="fill" placeholder="Please enter your car plate number"/>
              <input value={pin} onChange={(e) => {setPin(e.target.value)}} className="fill" placeholder="Please enter a pin" type="text"/>
              <input className="fill" type="submit" value="Submit"/>
            </form>
          </div>
        </Popup>  
        </div>
      </Marker>
      
      </ReactMapGL>
    </div>
   
  );
}

export default Map