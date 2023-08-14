<template>
    <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
            Authors
        </div>
        <div class="card-body" v-if="store.assets.data && store.assets.data.users">
            <ul>
                <li v-for="user in store.assets.data.users">
                    <input type="checkbox"
                           :true-value="user.id"
                           false-value=""
                           @change="store.getList"
                           v-model="store.filter.author"
                           :value="user.id" /> {{ user.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {useBlogStore} from "../Store/blogs-store.js";

const store = useBlogStore();
</script>
