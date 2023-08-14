<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit.prevent="store.register()">
                        <div class="row mb-3">
                            <label  class="col-md-4 col-form-label text-md-end">Name</label>

                            <div class="col-md-6">
                                <input id="name"
                                       v-model="store.form.name"
                                       type="text"
                                       class="form-control"
                                       :class="{ 'is-invalid': store.form.errors.register || store.form.errors.name }"
                                >
                                <span class="invalid-feedback" role="alert">
                                       {{ store.normalizeErrors(store.form.errors.register) || store.normalizeErrors(store.form.errors.name) }}
                                    </span>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email"  class="col-md-4 col-form-label text-md-end">Email Address</label>

                            <div class="col-md-6">
                                <input id="email"
                                       v-model="store.form.email"
                                       type="email"
                                       class="form-control"
                                       :class="{ 'is-invalid': store.form.errors.email }"
                                >
                                <span class="invalid-feedback" role="alert">
                                       {{ store.normalizeErrors(store.form.errors.email) }}
                                    </span>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                            <div class="col-md-6">
                                <input id="password"
                                       v-model="store.form.password"
                                       type="password"
                                       class="form-control "
                                       name="password"
                                       :class="{ 'is-invalid': store.form.errors.password }"
                                >

                                <span class="invalid-feedback" role="alert">
                                        {{ store.normalizeErrors(store.form.errors.password) }}
                                    </span>
                            </div>
                        </div>


                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary" :disabled="store.form.loading">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from "vue";
import {useAuthStore} from "../../Store/auth-store.js";
const store = useAuthStore();
</script>
