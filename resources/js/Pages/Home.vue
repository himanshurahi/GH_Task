<template>
    <div class="row justify-content-center">
        <div class="col-md-8" v-if="blogsStore.list.data">
            <div>
                <router-link to="/create" class="btn btn-primary">Create Blog</router-link>
            </div>
            <Blog :blogs="blogsStore.list.data.data" />
        </div>
    </div>
</template>

<script setup>
import Blog from "../components/Blog.vue";
import {useBlogStore} from "../Store/blogs-store.js";
import {onMounted} from "vue";
const blogsStore = useBlogStore();

onMounted(async () => {
    await blogsStore.fetchBlogs();
});


</script>
