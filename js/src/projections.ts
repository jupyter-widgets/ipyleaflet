const L = require('./leaflet.ts');

export function getProjection(proj) {
  if (proj.custom === false) {
    return L.CRS[proj.name];
  } else {
    return new L.Proj.CRS(proj.name, proj.proj4def, {
      origin: proj.origin,
      resolutions: proj.resolutions,
      bounds: L.Bounds(proj.bounds),
    });
  }
}
