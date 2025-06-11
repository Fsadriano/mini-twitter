// main.js - Aplicação principal do Mini Twitter
class App {
    constructor() {
        this.authController = new AuthController();
        this.postController = new PostController();
        this.userController = new UserController();
        
        // Tornar controladores globais para acesso nas views
        window.authController = this.authController;
        window.postController = this.postController;
        window.userController = this.userController;
        
        this.init();
    }

    init() {
        // Configurar roteamento
        this.setupRouting();
        
        // Carregar rota inicial
        this.handleRoute();
    }

    setupRouting() {
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
    }

    handleRoute() {
        const hash = window.location.hash || '#login';
        
        // Verificar autenticação para rotas protegidas
        if (hash !== '#login' && hash !== '#register' && !this.authController.isAuthenticated()) {
            window.location.hash = '#login';
            return;
        }
        
        // Redirecionar usuários autenticados para o feed se tentarem acessar login/register
        if ((hash === '#login' || hash === '#register') && this.authController.isAuthenticated()) {
            window.location.hash = '#feed';
            return;
        }

        switch (hash) {
            case '#login':
                this.authController.authView.renderLogin();
                break;
            case '#register':
                this.authController.authView.renderRegister();
                break;
            case '#feed':
                this.postController.postView.renderFeed();
                this.postController.loadAllPosts();
                break;
            case '#profile':
                this.userController.userView.renderProfilePageStructure();
                this.userController.loadProfileData();
                setTimeout(() => {
                    this.postController.loadMyPosts();
                }, 100);
                break;
            default:
                window.location.hash = '#login';
        }
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

