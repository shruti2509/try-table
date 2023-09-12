import axios from 'axios'

import React from 'react'

import { useState } from 'react'

import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
 import Data from './db.json'




function Home() {  
  // search

  const [search, setSearch] = useState('')
  console.log(search)
  
  


  const [data, setData] = useState([])  
  
  // pagination

const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 5;
const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;
const records = data.slice(firstIndex,lastIndex);
const nPage = Math.ceil(Data.users.length / recordsPerPage)
const number = Array.from({ length: nPage }, (_, i) => i + 1);


    const navigate = useNavigate()    
    useEffect(()=> { 
          
        axios.get('https://wizard-world-api.herokuapp.com/Elixirs')        
        .then(res => setData(res.data))        
        .catch(err => console.log(err)) 
         
    }, [])
  return (    
  <div className='container '> 
  {/* navbar */}
  <nav>
        <ul className='navul' style={{listStyleType: 'none', marginLeft: '650px'}}>
          <li className='navli'> search: <input type='text' placeholder='type to search' onChange={(e) => setSearch(e.target.value)} style={{listStyleType:'none'}}></input></li>
        </ul>
    </nav>    

  <Link to="/create" className='btn btn-success my-3'>Create +</Link>        
  <table className='table'>            
  <thead>                
    <tr>                    
        <th>Name</th>                    
        <th>UserId</th>                    
        <th>Contact</th>                    
        <th>Action</th>                
        </tr>            
        </thead>            
        <tbody>                
            {records.filter((item) => {
  return search.toLowerCase() === '' 
  ? item 
  : item.name.toLowerCase().includes(search);
  })
            .map((d, i)=> ( 
                                
            <tr key={i}>                        
            <td>{d.name}</td>                        
            <td>{d.id}</td>                        
            <td>{d.phonenumber}</td>                        
             <td>    
            
            
                <Link to={`/read/${d.id}`} className='text-decoration-none btn btn-sm btn-success'>Read</Link>
                <button className='text-decoration-none btn btn-sm btn-danger mx-1'                                 
                onClick={e => handleDelete(d.id, data)}>Delete</button>                            
                <Link to={`/read/${d.id}`} className='text-decoration-none btn btn-sm btn-primary'>update</Link>
                                        
                </td>                     
                </tr>
                               
                ))}  
                </tbody>        
                </table>

                {/* pagination */}

                <nav style={{marginLeft: '10px'}}>
        <ul className='pagination'>
            <li className='page-item' style={{listStyleType:'none', display: 'inline-block'}}>
                <button type='submit' className='page-link' onClick={prePage}> pre</button>
            </li>
            {
                number.map((n, userid) =>(
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={userid} style={{listStyleType:'none', display: 'inline-block', marginLeft: '3px'}}>
                      <button type='submit' className='page-item'
                      onClick={()=> setCurrentPage(n)}>{n}</button>  
                    </li>
                ))
            }
             <li className='page-item' style={{listStyleType:'none', display: 'inline-block', marginLeft: '3px'}}>
                <button type='submit' className='page-link' onClick={nextPage}>Next</button>
            </li>
        </ul>
      </nav>

                
    </div>  
    )

    // pagination
    function prePage(){
      if (currentPage !== firstIndex){
        setCurrentPage(currentPage - 1)
      }
      }
      
      
      
      function nextPage(){
      if(currentPage !== lastIndex){
        setCurrentPage(currentPage + 1)
      }
      }


  function handleDelete(id) { 

    const confirm = window.confirm("would you like to Delete?");

    const axiosConfig = {
      method: 'delete',
      url: `https://wizard-world-api.herokuapp.com/Elixirs/${id}`,
    };
    if(confirm) {
      axios(axiosConfig)
  .then((response) => {
    console.log('User deleted successfully.');
  })
  .catch((error) => {
    console.error('Error deleting user:', error);
  });

      console.log('https://wizard-world-api.herokuapp.com/Elixirs/'+id)      
        // axios.delete('http://localhost:3000/users'+ userid)
        // console.log(userid) 
            
        // .then(res => {            
        //     alert("Record Deleted");            
        //     window.location.reload();        
        // })    
    }  
  }}
export default Home
