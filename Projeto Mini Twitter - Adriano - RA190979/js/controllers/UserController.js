// controllers/UserController.js
class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.userView = new UserView();
    }

    async loadProfileData() {
        try {
            this.userView.showLoading();
            const profile = await this.userRepository.getProfile();
            
            this.userView.hideLoading();
            this.userView.renderProfileData(profile);
            
        } catch (error) {
            this.userView.hideLoading();
            this.userView.showError(error.message);
        }
    }

    async updateProfile(userData) {        try {
            this.userView.showLoading();
            const response = await this.userRepository.updateProfile(userData);
            
            // Atualizar dados do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            
            this.userView.hideLoading();
            this.userView.showSuccess('Perfil atualizado com sucesso!');
            
            // Recarregar o perfil
            this.loadProfile();
            
        } catch (error) {
            this.userView.hideLoading();
            this.userView.showError(error.message);
        }
    }
}

