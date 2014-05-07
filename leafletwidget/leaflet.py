from __future__ import print_function

from IPython.utils.traitlets import Float, Unicode, Int, Tuple, List
from IPython.html import widgets


class Map(widgets.DOMWidget):

    _view_name = Unicode('LeafletMapView', sync=True)
    
    location = List((32.3226932,-90.9019257), sync=True)
    width = Unicode('600px', sync=True)
    height = Unicode('400px', sync=True)
    zoom_start = Int(12, sync=True)
    zoom = Int(12, sync=True)
    max_zoom = Int(18, sync=True)
    min_zoom = Int(1, sync=True)
    tiles_url = Unicode('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', sync=True)
    tiles_attr = Unicode('Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', sync=True)
    _south = Float()
    _north = Float()
    _east = Float()
    _west = Float()

    @property
    def north(self):
        return self._north

    @property
    def south(self):
        return self._south

    @property
    def east(self):
        return self._east

    @property
    def west(self):
        return self._west

    @property
    def bounding_polygon(self):
        return [(self.north,self.west),(self.north,self.east),(self.south,self.east),(self.south,self.west)]
    
    def __init__(self, **kwargs):
        super(Map, self).__init__(**kwargs)
        self.on_msg(self._handle_msg)

    def _handle_msg(self, msg):
        content = msg['content']['data']['content']
        if content.get('method') == 'update_bounds':
            self._north = content['data']['north']
            self._south = content['data']['south']
            self._east = content['data']['east']
            self._west = content['data']['west']

    def add_polygon(self, locations):
        self.send({
            'method': 'add_polygon',
            'locations': locations
        })
    
    def add_circle_marker(self, location, radius=10):
        self.send({
            'method': 'add_circle_marker',
            'location': location,
            'radius': radius
        })
    
    def add_geojson(self, data=None, style=None, filename=None):
        style = {} if style is None else style
        if filename:
            with open(filename) as f:
                data = json.load(f)
        msg = {'method': 'add_geojson', 'data': data}
        msg['style'] = style
        self.send(msg)

class Layer(widgets.Widget):

    _view_name = Unicode('LeafletLayerView', sync=True)
