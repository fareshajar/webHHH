import React, { useState, useEffect } from 'react';


const GestionFournisseurs = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchFournisseurs = async () => {
            try {
                const response = await fetch('http://localhost:8096/User/GetAvis');
                const data = await response.json();
                setFournisseurs(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des fournisseurs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFournisseurs();
    }, []);

    if (isLoading) {
        return <div>Chargement des fournisseurs...</div>;
    }

    return (
        <div style={styles.tableContainer}>
            <h2 style={styles.tableTitle}>Consulter des Avis</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Mobile</th>
                        <th>Ville</th>
                        <th>Avis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fournisseurs.map(fournisseur => (
                        <tr key={fournisseur.userId}>
                            <td style={styles.td}>{fournisseur.userName}</td>
                            <td style={styles.td}>{fournisseur.mobile}</td>
                            <td style={styles.td}>{fournisseur.ville}</td>
                            <td style={styles.td}>{fournisseur.avis}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

const styles = {
    // Styles pour la fenêtre modale
    modalBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableContainer: {
        maxWidth: '1000px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        overflowX: 'auto',
    },
    tableTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
    td: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    actionBtn: {
        padding: '8px 12px',
        marginRight: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default GestionFournisseurs;
