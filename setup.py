from pathlib import Path
from setuptools import setup

from jupyter_packaging import *

ROOT = Path(__file__).parent

js_dir = ROOT / 'js'

# Representative files that should exist after a successful build
jstargets = [
    str(Path('ipyleaflet/nbextension')/'index.js'),
    str(Path('ipyleaflet/labextension')/'package.json'),
]

data_files_spec = [
    ('share/jupyter/nbextensions/jupyter-leaflet', 'ipyleaflet/nbextension', '*.*'),
    ('share/jupyter/labextensions/jupyter-leaflet', 'ipyleaflet/labextension', "**"),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'jupyter-leaflet.json'),
]

cmdclass = create_cmdclass('jsdeps', data_files_spec=data_files_spec)
js_command = combine_commands(
    install_npm(js_dir, npm=["yarn"], build_cmd='build'),
    ensure_targets(jstargets),
)

is_repo = (ROOT / '.git').exists()
cmdclass['jsdeps'] = js_command if is_repo else skip_if_exists(jstargets, js_command)

setup(cmdclass=cmdclass)
