import { useState } from 'react';
import { useRouter } from 'next/router';
import apiConfig from '@/config/apiConfig';

interface LoginFormProps {
  onAuthenticated: () => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiConfig.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        router.push('/');
        console.log('Response:', data);
        setError('');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Credenciales incorrectas!!');
    }
  };

  return (
    <div className='container mt-5 col-6 shadow-lg p-3'>
    <form onSubmit={handleLogin}>
      <h1 className='bg-success text-white text-center'>Inicio de sesion</h1>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 form-check">
      {error && <div>{error}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  );
}