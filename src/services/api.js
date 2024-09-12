export const getUserActivity = async (userId) => {
        try {
        const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error('Error getting user activity data');
        }
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error getting user activity data:', error);
        throw error;
        }
};

export const getUserAverageSessions = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error('Error getting user activity data');
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log('Error getting user average session', error);
        // throw error;
    }
}