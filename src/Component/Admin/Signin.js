import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import Header from "../Header";



function Signin() {

    const [name,setName]=useState('')
    const [dob,setDob]=useState('')
    // const [gender,setGender]=useState('')
    const [mobile,setMobile]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const navigate=useNavigate()

    const backend_url=process.env.REACT_APP_BACKEND_URL

    const handleform=async (e)=>{
        e.preventDefault()
        if(!mobile){
            toast.error("Mobile Number Is Required")
        }else{
            const token=localStorage.getItem('token')
       await  axios.post(`${backend_url}/auth/register`,{
            name,email,password,dob,mobile
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ).then((result)=>{
            if(result.data.status===200){
                toast.success("Account Is Successfully Created")
                navigate('/admin/employee')
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }
    }

    return ( 
        <section id='signin'>
        <Header/>
            <div className='container'>
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4" id="form">
                <p><i className="bi bi-person-add"></i></p>
                    <h1>EMPLOYEE</h1>
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
                        <button type="submit" className="btn btn-outline-success mt-2 form-control" disabled={!email || password.length < 4 || mobile.length <= 9 || mobile.length > 10}>CREATE ACCOUNT</button>
                    </form>
                </div>
                </div>
                <div className="col-md-4"></div>
                </div>
        </section>
     );
}

export default Signin;