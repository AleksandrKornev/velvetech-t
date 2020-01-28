import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "../views/auth";
import Reg from "../views/auth/reg";
import Login from "../views/auth/login";
import Dashboard from "../views/dashboard";

import Categories from "@/views/dashboard/categories";
import Products from "@/views/dashboard/products";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/auth"
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  },
  {
    path: "/auth/reg",
    name: "Reg",
    component: Reg
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "/dashboard/category",
    component: Dashboard,
    children: [
      {
        path: "category",
        name: "Categories",
        component: Categories,
      },
      {
        path: "category/:id",
        name: "Category",
        component: Products
      }
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
