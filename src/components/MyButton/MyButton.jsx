import React from 'react'
import './MyButton.css'

const MyButton = (props) => {
    return (
        <button {...props} className='myBtn'></button>
    )
}

export default MyButton