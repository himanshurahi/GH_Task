<template>
    <div class="row justify-content-center">
        <div class="col-md-12" v-if="blogsStore.is_list_loaded">
            <!-- Header section -->
            <div class="d-flex flex-column w-10  align-items-center">
                <h1 class="text-center">GH Blog Task</h1>
                <!-- Link to create a new blog -->
                <router-link to="/create" class="btn btn-primary w-25">Create Blog</router-link>
                <div class="mt-3 text-center">
                    <!-- Search input and reset button -->
                    <div class="input-group mb-3">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                            @keydown="blogsStore.onSearchChange"
                            v-model="blogsStore.filter.search"
                        />
                        <button class="btn btn-outline-secondary" type="button" @click="blogsStore.resetFilter">Reset</button>
                    </div>
                    <!-- Display total number of blogs -->
                    <div>Total Blogs: {{ blogsStore.list.data.length }}</div>
                </div>
            </div>

            <!-- Main content section -->
            <div class="row">
                <div class="col-md-8">
                    <!-- Display list of blogs -->
                    <Blog :blogs="blogsStore.list.data" />
                </div>
                <div class="col-md-4">
                    <!-- Display authors sidebar -->
                    <Authors />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Imports
import Blog from "../components/Blog.vue";
import { useBlogStore } from "../Store/blogs-store.js";
import { onMounted } from "vue";
import Authors from "../components/Authors.vue";

// Constants
const blogsStore = useBlogStore();

// On component mounted
onMounted(async () => {
    // Get assets and initial blog list
    blogsStore.getAssets();
    blogsStore.updateFilterFromQuery();
    blogsStore.getList();
});
</script>
