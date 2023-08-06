# -*- coding: utf-8 -*-

import os
from setuptools import setup, find_packages

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    skip_if_exists,
)

# the name of the package
long_description = 'A Jupyter widget for dynamic Leaflet maps'

here = os.path.dirname(os.path.abspath(__file__))

js_dir = os.path.join(here, 'js')

# Representative files that should exist after a successful build
jstargets = [
    os.path.join('ipyleaflet/nbextension', 'index.js'),
    os.path.join('ipyleaflet/labextension', 'package.json'),
]

data_files_spec = [
    ('share/jupyter/nbextensions/jupyter-leaflet', 'ipyleaflet/nbextension', '*.*'),
    ('share/jupyter/labextensions/jupyter-leaflet', 'ipyleaflet/labextension', "**"),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'jupyter-leaflet.json'),
]

cmdclass = create_cmdclass('jsdeps', data_files_spec=data_files_spec)
js_command = combine_commands(
    install_npm(js_dir, npm=["yarn"], build_cmd='build'), ensure_targets(jstargets),
)

is_repo = os.path.exists(os.path.join(here, '.git'))
if is_repo:
    cmdclass['jsdeps'] = js_command
else:
    cmdclass['jsdeps'] = skip_if_exists(jstargets, js_command)

setup_args = dict(cmdclass=cmdclass)

setup(**setup_args)
