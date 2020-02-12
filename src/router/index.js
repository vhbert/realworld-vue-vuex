import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
const routes = [

  {
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ "../views/Home"),
    path: '/',
    props: (route) => ({tag: route.query.tag, type: route.query.type})
  },

  {
    name: 'Article',
    component: () => import( /* webpackChunkName: "article" */ "../views/Article"),
    path: '/article/:slug',
    props: true,

  },
  {name: 'Login', component: () => import("../views/Login"), path: '/login'},
  {name: 'Register', component: () => import("../views/Login"), path: '/register'},
  {
    name: 'Editor',
    component: () => import("../views/Editor"),
    path: '/editor/:slug?',
    props: true
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import("../views/Settings"),
    meta: {requiresAuth: true}

  },
  {
    component: () => import( /* webpackChunkName: "profile" */ "../views/Profile"),
    props: true,
    path: '/profile/:username',
    children: [
      {
        path: '',
        component: () => import( /* webpackChunkName: "profileArticles" */ "../views/ProfileArticles"),
        props: true,
        name: 'ProfileArticles'
      },
      {
        path: 'favorites',
        props: true,

        component: () => import( /* webpackChunkName: "profileFavorites" */ "../views/ProfileFavorites"),
        name: 'ProfileFavorites'
      }
    ]
  }
];


const router = new VueRouter({
  routes
});

export default router;
