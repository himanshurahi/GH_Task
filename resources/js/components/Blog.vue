<template>
    <div class="card mt-3" v-for="blog in blogs">
        <div class="card-header">{{ blog.title }}</div>
        <div class="card-body">
            <p>{{ blog.content }}</p>
            <div>
                <img :src="blog.image" class="img-fluid" />
            </div>
        </div>
        <div class="card-footer">
            <div class="d-flex gap-2 align-items-center">
               <strong>{{  blog.author.name  }}</strong> |
                <strong>{{  blog.author.created_at  }}</strong>
                <font-awesome-icon icon="thumbs-up"  /> (0)
                <font-awesome-icon icon="comments" /> (0)
            </div>
        </div>
    </div>
</template>

<script setup>
import {useAuthStore} from "../Store/auth-store.js";

const authStore = useAuthStore();
import {defineProps} from "vue";
import {useBlogStore} from "../Store/blogs-store.js";
const props = defineProps({
    blogs: {
        type: Array,
        required: true
    }
});
</script>
