import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletVelocityModel extends LeafletLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        displayValues: boolean;
        displayOptions: {
            velocityType: string;
            position: string;
            emptyString: string;
            angleConvention: string;
            displayPosition: string;
            displayEmptyString: string;
            speedUnit: string;
        };
        data: never[];
        minVelocity: number;
        maxVelocity: number;
        velocityScale: number;
        colorScale: never[];
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        name: string;
        base: boolean;
        popup: import("@jupyter-widgets/base").WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: import("leaflet").Layer[];
    };
}
export declare class LeafletVelocityView extends LeafletLayerView {
    obj: any;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=Velocity.d.ts.map