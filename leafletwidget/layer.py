from __future__ import print_function

from IPython.utils.traitlets import Float, Unicode, Int, Tuple, List
from IPython.html import widgets


class Layer(widgets.Widget):

    _view_name = Unicode('LeafletLayerView', sync=True)
