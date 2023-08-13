import { createRouter, createWebHistory } from 'vue-router';
import Home  from '../Pages/Home.vue';
import  Login from '../Pages/Auth/Login.vue';
import  Create from '../Pages/Create.vue';


const isAuth = () => {
    return localStorage.getItem('token') !== null;
}

const routes = [
    {
        path : '/',
        name : 'home',
        component : Home,
        beforeEnter : (to, from, next) => {
            if (isAuth()) {
                next();
            }
            else {
                next({name : 'login'});
            }
        }
    },
    {
        path : '/login',
        name : 'login',
        component : Login,
        beforeEnter : (to, from, next) => {
            if (isAuth()) {
                next({name : 'home'});
            }
            else {
                next();
            }
        }
    },
    {
        path : '/create',
        name : 'create',
        component : Create,
        beforeEnter : (to, from, next) => {
            if (isAuth()) {
                next();
            }
            else {
                next({name : 'login'});
            }
        }
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;
