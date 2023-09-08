import axios from 'axios';

import React from 'react'

import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';



function Create() {    
  const [inputData, setInputData] = useState({        
    name: '',        
    phonenumber: '',
    userid: '' ,   
  })    
  const navigate = useNavigate();
    const handleSubmit = async (event) => {        
      event.preventDefault();    
      console.log(inputData)  
      await  
      axios.post('http://localhost:3000/users', inputData)        
      .then(res => {  
        console.log(res.data);          
        alert("Data Posted Successfully!")            
        navigate('/')        
      })  .catch((err)=>{ console.log(err)}
      )  
    }  
    return (    
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>        
    <div className='w-50 border bg-secondary text-white p-5'>            
    <form onSubmit={handleSubmit}>                
    <div>                    
      <label htmlFor="name">Name:</label>                    
      <input type="text" name='name' className='form-control'                    
      onChange={e => {setInputData({...inputData, name: e.target.value})
    console.log(inputData)
    }
      }/>
                   
      </div>                
      <div>                    
        <label htmlFor="phonenumber">Contact:</label>                    
        <input type="text" name='phone' className='form-control'                    
        onChange={e => setInputData({...inputData, phonenumber: e.target.value})}/>                
        </div><br />   
        <div>                    
        <label htmlFor="email">id:</label>                    
        <input type="text" name='userid' className='form-control'                    
        onChange={e => setInputData({...inputData, userid: e.target.value})}/>                
        </div><br/> 

        <div>                    
        <label htmlFor="status">status:</label>                    
        <input type="text" name='status' className='form-control'                    
        onChange={e => setInputData({...inputData, status: e.target.value})}/>                
        </div><br /> 
                       
        <button className='btn btn-info'>Submit</button> 
        <Link to= "/" className='btn btn-primary ms-3'>Back</Link>           
        </form>        
        </div>    
        </div>  
        )}
export default Create
