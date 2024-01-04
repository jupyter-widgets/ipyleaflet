import 'leaflet';
import {
  Circle,
  CircleMarker,
  Handler,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
} from 'leaflet';

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
