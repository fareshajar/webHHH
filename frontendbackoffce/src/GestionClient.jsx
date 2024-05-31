import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importer les icônes pour les boutons

const GestionClients = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8096/User/GetClientGestion');
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    const Delete = async (id) => {
        try {
            await fetch(`http://localhost:8096/User/SupprimerClient/${id}`, {
                method: 'DELETE',
            });
            setClients(clients.filter(client => client.userId !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
        }
    };

    const openEditModal = (client) => {
        setSelectedClient(client);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setSelectedClient(null);
    };

    const Edit = async () => {
        try {
            const response = await fetch(`http://localhost:8096/User/ModifierClient/${selectedClient.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedClient),
            });
            if (response.ok) {
                const updatedClients = clients.map(client => {
                    if (client.userId === selectedClient.userId) {
                        return selectedClient;
                    }
                    return client;
                });
                setClients(updatedClients);
                closeEditModal();
            } else {
                console.error('Erreur lors de la mise à jour du client:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du client:', error);
        }
    };

    const InputChange = (e) => {
        const { name, value } = e.target;
        setSelectedClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (isLoading) {
        return <div>Chargement des clients...</div>;
    }

    return (
        <div style={styles.tableContainer}>
            <h2 style={styles.tableTitle}>Gestion des Clients</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Mobile</th>
                        <th>Ville</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(client => (
                        <tr key={client.userId}>
                            <td style={styles.td}>{client.userName}</td>
                            <td style={styles.td}>{client.mobile}</td>
                            <td style={styles.td}>{client.ville}</td>
                            <td style={styles.td}>{client.email}</td>
                            <td style={styles.td}>{client.adress}</td>
                            <td>
                                <button onClick={() => openEditModal(client)} style={styles.actionBtn}><FaEdit/></button>
                                <button onClick={() => Delete(client.userId)} style={styles.actionBtn}><FaTrash/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isEditing && (
                <div style={styles.modalBackground}>
                    <div style={styles.modalContainer}>
                        <h2>Modifier Client</h2>
                        <label>Nom d'utilisateur</label>
                        <input type="text" name="userName" value={selectedClient.userName} onChange={InputChange}/>
                        <label>Mobile</label>
                        <input type="text" name="mobile" value={selectedClient.mobile} onChange={InputChange}/>
                        <label>Ville</label>
                        <input type="text" name="ville" value={selectedClient.ville} onChange={InputChange}/>
                        <label>Email</label>
                        <input type="text" name="email" value={selectedClient.email} onChange={InputChange}/>
                        <label>Adresse</label>
                        <input type="text" name="adress" value={selectedClient.adress} onChange={InputChange}/>
                        <button onClick={Edit}>Enregistrer</button>
                        <button onClick={closeEditModal}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
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

export default GestionClients;
