import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/layout/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'about',
        component: () => import('@/views/About.vue'),
      },
      {
        path: 'logout',
        component: () => import('@/views/Logout.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('@/views/Product.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/Orders.vue'),
      },
      {
        path: 'shopcart',
        component: () => import('@/views/Shopcart.vue'),
      },
      {
        path: 'checkout',
        component: () => import('@/views/Checkout.vue'),
      },
      {
        path: 'payment/:id',
        component: () => import('@/views/Payment.vue'),
      },
      {
        path: 'payflow/:id',
        component: () => import('@/views/PayFlow.vue'),
      },
      {
        path: 'paysuccess/:id',
        component: () => import('@/views/PaySuccess.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/layout/backend/Home.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/backend/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'products',
        component: () => import('@/views/backend/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'coupons',
        component: () => import('@/views/backend/Coupons.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'orders',
        component: () => import('@/views/backend/Orders.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'files',
        component: () => import('@/views/backend/FileStorages.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const { token } = store.state.login;
    if (token) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
export default router;
