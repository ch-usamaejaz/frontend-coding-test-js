import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import * as vue3Toastify from 'vue3-toastify'; // Import the entire module
import PokemonList from '@/components/pokemons/PokemonList.vue';
import PokemonService from '@/services/PokemonService';


// Mock the PokemonService
vi.mock('@/services/PokemonService', () => ({
  default: {
    getPokemons: vi.fn(() => Promise.resolve({
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      },
    })),
  },
}));

describe('PokemonList', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles API errors gracefully', async () => {
    PokemonService.getPokemons.mockRejectedValue(new Error('API Error'));

    // Mock the toast.error function
    const toastErrorMock = vi.fn();
    vue3Toastify.toast.error = toastErrorMock;

    const wrapper = mount(PokemonList);
    await flushPromises();
    await nextTick(); // Wait for Vue to update the DOM

    // Check if an error toast was displayed
    expect(toastErrorMock).toHaveBeenCalledWith('Error loading Pokémon data.');

    // Check if the loading text is not present
    expect(wrapper.text()).not.toContain('Loading...');
  });
});
