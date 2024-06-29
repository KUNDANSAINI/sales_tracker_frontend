import { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';



function AdminDashbord() {
    const [alltaskdata,setAllTaskData]=useState([])
    const [searchname,setSearchName]=useState('')
    const [currentPage,setCurrentPage]=useState(1)
    const recordPerPages = 12;
    const lastPage= currentPage * recordPerPages
    const firstPage= lastPage - recordPerPages
    const filterdata=alltaskdata.filter(emp=>
        emp.name.toLowerCase().includes(searchname.toLowerCase())
    )
    const records=filterdata.slice(firstPage,lastPage)
    const totalPages= Math.ceil(filterdata.length / recordPerPages)
    const number=[...Array(totalPages + 1).keys()].slice(1)

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

    const handledelete=async (e,id)=>{
       const token=localStorage.getItem('token')
        await axios.delete(`${backend_url}/Task/taskdelete/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            if(result.data.status===200){
                toast.success("Task Successfully Deleted")
                const filterid=alltaskdata.filter((val)=>{
                    return val._id !== id
                })
                setAllTaskData(filterid)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }


    const handleupdate=(e,id)=>{
        navigate(`/admin/taskupdate/${id}`)
    }

    const handlePage=(e,page)=>{
        setCurrentPage(page)
    }

    
    const formatDate=(dateString)=>{
        const dateFormate=dateString.split('T')[0]
        const parts=dateFormate.split('-')
        const reverse= parts[2]+"-"+parts[1]+"-"+parts[0]
        return reverse
    }

    const handlesearch=(e)=>{
        setSearchName(e.target.value)
        setCurrentPage(1)
    }

    
    return (
        <section id='dashbord'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <h1>Empolyee Task</h1>
                    <div id='search'>
                        <input type='text' placeholder='SEARCH NAME' onChange={(e)=>{handlesearch(e)}}
                        />
                    </div>
                    {records.map((val)=>(
                    <div className='col-md-3' key={val._id}>
                        <div className="card mt-2">
                            <div className="card-body">
                                <p className="card-title">Name: {val.name}</p>
                                <p className="card-title">Mobile No.: {val.mobile}</p>
                                <p className="card-title">Service: {val.service}</p>
                                <p className="card-title">Service Price: ₹ {val.price}</p>
                                <p className="card-title">Additional Charge: ₹ {val.addcharge}</p>
                                <p className="card-title">Total Charge: ₹ {val.price + val.addcharge}</p>
                                <p className="card-title">Decripation : {val.decs}</p>
                                <p className="card-title">Addcational Charge Decripation : {val.addDecs}</p>
                                <p className="card-title">Posted Date: {formatDate(val.createdAt)}</p>
                                <button onClick={(e) => { handleupdate(e,val._id)}} className='btn btn-success'>Update</button>
                                <button onClick={(e) => { handledelete(e,val._id)}} className='btn btn-danger ms-2'>Delete</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                {
                    number.map((number,index)=>(
                        <button onClick={(e)=>{handlePage(e,number)}} className={`btn btn-outline-dark ms-2 mt-2 ${currentPage === number ? "active" :''}`}>{number}</button>
                    ))
                }
            </div>
            <Footer/>
        </section>
    );
}

export default AdminDashbord;