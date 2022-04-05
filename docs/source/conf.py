# -*- coding: utf-8 -*-

extensions = [
    'jupyter_sphinx','sphinx.ext.autodoc', 'sphinx.ext.coverage', 'sphinx.ext.napoleon','sphinx.ext.todo', 'sphinx.ext.viewcode'
]

templates_path = ['_templates']



def setup(app):
    app.add_css_file("main_stylesheet.css")

master_doc = 'index'
source_suffix = '.rst'

# General information about the project.
project = 'ipyleaflet'
copyright = '(c) Jupyter Development Team'
author = 'Jupyter Development Team'

exclude_patterns = []
highlight_language = 'python'
pygments_style = 'sphinx'

# Output file base name for HTML help builder.
html_theme = "pydata_sphinx_theme"
#html_theme_path = [pydata_sphinx_theme.get_html_theme_path()]
htmlhelp_basename = 'ipyleafletdoc'
html_static_path = ['_static']
