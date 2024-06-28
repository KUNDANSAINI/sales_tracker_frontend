import { useNavigate } from 'react-router-dom';
import UserHeader from '../UserHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './User.scss'



function Dashboard() {

    const [alltaskdata,setAllTaskData]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const recordPerPage=9;
    const lastPage= currentPage*recordPerPage
    const firstPage=lastPage - recordPerPage
    const records= alltaskdata.slice(firstPage, lastPage)
    const totalPages= Math.ceil(alltaskdata.length / recordPerPage )
    const number=[...Array(totalPages +1).keys()].slice(1)

    const backend_url = process.env.REACT_APP_BACKEND_URL
    const navigate=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(`${backend_url}/Task/alltaskdata`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            if(result.data.status===200){
                setAllTaskData(result.data.alldata)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    },[backend_url])

    const handlePage=(e,page)=>{
        setCurrentPage(page)
    }

    const formatDate=(dateString)=>{
        const formatDate=dateString.split('T')[0]
        const parts=formatDate.split("-")
        const Date=parts[2]+"-"+parts[1]+"-"+parts[0]
        return Date
    }

    return (
        <section id='userdashbord'>
            <UserHeader />
            <div className='container'>
                <div className='row'>
                <h1>Services</h1>
                    {records.map((val)=>(
                    <div className='col-md-3' key={val._id}>
                        <div className="card mt-2">
                            <div className="card-body">
                                <p className="card-title">Name: {val.name}</p>
                                <p className="card-title">Mobile No.: {val.mobile}</p>
                                <p className="card-title">Service: {val.service}</p>
                                <p className="card-title">Service Price: ₹ {val.price}</p>
                                <p className="card-title">Additional Charge: ₹ {val.addcharge}</p>
                                <p className="card-title">Total Charge: ₹ {val.price+val.addcharge}</p>
                                <p className="card-title">Decripation: {val.decs}</p>
                                <p className="card-title">PostedDate: {formatDate(val.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                {
                    number.map((number,index)=>(
                        <button className={`btn btn-outline-dark mt-2 ms-2 ${currentPage === number ? "active" : ""} `} onClick={(e)=>{handlePage(e,number)}}>{number}</button>
                    ))
                }
            </div>
        </section>
    );
}

export default Dashboard;