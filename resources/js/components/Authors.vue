<template>
    <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
            <!-- Header indicating authors -->
            Authors
        </div>
        <div class="card-body" v-if="store.assets.data && store.assets.data.users">
            <!-- Display list of authors with checkboxes -->
            <ul>
                <li v-for="user in store.assets.data.users">
                    <input
                        type="checkbox"
                        :true-value="user.id"
                        false-value=""
                        @change="store.getList"
                        v-model="store.filter.author"
                        :value="user.id"
                    /> {{ user.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// Imports
import { useBlogStore } from "../Store/blogs-store.js";

// Constants
const store = useBlogStore();
</script>
