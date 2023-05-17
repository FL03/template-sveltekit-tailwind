import { getPoints, heatmapGradients } from '$lib/heatmap';

export async function load({}) {
  return {
    heatmap: {
      data: getPoints(),
      gradients: heatmapGradients
    }
  };
}
