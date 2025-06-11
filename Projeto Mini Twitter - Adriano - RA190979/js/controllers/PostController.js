// controllers/PostController.js
class PostController {
    constructor() {
        this.postRepository = new PostRepository();
        this.postView = new PostView();
    }

    async createPost(content) {
        try {
            if (!content.trim()) {
                throw new Error('O conteúdo da postagem não pode estar vazio');
            }

            if (content.length > 280) {
                throw new Error('A postagem não pode ter mais de 280 caracteres');
            }

            this.postView.showLoading();
            const post = await this.postRepository.createPost(content);
            
            this.postView.hideLoading();
            this.postView.showSuccess('Postagem criada com sucesso!');
            
            // Recarregar o feed
            this.loadAllPosts();
            
        } catch (error) {
            this.postView.hideLoading();
            this.postView.showError(error.message);
        }
    }

    async loadAllPosts() {
        try {
            this.postView.showLoading();
            const posts = await this.postRepository.getAllPosts();
            
            this.postView.hideLoading();
            this.postView.renderPosts(posts);
            
        } catch (error) {
            this.postView.hideLoading();
            this.postView.showError(error.message);
        }
    }

    async loadMyPosts() {
        try {
            this.postView.showLoading();
            const posts = await this.postRepository.getMyPosts();
            
            this.postView.hideLoading();
            this.postView.renderPosts(posts);
            
        } catch (error) {
            this.postView.hideLoading();
            this.postView.showError(error.message);
        }
    }

    async deletePost(postId) {
        try {
            if (confirm('Tem certeza que deseja deletar esta postagem?')) {
                this.postView.showLoading();
                await this.postRepository.deletePost(postId);
                
                this.postView.hideLoading();
                this.postView.showSuccess('Postagem deletada com sucesso!');
                
                // Recarregar o feed
                this.loadAllPosts();
            }
        } catch (error) {
            this.postView.hideLoading();
            this.postView.showError(error.message);
        }
    }
}

