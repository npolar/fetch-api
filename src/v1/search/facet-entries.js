const { keys, values } = Object;

export const facetEntries = facets =>
  facets
    .map(f => [
      keys(f)[0],
      values(f)[0].map(({ term, count, uri }) => [term, count, uri])
    ])
    .filter(([, v]) => v.length > 0);
