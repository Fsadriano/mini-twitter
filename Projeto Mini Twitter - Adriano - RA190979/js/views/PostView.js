// views/PostView.js
class PostView {
    constructor() {
        this.container = document.getElementById('app');
    }

    renderFeed() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        this.container.innerHTML = `
            <div class="main-container">
                <header class="header">
                    <h1>Mini Twitter</h1>
                    <nav class="nav">
                        <a href="#feed" class="nav-link active">Feed</a>
                        <a href="#profile" class="nav-link">Perfil</a>
                        <button id="logoutBtn" class="btn btn-secondary">Sair</button>
                    </nav>
                </header>
                
                <main class="main-content">
                    <div class="post-composer">
                        <h3>O que está acontecendo?</h3>
                        <form id="postForm">
                            <textarea 
                                id="postContent" 
                                placeholder="Compartilhe seus pensamentos..." 
                                maxlength="280"
                                rows="3"
                            ></textarea>
                            <div class="composer-footer">
                                <span id="charCount" class="char-count">0/280</span>
                                <button type="submit" class="btn btn-primary">Postar</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="posts-section">
                        <h3>Feed de Postagens</h3>
                        <div id="postsContainer" class="posts-container">
                            <div class="loading">Carregando postagens...</div>
                        </div>
                    </div>
                </main>
                
                <div id="message" class="message"></div>
            </div>
        `;

        this.setupPostForm();
        this.setupNavigation();
        this.setupCharCounter();
    }

    setupPostForm() {
        const form = document.getElementById('postForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const content = document.getElementById('postContent').value;
            window.postController.createPost(content);
            document.getElementById('postContent').value = '';
            this.updateCharCount();
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

    setupCharCounter() {
        const textarea = document.getElementById('postContent');
        const charCount = document.getElementById('charCount');
        
        textarea.addEventListener('input', () => {
            this.updateCharCount();
        });
    }

    updateCharCount() {
        const textarea = document.getElementById('postContent');
        const charCount = document.getElementById('charCount');
        const count = textarea.value.length;
        
        charCount.textContent = `${count}/280`;
        
        if (count > 280) {
            charCount.classList.add('over-limit');
        } else {
            charCount.classList.remove('over-limit');
        }
    }

    renderPosts(posts) {
        const container = document.getElementById('postsContainer');
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="no-posts">Nenhuma postagem encontrada.</div>';
            return;
        }

        const postsHtml = posts.map(post => {
            const isOwner = post.author._id === currentUser.id;
            const postDate = new Date(post.createdAt).toLocaleString('pt-BR');
            
            return `
                <div class="post" data-post-id="${post._id}">
                    <div class="post-header">
                        <div class="post-author">
                            <strong>@${post.author.username}</strong>
                            <span class="post-date">${postDate}</span>
                        </div>
                        ${isOwner ? `<button class="delete-btn" onclick="window.postController.deletePost('${post._id}')">×</button>` : ''}
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

