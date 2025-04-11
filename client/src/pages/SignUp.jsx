import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [formData,setFormData] = useState({}) 
    // for track the changes..object and based on function and keep empty obj
    const handleChange =(e) => {
        setFormData({
            ...formData,
            [e.target.id]:e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh on form submit
    
        try {
            const res = await fetch('http://localhost:1015/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Correct header key
                },
                body: JSON.stringify(formData),
            });
    
            if (!res.ok) {
                // Optional: handle non-200 responses
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log(data); 
            alert(JSON.stringify(data));
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form: ' + err.message);
        }
    };
    
    console.log(formData);

  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        WELCOME TO OUR BOOKSTORE
      </h1>

      {/* Sign-Up Form */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '2rem',
          borderRadius: '8px',
          width: '300px',
          textAlign: 'center',
          
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Sign Up</h2>
        <form onSubmit = {handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#555')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#333')}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Already registered?{' '}
          <Link to="/sign-in" style={{ color: '#00f', textDecoration: 'underline' }}>
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
}