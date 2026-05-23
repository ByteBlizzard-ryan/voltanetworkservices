import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ fontSize: '60px', color: '#28a745' }}>✅</div>
            <h1 style={{ color: '#2c3e50' }}>Commande Confirmée !</h1>
            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>
                Merci pour votre confiance. <br />
                Votre commande a été enregistrée avec succès chez <strong>Volta Network Services</strong>.
            </p>
            <div style={{ marginTop: '30px' }}>
                <p>Un mail de confirmation vous a été envoyé.</p>
                <button 
                    onClick={() => navigate('/boutique')}
                    style={{
                        padding: '12px 25px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Retourner à la boutique
                </button>
            </div>
        </div>
    );
};

export default Success;