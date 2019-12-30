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

    jupyter labextension install @jupyter-widgets/jupyterlab-manager jupyter-leaflet

Development installation
========================

For a development installation (requires npm):

.. code:: bash

    git clone https://github.com/jupyter-widgets/ipyleaflet.git
    cd ipyleaflet
    pip install -e .
    jupyter nbextension install --py --symlink --sys-prefix ipyleaflet
    jupyter nbextension enable --py --sys-prefix ipyleaflet
    jupyter labextension install @jupyter-widgets/jupyterlab-manager js  # If you are developing on JupyterLab

Note for developers:

- the ``-e`` pip option allows one to modify the Python code in-place. Restart the kernel in order to see the changes.
- the ``--symlink`` argument on Linux or OS X allows one to modify the JavaScript code in-place. This feature is not available with Windows.

    For automatically building the JavaScript code every time there is a change, run the following command from the ``ipyleaflet/js/`` directory:

    .. code:: bash

        npm run watch

    If you are on JupyterLab you also need to run the following in a separate terminal:

    .. code:: bash

        jupyter lab --watch

    Every time a JavaScript build has terminated you need to refresh the Notebook page in order to load the JavaScript code again.
