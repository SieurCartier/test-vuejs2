import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import PhoneList from './phone-list/phone-list.component.vue'
import PhoneDetails from './phone-details/phone-details.component.vue'
import Home from './Home.vue'


Vue.use(VueRouter);

const routes = [
    {path: '/details/:phoneId', component: PhoneDetails},
    {path: '/', component: Home}
];

const router = new VueRouter({
    routes: routes,
    //mode: 'history'
});

Vue.component('phone-list', PhoneList);

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
});
