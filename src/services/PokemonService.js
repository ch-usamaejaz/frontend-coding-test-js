// services/PokemonService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  withCredentials: false,
});

export default {
  getPokemons() {
    return apiClient.get('/pokemon');
  },
  getPokemon(id) {
    return apiClient.get('/pokemon/' + id);
  },
};
