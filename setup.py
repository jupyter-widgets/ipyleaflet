# -*- coding: utf-8 -*-

import os
from setuptools import setup, find_packages

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
    skip_if_exists
)

# the name of the package
name = 'ipyleaflet'
long_description = 'A Jupyter widget for dynamic Leaflet maps'

here = os.path.dirname(os.path.abspath(__file__))

# Get ipyleaflet version
version = get_version(os.path.join(name, '_version.py'))

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

setup_args = dict(
    name=name,
    version=version,
    description='A Jupyter widget for dynamic Leaflet maps',
    long_description=long_description,
    license='MIT License',
    python_requires = ">=3.7",
    include_package_data=True,
    install_requires=[
        'ipywidgets>=7.6.0,<9',
        'traittypes>=0.2.1,<3',
        'xyzservices>=2021.8.1',
        'branca>=0.5.0'
    ],
    packages=find_packages(),
    zip_safe=False,
    cmdclass=cmdclass,
    author='Project Jupyter',
    author_email='jupyter@googlegroups.com',
    url='https://github.com/jupyter-widgets/ipyleaflet',
    keywords=['ipython', 'jupyter', 'widgets', 'graphics', 'GIS'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Multimedia :: Graphics',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10'
    ],
)

setup(**setup_args)
