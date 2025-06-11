// views/UserView.js
class UserView {
    constructor() {
        this.container = document.getElementById('app');
    }

    renderProfilePageStructure() {
        this.container.innerHTML = `
            <div class="main-container">
                <header class="header">
                    <h1>Mini Twitter</h1>
                    <nav class="nav">
                        <a href="#feed" class="nav-link">Feed</a>
                        <a href="#profile" class="nav-link active">Perfil</a>
                        <button id="logoutBtn" class="btn btn-secondary">Sair</button>
                    </nav>
                </header>
                
                <main class="main-content">
                    <div class="profile-section">
                        <h3>Meu Perfil</h3>
                        <div id="profileContainer" class="profile-container">
                            <div class="loading">Carregando perfil...</div>
                        </div>
                    </div>
                    
                    <div class="posts-section">
                        <h3>Minhas Postagens</h3>
                        <div id="postsContainer" class="posts-container">
                            <div class="loading">Carregando postagens...</div>
                        </div>
                    </div>
                </main>
                
                <div id="message" class="message"></div>
            </div>
        `;

        this.setupNavigation();
    }

    renderProfileData(profile) {
        const container = document.getElementById('profileContainer');
        const joinDate = new Date(profile.createdAt).toLocaleDateString('pt-BR');
        
        container.innerHTML = `
            <div class="profile-info">
                <div class="profile-details">
                    <h4>@${profile.username}</h4>
                    <p><strong>Email:</strong> ${profile.email}</p>
                    <p><strong>Membro desde:</strong> ${joinDate}</p>
                </div>
                <button id="editProfileBtn" class="btn btn-secondary">Editar Perfil</button>
            </div>
            
            <div id="editProfileForm" class="edit-profile-form" style="display: none;">
                <h4>Editar Perfil</h4>
                <form id="profileForm">
                    <div class="form-group">
                        <label for="username">Nome de usuário:</label>
                        <input type="text" id="username" name="username" value="${profile.username}" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${profile.email}" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Salvar</button>
                        <button type="button" id="cancelEditBtn" class="btn btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        `;

        this.setupProfileEdit();
    }

    setupProfileEdit() {
        const editBtn = document.getElementById('editProfileBtn');
        const editForm = document.getElementById('editProfileForm');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const profileForm = document.getElementById('profileForm');

        editBtn.addEventListener('click', () => {
            editForm.style.display = 'block';
            editBtn.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            editForm.style.display = 'none';
            editBtn.style.display = 'block';
        });

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(profileForm);
            const userData = {
                username: formData.get('username'),
                email: formData.get('email')
            };
            window.userController.updateProfile(userData);
            editForm.style.display = 'none';
            editBtn.style.display = 'block';
        });
    }

    setupNavigation() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            window.authController.logout();
        });

        // Atualizar links ativos
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    renderPosts(posts) {
        const container = document.getElementById('postsContainer');
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="no-posts">Você ainda não fez nenhuma postagem.</div>';
            return;
        }

        const postsHtml = posts.map(post => {
            const postDate = new Date(post.createdAt).toLocaleString('pt-BR');
            
            return `
                <div class="post" data-post-id="${post._id}">
                    <div class="post-header">
                        <div class="post-author">
                            <strong>@${post.author.username}</strong>
                            <span class="post-date">${postDate}</span>
                        </div>
                        <button class="delete-btn" onclick="window.postController.deletePost('${post._id}')">×</button>
                    </div>
                    <div class="post-content">
                        ${post.content}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = postsHtml;
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
            setTimeout(() => this.hideLoading(), 3000);
        }
    }

    showError(message) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = message;
            messageDiv.className = 'message error';
            setTimeout(() => this.hideLoading(), 5000);
        }
    }
}

