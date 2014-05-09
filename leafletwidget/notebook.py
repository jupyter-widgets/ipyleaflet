from __future__ import print_function

import os

from IPython.display import display, HTML, Javascript

leaflet_css = '//cdn.leafletjs.com/leaflet-0.7.2/leaflet.css'
# leaftlet_js = "//cdn.leafletjs.com/leaflet-0.7.2/leaflet"

# leaflet_draw_js = ['//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw-src.js',
#                    '//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.js']
# leaflet_draw_png = ['//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/images/spritesheet-2x.png',
#                     '//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/images/spritesheet.png']
leaflet_draw_css = '//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw.css'



def get_static_path():
    return os.path.join(os.path.split(__file__)[0], 'static')

css_template = '<link rel="stylesheet" href="{}" />'

def display_css(url):
    display(HTML(css_template.format(url)))

def initialize_notebook(leaflet_css=leaflet_css, leaflet_js=leaflet_css):
    display_css(leaflet_css)
    display_css(leaflet_draw_css)

    for filename in ['leaflet.js']:
        with open(os.path.join(get_static_path(), filename)) as f:
            display(Javascript(f.read()))
