import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import Header from "../Header";

function Empolyeeupdate() {

    const [name,setName]=useState('')
    const [dob,setDob]=useState('')
    // const [gender,setGender]=useState('')
    const [mobile,setMobile]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {id}=useParams()
    const navigate=useNavigate()
    const backend_url = process.env.REACT_APP_BACKEND_URL

    useEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(`${backend_url}/auth/singleuser/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            if(result.data.status===201){
                setName(result.data.singleuser.name)
                setEmail(result.data.singleuser.email)
                setDob(result.data.singleuser.dob)
                setPassword(result.data.singleuser.password)
                setMobile(result.data.singleuser.mobile)
            }
        })
    },[backend_url,id])

    const handleform=async (e)=>{
        e.preventDefault()

        const token=localStorage.getItem('token')
        await axios.put(`${backend_url}/auth/updateuser/${id}`,{
            name,email,password,mobile,dob
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            if(result.data.status===201){
                toast.success("Profile Successfully Updated")
                navigate('/admin/employee')                
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    return (
        <section id='empolyeeupdate'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className="col-md-3"></div>
                    <div className='col-md-6'>
                        <h1>UPDATE EMPOLYEE</h1>
                    <form onSubmit={(e)=>{handleform(e)}}>
                        <input type="text" className="form-control" placeholder="FULL NAME" autoFocus
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                        <input type="email" className="form-control" placeholder="EMAIL & USERNAME" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <input type="password" className="form-control" placeholder="PASSWORD"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <input type="date" className="form-control text-uppercase" placeholder="DATE OF BIRTH"
                        value={dob}
                        onChange={(e)=>{setDob(e.target.value)}}
                        />
                        <input type="number" className="form-control" placeholder="MOBILE NUMBER"
                        value={mobile}
                        onChange={(e)=>{setMobile(e.target.value)}}
                        />
                        <hr/>
                        <button type="submit" className="btn btn-outline-success mt-2 form-control" disabled={! email || password.length < 4}>UPDATE ACCOUNT</button>
                    </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
    );
}

export default Empolyeeupdate;