import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/guest/Home.vue"),
  },
  {
    path: "/author",
    name: "Author",
    component: () => import("../views/guest/Author.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/guest/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/guest/Login.vue"),
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () => import("../views/user/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../views/user/ResetPassword.vue"),
  },
  {
    path: "/userinterface",
    name: "UserInterface",
    component: () => import("../views/user/UserInterface.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/user/Profile.vue"),
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () => import("../views/user/Favourites.vue"),
  },
  {
    path: "/mylist",
    name: "MyList",
    component: () => import("../views/user/MyList.vue"),
  },
  {
    path: "/detailsuser/:movieId",
    name: "MovieDetailsUser",
    component: () => import("../views/user/MovieDetails.vue"),
  },
  {
    path: "/detailsguest/:movieId",
    name: "MovieDetailsGuest",
    component: () => import("../views/guest/MovieDetails.vue"),
  },
  {
    path: "/moviesuser/:category",
    name: "Moviesuser",
    component: () => import("../views/user/Movies.vue"),
    props: true
  },
  {
    path: "/moviesguest/:category",
    name: "Moviesguest",
    component: () => import("../views/guest/Movies.vue"),
    props: true
  },
  {
    path: "/support",
    name: "Support",
    component: () => import("../views/user/Support.vue"),
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: () => import("../views/admin/AdminLogin.vue"),
  },
  {
    path: "/adminpanel",
    name: "AdminPanel",
    component: () => import("../views/admin/AdminPanel.vue"),
  },
  {
    path: "/detailsadmin/:movieId",
    name: "MovieDetailsAdmin",
    component: () => import("../views/admin/AdminMovieDetails.vue"),
  },
  {
    path: "/adminuserslist",
    name: "AdminUserList",
    component: () => import("../views/admin/AdminUsersList.vue"),
  },
  {
    path: "/admincategories",
    name: "AdminCategories",
    component: () => import("../views/admin/AdminCategories.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/errors/NotFound.vue"),
  },
  {
    path: "/403",
    name: "NoPermission",
    component: () => import("../views/errors/NoPermission.vue"),
  },
  {
    path: "/500",
    name: "ServerError",
    component: () => import("../views/errors/ServerError.vue"),
  },
  {
    path: "/verify/:userid",
    name: "Verify",
    component: () => import("../views/guest/Verify.vue"),
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
