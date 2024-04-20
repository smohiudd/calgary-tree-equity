# Calgary Tree Equity Mapping Tool

The Calgary Tree Equity Mapping Tool uses various data sources to help users analyze Tree Equity Score and change in Calgary's tree cover over time. The Tree Equity Score methodology was developed by [American Forests](https://www.treeequityscore.org/).  

Data sources are retrieved from [Calgary Open Data](https://data.calgary.ca/) and [Statistics Canada 2021 Census Profile](https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/index.cfm?Lang=E). See the [Methodology](methodology.md) page for more information how the Tree Equity Score was calculated. Resulted can be reproduced using the included [Jupyter Notebooks](notebooks/README.md).

### Open and Reproducible Data and Analysis

This project was created using open data and open tools which is an important aspect in making analysis transparent and reproducible by anyone. 

Tools used to create the visualizations and complete the analysis include [MapLibre](https://maplibre.org/), [PMTiles](https://github.com/protomaps/PMTiles), [React](https://react.dev/) and [GeoPandas](https://geopandas.org/en/stable/#). 

## Run Locally

To run locally, install node packages first and then run the development environment.

```
npm install
npm run start
```

## License
This project is licensed under GNU General Public License v3.0 (GPL-3.0), see the [LICENSE](LICENSE) file for more details.