// views/AuthView.js
class AuthView {
    constructor() {
        this.container = document.getElementById('app');
    }

    renderLogin() {
        this.container.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Entrar no Mini Twitter</h2>
                    <form id="loginForm" class="auth-form">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                    <div class="auth-switch">
                        <p>Não tem uma conta? <a href="#register">Registre-se</a></p>
                    </div>
                    <div id="message" class="message"></div>
                </div>
            </div>
        `;

        this.setupLoginForm();
    }

    renderRegister() {
        this.container.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Criar Conta no Mini Twitter</h2>
                    <form id="registerForm" class="auth-form">
                        <div class="form-group">
                            <label for="username">Nome de usuário:</label>
                            <input type="text" id="username" name="username" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Registrar</button>
                    </form>
                    <div class="auth-switch">
                        <p>Já tem uma conta? <a href="#login">Faça login</a></p>
                    </div>
                    <div id="message" class="message"></div>
                </div>
            </div>
        `;

        this.setupRegisterForm();
    }

    setupLoginForm() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            window.authController.login(credentials);
        });
    }

    setupRegisterForm() {
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const userData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            window.authController.register(userData);
        });
    }

    showLoading() {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = '<div class="loading">Carregando...</div>';
            messageDiv.className = 'message loading';
        }
    }

    hideLoading() {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = '';
            messageDiv.className = 'message';
        }
    }

    showSuccess(message) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = message;
            messageDiv.className = 'message success';
        }
    }

    showError(message) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = message;
            messageDiv.className = 'message error';
        }
    }
}

