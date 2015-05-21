import os

from IPython.utils.path import get_ipython_dir
import requests


ip_dir = get_ipython_dir()
nbext_dir = os.path.join(ip_dir, 'nbextensions')


def install_files(url, dir, files):
    base_url = url + '/' + dir
    base_path = os.path.join(nbext_dir, dir)
    try:
        os.makedirs(base_path)
    except OSError:
        pass
    for f in files:
        url = '/'.join([base_url]+f)
        path = os.path.join(base_path, *f)
        try:
            os.makedirs(os.path.split(path)[0])
        except OSError:
            pass
        r = requests.get(url)
        with open(path, 'wb') as f:
            print('installing: %s' % path)
            f.write(r.content)


leaflet_url = 'https://cdnjs.cloudflare.com'
leaflet_dir = 'ajax/libs/leaflet/0.7.3'
leaflet_files = [
    ['leaflet.css',],
    ['leaflet.js',],
    ['images','layers.png'],
    ['images','layers-2x.png'],
]

install_files(leaflet_url, leaflet_dir, leaflet_files)

leaflet_draw_url = 'https://cdnjs.cloudflare.com/ajax/libs/'
leaflet_draw_dir = 'leaflet.draw/0.2.4'
leaflet_draw_files = [
    ['leaflet.draw.css',],
    ['leaflet.draw.js',],
    ['images','spritesheet.png'],
    ['images','spritesheet-2x.png']
]

install_files(leaflet_draw_url, leaflet_draw_dir, leaflet_draw_files)

