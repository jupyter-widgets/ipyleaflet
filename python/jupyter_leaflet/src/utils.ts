// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { DOMWidgetView, WidgetModel, WidgetView } from '@jupyter-widgets/base';

// Define the interface for LeafletViewCommon
interface ILeafletViewCommon {
  get_options(): Record<string, any>;
}

export function camel_case(input: string) {
  // Convert from foo_bar to fooBar
  return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

export class LeafletWidgetView
  extends WidgetView
  implements ILeafletViewCommon
{
  get_options: () => Record<string, any>;
}
export class LeafletDOMWidgetView
  extends DOMWidgetView
  implements ILeafletViewCommon
{
  get_options: () => Record<string, any>;
}

class leafletViewCommon implements ILeafletViewCommon {
  model: WidgetModel;

  get_options(): Record<string, any> {
    const o = this.model.get('options') as string[];
    const options: Record<string, any> = {};
    for (const key of o) {
      if (this.model.get(key) !== null) {
        options[camel_case(key)] = this.model.get(key);
      }
    }
    return options;
  }
}

function applyMixins(derivedCtor: any, baseCtors: any[]): void {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      );
      if (propertyDescriptor) {
        Object.defineProperty(derivedCtor.prototype, name, propertyDescriptor);
      }
    });
  });
}

applyMixins(LeafletWidgetView, [leafletViewCommon]);
applyMixins(LeafletDOMWidgetView, [leafletViewCommon]);
