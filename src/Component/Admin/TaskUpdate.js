import { useEffect, useState } from "react";
import Header from "../Header";
import './Admin.scss'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function TaskUpdate() {

    const [addcharge,setAddCharge]=useState(0)
    const [service,setService]=useState('')

    const backend_url = process.env.REACT_APP_BACKEND_URL
    const navigate=useNavigate()
    const {id}=useParams()

    useEffect(()=>{
        const token=localStorage.getItem('token')
            axios.get(`${backend_url}/Task/singletask/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((result)=>{
                if(result.data.status===200){
                    setService(result.data.onedata.service)
                    setAddCharge(result.data.onedata.addcharge)
                }
            }).catch((error)=>{
                toast.error(error.response.data.message)
            })
    },[backend_url])


    const handleform=async (e)=>{
        e.preventDefault()
        const token=localStorage.getItem('token')
        await axios.post(`${backend_url}/Task/updatetask/${id}`,{
            service,addcharge
        },{headers: {
            'Authorization': `Bearer ${token}`
        }}).then((result)=>{
            if(result.data.status==201){
                toast.success("Task Successfully Updated")
                navigate('/admin/dashbord')
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    return ( 
        <section id='taskupdate'>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1>Update Task</h1>
                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Service</label>
                            <input type="text" className="form-control"
                            value={service}
                            onChange={(e)=>{setService(e.target.value)}}
                            />
                            <label>Additional Charge</label>
                            <input type="number" className="form-control"
                            value={addcharge}
                            onChange={(e)=>{setAddCharge(e.target.value)}}
                            />
                            <button type="submit" className="btn btn-outline-success mt-2">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
     );
}

export default TaskUpdate;