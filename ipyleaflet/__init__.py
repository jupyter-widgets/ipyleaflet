from ._version import version_info, __version__

from .leaflet import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]


def _jupyter_labextension_paths():
    return [{
        'name': 'jupyter-leaflet',
        'src': 'staticlab'
    }]

