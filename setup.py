# -*- coding: utf-8 -*-
from __future__ import print_function
from setuptools import setup
try:
    from jupyterpip import cmdclass
except:
    import pip, importlib
    pip.main(['install', 'jupyter-pip']); cmdclass = importlib.import_module('jupyterpip').cmdclass

setup(
    name='leafletwidget',
    version='0.1',
    description='Leafletwidget.js widget for IPython',
    author='Brian Granger',
    author_email='ellisonbg',
    license='New BSD',
    url='https://github.com/ellisonbg/leafletwidget',
    keywords='python ipython javascript widget leafletwidget',
    classifiers=['Development Status :: 4 - Beta',
                 'Programming Language :: Python',
                 'License :: OSI Approved :: MIT License'],
    packages=['leafletwidget'],
    include_package_data=True,
    install_requires=["jupyter-pip"],
    cmdclass=cmdclass('leafletwidget'),
)
