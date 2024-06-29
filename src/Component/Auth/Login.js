import { useState } from "react";
import './Login.scss'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';
import logo from '../Auth/company_logo.jpg'
import { Box, Container, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const LoginCard = styled(Card)({
    marginTop: '5rem',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
});

const Logo = styled('img')({
    width: '150px',
    display: 'block',
    margin: '0 auto 1rem',
});

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const handleform = async (e) => {
        e.preventDefault();
        await axios.post(`${backend_url}/auth/login`, { email, password })
            .then((result) => {
                if (result.data.status === 200) {
                    localStorage.setItem('loginName', result.data.email);
                    localStorage.setItem('token', result.data.token);
                    if (result.data.role === "Admin") {
                        navigate('/admin/dashbord');
                    } else {
                        navigate('/dashbord');
                    }
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    return (
        <Box id='login' display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f4f8">
            <Container maxWidth="sm">
                <LoginCard>
                    <CardContent>
                        <Logo src={logo} alt="Logo" />
                        <Typography variant="h5" align="center" gutterBottom>
                            Welcome to Bhoomiplus  Login
                        </Typography>
                        <form onSubmit={handleform}>
                            <TextField
                                type="email"
                                label="Email & Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={!email || password.length < 4}
                                >
                                    LOGIN
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </LoginCard>
            </Container>
        </Box>
    );
}

export default Login;
