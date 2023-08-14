<template>
    <div class="container mt-4">
        <h2>Comments</h2>
        <div class="card mb-3" v-for="comment in comments">
            <div class="card-header d-flex justify-content-between align-items-center">
                {{  comment.user.name }}
                <font-awesome-icon icon="trash" v-if="authStore.user.id === comment.user.id"
                                   style="cursor: pointer"
                                   @click="store.deleteComment(comment.id)"
                />
            </div>
            <div class="card-body">
                <p class="card-text">
                    {{  comment.content }}
                </p>
            </div>
        </div>

        <div class="mt-4">
            <h3>Add a Comment</h3>
            <form @submit.prevent="store.addComment">
                <div class="mb-3">
                    <label for="comment" class="form-label">Comment</label>
                    <textarea v-model="store.comment.content" class="form-control" id="comment" rows="3" ></textarea>
                </div>
                <button type="submit" class="btn btn-primary" >Add Comment</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import {useBlogStore} from "../Store/blogs-store.js";
import {useAuthStore} from "../Store/auth-store.js";

const store = useBlogStore();
const authStore = useAuthStore();

const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
});

</script>
