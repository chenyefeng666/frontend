// 引用第三方包vue
import Vue from 'vue';



// 引用根组件
import AppCompoment from './comment/App.vue';

new Vue({
    el: '#app',
    render: c => c(AppCompoment)
})