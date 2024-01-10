import { DOMWidgetView, WidgetView } from '@jupyter-widgets/base';
interface ILeafletViewCommon {
    get_options(): Record<string, any>;
}
export declare function camel_case(input: string): string;
export declare class LeafletWidgetView extends WidgetView implements ILeafletViewCommon {
    get_options: () => Record<string, any>;
}
export declare class LeafletDOMWidgetView extends DOMWidgetView implements ILeafletViewCommon {
    get_options: () => Record<string, any>;
}
export {};
//# sourceMappingURL=utils.d.ts.map