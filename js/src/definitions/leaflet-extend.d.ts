import {
  Circle,
  CircleMarker,
  Handler,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
} from 'leaflet';

type CSSStyleStringIndex = Partial<CSSStyleDeclaration> & {
  [propName: string]: string;
};
type Panes = Record<string, Record<string, any>>;
type LayerShapes =
  | Circle
  | CircleMarker
  | Marker
  | Polygon
  | Polyline
  | Rectangle;

interface Transform extends Handler {
  reset: () => void;
  setOptions: (options: {
    scaling: string;
    uniformScaling: string;
    rotation: string;
  }) => Handler;
}

declare module 'leaflet' {
  interface Layer {
    _refreshTileUrl(tile: any, url: any): void;
    refresh(): void;
  }

  interface Polyline {
    dragging: Handler;
    transform: Transform;
  }

  interface InternalTile {
    active?: boolean | undefined;
    coords: Coords;
    current: boolean;
    el: HTMLImageElement;
    loaded?: Date | undefined;
    retain?: boolean | undefined;
  }

  interface MagnifyingGlassOptions extends ControlOptions {
    radius: number;
    zoomOffset: number;
    layers: Layer[];
    fixedPosition: false;
    latLng: LatLngExpression;
    fixedZoom: number;
  }

  class MagnifyingGlass extends Layer {
    constructor(options?: MagnifyingGlassOptions);
    options: MagnifyingGlassOptions;
    getMap(): Map;
    _createMiniMap(elt: string | HTMLElement): Map;
    _getZoom(): number;
    _updateZoom(): void;
    setRadius(radius: number): void;
  }

  function magnifyingGlass(
    options?: Control.MagnifyingGlassOptions
  ): L.MagnifyingGlass;

  declare namespace Control {
    interface LegendOptions extends ControlOptions {
      position: ControlPosition;
    }

    class Legend extends Control {
      constructor(options?: LegendOptions);
      options: LegendOptions;
    }
  }

  declare namespace control {
    function legend(options?: Control.LegendOptions): Control.Legend;
  }
}
