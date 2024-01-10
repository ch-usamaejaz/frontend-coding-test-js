<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="pokemon">
    <h2>{{ pokemon.name }}</h2>
  </div>
  <div v-else>No Pokemon Found</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import PokemonService from '@/services/PokemonService.js';

export default {
  setup() {
    const pokemon = ref(null);
    const loading = ref(true);
    const route = useRoute();

    const fetchPokemon = async () => {
      try {
        const {id} = route.params;
        const response = await PokemonService.getPokemon(id);
        pokemon.value = response.data;
        toast.success('Pokemon loaded successfully!');
      } catch (error) {
        toast.error('Error loading Pokemon details.');
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchPokemon);

    return { pokemon, loading };
  },
};
</script>
