import { heatmapGradients } from '$lib/heatmap';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
  return {
    heatmap: {
      data: [],
      gradients: heatmapGradients
    }
  };
}
