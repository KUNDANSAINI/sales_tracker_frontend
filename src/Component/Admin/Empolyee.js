import Header from '../Header';
// import './Empolyee.scss'; // Assuming you have a SCSS file for Empolyee styling
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Empolyee() {
    const [allempolyee, setAllEmpolyee] = useState([]);
    const [searchname, setSearchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPages = 12;
    const lastPage = currentPage * recordPerPages;
    const firstPage = lastPage - recordPerPages;

    const filterempdata = allempolyee.filter(empolyee =>
        empolyee.name.toLowerCase().includes(searchname.toLowerCase())
    );

    const records = filterempdata.slice(firstPage, lastPage);
    const totalPages = Math.ceil(filterempdata.length / recordPerPages);
    const numbers = [...Array(totalPages + 1).keys()].slice(1);

    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${backend_url}/auth/empolyee`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            if (result.data.status === 200) {
                setAllEmpolyee(result.data.allempolyee);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, [backend_url]);

    const handleView = (e, id) => {
        navigate(`/admin/viewempolyee/${id}`);
    };

    const handleUpdate = async (e, id) => {
        navigate(`/admin/employeeupdate/${id}`);
    };

    const handleDelete = async (e, id) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios.delete(`${backend_url}/auth/userdelete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (result.data.status === 200) {
                toast.success("Successfully Deleted");
                const filterdelete = allempolyee.filter((value) => value._id !== id);
                setAllEmpolyee(filterdelete);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handlePage = (e, page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        setCurrentPage(1);
    };

    return (
        <section id='empolyee'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <h1>TOTAL EMPLOYEE</h1>
                    <div id='search'>
                        <input type='text' placeholder='SEARCH NAME' onChange={handleSearch} />
                    </div>
                    {records.map((value) => (
                        <div className='col-md-3 mb-3' key={value._id}>
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Name: {value.name}</p>
                                    <p className="card-title">Email: {value.email}</p>
                                    <p className="card-title">Password: ###</p>
                                    <p className="card-title">Mobile Number: {value.mobile}</p>
                                    <p className="card-title">Total Earn: {value.totalearn}</p>
                                    <button onClick={(e) => handleView(e, value._id)} className='btn btn-primary me-2'>Task</button>
                                    <button onClick={(e) => handleUpdate(e, value._id)} className='btn btn-success me-2'>Update</button>
                                    <button onClick={(e) => handleDelete(e, value._id)} className='btn btn-danger me-2'>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id='pagination'>
                    {numbers.map((number, index) => (
                        <button key={index} onClick={(e) => handlePage(e, number)} className={`btn btn-outline-primary me-2 ${currentPage === number ? "active" : ''}`}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Empolyee;
