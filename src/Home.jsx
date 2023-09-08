import axios from 'axios'

import React from 'react'

import { useState } from 'react'

import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'




function Home() {    
  const [data, setData] = useState([])    
    const navigate = useNavigate()    
    useEffect(()=> { 
          
        axios.get('http://localhost:3000/users')        
        .then(res => setData(res.data))        
        .catch(err => console.log(err))    
    }, [])
  return (    
  <div className='container '>               
  <Link to="/create" className='btn btn-success my-3'>Create +</Link>        
  <table className='table'>            
  <thead>                
    <tr>                    
        <th>Name</th>                    
        <th> userid</th>                    
        <th>contact</th>                    
        <th>Action</th>                
        </tr>            
        </thead>            
        <tbody>                
            {data.map((d, i)=> (                    
            <tr key={i}>                        
            <td>{d.name}</td>                        
            <td>{d.userid}</td>                        
            <td>{d.phonenumber}</td>                        
             <td>    
             {/* {
                  console.log(d.userid)      
                }                           */}
            
                <Link to={`/read/${d.userid}`} className='text-decoration-none btn btn-sm btn-success'>Read</Link>
                <button className='text-decoration-none btn btn-sm btn-danger mx-1'                                 
                onClick={e => handleDelete(d.userid, data)}>Delete</button>                            
                <Link to={`/read/${d.userid}`} className='text-decoration-none btn btn-sm btn-primary'>update</Link>
                                        
                </td>                     
                </tr>
                               
                ))}  
                </tbody>        
                </table>
                
    </div>  
    )
  function handleDelete(userid, users) { 

    const confirm = window.confirm("would you like to Delete?");
    // console.log(users)    
    // const indexDelete = users.filter(users => users.userid !== userid);
    const axiosConfig = {
      method: 'delete',
      url: `http://localhost:3000/users/${userid}`,
    };
    if(confirm) {
      axios(axiosConfig)
  .then((response) => {
    console.log('User deleted successfully.');
  })
  .catch((error) => {
    console.error('Error deleting user:', error);
  });

      console.log('http://localhost:3000/users/'+ userid)      
        // axios.delete('http://localhost:3000/users'+ userid)
        // console.log(userid) 
            
        // .then(res => {            
        //     alert("Record Deleted");            
        //     window.location.reload();        
        // })    
    }  
  }}
export default Home
