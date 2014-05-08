from __future__ import print_function

import os

from IPython.display import display, HTML, Javascript

leaflet_css = '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />'
leaftlet_js = "http://cdn.leafletjs.com/leaflet-0.7.2/leaflet"

def get_static_path():
    return os.path.join(os.path.split(__file__)[0], 'static')

def initialize_notebook(leaflet_css=leaflet_css, leaflet_js=leaflet_css):
    display(HTML(leaflet_css))
    for filename in ['leaflet.js']:
        with open(os.path.join(get_static_path(), filename)) as f:
            display(Javascript(f.read()))
