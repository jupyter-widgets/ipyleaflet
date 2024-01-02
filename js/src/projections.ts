import { CRS, Proj } from 'leaflet';
import L from './leaflet';

interface Proj extends Proj.CRS {
  name: string;
  proj4def: string;
  custom: boolean;
  options: Proj.ProjCRSOptions;
}

export function getProjection(proj: Proj) {
  if (proj.custom === false) {
    return CRS[proj.name as keyof typeof CRS];
  } else {
    return new L.Proj.CRS(proj.name, proj.proj4def, {
      origin: proj.options.origin,
      resolutions: proj.options.resolutions,
      bounds: proj.options.bounds,
    });
  }
}
