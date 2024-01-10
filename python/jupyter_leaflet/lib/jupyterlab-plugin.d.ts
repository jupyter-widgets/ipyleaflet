import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
declare const extension: {
    id: string;
    requires: import("@lumino/coreutils").Token<IJupyterWidgetRegistry>[];
    activate: (app: any, widgets: any) => void;
    autoStart: boolean;
};
export default extension;
//# sourceMappingURL=jupyterlab-plugin.d.ts.map