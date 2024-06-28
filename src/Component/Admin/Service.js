import Header from '../Header';
import './Admin.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



function Service() {

    const [allservice,setAllService]=useState([])
    const backend_url=process.env.REACT_APP_BACKEND_URL
    const navigate=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem('token')
         axios.get(`${backend_url}/admin/service`,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }).then((result)=>{
            if(result.data.status===200){
                setAllService(result.data.alldata)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    },[backend_url])

    const handleupdate=(e,id)=>{
        navigate(`/admin/serviceupdate/${id}`)
    }


   const handledelete=async(e,id)=>{
        const token=localStorage.getItem("token")
      await  axios.delete(`${backend_url}/admin/servicedelete/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
       }).then((result)=>{
        if(result.data.status===200){
            toast.success("Service Is Deleted")
            const deleteservice=allservice.filter((value)=>{
                return value._id !==id
            })
            setAllService(deleteservice)
        }
       }).catch((error)=>{
        toast.error(error.response.data.message)
       })
    }



    return (
        <section id='service'>
            <Header />
            <div className='container'>
                <div className='row'>
                        <h1>SERVICE</h1>
                        <div>
                        <Link to='/admin/addservice'><button id='servicebutton' className='btn btn-outline-info'><i className="bi bi-plus-lg"></i> ADD SERVICE</button></Link>
                        </div>
                        {allservice.map((value)=>(
                    <div className='col-md-3' key={value._id}>
                        <div className="card mt-2">
                                <div className="card-body">
                                    <p className="card-title">Name: {value.servicename}</p>
                                    <p className="card-title">Service Price: ₹ {value.serviceprice}</p>
                                    <button onClick={(e)=>{handleupdate(e,value._id)}} className='btn btn-success'>Update</button>
                                    <button onClick={(e)=>{handledelete(e,value._id)}} className='btn btn-danger ms-2'>Delete</button>
                                </div>
                        </div>
                    </div>
                        ))}
                    </div>
                </div>
        </section>
    );
}

export default Service;