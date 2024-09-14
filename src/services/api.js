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
        throw error;
    }
}

export const getUserPerformance = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error('Error getting user performance data');
        }
        const data = response.json();
        console.log(data);
        return data;
    }
    catch(err) {
        console.log('Error getting data user performance', err)
    }
}

export const getUserScore = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
            throw new Error('Error getting user score data');
        }
        const data = response.json();
        return data;
    }
    catch(err) {
        console.log('Error getting user score data', err);
    }
}