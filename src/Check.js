import React, { useState } from 'react'
import { db } from './Firebase'

function Check(){
    const [view, setView] = useState()
    const[stream, setStream] = useState([])

    const handleCheck = () => {
        db.collection("orders").where("pin", "==", view).get().then((snapshot) => {
            snapshot.forEach(doc => {
                setStream("Your unique code is: " + doc.data().code)
            })
            setView('')
        })
    }

    return(
        <div>
            <p>Please input the pin that you had entered before</p>
            <input value={view} onChange={(e) => setView(e.target.value)} type="text" placeholder="Enter the pin here"/>
            <button onClick={handleCheck} >Check</button>
            <p>{stream}</p>
        </div>
    )
}

export default Check
