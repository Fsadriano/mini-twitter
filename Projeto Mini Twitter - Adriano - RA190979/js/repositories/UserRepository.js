// repositories/UserRepository.js
class UserRepository {
    constructor() {
        this.baseUrl = 'https://mini-twitter-api-vy9q.onrender.com/api';
    }

    getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getProfile() {
        try {
            const response = await fetch(`${this.baseUrl}/users/profile`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao buscar perfil');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/users/profile`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao atualizar perfil');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}

