import { CRS, Point, Proj } from 'leaflet';
interface Proj {
    name: string;
    proj4def: string;
    custom: boolean;
    bounds?: Point[];
    origin?: [number, number] | undefined;
    resolutions?: number[] | undefined;
    options?: Proj.ProjCRSOptions;
}
export declare function getProjection(proj: Proj): CRS;
export {};
//# sourceMappingURL=projections.d.ts.map