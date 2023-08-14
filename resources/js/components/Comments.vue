<template>
    <div class="container mt-4">
        <!-- Section title -->
        <h2>Comments</h2>

        <!-- Display each comment -->
        <div class="card mb-3" v-for="comment in comments" :key="comment.id">
            <div class="card-header d-flex justify-content-between align-items-center">
                <!-- Comment author's name -->
                {{ comment.user.name }}

                <!-- Display delete icon for the comment author -->
                <font-awesome-icon
                    icon="trash"
                    v-if="authStore.user.id === comment.user.id"
                    style="cursor: pointer"
                    @click="store.deleteComment(comment.id)"
                />
            </div>
            <div class="card-body">
                <!-- Comment content -->
                <p class="card-text">{{ comment.content }}</p>
            </div>
        </div>

        <!-- Add comment form -->
        <div class="mt-4">
            <h3>Add a Comment</h3>
            <form @submit.prevent="store.addComment">
                <div class="mb-3">
                    <label for="comment" class="form-label">Comment</label>
                    <textarea
                        v-model="store.comment.content"
                        class="form-control"
                        id="comment"
                        rows="3"
                        :class="{'is-invalid': store.errors['data.content']}"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Comment</button>
            </form>
        </div>
    </div>
</template>

<script setup>
// Imports
import { useBlogStore } from "../Store/blogs-store.js";
import { useAuthStore } from "../Store/auth-store.js";
import { defineProps } from "vue";

// Constants
const store = useBlogStore();
const authStore = useAuthStore();

// Props
defineProps({
    comments: {
        type: Array,
        required: true,
    },
});
</script>
