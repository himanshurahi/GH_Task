<template>
   <div>
       <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
           <div class="container">
               <router-link class="navbar-brand" to="/">
                   Laravel Vue SPA
                </router-link>
               <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" >
                   <span class="navbar-toggler-icon"></span>
               </button>

               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <!-- Left Side Of Navbar -->
                   <ul class="navbar-nav me-auto">

                   </ul>

                   <!-- Right Side Of Navbar -->
                   <ul class="navbar-nav ms-auto">
                       <!-- Authentication Links -->

                       <li class="nav-item" v-if="!authStore.user" >
                           <router-link class="nav-link" to="/login">Login</router-link>
                       </li>

                       <li class="nav-item"  v-if="!authStore.user">
                           <router-link class="nav-link" to="/register">Register</router-link>
                       </li>
                       <li class="nav-item dropdown" v-if="authStore.user">
                           <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                               {{ authStore.user.name }}
                           </a>
                           <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                               <div class="dropdown-item" @click="authStore.logout">
                                   Logout
                               </div>
                           </div>
                       </li>
                   </ul>
               </div>
           </div>
       </nav>

       <div class="container mt-3">
           <router-view></router-view>
       </div>
   </div>
</template>

<script setup>
import {useAuthStore} from "./Store/auth-store.js";
import {onMounted} from "vue";

const authStore = useAuthStore();

onMounted(() => {
    authStore.getUser();
});

</script>
