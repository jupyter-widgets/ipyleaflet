//@ts-nocheck
import * as L from './leaflet';

export function getProjection(proj: any) {
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
