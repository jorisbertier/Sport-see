import React from "react";

export default function ErrorPage() {
    return (
        <div className="error-section">
            <h1>❌ Utilisateur introuvable</h1>
            <p>Erreur veuillez réessayer ultérieurement</p>
            {/* <Link to="/user/12">Retour à un profil existant</Link> */}
        </div>
    );
};
