import { useState } from "react";
import './Login.scss'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const backend_url=process.env.REACT_APP_BACKEND_URL


    const handleform= async (e)=>{
        e.preventDefault()
       await axios.post(`${backend_url}/auth/login`,{
            email,password
        }).then((result)=>{
            if(result.data.status===200){
                localStorage.setItem('loginName',result.data.email)
                localStorage.setItem('token',result.data.token)
                if(result.data.role==="Admin"){
                    navigate('/admin/dashbord')
                }else{
                    navigate('/dashbord')
                }
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
         })

    }


    return ( 
        <section id='login'>
            <div className='container'>
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4" id="form">
                    <h1>LOGIN</h1>
                    <form onSubmit={(e)=>{handleform(e)}}>
                        <input type="email" className="form-control" placeholder="EMAIL & USERNAME" autoFocus
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <input type="password" className="form-control" placeholder="PASSWORD" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <hr/>
                        <button type="submit" className="btn btn-outline-success mt-2 form-control" disabled={! email || password.length <4}>LOGIN</button>
                    </form>
                </div>
                </div>
                <div className="col-md-4"></div>
                </div>
        </section>
     );
}

export default Login;