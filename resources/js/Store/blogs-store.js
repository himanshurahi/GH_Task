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
        is_saving : false,
        is_item_loaded : false,
        comment : {
            content : '',
        },
        filter : {
            search : '',
            page : 1,
            author : '',
        },
        interval : null,
        assets : [],
    }),
    getters: {},
    actions: {
        //------------------------
        async getAssets()
        {
            try {
                const response = await axios.get(ajax_url + '/blogs/assets');
                console.log(response.data);
                this.assets = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        //------------------------
        async getList()
        {
            this.is_list_loaded = false;
            try {
                const response = await axios.get(ajax_url + '/blogs' + this.getFilterQuery());
                this.list = response.data.data;
                this.is_list_loaded = true;
            }
            catch (error) {
                this.is_list_loaded = false;
            }
        },
        //------------------------
        getFilterQuery()
        {
            let query = '?';
            let index = 0;
            Object.keys(this.filter).forEach((key) => {
                if(this.filter[key])
                {
                    if(index !== 0)
                    {
                        query += '&';
                    }
                    query += key + '=' + this.filter[key];
                    index++;
                }
            });
            router.push({ query: this.filter });
            return query;
        },
        //------------------------
        updateFilterFromQuery()
        {
            const query = router.currentRoute.value.query;
            if(query)
            {
                this.filter = Object.assign(this.filter, query);
            }
        },
        //------------------------
        async createItem()
        {
            this.is_saving = true;
            this.errors = {};
            try {
                const response = await axios.post(ajax_url + '/blogs', this.item);
                router.push({name : 'home'});
            }
            catch (error) {
                this.errors = error.response.data.errors;
            }
            finally {
                this.is_saving = false;
            }
        },
        //------------------------
        async updateItem()
        {
            this.is_saving = true;
            this.errors = {};
            try {
                const response = await axios.patch(ajax_url + '/blogs/' + this.item.slug, this.item);
                router.push({name : 'home'});
            }
            catch (error) {
                this.errors = error.response.data.errors;
            }
            finally {
                this.is_saving = false;
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
        async itemAction(id, action, data = [])
        {
            try {
                const response = await axios.post(ajax_url + '/blogs/' + id + '/action', {action : action, data : data});
                this.itemActionAfter(id, response)
            }
            catch (error) {
                this.errors = error.response.data.errors;
            }
        },
        //------------------------
        itemActionAfter(id, response)
        {
            if(this.item)
            {
                if(this.item.id === id)
                {
                    this.item = response.data.data;
                }
            }

            if(this.list && this.list.data)
            {
                this.list.data.map((item, index) => {
                    if (item.id === id) {
                        this.list.data[index] = response.data.data;
                    }
                });
            }
            this.errors = {};
        },
        //------------------------
        async getItem(slug)
        {
            this.is_item_loaded = false;
            try {
                const response = await axios.get(ajax_url + '/blogs/' + slug);
                this.item = response.data.data;
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.is_item_loaded = true;
            }
        },
        //------------------------
        async onFileChange(e)
        {
            const file = e.target.files[0];
            if(file) {
                const { data } = await this.uploadImage(file);
                this.item.image = data.data;
            }
        },
        //------------------------
        async deleteItem(id)
        {
            try {
                const response = await axios.delete(ajax_url + '/blogs/' + id);
                this.deleteItemAfter(id, response);
            }
            catch (error) {
                console.log(error);
            }
        },
        //------------------------
        async deleteItemAfter(id, response)
        {
            if(this.list && this.list.data)
            {
                this.list.data.map((item, index) => {
                    if (item.id === id) {
                        this.list.data.splice(index, 1);
                    }
                });
            }
        },
        //------------------------
        confirmDelete(id)
        {
            if(confirm('Are you sure you want to delete this item?'))
            {
                this.deleteItem(id);
            }
        },
        //------------------------
        async addComment()
        {
            await this.itemAction(this.item.id, 'add_comment', this.comment);
            this.comment.content = '';
        },
        //------------------------
        async deleteComment(comment_id)
        {
            await this.itemAction(this.item.id, 'delete_comment', {id : comment_id});
        },
        //------------------------
        resetFilter()
        {
            this.filter = {
                search : '',
                page : 1,
                author : '',
            }

            this.getList();
        },
        //------------------------
        toEdit(item)
        {
            router.push({name : 'edit', params : {slug : item.slug}});
        },
        //------------------------
        uploadImage(file)
        {
            const formData = new FormData();
            formData.append('image', file);
            return axios.post(ajax_url + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        //------------------------
        onSearchChange()
        {
            if(this.interval)
            {
                clearTimeout(this.interval);
            }
            this.interval = setTimeout(() => {
                this.getList();
            }, 700)
        }

    }
})

// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
}
