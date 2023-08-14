<template>
    <div class="card mt-3" v-for="blog in blogs">
        <div class="card-header d-flex justify-content-between align-items-center">
            <!-- Link to the blog item -->
            <router-link :to="{ name: 'item', params: { slug: blog.slug } }">
                {{ blog.title }}
            </router-link>

            <!-- Edit and delete icons (visible to the author) -->
            <div v-if="authStore.user && authStore.user.id === blog.author.id" class="d-flex gap-2">
                <font-awesome-icon icon="trash" @click="blogsStore.confirmDelete(blog.id)" style="cursor:pointer;" />
                <font-awesome-icon icon="pencil" @click="blogsStore.toEdit(blog)" style="cursor:pointer;" />
            </div>
        </div>

        <div class="card-body">
            <!-- Blog content -->
            <p>{{ blog.content }}</p>
            <!-- Display the blog image -->
            <div>
                <img :src="blog.full_image_path" class="img-fluid" width="300" />
            </div>
        </div>

        <div class="card-footer">
            <div class="d-flex gap-2 align-items-center">
                <div>
                    <!-- Author name and creation date -->
                    <strong>{{ blog.author.name }}</strong> |
                    <strong>{{ blog.author.created_at }}</strong>
                </div>
                <div style="cursor: pointer">
                    <!-- Like/unlike icon and count -->
                    <font-awesome-icon
                        :icon="['far', 'thumbs-up']"
                        v-if="!blog.liked"
                        @click="blogsStore.itemAction(blog.id, 'like')"
                    />
                    <font-awesome-icon
                        v-if="blog.liked"
                        icon="thumbs-up"
                        @click="blogsStore.itemAction(blog.id, 'dislike')"
                    />
                    ({{ blog.likes_count }})
                </div>
                <div style="cursor: pointer">
                    <!-- Comments icon and count -->
                    <font-awesome-icon icon="comments" /> ({{ blog.comments_count }})
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Imports
import { useAuthStore } from "../Store/auth-store.js";
import { useBlogStore } from "../Store/blogs-store.js";
import { defineProps } from "vue";

// Constants
const authStore = useAuthStore();
const blogsStore = useBlogStore();

// Props
defineProps({
    blogs: {
        type: Array,
        required: true,
    },
});
</script>
