import {defineStore, acceptHMRUpdate} from 'pinia';
import {watch} from "vue";
import router from "../Routes/index.js";
const ajax_url = '/api';

export const useBlogStore = defineStore({
    id: 'blogs',
    state: () => ({
        list : [],
        is_list_loaded : false,
        item : {},
        errors : {},
    }),
    getters: {},
    actions: {
        //------------------------
        async fetchBlogs()
        {
            try {
                const response = await axios.get(ajax_url + '/blogs');
                this.list = response.data;
                this.is_list_loaded = true;
            }
            catch (error) {
                this.is_list_loaded = false;
            }
        },
        //------------------------
        async createBlog()
        {
            try {
                const response = await axios.post(ajax_url + '/blogs', this.item);
                this.list = response.data;
                router.push({name : 'home'});
            }
            catch (error) {
                this.errors = error.response.data.errors;
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
    }
})

// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
}
