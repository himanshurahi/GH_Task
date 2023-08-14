<template>
    <div>
        <!-- Display individual blog post -->
        <div class="card mt-3 text-center" v-if="store.is_item_loaded">
            <div class="card-header">
                {{ store.item.title }}
            </div>
            <div class="card-body">
                <p>{{ store.item.content }}</p>
                <div>
                    <img :src="store.item.full_image_path" class="img-fluid" />
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex gap-2 align-items-center">
                    <div>
                        <strong>{{ store.item.author.name }}</strong> |
                        <strong>{{ store.item.author.created_at }}</strong>
                    </div>
                    <div style="cursor: pointer">
                        <font-awesome-icon
                            :icon="['far', 'thumbs-up']"
                            v-if="!store.item.liked"
                            icon="thumbs-up-regular"
                            @click="store.itemAction(store.item.id, 'like')"
                        />
                        <font-awesome-icon
                            v-if="store.item.liked"
                            icon="thumbs-up"
                            @click="store.itemAction(store.item.id, 'dislike')"
                        />
                        ({{ store.item.likes_count }})
                    </div>
                    <div style="cursor: pointer">
                        <font-awesome-icon icon="comments" /> ({{ store.item.comments_count }})
                    </div>
                </div>
            </div>
        </div>
        <!-- Display comments for the blog post -->
        <Comments :comments="store.item.comments" />
    </div>
</template>

<script setup>
// Imports
import { onMounted } from "vue";
import { useBlogStore } from "../Store/blogs-store.js";
import { useRoute } from "vue-router";
import Comments from "../components/Comments.vue";

// Constants
const store = useBlogStore();
const route = useRoute();

// On component mounted
onMounted(() => {
    // Get the item details
    if (route.params && route.params.slug) {
        store.getItem(route.params.slug);
    }
});
</script>
