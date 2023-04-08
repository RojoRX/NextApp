import { useState } from 'react';

interface LoginFormProps {
  onAuthenticated: () => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      console.log('Response:', data);
      console.log('Token:', data.access_token);
      console.log('Data sent:', { username, password });
      props.onAuthenticated();
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Log in</button>
    </form>
  );
}
