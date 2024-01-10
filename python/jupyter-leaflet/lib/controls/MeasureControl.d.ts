import * as control from './Control';
export declare class LeafletMeasureControlModel extends control.LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        primary_length_unit: string;
        secondary_length_unit: undefined;
        primary_area_unit: string;
        secondar_area_unit: undefined;
        active_color: string;
        completed_color: string;
        popup_options: {
            className: string;
            autoPanPadding: number[];
        };
        capture_z_index: number;
        _custom_units: {};
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletMeasureControlView extends control.LeafletControlView {
    obj: any;
    default_units: any;
    initialize(parameters: any): void;
    create_obj(): void;
    get_measure_control_options(): Record<string, any>;
    model_events(): void;
}
//# sourceMappingURL=MeasureControl.d.ts.map