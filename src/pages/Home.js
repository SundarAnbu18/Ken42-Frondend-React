import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import './Home.css'
import {toast} from 'react-toastify';
import axios from 'axios';
export const Home = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    getUsers();
  },[])
  const getUsers=async()=>{
    const response=await axios.get("http://localhost:4000/employees");
    if(response.status ===200){
      setData(response.data)
    }
  }
  
  const onDeleteUser=async(id)=>{
    
    if(window.confirm('Are you sure you want to delete record')){
      console.log('id',id)
      
      const response=await axios.delete(`http://localhost:4000/employees/${id}`)
        if(response.status === 200){
          toast.success('record deleted success fully')
          getUsers();
        }
      }
    }
  
  console.log('data',data)
  return (
    <div>
      <h2 style={{marginTop:"150px"}}>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:"center"}}>
                  S.No
              </th>
              <th style={{textAlign:"center"}}>
                 Name
              </th>
              <th style={{textAlign:"center"}}>
                 Designation
                 </th>
                 <th style={{textAlign:"center"}}>
                 Company
                 </th>
                 <th style={{textAlign:"center"}}>
                 Salary
                 </th>
                 <th style={{textAlign:"center"}}>
                  Action
                 </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item,index)=>{
              return(
                <tr key={index}>
                  <th scope='row'>{index+1}</th>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>{item.company}</td>
                  <td>{item.salary}</td>
                  <td>
                    <Link to={`/update/${item._id}`}>
                     <button className='btn btn-edit'
                     
                     >
                      Edit
                     </button>
                    </Link>
                    <button className='btn btn-delete' onClick={()=>{
                      onDeleteUser(item._id)
                    }}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </h2>
    </div>
  )
          
}

export default Home
