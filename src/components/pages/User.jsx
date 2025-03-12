import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserActivity, getUserAverageSessions, getUserPerformance, getUserScore } from "../../services/api";

const UserPage = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const activity = await getUserActivity(id);
            const averageSessions = await getUserAverageSessions(id);
            const performance = await getUserPerformance(id);
            const score = await getUserScore(id);

            setUserData({ activity, averageSessions, performance, score });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
        <h1>Profil Utilisateur {id}</h1>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default UserPage;
