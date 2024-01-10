import { createApp } from 'vue'
import './styles/main.css'
import Vue3Toastify from 'vue3-toastify';
import App from './App.vue'
import initializeRouter from './router'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

initializeRouter(app)

app.use(Vue3Toastify, {
  autoClose: 3000, // Optional configuration
});app.mount('#app')
