// repositories/PostRepository.js
class PostRepository {
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

    async createPost(content) {
        try {
            const response = await fetch(`${this.baseUrl}/posts`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ content })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar postagem');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts() {
        try {
            const response = await fetch(`${this.baseUrl}/posts`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao buscar postagens');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getMyPosts() {
        try {
            const response = await fetch(`${this.baseUrl}/posts/my-posts`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao buscar suas postagens');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao deletar postagem');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}

