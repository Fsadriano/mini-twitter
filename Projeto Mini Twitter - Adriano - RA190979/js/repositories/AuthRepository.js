// repositories/AuthRepository.js
class AuthRepository {
    constructor() {
        this.baseUrl = 'https://mini-twitter-api-vy9q.onrender.com/api';
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao registrar usuário');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async login(credentials) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}

