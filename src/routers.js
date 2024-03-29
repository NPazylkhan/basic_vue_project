import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

//lazyloaded
const Dashboard = () => import("./components/Dashboard.vue")
const Customer = () => import("./components/Customer.vue")
const NotFound = () => import("./components/404.vue")

const routes = [
    {
        path:"/login",
        alias:['/login'],
        name:"Login",
        component:Login,
    },
    {
        path:"/register",
        name:"Register",
        component:Register,
    },
    {
        path:"/",
        name:"Dashboard",
        component:Dashboard,
    },
    {
        path:"/customer/:id",
        name:"Customer",
        component:Customer,
    },
    {
        path:"/404",
        name:"404",
        component:NotFound,
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

router.beforeEach((to,from,next)=>{
    const publicPages = ['/login','/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if(authRequired && !loggedIn){
        next('/login');
    }
    else{
        next();
    }

    if(authRequired){
        next('/login');
    }
    else{
        next();
    }
});
export default router;
