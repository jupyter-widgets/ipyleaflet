// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetView, WidgetView } from '@jupyter-widgets/base';
export function camel_case(input) {
    // Convert from foo_bar to fooBar
    return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
export class LeafletWidgetView extends WidgetView {
}
export class LeafletDOMWidgetView extends DOMWidgetView {
}
class leafletViewCommon {
    get_options() {
        const o = this.model.get('options');
        const options = {};
        for (const key of o) {
            if (this.model.get(key) !== null) {
                options[camel_case(key)] = this.model.get(key);
            }
        }
        return options;
    }
}
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            const propertyDescriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
            if (propertyDescriptor) {
                Object.defineProperty(derivedCtor.prototype, name, propertyDescriptor);
            }
        });
    });
}
applyMixins(LeafletWidgetView, [leafletViewCommon]);
applyMixins(LeafletDOMWidgetView, [leafletViewCommon]);
//# sourceMappingURL=utils.js.map