.. _installation:

Using pip
=========

.. code:: bash

    pip install ipyleaflet
    jupyter nbextension enable --py --sys-prefix ipyleaflet  # can be skipped for notebook 5.3 and above

Using conda
===========

.. code:: bash

    conda install -c conda-forge ipyleaflet

JupyterLab extension
====================

If you have JupyterLab, you will also need to install the JupyterLab extension:

.. code:: bash

    jupyter labextension install jupyter-leaflet

Development installation
========================

For a development installation (requires npm):

.. code:: bash

    git clone https://github.com/jupyter-widgets/ipyleaflet.git
    cd ipyleaflet
    pip install -e .
    jupyter nbextension install --py --symlink --sys-prefix ipyleaflet
    jupyter nbextension enable --py --sys-prefix ipyleaflet

Note for developers: the --symlink argument on Linux or OS X allows one to modify the JavaScript code in-place. This feature is not available with Windows.
