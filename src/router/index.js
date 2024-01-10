import { createRouter, createWebHistory } from 'vue-router';
import LayoutMain from '../components/layout/LayoutMain.vue';
import Error from '../views/Error.vue';
import Home from '../views/Home.vue';
import PokemonList from '../components/pokemons/PokemonList.vue'; // Import your PokemonList component
import PokemonDetail from '../components/pokemons/PokemonDetail.vue'; // Import your PokemonDetail component

const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
  },
  {
    path: '/pokemon',
    name: 'PokemonList',
    component: PokemonList, // Add your PokemonList route
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetail',
    component: PokemonDetail, // Add your PokemonDetail route
  },
];

const routes = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*',
    name: 'Error',
    props: true,
    component: Error,
  },
  {
    path: '/',
    props: true,
    component: LayoutMain,
    children: mainRoutes,
  },
];

export default function initializeRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);

  return router;
}
