export default {
    name: 'Login',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 20rem;" :class="{ 'loading': loading }">
            <div class="card-header">Login</div>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div v-if="error" class="alert alert-danger">
                        {{ error }}
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label visually-hidden">Username</label>
                        <input type="text" id="username" class="form-control" v-model="username" placeholder="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label visually-hidden">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password" placeholder="password" required>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Login</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: false,
            username: '',
            password: '',
            error: ''
        }

    },
    methods: {
        login() {
            const { username, password } = this;
            this.loading = true;
            this.$store.dispatch('login', { username, password }).then(() => {
                let location = localStorage.getItem('last_location') || { name: 'posts' };
                this.$router.push(location);
                this.loading = false;
                localStorage.removeItem('last_location');
            }).catch(response => {
                this.error = response.data.message;
                this.loading = false;
            });
        }
    }
};
