import { CRS, Point, Proj } from 'leaflet';
import L from './leaflet';

interface Proj {
  name: string;
  proj4def: string;
  custom: boolean;

  bounds?: Point[];
  origin?: [number, number] | undefined;
  resolutions?: number[] | undefined;
  options?: Proj.ProjCRSOptions;
}

export function getProjection(proj: Proj) {
  if (proj.custom === false) {
    return CRS[proj.name as keyof typeof CRS];
  } else {
    return new L.Proj.CRS(proj.name, proj.proj4def, {
      origin: proj.origin,
      resolutions: proj.resolutions,
      bounds: new L.Bounds(proj.bounds),
    });
  }
}
