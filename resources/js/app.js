require('./bootstrap');

Vue.component(
    'people-component',
    require('./components/PeopleComponent.vue').default
);

const app = new Vue({
    el: '#app'
});