from __future__ import print_function

import os
try:
    from urlparse import urljoin
except ImportError:
    from urllib.parse import urljoin

from IPython.display import display, HTML, Javascript

leaflet_css = 'leaflet.css'
# leaflet_url = '/nbextensions/leaflet-0.7.2'
leaflet_js = 'leaflet'
leaflet_url = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.2/'

leaflet_draw_url = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3'
# leaflet_draw_url = '/nbextensions/leaflet.draw/0.2.3'
leaflet_draw_css = 'leaflet.draw.css'
leaflet_draw_js = 'leaflet.draw'


def get_static_path():
    return os.path.join(os.path.split(__file__)[0], 'static')

css_template = '<link rel="stylesheet" href="{}" />'

def display_css(url):
    display(HTML(css_template.format(url)))

def initialize_notebook(leaflet_url=leaflet_url, leaflet_draw_url=leaflet_draw_url):
    """Initialize the JavaScript for this widget.

    When called as::

        initialize_notebook()

    an internet connection is required.

    To run without an internet connection, run the script `install-nbextension.py` in
    the source tree of this project and then call::

        initialize_notebook(leaflet_url='/nbextensions/leaflet-0.7.2',
                            leaflet_draw_url='/nbextensions/leaflet.draw/0.2.3')

    This will still require an internet connection for map tiles.
    """
    display_css(leaflet_url+'/'+leaflet_css)
    display_css(leaflet_draw_url+'/'+leaflet_draw_css)

    with open(os.path.join(get_static_path(), 'leaflet.js')) as f:
        template = f.read()
        template = template % (leaflet_url+'/'+leaflet_js, leaflet_draw_url+'/'+leaflet_draw_js)
        display(Javascript(template))
