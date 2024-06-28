import { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



function ViewEmpolyee() {

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [decs, setDecs] = useState('')
    const [price, setprice] = useState('')
    const [addcharge, setAddCharge] = useState(0)
    const [service, setService] = useState('')
    const [email, setEmail] = useState('')
    const [addDecs, setAddDecs] = useState('')
    const [allservice, setAllService] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()
    const backend_url = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${backend_url}/auth/singleuser/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            if (result.data.status === 201) {
                setName(result.data.singleuser.name)
                setMobile(result.data.singleuser.mobile)
                setEmail(result.data.singleuser.email)
            }
        })
    }, [backend_url, id])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${backend_url}/admin/service`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            if (result.data.status === 200) {
                setAllService(result.data.alldata)
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }, [backend_url])

    const handleform = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        await axios.post(`${backend_url}/Task/empolyeetask/${email}`, {
            name, service, addcharge, mobile,price,decs,addDecs
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            if (result.data.status === 200) {
                toast.success("Task Successfully Submited")
                navigate('/admin/dashbord')
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    const handlechange = (e) => {
        const serviceid = (e.target.value)
        const oneService = allservice.find((val) =>
            val._id === serviceid
        )
        setService(oneService.servicename)
        setprice(oneService.serviceprice)
    }

    return (
        <section id='viewempolyee'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <h1>TASK MANAGEMENT</h1>
                        <form onSubmit={(e) => { handleform(e) }}>
                            <label>Name</label>
                            <input type='text' className='form-control'
                                value={name}
                                onChange={(e) => { setName(name) }}
                            />
                            <label>Mobile No.</label>
                            <input type='number' className='form-control'
                                value={mobile}
                                onChange={(e) => { setMobile(mobile) }}
                            />
                            <label>Decripation</label>
                            <textarea className='form-control'
                            value={decs}
                            onChange={(e)=>{setDecs(e.target.value)}}
                            ></textarea>
                            <button type="button" class="btn btn-outline-primary d-flex mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Add Service
                            </button>
                            {
                                service && (
                                    <table className='table table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{service}</td>
                                                <td>{price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            }
                            <label>Additional Service Charge</label>
                            <input type='number' className='form-control'
                                value={addcharge}
                                onChange={(e) => { setAddCharge(e.target.value) }}
                            />
                            <label>Additional Charge Decripation</label>
                            <textarea className='form-control'
                            value={addDecs}
                            onChange={(e)=>{setAddDecs(e.target.value)}}
                            ></textarea>
                            <button className='btn btn-outline-success mt-2' type='submit'>Add Task</button>
                        </form>
                    </div>


                            {/* add service form */}

                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <label>Service</label>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <select className='form-select' value={service} onChange={(e) => { handlechange(e) }} >
                                        <option value=''>Select</option>
                                        {allservice.map((value) => (
                                            <option value={value._id} key={value._id}>{value.servicename}</option>
                                        ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        </section>
    );
}

export default ViewEmpolyee;