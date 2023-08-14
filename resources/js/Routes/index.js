import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import Login from '../Pages/Auth/Login.vue';
import Register from '../Pages/Auth/Register.vue';
import Create from '../Pages/Create.vue';
import Edit from '../Pages/Edit.vue';
import Item from '../Pages/Item.vue';

const isAuth = () => {
    return localStorage.getItem('token') !== null;
};

const requireAuth = (to, from, next) => {
    if (isAuth()) {
        next();
    } else {
        next({ name: 'login' });
    }
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/create',
        name: 'create',
        component: Create,
        meta: { requiresAuth: true },
    },
    {
        path: '/edit/:slug',
        name: 'edit',
        component: Edit,
        meta: { requiresAuth: true },
    },
    {
        path: '/blog/:slug',
        name: 'item',
        component: Item,
        meta: { requiresAuth: true },
    },
];

routes.forEach(route => {
    if (route.meta && route.meta.requiresAuth) {
        route.beforeEnter = requireAuth;
    }
});

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
