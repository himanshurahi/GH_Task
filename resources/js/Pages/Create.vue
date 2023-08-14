<template>
    <!-- Create item form container -->
    <div class="row justify-content-center">
        <div class="col-md-8">
            <form @submit.prevent="store.createItem">

                <!-- Title input -->
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                        type="text"
                        v-model="store.item.title"
                        class="form-control"
                        id="title"
                        :class="{'is-invalid': store.normalizeErrors(store.errors.title)}"
                        aria-describedby="titleHelp"
                    >
                    <div id="titleHelp" class="form-text">Enter your blog title.</div>
                </div>

                <!-- Content input -->
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea
                        class="form-control"
                        v-model="store.item.content"
                        id="content"
                        rows="3"
                        :class="{'is-invalid': store.normalizeErrors(store.errors.content)}"
                    ></textarea>
                </div>

                <!-- Image input -->
                <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <input type="file" class="form-control" id="image" @change="store.onFileChange">
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary" :disabled="store.is_saving">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
// Imports
import { useBlogStore } from "../Store/blogs-store.js";

// Constants
const store = useBlogStore();
</script>
