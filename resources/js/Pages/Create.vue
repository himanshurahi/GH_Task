<template>
    <div class="row justify-content-center">
        <div class="col-md-8" >
            <form @submit.prevent="store.createBlog">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text"
                           v-model="store.item.title"
                           class="form-control"
                           id="title"
                           :class="{'is-invalid': store.normalizeErrors(store.errors.title)}"
                           aria-describedby="titleHelp">
                    <div id="titleHelp" class="form-text">Enter your blog title.</div>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control" v-model="store.item.content" id="content" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <input type="file" class="form-control" id="image" @change="onFileChange">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import Blog from "../components/Blog.vue";
import {useBlogStore} from "../Store/blogs-store.js";
import {onMounted} from "vue";
const store = useBlogStore();




</script>
