import axios from 'axios'

import React from 'react'

import { useEffect } from 'react'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useNavigate, useParams } from 'react-router-dom'


function Read() {    
    const {id} = useParams()    
    const navigate = useNavigate()    
    const [data, setdata] = useState([])
    useEffect(() => {
           
        axios.get('https://wizard-world-api.herokuapp.com/Elixirs/' +id)        
        .then(res => setdata(res.data))        
        .catch(err => console.log(err)) 
        console.log(id)   
    }, [])
  return (    
  <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>        
  <div className='w-50 border bg-secondary text-white p-5'>          
  <h3>User Detail</h3>            
  <div className=' text-white'>

    
  <p> id:{data.id}</p>              
  <p> Name:{data.name}</p>              
  <Link to="/" className='btn btn-primary'>Back</Link>            
  </div>          
  </div>    
  </div>  
  )}
export default Read