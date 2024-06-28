import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'


function UserHeader() {

    const username = localStorage.getItem('loginName')

    const navigate = useNavigate()

    function handlelogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('loginName')
        navigate('/')
    }


    return (
        <section id='userheader'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/dashbord">{username}</Link>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="bi bi-list fs-5"></i>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <Link class="nav-link active" aria-current="page" to="/dashbord">Service</Link>
                                        </li>
                                    </ul>
                                <i className="bi bi-box-arrow-right" onClick={handlelogout}></i>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserHeader;










