# -*- coding: utf-8 -*-

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

setup(
    name='leafletwidget',
    version='0.1',
    description='An IPython widget for dynamic Leaflet maps',
    author='Brian E. Granger',
    author_email='ellisonbg@gmail.com',
    license='MIT License',
    url='https://github.com/ellisonbg/leafletwidget',
    keywords='data visualization',
    classifiers=['Development Status :: 4 - Beta',
                 'Programming Language :: Python :: 2.7',
                 'License :: OSI Approved :: MIT License'],
    packages=['leafletwidget'],
    package_data={'': ['*.js',
                       '*.css',
                       'static/*.js',
                       'static/*.css']}
)
