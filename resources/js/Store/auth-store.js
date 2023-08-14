import {defineStore, acceptHMRUpdate} from 'pinia';
import {watch} from "vue";
import router from "../Routes/index.js";
const ajax_url = '/api';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        form: {
            email: '',
            password: '',
            errors: {},
            loading: false
        },
        user: null,
    }),
    getters: {},
    actions: {
        //------------------------
        async login()
        {
            this.form.errors = {};
            this.form.loading = true;
            try {
                const response = await axios.post(ajax_url + '/login', this.form);
                localStorage.setItem('token', response.data.token);
                this.user = response.data.user;
                router.push({name: 'home'});
            }
            catch (error) {
                this.form.errors = error.response?.data.errors;
            }
            finally {
                this.form.loading = false;
            }
        },
        //------------------------
        async getUser()
        {
            try {
                const response = await axios.get(ajax_url + '/user');
                this.user = response.data;
            }
            catch (error) {
                localStorage.removeItem('token');
                this.user = null;
            }
        },
        //------------------------
        normalizeErrors(obj)
        {
            let errorString = '';
            if (typeof obj === 'object') {
                obj.forEach(function (item, index) {
                    if (index !== obj.length - 1) {
                        errorString += item + ', ';
                    }
                    else {
                        errorString += item;
                    }
                });
            }
            return errorString;
        },
        //------------------------
        async register()
        {
            this.form.errors = {};
            this.form.loading = true;
            try {
                const response = await axios.post(ajax_url + '/register', this.form);
                localStorage.setItem('token', response.data.token);
                this.user = response.data.user;
                router.push({name: 'home'});
            }
            catch (error) {
                this.form.errors = error.response?.data.errors;
            }
            finally {
                this.form.loading = false;
            }
        },
        //------------------------
        async logout()
        {
            try {
                await axios.post(ajax_url + '/logout');
                localStorage.removeItem('token');
                this.user = null;
                router.push({name: 'login'});
            }
            catch (error) {
                console.log(error);
            }
        }
    }
})

// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
