import UserHeader from '../UserHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './User.scss'
import { useNavigate } from 'react-router-dom';


function UserService() {

    const [userservice,setUserService]=useState([])

    const backend_url = process.env.REACT_APP_BACKEND_URL
    const navigate=useNavigate()
    
    useEffect(()=>{
        const email=localStorage.getItem('loginName')
        const token=localStorage.getItem('token')
        axios.get(`${backend_url}/Task/userservice/${email}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            if(result.data.status===200){
                setUserService(result.data.userservice)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    },[backend_url])

    const formatDate=(dateString)=>{
        const dateFormate=dateString.split('T')[0]
        const parts= dateFormate.split('-')
        const Date= parts[2]+"-"+parts[1]+"-"+parts[0]
        return Date
    }

    const handletask=(e)=>{
        navigate(`/usertask`)
    }

    return (
        <section id='userdashbord'>
            <UserHeader />
            <div className='container'>
                <div className='row'>
                    <h1>Total Task</h1>
                    <div>
                    <button className='btn btn-outline-primary' style={{float:"right"}} onClick={(e)=>{handletask(e)}}>ADD TASK</button>
                    </div>
                    {userservice.map((val)=>(
                    <div className="col-md-4" key={val._id}>
                    <div className="card mt-2">
                            <div className="card-body">
                                <p className="card-title">Service: {val.service}</p>
                                <p className="card-title">Service Price: ₹ {val.price}</p>
                                <p className="card-title">Additional Charge: ₹ {val.addcharge}</p>
                                <p className="card-title">Total Charge: ₹ {val.price+val.addcharge}</p>
                                <p className="card-title">Decripation : {val.decs}</p>
                                <p className="card-title">Additional Charge Decripation : {val.addDecs}</p>
                                <p className="card-title">Posted Date: {formatDate(val.createdAt)}</p>
                            </div>
                        </div>
                    </div>                    
                    ))
                    }
                </div>
            </div>
        </section>
    );
}

export default UserService;