import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Utilisation de useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            console.log("Sending POST request...");
            const response = await fetch('http://localhost:8096/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            console.log("POST request sent");

            if (response.ok) {
                console.log('Login successful');
                setMessage('Connexion réussie !');
                navigate('/dashboard'); // Utilisation de navigate pour naviguer vers le tableau de bord
            } else {
                console.error('Error logging in:', await response.json());
                setMessage('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Une erreur s\'est produite lors de la connexion.');
        }
    };

    return (
        <div style={styles.loginContainer}>
            <h2 style={styles.loginTitle}>Connexion</h2>
            <form onSubmit={handleSubmit} style={styles.loginForm}>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.formLabel}>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.formInput}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.formLabel}>Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.formInput}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.loginButton}
                >
                    Se connecter
                </button>
                {message && <p style={message === 'Connexion réussie !' ? styles.successMessage : styles.errorMessage}>{message}</p>}
            </form>
        </div>
    );
};

const styles = {
    loginContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginTop:'100px'
    },
    loginTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formGroup: {
        width: '100%',
        marginBottom: '20px',
    },
    formLabel: {
        marginBottom: '5px',
        color: '#555',
        fontSize: '16px',
    },
    formInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    loginButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '16px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '16px',
    },
};

export default Login;
