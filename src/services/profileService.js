
const BASE_URL = 'http://localhost:9999/api';

export async function getCurrUser() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    return res.json();
}

export async function isLoggedIn() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        return false;
    }
    return true;
}

export async function getUser(id) {
    const res = await fetch(`${BASE_URL}/profile/${id}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    return res.json();
}