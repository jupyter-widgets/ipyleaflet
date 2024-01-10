import { WidgetView } from '@jupyter-widgets/base';
import { Control } from 'leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletLegendControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        title: string;
        legend: {
            'value 1': string;
            'value 2': string;
            'value 3': string;
        };
        position: string;
        _view_module: string;
        _model_module: string;
        options: string[];
    };
}
export declare class LeafletLegendControlView extends LeafletControlView {
    obj: Control.Legend;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    render(): Promise<void>;
    create_obj(): void;
    legendChanged(): void;
    positionChanged(): void;
    titleChanged(): void;
    addContent(container: HTMLElement): void;
}
//# sourceMappingURL=LegendControl.d.ts.map