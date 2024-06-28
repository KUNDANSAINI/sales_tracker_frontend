import Header from '../Header';
import './Admin.scss'
import axios from 'axios'
import { useState } from 'react';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
 


function AddService() {

    const [servicename,setServiceName]=useState('')
    const [serviceprice,setServicePrice]=useState('')

    const backend_url=process.env.REACT_APP_BACKEND_URL
    let navigate=useNavigate()

    const handleform=async(e)=>{
        e.preventDefault()
        const token=localStorage.getItem('token')
        await axios.post(`${backend_url}/admin/addservice`,{
            servicename,serviceprice
        },{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    ).then((result)=>{
        if(result.data.status===200){
            toast.success("Service Successfully Add")
            navigate('/admin/service')
        }
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
    }

    return (
        <section id='addservice'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <h1>ADD SERVICE</h1>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Service Name</label>
                            <input type='text'
                            autoFocus
                            value={servicename}
                            onChange={(e)=>{setServiceName(e.target.value)}}
                            />
                            <label>Service Price</label>
                            <input type='number'
                            value={serviceprice}
                            onChange={(e)=>{setServicePrice(e.target.value)}}
                            />
                            <button type='submit' className='btn btn-outline-dark mt-2'>ADD SERVICE</button>
                        </form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        </section>
    );
}

export default AddService;