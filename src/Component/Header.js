import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from './Auth/company_logo.jpg';

function Header() {
    const email = localStorage.getItem('loginName');
    const username = email ? email.split('@')[0] : '';
    const navigate = useNavigate();

    function handlelogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('loginName');
        navigate('/');
    }

    return (
        <section id='header'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/admin/dashbord">
                                <Link to='/admin/dashbord'>
                                <img src={logo} alt="Company Logo" />
                                </Link>
                                    {username}
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="bi bi-list"></i>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/admin/dashbord">HOME</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/service">SERVICE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/employee">EMPLOYEE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/createaccount">ADD EMPLOYEE</Link>
                                        </li>
                                    </ul>
                                    <i onClick={handlelogout} className="bi bi-box-arrow-right"></i>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
