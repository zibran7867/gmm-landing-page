import axios from 'axios'
import React, { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        axios.post('https://gmm-backend.onrender.com/api/').then((res) => {
            console.log(res)
        })
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Test
