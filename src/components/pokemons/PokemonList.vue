<template>
  <div>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="pokemon in pokemons" v-bind:key="pokemon.name">
        <router-link v-bind:to="{ name: 'PokemonDetail', params: { id: getPokemonId(pokemon.url) }}">
          {{ pokemon.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import PokemonService from '@/services/PokemonService';


export default {
  setup() {
    const pokemons = ref([]);
    const loading = ref(true);

    const fetchPokemons = async () => {
      try {
        const response = await PokemonService.getPokemons();
        pokemons.value = response.data.results;
        loading.value = false;
        toast.success('Pokémon data loaded successfully!');
      } catch (error) {
        loading.value = false;
        toast.error('Error loading Pokémon data.');
      }
    };

    const getPokemonId = (url) => {
      const segments = url.split('/');
      return segments[segments.length - 2];
    };

    onMounted(fetchPokemons);

    return { pokemons, loading, getPokemonId };
  }
};
</script>
