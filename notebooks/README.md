# Setup Environment

We recommend using [micromamba](https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html) to install the dependencies. A virtual environment will be created with JupyterLab installed.

```
micromamba env create --file environment.yml
```
Then activate the virtual environment.

```
micromamba activate calgary-tree-equity
```
Run Jupyter Lab to access the notebooks.

```
jupyter lab
```

# Jupyter Notebooks

1. [Get Census Data for Dissemination Areas](Canada_census.ipynb)
2. [Calculate Canopy Cover by Community](TreeCover.ipynb)
3. [Combine Canopy Cover](CombineCanopyGeojon.ipynb)
4. [Calculate Canopy Cover by Dissemination Area](TreeCover-DA.ipynb)
5. [Calculate Tree Equity Score](EquityIndex_DA.ipynb)

