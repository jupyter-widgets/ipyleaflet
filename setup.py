# -*- coding: utf-8 -*-

import os
from distutils import log
from setuptools import setup, find_packages

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)

# the name of the package
name = 'ipyleaflet'
long_description = 'A Jupyter widget for dynamic Leaflet maps'

here = os.path.dirname(os.path.abspath(__file__))

log.set_verbosity(log.DEBUG)
log.info('setup.py entered')
log.info('$PATH=%s' % os.environ['PATH'])

# Get ipyleaflet version
version = get_version(os.path.join(name, '_version.py'))

js_dir = os.path.join(here, 'js')

# Representative files that should exist after a successful build
jstargets = [
    os.path.join(js_dir, 'dist', 'index.js'),
]

data_files_spec = [
    ('share/jupyter/nbextensions/jupyter-leaflet', 'ipyleaflet/nbextension', '*.*'),
    ('share/jupyter/labextensions/jupyter-leaflet', 'ipyleaflet/labextension', "**"),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'jupyter-leaflet.json'),
]

cmdclass = create_cmdclass('jsdeps', data_files_spec=data_files_spec)
cmdclass['jsdeps'] = combine_commands(
    install_npm(js_dir, build_cmd='build'), ensure_targets(jstargets),
)


setup_args = dict(
    name=name,
    version=version,
    description='A Jupyter widget for dynamic Leaflet maps',
    long_description=long_description,
    license='MIT License',
    include_package_data=True,
    install_requires=[
        'ipywidgets>=7.6.0,<8',
        'traittypes>=0.2.1,<3',
        'branca>=0.3.1,<0.5',
        'shapely',
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
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
)

setup(**setup_args)
