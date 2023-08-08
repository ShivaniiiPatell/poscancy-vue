import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/HomePage";
import About from "../components/AboutPage";
import SignIn from "../components/SignIn.vue";
import User from "../components/UserPage";
import Event from "../components/EventPage.vue";
import ChannelPage from "../components/ChannelPage";
import ChannelBase from "../components/ChannelBase";
import ChannelDetails from "../components/ChannelDetails.vue";
import EventDetails from "../components/EventDetails";
import EventBase from "../components/EventBase";
// import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },

  // {
  //   path: "/event",
  //   name: "Event",
  //   component: Event,
  // },
  {
    path: "/event",
    component: EventBase,
    children: [
      {
        path: "",
        name: "Event",
        component: Event,
      },
      {
        path: ":id",
        name: "EventDetails",
        component: EventDetails,
        props: true,
      },
    ],
  },
  {
    path: "/channel",
    component: ChannelBase,
    children: [
      {
        path: "",
        name: "ChannelPage",
        component: ChannelPage,
      },
      {
        path: ":id",
        name: "ChannelDetails",
        component: ChannelDetails,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem("userToken");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (userToken !== null && userToken !== "") {
      next(); // Allow access if user is authenticated
    } else {
      next({ name: "SignIn" }); // Redirect to SignIn if not authenticated
    }
  } else {
    next(); // Allow access to routes that don't require authentication
  }
});
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//   // Check if the user is not logged in and the target route requires authentication
//   if (requiresAuth && !store.state.userToken) {
//     // Avoid redirection loop when already on the sign-in page
//     if (to.path !== "/signIn") {
//       next("/signIn"); // Redirect to sign-in page if not logged in
//     } else {
//       next(); // Proceed to the next route
//     }
//   } else {
//     next(); // Proceed to the next route
//   }
// });
export default router;
