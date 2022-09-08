import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import {toast} from 'react-toastify';

const initialState={
  name:"",
  designation:"",
  company:"",
  salary:""
}

export const AddEdit = () => {
  const [state,setState]=useState(initialState);

  const{name,designation,salary,company}=initialState;

  const history=useNavigate();
  const {_id}=useParams();
  useEffect(()=>{
    if(_id){
      getSingleUser(_id)
    }
  },[_id])
  const getSingleUser=async(_id)=>{
    const response=await axios.get(`http://localhost:4000/employees/${_id}`)
    console.log('data of data',_id)
    if(response.status === 200){
      setState({...response.data[0]})
      console.log('response data',...response.data[0])
    }
  }
  const addUser=async(data)=>{
    const response=await axios.post("http://localhost:4000/employees",data);
    if(response.status === 200){
      toast.success("ADDED SUCCESSFULLY")
    }
  }

  const updateUser=async(data,_id)=>{
    const response=await axios.put(`http://localhost:4000/employees/${_id}`,data);
    if(response.status === 200){
      toast.success("UPDATED SUCCESSFULLY")
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!_id){
      addUser(state);
    }
    else{
      updateUser();
    }
   
      console.log('logged')
      // setTimeout(()=>{
      //  // history.push('/')
      // })
      
    
   
  }
  const handleInputChange=(e)=>{
    let {name,value}=e.target;
    setState({...state,[name]:value})
  }
  return (
    <div style={{marginTop:"100px"}}>
      <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}} onSubmit={handleSubmit}>
      <label htmlFor='name'>
    Name
      </label> 
      <input
      type="text"
      _id='name'
      name='name'
      placeholder='Enter the Name'
      onChange={handleInputChange}
      defaultValue={name}
       />
       <label htmlFor='name'>
    Designation
      </label> 
      <input
      type="text"
      _id='designation'
      name='designation'
      placeholder='Enter the Designation'
      onChange={handleInputChange}
      defaultValue={designation}
       />
       <label htmlFor='name'>
    Company
      </label> 
      <input
      type="text"
      _id='company'
      name='company'
      placeholder='Enter the Company'
      onChange={handleInputChange}
      defaultValue={company}
       />
       <label htmlFor='name'>
    Salary
      </label> 
      <input
      type="number"
      _id='salary'
      name='salary'
      placeholder='Enter the Salary'
      onChange={handleInputChange}
      defaultValue={salary}
       />
    <input type="submit" value={_id ? "update":"Add"}/>
      
      </form>
    </div>
  )
}

export default AddEdit
