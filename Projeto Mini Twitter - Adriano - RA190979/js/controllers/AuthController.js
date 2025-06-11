// controllers/AuthController.js
class AuthController {
    constructor() {
        this.authRepository = new AuthRepository();
        this.authView = new AuthView();
    }

    async register(userData) {
        try {
            this.authView.showLoading();
            const response = await this.authRepository.register(userData);
            
            // Salvar token e dados do usuário no localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            this.authView.hideLoading();
            this.authView.showSuccess('Usuário registrado com sucesso!');
            
            // Redirecionar para o feed
            setTimeout(() => {
                window.location.hash = '#feed';
            }, 1000);
            
        } catch (error) {
            this.authView.hideLoading();
            this.authView.showError(error.message);
        }
    }

    async login(credentials) {
        try {
            this.authView.showLoading();
            const response = await this.authRepository.login(credentials);
            
            // Salvar token e dados do usuário no localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            this.authView.hideLoading();
            this.authView.showSuccess('Login realizado com sucesso!');
            
            // Redirecionar para o feed
            setTimeout(() => {
                window.location.hash = '#feed';
            }, 1000);
            
        } catch (error) {
            this.authView.hideLoading();
            this.authView.showError(error.message);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.hash = '#login';
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

