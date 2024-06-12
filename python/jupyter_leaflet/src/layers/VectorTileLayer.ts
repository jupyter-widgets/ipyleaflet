// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { VectorGrid } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';

export class LeafletVectorTileLayerModel extends LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVectorTileLayerView',
      _model_name: 'LeafletVectorTileLayerModel',
      url: '',
      vectorTileLayerStyles: {},
      min_zoom: 0,
      max_zoom: 18,
      min_native_zoom: null,
      max_native_zoom: null
    };
  }
}

export class LeafletVectorTileLayerView extends LeafletLayerView {
  obj: VectorGrid.Protobuf;

  async create_obj() {
    let options = {
      ...this.get_options(),
    };
    options["rendererFactory"] = L.canvas.tile;
    
    let x:any = this.model.get('vectorTileLayerStyles'); 
    if (typeof x !== 'object'){
        try{
        let blobCode = `const jsStyle=${x}; export { jsStyle };`; 

        const blob = new Blob([blobCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const module = await import(/* webpackIgnore: true*/url);
        const jsStyle = module.jsStyle;

        options["vectorTileLayerStyles"]=jsStyle;
        } catch (error){
            options["vectorTileLayerStyles"]={}
        }
    }

    this.obj = L.vectorGrid.protobuf(this.model.get('url'), options);
    this.model.on('msg:custom', this.handle_message.bind(this));

  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:url', () => {
      this.obj.setUrl(this.model.get('url'));
    });
  }

  handle_message(content: { msg: string }) {
    if (content.msg == 'redraw') {
      this.obj.redraw();
    }
  }
}
