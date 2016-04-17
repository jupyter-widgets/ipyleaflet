from ._version import version_info, __version__

from .leaflet import (
    Map,
    Marker,
    TileLayer, ImageOverlay,
    Polyline, Polygon, Rectangle, Circle, CircleMarker,
    GeoJSON,
    LayerGroup, FeatureGroup,
    DrawControl
)

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]
