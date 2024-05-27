import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaUserPlus, FaUserCog, FaRegComment} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AjoutFormulaire from './AjoutFormulaire';
import GestionFournisseurs from './GestionFournisseurs';
import AvisClient from'./AvisClient'
const Dashboard = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('overview');

    const toggleAjoutFormulaire = () => {
        setActiveComponent(activeComponent === 'ajout' ? 'overview' : 'ajout');
    };
    const toggleAvisClient = () => {
        setActiveComponent(activeComponent === 'avis' ? 'overview' : 'avis');
    };
    const toggleGestionFournisseur = () => {
        setActiveComponent(activeComponent === 'gestion' ? 'overview' : 'gestion');
    };

    useEffect(() => {
        const fetchFournisseurs = async () => {
            try {
                const response = await fetch('http://localhost:8096/User/Getdetailfournisseur');
                const data = await response.json();
                setFournisseurs(data);
                console.log(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des fournisseurs:', error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8096/User/GetClient');
                const data = await response.json();
                setClients(data);
                console.log(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFournisseurs();
        fetchClients();
    }, []);

    const renderContent = () => {
        switch (activeComponent) {
            case 'ajout':
                return <AjoutFormulaire />;
            case 'gestion':
                return <GestionFournisseurs />;
            case'avis':
                return <AvisClient /> ;
            default:
                return (
                    <>
                        <div style={styles.tableContainer}>
                            <h2 style={styles.tableTitle}>Vue d'ensemble des Fournisseurs</h2>
                            <table style={styles.table}>
                                <thead style={styles.tableHead}>
                                <tr>
                                    <th style={styles.tableCell}>UserName</th>
                                    <th style={styles.tableCell}>Ville</th>
                                    <th style={styles.tableCell}>Mobile</th>
                                    <th style={styles.tableCell}>Nombre service</th>
                                    <th style={styles.tableCell}>Commandes en attente</th>
                                    <th style={styles.tableCell}>Commandes Realisées</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fournisseurs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={styles.noData}>Aucune donnée disponible</td>
                                    </tr>
                                ) : (
                                    fournisseurs.map(fournisseur => (
                                        <tr key={fournisseur.userId} style={styles.tableRow}>
                                            <td style={styles.tableCell}>{fournisseur.userName}</td>
                                            <td style={styles.tableCell}>{fournisseur.ville}</td>
                                            <td style={styles.tableCell}>{fournisseur.mobile}</td>
                                            <td style={styles.tableCell}>{fournisseur.nombreservice}</td>
                                            <td style={styles.tableCell}>{fournisseur.demandenattente}</td>
                                            <td style={styles.tableCell}>{fournisseur.demandetermine}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div style={styles.tableContainer}>
                            <h2 style={styles.tableTitle}>Vue d'ensemble des Clients</h2>
                            <table style={styles.table}>
                                <thead style={styles.tableHead}>
                                <tr>
                                    <th style={styles.tableCell}>UserName</th>
                                    <th style={styles.tableCell}>Ville</th>
                                    <th style={styles.tableCell}>Mobile</th>
                                    <th style={styles.tableCell}>Adresse</th>
                                    <th style={styles.tableCell}>Email</th>
                                    <th style={styles.tableCell}>Nombre de commandes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {clients.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={styles.noData}>Aucun client disponible</td>
                                    </tr>
                                ) : (
                                    clients.map(client => (
                                        <tr key={client.userId} style={styles.tableRow}>
                                            <td style={styles.tableCell}>{client.userName}</td>
                                            <td style={styles.tableCell}>{client.ville}</td>
                                            <td style={styles.tableCell}>{client.mobile}</td>
                                            <td style={styles.tableCell}>{client.adress}</td>
                                            <td style={styles.tableCell}>{client.email}</td>
                                            <td style={styles.tableCell}>{client.totalDemandes}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </>
                );
        }
    };

    return (
        <div>
            <header style={styles.header}>
                <div style={styles.navContainer}>
                    <div style={styles.logo}>Dashboard</div>
                    <nav style={styles.nav}>
                        <ul style={styles.navList}>

                            <li style={styles.navItem}>
                                <a href="#avis" style={styles.navLink} onClick={toggleAvisClient}>
                                    <FaRegComment/> Avis Client
                                </a>
                            </li>
                            <li style={styles.navItem}>
                                <a href="#ajouter" style={styles.navLink} onClick={toggleAjoutFormulaire}>
                                    <FaUserPlus/> Ajouter Fournisseur
                                </a>
                            </li>
                            <li style={styles.navItem}>
                                <a href="#gerer" style={styles.navLink} onClick={toggleGestionFournisseur}>
                                    <FaUserCog/> Gérer Fournisseur
                                </a>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/login" style={styles.navLink}>
                                    <button style={styles.navButton}>
                                        <FaSignOutAlt style={styles.icon}/> Logout
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main style={styles.mainContent}>
                {renderContent()}
            </main>
        </div>
    );
};

const styles = {
    header: {
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 0',
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    nav: {
        display: 'flex',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
    navButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '5px',
    },
    mainContent: {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px',
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '12px',
        textAlign: 'left',
    },
    noData: {
        textAlign: 'center',
        padding: '20px',
        color: '#777',
    },
};

export default Dashboard;
