import { Dict } from '@jupyter-widgets/base';
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

  interface MagnifyingGlassOptions extends LayerOptions {
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

  interface ImageServiceOptions extends LayerOptions {
    url: string;
    f: string;
    format: string;
    pixelType: string;
    noData: number[];
    noDataInterpretation: string;
    interpolation: string;
    compressionQuality: number;
    bandIds: number[];
    time: string[];
    renderingRule: Dict;
    mosaicRule: Dict;
    endpoint: string;
    attribution: string;
    crs: CRS;
    interactive: boolean;
    updateInterval: number;
  }

  class ImageService extends Layer {
    constructor(options?: ImageServiceOptions);
    options: ImageServiceOptions;
    updateUrl(): void;
    onAdd(map: Map): this;
    onRemove(): this;
    update(): void;
  }

  function imageService(options?: ImageServiceOptions): L.ImageService;

  interface HeatLayerOptions extends LayerOptions {
    minOpacity: number;
    maxZoom: number;
    radius: number;
    blur: number;
    max: number;
  }

  class HeatLayer extends Layer {
    constructor(latlngs: LatLngExpression[], options?: HeatLayerOptions);
    options: HeatLayerOptions;
    setOptions(options: HeatLayerOptions): this;
    addLatLng(latlng: LatLngExpression): this;
    setLatLngs(latlngs: LatLngExpression[]): this;
    redraw(): this;
  }

  function heatLayer(
    latlngs: LatLngExpression[],
    options?: HeatLayerOptions
  ): L.HeatLayer;

  declare namespace Control {
    interface LegendOptions extends ControlOptions {
      position: ControlPosition;
    }

    class Legend extends Control {
      constructor(options?: LegendOptions);
      options: LegendOptions;
    }

    interface MeasureOptions extends ControlOptions {}
    class Measure extends Control {
      constructor(options?: MeasureOptions);
      options: MeasureOptions;
      _setCaptureMarkerIcon: () => void;
    }
  }

  declare namespace control {
    function legend(options?: Control.LegendOptions): Control.Legend;
    function measure(options?: Control.MeasureOptions): Control.Measure;
  }
}
