import 'leaflet';
import { Handler } from 'leaflet';

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
