## HCIDLA Affordable Housing Projects

### Overview

This is the course project for WPI CS573 Data Visualization. Project page could be found [here](https://rainismz.github.io/data-visualization-project/).

The dataset used for visualizations is *HCIDLA Affordable Housing Projects Catalog and Listing (2003 To Present)* from [dataLA](https://data.lacity.org), and [Los Angeles Neighborhoods Census Information](http://maps.latimes.com/neighborhoods/neighborhood/list/) from L.A. Times.

The dataset contains 341 rows and 27 columns, while each row is an affordable housing site or location, and each column information can be fond [here](https://data.lacity.org/A-Livable-and-Sustainable-City/HCIDLA-Affordable-Housing-Projects-Catalog-And-Lis/u4mj-cwbz).
<br>[[Downloadable CSV]](https://data.lacity.org/api/views/u4mj-cwbz/rows.csv?accessType=DOWNLOAD), [[Dataset Summary]](https://bl.ocks.org/RainismZ/28059e87d7e8d312261a10d7e9fd6177)

<img width="949" alt="thumbnail" src="https://user-images.githubusercontent.com/22625369/32581590-7b0fe4f2-c4b8-11e7-981d-6d089edbcfeb.PNG">

<p align="center">Figure 1: Screenshot of the project page.</p>

### Descriptions of Visualization and Interactions

As shown in figure 1, there are two parts of the project —— information box (above) and funding details (below) —— each contains an major interaction. 

For information box, I used Google Map API with D3 layers to implement the map window. Each red circle on map presents a row of the dataset, which is an affordable housing site or location. And the information panel on right gives the name, address, construction type, housing type and an image of the location. By clicking a circle, the information on right panel will update to the selected site/location. *(Please notice that in Google Chrome, red circles may not load correctly the first time your visit the page, but they will appear if you reload the page. Edge and Safari don't have this issue. I'm currently working to solve it.)*
