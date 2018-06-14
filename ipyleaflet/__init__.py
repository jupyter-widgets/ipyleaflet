from ._version import version_info, __version__

from .leaflet import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]
