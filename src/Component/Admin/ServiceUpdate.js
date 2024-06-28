import Header from '../Header';
import './Admin.scss'
import axios from 'axios'
import { useLayoutEffect, useState } from 'react';
import {toast} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom';


function ServiceUpdate() {

    const [servicename,setServiceName]=useState('')
    const [serviceprice,setServicePrice]=useState('')

    const {id}=useParams()
    const backend_url=process.env.REACT_APP_BACKEND_URL
    let navigate=useNavigate()

    useLayoutEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(`${backend_url}/admin/singleservice/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }).then((result)=>{
            if(result.data.status===200){
                setServiceName(result.data.singledata.servicename)
                setServicePrice(result.data.singledata.serviceprice)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    },[backend_url,id])

    const handleform=async(e)=>{
        e.preventDefault()
        const token=localStorage.getItem('token')
        await axios.put(`${backend_url}/admin/updateservice/${id}`,{
            servicename,serviceprice
        },{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    ).then((result)=>{
        if(result.data.status===201){
            toast.success("Service Successfully Updated")
            navigate('/admin/service')
        }
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
    }

    return (
        <section id='serviceupdate'>
            <Header />
            <div className='container'>
                <div className='row'>
                <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <h1>UPDATE SERVICE</h1>
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
                            <button type='submit' className='btn btn-outline-dark mt-2'>UPDATE SERVICE</button>
                        </form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        </section>
    );
}

export default ServiceUpdate;