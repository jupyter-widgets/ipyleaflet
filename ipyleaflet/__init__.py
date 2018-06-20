from ._version import version_info, __version__

# Allow dependencies to ipyleaflet to not be installed upon post-link for
# conda-build.

try:
    from .leaflet import *
except ImportError:
    pass

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]
