import React, { useState } from 'react';

const AjoutFormulaire = () => {
    const [formData, setFormData] = useState({
        UserName: '',
        PassWord: '',
        mobile: '',
        ville: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8096/User/Enregistrerfournisseur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage('Votre fournisseur a été enregistré avec succès.');
                setFormData({ // Vider les champs après l'ajout réussi
                    UserName: '',
                    PassWord: '',
                    mobile: '',
                    ville: '',
                });
            } else {
                setMessage('Échec de l\'ajout du fournisseur.');
                console.error('Erreur lors de l\'envoi des données:', response.statusText);
            }
        } catch (error) {
            setMessage('Échec de l\'ajout du fournisseur.');
            console.error('Erreur lors de l\'envoi des données:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Ajouter Mon Fournisseur</h2>
            <p style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="UserName" style={styles.label}>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        id="UserName"
                        name="UserName"
                        value={formData.UserName}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="PassWord" style={styles.label}>Mot de passe:</label>
                    <input
                        type="password"
                        id="PassWord"
                        name="PassWord"
                        value={formData.PassWord}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="mobile" style={styles.label}>Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="ville" style={styles.label}>Ville:</label>
                    <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        marginBottom: '5px',
        color: '#555',
        fontSize: '16px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    submitBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default AjoutFormulaire;
