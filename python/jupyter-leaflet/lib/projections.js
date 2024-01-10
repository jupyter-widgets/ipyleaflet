import { CRS } from 'leaflet';
import L from './leaflet';
export function getProjection(proj) {
    if (proj.custom === false) {
        return CRS[proj.name];
    }
    else {
        return new L.Proj.CRS(proj.name, proj.proj4def, {
            origin: proj.origin,
            resolutions: proj.resolutions,
            bounds: new L.Bounds(proj.bounds),
        });
    }
}
//# sourceMappingURL=projections.js.map