<template>
    <div class="row justify-content-center">
        <div class="col-md-12" v-if="blogsStore.is_list_loaded">
            <div class="d-flex flex-column w-10  align-items-center">
                <h1 class="text-center">GH Blog Task</h1>
                <router-link to="/create" class="btn btn-primary w-25">Create Blog</router-link>
                <div class="mt-3 text-center">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search" @keydown="blogsStore.onSearchChange" v-model="blogsStore.filter.search" />
                        <button class="btn btn-outline-secondary" type="button" @click="blogsStore.resetFilter">Reset</button>
                    </div>
                    <div>
                        Total Blogs: {{ blogsStore.list.data.length }}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <Blog :blogs="blogsStore.list.data" />
                </div>
                <div class="col-md-4">
                    <Authors />
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import Blog from "../components/Blog.vue";
import {useBlogStore} from "../Store/blogs-store.js";
import {onMounted} from "vue";
import Authors from "../components/Authors.vue";
const blogsStore = useBlogStore();

onMounted(async () => {

    blogsStore.getAssets();


    blogsStore.updateFilterFromQuery();

    blogsStore.getList();


});


</script>
