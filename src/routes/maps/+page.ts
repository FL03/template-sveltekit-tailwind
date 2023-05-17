import { getPoints, heatmapGradients } from '$lib/heatmap';

export async function load({ params }) {
  return {
    heatmap: {
      data: getPoints(),
      gradients: heatmapGradients
    }
  };
}
