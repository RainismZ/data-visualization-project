/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__details_js__ = __webpack_require__(1);


var map;
function initMap(){
    map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 11,
        center: new google.maps.LatLng(34.0522, -118.2437),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
}

window.initMap = initMap;

d3.json("./data/information.json", function (error, data) {
    if (error) throw error;

    function updateInfo(data){
        document.getElementById("projectName").innerHTML = data.value[2];
        document.getElementById("projectAddress").innerHTML = data.value[3];
        document.getElementById("constructionType").innerHTML = data.value[5];
        document.getElementById("housingType").innerHTML = data.value[6];
        document.getElementById("projectPhoto").src = data.value[11];
    }
    
    var overlay = new google.maps.OverlayView();

    overlay.onAdd = function () {
        var layer = d3.select(this.getPanes().overlayMouseTarget)
            .append("div")
            .attr("class", "projects");

        overlay.draw = function () {
            var projection = this.getProjection(),
                padding = 10;

            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .each(transform)
                .enter().append("svg")
                .each(transform)
                .attr("class", "marker");

            marker.append("circle")
                .attr("r", 5.5)
                .attr("cx", padding)
                .attr("cy", padding)
                .style("cursor", "pointer")
                .on("click", function(d){
                    updateInfo(d);
                });
            // on click doesn't work with BootStrap, only respond when added on marker, so we switched to Pure

            function transform(d) {
                d = new google.maps.LatLng(d.value[1], d.value[0]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }
        };
    };

    overlay.setMap(map);
});

function getRatio(side) {
    return (( margin[side] / width ) * 100 + 1) + "%";
}

var margin = {left: 10, top: 10, right: 10, bottom: 10},
    width = 680 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom,
    marginRatio = {
        left: getRatio("left"),
        top: getRatio("top"),
        right: getRatio("right"),
        bottom: getRatio("bottom")
    };

var svg_ppBar = d3.select("div#ppBar")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", marginRatio.top + " " + 0 + " " + marginRatio.bottom + " " + 0)
    .style("margin", 0 + " " + 10 + " " + 0 + " " + 10)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder");

var svg_psmBar = d3.select("div#psmBar")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", marginRatio.top + " " + 0 + " " + marginRatio.bottom + " " + 0)
    .style("margin", 0 + " " + 10 + " " + 0 + " " + 10)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder");

function updateData(innerHtml){
    var spans = document.getElementsByClassName("neighborhood");
    for (var i = 0; i < spans.length; i++) {
        spans[i].innerHTML = innerHtml;
    }
    var data = [];
    data = __WEBPACK_IMPORTED_MODULE_0__details_js__["a" /* details */].filter(function(detail){
        return detail.COMMUNITY === innerHtml || detail.COMMUNITY === "L.A. Average";
    });
    console.log(data);
    
    var HP = { Type: "HCIDLA Funded per capita", Neighborhood: 0, Average: 0 },
        HS = { Type: "HCIDLA Funded per square mile", Neighborhood: 0, Average: 0 },
        LP = { Type: "Leverage per capita", Neighborhood: 0, Average: 0 },
        LS = { Type: "Leverage per square mile", Neighborhood: 0, Average: 0 },
        TAXP = { Type: "Tax Exempt Conduit Bond per capita", Neighborhood: 0, Average: 0 },
        TAXS = { Type: "Tax Exempt Conduit Bond per square mile", Neighborhood: 0, Average: 0 },
        TDCP = { Type: "TDC per capita", Neighborhood: 0, Average: 0 },
        TDCS = { Type: "TDC per square mile", Neighborhood: 0, Average: 0 };
    var columns = ["Type", "Neighborhood", "Average"];
    
    HP.Neighborhood = data[0].HP;
    HP.Average = data[1].HP;
    HS.Neighborhood = data[0].HS;
    HS.Average = data[1].HS;
    LP.Neighborhood = data[0].LP;
    LP.Average = data[1].LP;
    LS.Neighborhood = data[0].LS;
    LS.Average = data[1].LS;
    TAXP.Neighborhood = data[0].TAXP;
    TAXP.Average = data[1].TAXP;
    TAXS.Neighborhood = data[0].TAXS;
    TAXS.Average = data[1].TAXS;
    TDCP.Neighborhood = data[0].TDCP;
    TDCP.Average = data[1].TDCP;
    TDCS.Neighborhood = data[0].TDCS;
    TDCS.Average = data[1].TDCS;

    var perCapita = [ HP, LP, TAXP, TDCP],
        perSquareMile = [ HS, LS, TAXS, TDCS];

    d3.selectAll(".bar").remove();

    var g_ppBar = svg_ppBar.append("g").attr("class", "bar").attr("transform", "translate(" + 30 + "," + 20 + ")"),
        g_psmBar = svg_psmBar.append("g").attr("class", "bar").attr("transform", "translate(" + 30 + "," + 20 + ")");

    var x0_ppBar = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1_ppBar = d3.scaleBand()
        .padding(0.05);

    var y_ppBar = d3.scaleLinear()
        .rangeRound([height, 0]);

    var x0_psmBar = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1_psmBar = d3.scaleBand()
        .padding(0.05);

    var y_psmBar = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#358DD4", "#AAA9AA"]);

    var keys = columns.slice(1);

    x0_ppBar.domain(perCapita.map(function(d) { return d.Type; }));
    x1_ppBar.domain(keys).rangeRound([0, x0_ppBar.bandwidth()]);
    y_ppBar.domain([0, d3.max(perCapita, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    x0_psmBar.domain(perSquareMile.map(function(d) { return d.Type; }));
    x1_psmBar.domain(keys).rangeRound([0, x0_psmBar.bandwidth()]);
    y_psmBar.domain([0, d3.max(perSquareMile, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    g_ppBar.append("g")
      .selectAll("g")
      .data(perCapita)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0_ppBar(d.Type) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1_ppBar(d.key); })
        .attr("y", function(d) { return y_ppBar(d.value); })
        .attr("width", x1_ppBar.bandwidth())
        .attr("height", function(d) { return height - y_ppBar(d.value); })
        .attr("fill", function(d) { return z(d.key); });

    g_ppBar.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0_ppBar));

    g_ppBar.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y_ppBar).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y_ppBar(y_ppBar.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("USD");

    var legend_ppBar = g_ppBar.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend_ppBar.append("rect")
        .attr("x", width - 550)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend_ppBar.append("text")
        .attr("x", width - 555)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

    g_psmBar.append("g")
      .selectAll("g")
      .data(perSquareMile)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0_psmBar(d.Type) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1_psmBar(d.key); })
        .attr("y", function(d) { return y_psmBar(d.value); })
        .attr("width", x1_psmBar.bandwidth())
        .attr("height", function(d) { return height - y_psmBar(d.value); })
        .attr("fill", function(d) { return z(d.key); });

    g_psmBar.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0_psmBar));

    g_psmBar.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y_psmBar).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y_psmBar(y_psmBar.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("USD");

    var legend_psmBar = g_psmBar.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend_psmBar.append("rect")
        .attr("x", width - 550)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend_psmBar.append("text")
        .attr("x", width - 555)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
}

var li = document.getElementsByClassName("nbh");

for (var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function(){updateData(this.innerHTML);});
}

updateData("Adams-Normandie");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return details; });
var details = [
  {
    COMMUNITY: 'Adams-Normandie',
    'HCIDLA FUNDED': 3225000,
    LEVERAGE: 24532619,
    'TAX EXEMPT CONDUIT BOND': 4641342,
    TDC: 32398961,
    JOBS: 99,
    POPULATION: 18504,
    SQUAREMILE: 0.81,
    HP: 174.2866407,
    LP: 1325.800854,
    TAXP: 250.829118,
    TDCP: 1750.916613,
    HS: 3981481.481,
    LS: 30287183.95,
    TAXS: 5730051.852,
    TDCS: 39998717.28
  },
  {
    COMMUNITY: 'Alsace',
    'HCIDLA FUNDED': 0,
    LEVERAGE: 6771719,
    'TAX EXEMPT CONDUIT BOND': 10247566,
    TDC: 17019285,
    JOBS: 0,
    POPULATION: 22857,
    SQUAREMILE: 1.48,
    HP: 0,
    LP: 296.2645579,
    TAXP: 448.3338146,
    TDCP: 744.5983725,
    HS: 0,
    LS: 4575485.811,
    TAXS: 6924031.081,
    TDCS: 11499516.89
  },
  {
    COMMUNITY: 'Angelino Heights',
    'HCIDLA FUNDED': 1647000,
    LEVERAGE: 8292373,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 9939373,
    JOBS: 63,
    POPULATION: 43832,
    SQUAREMILE: 2.4,
    HP: 37.57528746,
    LP: 189.1853669,
    TAXP: 0,
    TDCP: 226.7606543,
    HS: 686250,
    LS: 3455155.417,
    TAXS: 0,
    TDCS: 4141405.417
  },
  {
    COMMUNITY: 'Arlington Heights',
    'HCIDLA FUNDED': 4925829,
    LEVERAGE: 13299964,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 18225793,
    JOBS: 59,
    POPULATION: 23330,
    SQUAREMILE: 1.03,
    HP: 211.1371196,
    LP: 570.0798971,
    TAXP: 0,
    TDCP: 781.2170167,
    HS: 4782358.252,
    LS: 12912586.41,
    TAXS: 0,
    TDCS: 17694944.66
  },
  {
    COMMUNITY: 'Atwater Village',
    'HCIDLA FUNDED': 15282629,
    LEVERAGE: 23669584,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 38952213,
    JOBS: 277,
    POPULATION: 15455,
    SQUAREMILE: 1.78,
    HP: 988.8469104,
    LP: 1531.516273,
    TAXP: 0,
    TDCP: 2520.363183,
    HS: 8585746.629,
    LS: 13297519.1,
    TAXS: 0,
    TDCS: 21883265.73
  },
  {
    COMMUNITY: 'Boyle Heights',
    'HCIDLA FUNDED': 31076886,
    LEVERAGE: 115181288,
    'TAX EXEMPT CONDUIT BOND': 759870,
    TDC: 147018044,
    JOBS: 1318,
    POPULATION: 99243,
    SQUAREMILE: 6.52,
    HP: 313.1393247,
    LP: 1160.598611,
    TAXP: 7.656660923,
    TDCP: 1481.394597,
    HS: 4766393.558,
    LS: 17665841.72,
    TAXS: 116544.4785,
    TDCS: 22548779.75
  },
  {
    COMMUNITY: 'Broadway-Manchester',
    'HCIDLA FUNDED': 2055350,
    LEVERAGE: 7237394,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 9292744,
    JOBS: 83,
    POPULATION: 25797,
    SQUAREMILE: 1.56,
    HP: 79.6739931,
    LP: 280.5517696,
    TAXP: 0,
    TDCP: 360.2257627,
    HS: 1317532.051,
    LS: 4639355.128,
    TAXS: 0,
    TDCS: 5956887.179
  },
  {
    COMMUNITY: 'Canoga Park',
    'HCIDLA FUNDED': 23563000,
    LEVERAGE: 39728219,
    'TAX EXEMPT CONDUIT BOND': 7603714,
    TDC: 70894933,
    JOBS: 477,
    POPULATION: 60578,
    SQUAREMILE: 4.35,
    HP: 388.9695929,
    LP: 655.8192578,
    TAXP: 125.5193965,
    TDCP: 1170.308247,
    HS: 5416781.609,
    LS: 9132923.908,
    TAXS: 1747980.23,
    TDCS: 16297685.75
  },
  {
    COMMUNITY: 'Central-Alameda',
    'HCIDLA FUNDED': 9091810,
    LEVERAGE: 61875798,
    'TAX EXEMPT CONDUIT BOND': 25060225,
    TDC: 96027833,
    JOBS: 419,
    POPULATION: 43638,
    SQUAREMILE: 2.18,
    HP: 208.3461662,
    LP: 1417.933865,
    TAXP: 574.2752876,
    TDCP: 2200.555319,
    HS: 4170555.046,
    LS: 28383393.58,
    TAXS: 11495516.06,
    TDCS: 44049464.68
  },
  {
    COMMUNITY: 'Chatsworth',
    'HCIDLA FUNDED': 1931627,
    LEVERAGE: 9229203,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 11160830,
    JOBS: 77,
    POPULATION: 37102,
    SQUAREMILE: 15.24,
    HP: 52.06261118,
    LP: 248.7521697,
    TAXP: 0,
    TDCP: 300.8147809,
    HS: 126747.1785,
    LS: 605590.748,
    TAXS: 0,
    TDCS: 732337.9265
  },
  {
    COMMUNITY: 'Chinatown',
    'HCIDLA FUNDED': 25127111,
    LEVERAGE: 92892002,
    'TAX EXEMPT CONDUIT BOND': 3810000,
    TDC: 121829113,
    JOBS: 1499,
    POPULATION: 28839,
    SQUAREMILE: 0.91,
    HP: 871.2892611,
    LP: 3221.054891,
    TAXP: 132.112764,
    TDCP: 4224.456916,
    HS: 27612209.89,
    LS: 102079123.1,
    TAXS: 4186813.187,
    TDCS: 133878146.2
  },
  {
    COMMUNITY: 'Del Rey',
    'HCIDLA FUNDED': 9389134,
    LEVERAGE: 28060445,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 37449579,
    JOBS: 213,
    POPULATION: 32976,
    SQUAREMILE: 2.45,
    HP: 284.7262858,
    LP: 850.9353772,
    TAXP: 0,
    TDCP: 1135.661663,
    HS: 3832299.592,
    LS: 11453242.86,
    TAXS: 0,
    TDCS: 15285542.45
  },
  {
    COMMUNITY: 'Downtown',
    'HCIDLA FUNDED': 77330250,
    LEVERAGE: 415239593,
    'TAX EXEMPT CONDUIT BOND': 103996000,
    TDC: 596565843,
    JOBS: 4661,
    POPULATION: 34811,
    SQUAREMILE: 5.84,
    HP: 2221.431444,
    LP: 11928.40174,
    TAXP: 2987.446497,
    TDCP: 17137.27968,
    HS: 13241481.16,
    LS: 71102670.03,
    TAXS: 17807534.25,
    TDCS: 102151685.4
  },
  {
    COMMUNITY: 'E. Hollywood',
    'HCIDLA FUNDED': 3132000,
    LEVERAGE: 49307507,
    'TAX EXEMPT CONDUIT BOND': 39061698,
    TDC: 91501205,
    JOBS: 180,
    POPULATION: 78192,
    SQUAREMILE: 2.38,
    HP: 40.05524862,
    LP: 630.5952911,
    TAXP: 499.5613106,
    TDCP: 1170.21185,
    HS: 1315966.387,
    LS: 20717439.92,
    TAXS: 16412478.15,
    TDCS: 38445884.45
  },
  {
    COMMUNITY: 'East Hollywood',
    'HCIDLA FUNDED': 30529257,
    LEVERAGE: 153621027,
    'TAX EXEMPT CONDUIT BOND': 11933466,
    TDC: 196083750,
    JOBS: 812,
    POPULATION: 78192,
    SQUAREMILE: 2.38,
    HP: 390.4396486,
    LP: 1964.66425,
    TAXP: 152.61748,
    TDCP: 2507.721378,
    HS: 12827418.91,
    LS: 64546650,
    TAXS: 5014061.345,
    TDCS: 82388130.25
  },
  {
    COMMUNITY: 'Echo Park',
    'HCIDLA FUNDED': 9147918,
    LEVERAGE: 39011606,
    'TAX EXEMPT CONDUIT BOND': 6227000,
    TDC: 54386524,
    JOBS: 296,
    POPULATION: 43832,
    SQUAREMILE: 2.4,
    HP: 208.7040975,
    LP: 890.025689,
    TAXP: 142.0651579,
    TDCP: 1240.794944,
    HS: 3811632.5,
    LS: 16254835.83,
    TAXS: 2594583.333,
    TDCS: 22661051.67
  },
  {
    COMMUNITY: 'El Sereno',
    'HCIDLA FUNDED': 1769655,
    LEVERAGE: 11345458,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 13115113,
    JOBS: 97,
    POPULATION: 43766,
    SQUAREMILE: 4.17,
    HP: 40.43446968,
    LP: 259.2299502,
    TAXP: 0,
    TDCP: 299.6644199,
    HS: 424377.6978,
    LS: 2720733.333,
    TAXS: 0,
    TDCS: 3145111.031
  },
  {
    COMMUNITY: 'Elysian Valley',
    'HCIDLA FUNDED': 6199789,
    LEVERAGE: 19630043,
    'TAX EXEMPT CONDUIT BOND': 10287000,
    TDC: 36116832,
    JOBS: 205,
    POPULATION: 7781,
    SQUAREMILE: 0.79,
    HP: 796.7856317,
    LP: 2522.817504,
    TAXP: 1322.066572,
    TDCP: 4641.669708,
    HS: 7847834.177,
    LS: 24848155.7,
    TAXS: 13021518.99,
    TDCS: 45717508.86
  },
  {
    COMMUNITY: 'Exposition Park',
    'HCIDLA FUNDED': 13418300,
    LEVERAGE: 112352951,
    'TAX EXEMPT CONDUIT BOND': 42067556,
    TDC: 167838807,
    JOBS: 453,
    POPULATION: 33458,
    SQUAREMILE: 1.85,
    HP: 401.0490765,
    LP: 3358.0295,
    TAXP: 1257.324287,
    TDCP: 5016.402863,
    HS: 7253135.135,
    LS: 60731324.86,
    TAXS: 22739219.46,
    TDCS: 90723679.46
  },
  {
    COMMUNITY: 'Florence-Firestone',
    'HCIDLA FUNDED': 2444000,
    LEVERAGE: 40832339,
    'TAX EXEMPT CONDUIT BOND': 29739186,
    TDC: 73015525,
    JOBS: 92,
    POPULATION: 60154,
    SQUAREMILE: 3.58,
    HP: 40.6290521,
    LP: 678.7967384,
    TAXP: 494.3841806,
    TDCP: 1213.809971,
    HS: 682681.5642,
    LS: 11405681.28,
    TAXS: 8307035.196,
    TDCS: 20395398.04
  },
  {
    COMMUNITY: 'Glassell Park',
    'HCIDLA FUNDED': 11379687,
    LEVERAGE: 50470336,
    'TAX EXEMPT CONDUIT BOND': 10562729,
    TDC: 72412752,
    JOBS: 443,
    POPULATION: 24816,
    SQUAREMILE: 2.75,
    HP: 458.5625,
    LP: 2033.782076,
    TAXP: 425.6418843,
    TDCP: 2917.98646,
    HS: 4138068,
    LS: 18352849.45,
    TAXS: 3840992.364,
    TDCS: 26331909.82
  },
  {
    COMMUNITY: 'Gramercy Park',
    'HCIDLA FUNDED': 2000000,
    LEVERAGE: 31674331,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 33674331,
    JOBS: 208,
    POPULATION: 11173,
    SQUAREMILE: 1.13,
    HP: 179.0029535,
    LP: 2834.8994,
    TAXP: 0,
    TDCP: 3013.902354,
    HS: 1769911.504,
    LS: 28030381.42,
    TAXS: 0,
    TDCS: 29800292.92
  },
  {
    COMMUNITY: 'Green Meadows',
    'HCIDLA FUNDED': 6001178,
    LEVERAGE: 75958127,
    'TAX EXEMPT CONDUIT BOND': 33415646,
    TDC: 115374951,
    JOBS: 242,
    POPULATION: 30558,
    SQUAREMILE: 2.22,
    HP: 196.3864782,
    LP: 2485.703482,
    TAXP: 1093.515479,
    TDCP: 3775.605439,
    HS: 2703233.333,
    LS: 34215372.52,
    TAXS: 15052092.79,
    TDCS: 51970698.65
  },
  {
    COMMUNITY: 'Harbor City',
    'HCIDLA FUNDED': 2673764,
    LEVERAGE: 50797383,
    'TAX EXEMPT CONDUIT BOND': 41877000,
    TDC: 95348147,
    JOBS: 496,
    POPULATION: 26040,
    SQUAREMILE: 2.58,
    HP: 102.6791091,
    LP: 1950.744355,
    TAXP: 1608.179724,
    TDCP: 3661.603187,
    HS: 1036342.636,
    LS: 19688908.14,
    TAXS: 16231395.35,
    TDCS: 36956646.12
  },
  {
    COMMUNITY: 'Harbor Gateway',
    'HCIDLA FUNDED': 10452270,
    LEVERAGE: 68488934,
    'TAX EXEMPT CONDUIT BOND': 2278011,
    TDC: 81219215,
    JOBS: 598,
    POPULATION: 42005,
    SQUAREMILE: 5.14,
    HP: 248.8339483,
    LP: 1630.494798,
    TAXP: 54.23190096,
    TDCP: 1933.560648,
    HS: 2033515.564,
    LS: 13324695.33,
    TAXS: 443192.8016,
    TDCS: 15801403.7
  },
  {
    COMMUNITY: 'Harvard Heights',
    'HCIDLA FUNDED': 18492833,
    LEVERAGE: 48814273,
    'TAX EXEMPT CONDUIT BOND': 6420000,
    TDC: 73727106,
    JOBS: 233,
    POPULATION: 20194,
    SQUAREMILE: 0.79,
    HP: 915.7587897,
    LP: 2417.266168,
    TAXP: 317.9162127,
    TDCP: 3650.941171,
    HS: 23408649.37,
    LS: 61790218.99,
    TAXS: 8126582.278,
    TDCS: 93325450.63
  },
  {
    COMMUNITY: 'Harvard Park',
    'HCIDLA FUNDED': 17075014,
    LEVERAGE: 33155199,
    'TAX EXEMPT CONDUIT BOND': 9184110,
    TDC: 59414323,
    JOBS: 316,
    POPULATION: 10888,
    SQUAREMILE: 0.64,
    HP: 1568.24155,
    LP: 3045.113795,
    TAXP: 843.5075312,
    TDCP: 5456.862877,
    HS: 26679709.38,
    LS: 51804998.44,
    TAXS: 14350171.88,
    TDCS: 92834879.69
  },
  {
    COMMUNITY: 'Highland Park',
    'HCIDLA FUNDED': 3100000,
    LEVERAGE: 14391642,
    'TAX EXEMPT CONDUIT BOND': 6787000,
    TDC: 24278642,
    JOBS: 30,
    POPULATION: 60841,
    SQUAREMILE: 3.42,
    HP: 50.9524827,
    LP: 236.5451258,
    TAXP: 111.5530645,
    TDCP: 399.0506731,
    HS: 906432.7485,
    LS: 4208082.456,
    TAXS: 1984502.924,
    TDCS: 7099018.129
  },
  {
    COMMUNITY: 'Historic South-Central',
    'HCIDLA FUNDED': 53617376,
    LEVERAGE: 162792469,
    'TAX EXEMPT CONDUIT BOND': 22490225,
    TDC: 238900070,
    JOBS: 1328,
    POPULATION: 52509,
    SQUAREMILE: 2.55,
    HP: 1021.108305,
    LP: 3100.277457,
    TAXP: 428.3118132,
    TDCP: 4549.697576,
    HS: 21026421.96,
    LS: 63840183.92,
    TAXS: 8819696.078,
    TDCS: 93686301.96
  },
  {
    COMMUNITY: 'Hollywood',
    'HCIDLA FUNDED': 22925846,
    LEVERAGE: 172048487,
    'TAX EXEMPT CONDUIT BOND': 84378936,
    TDC: 279353269,
    JOBS: 1452,
    POPULATION: 85489,
    SQUAREMILE: 3.51,
    HP: 268.1730515,
    LP: 2012.521927,
    TAXP: 987.0151248,
    TDCP: 3267.710103,
    HS: 6531580.057,
    LS: 49016662.96,
    TAXS: 24039582.91,
    TDCS: 79587825.93
  },
  {
    COMMUNITY: 'Hyde Park',
    'HCIDLA FUNDED': 5281147,
    LEVERAGE: 8428737,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 13709884,
    JOBS: 110,
    POPULATION: 38850,
    SQUAREMILE: 2.88,
    HP: 135.9368597,
    LP: 216.9559073,
    TAXP: 0,
    TDCP: 352.8927671,
    HS: 1833731.597,
    LS: 2926644.792,
    TAXS: 0,
    TDCS: 4760376.389
  },
  {
    COMMUNITY: 'Jefferson Park',
    'HCIDLA FUNDED': 9885267,
    LEVERAGE: 26003885,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 35889152,
    JOBS: 274,
    POPULATION: 24285,
    SQUAREMILE: 1.42,
    HP: 407.052378,
    LP: 1070.779699,
    TAXP: 0,
    TDCP: 1477.832077,
    HS: 6961455.634,
    LS: 18312595.07,
    TAXS: 0,
    TDCS: 25274050.7
  },
  {
    COMMUNITY: 'Koreatown',
    'HCIDLA FUNDED': 43164758,
    LEVERAGE: 201690804,
    'TAX EXEMPT CONDUIT BOND': 25234342,
    TDC: 270089904,
    JOBS: 1840,
    POPULATION: 124281,
    SQUAREMILE: 2.7,
    HP: 347.3158246,
    LP: 1622.861129,
    TAXP: 203.0426372,
    TDCP: 2173.219591,
    HS: 15986947.41,
    LS: 74700297.78,
    TAXS: 9346052.593,
    TDCS: 100033297.8
  },
  {
    COMMUNITY: 'Lake View Terrace',
    'HCIDLA FUNDED': 3805976,
    LEVERAGE: 15063116,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 18869092,
    JOBS: 144,
    POPULATION: 12719,
    SQUAREMILE: 4.23,
    HP: 299.2354745,
    LP: 1184.300338,
    TAXP: 0,
    TDCP: 1483.535813,
    HS: 899757.9196,
    LS: 3561020.331,
    TAXS: 0,
    TDCS: 4460778.251
  },
  {
    COMMUNITY: 'Lincoln Heights',
    'HCIDLA FUNDED': 18398107,
    LEVERAGE: 121475146,
    'TAX EXEMPT CONDUIT BOND': 10247566,
    TDC: 150120819,
    JOBS: 848,
    POPULATION: 29637,
    SQUAREMILE: 2.51,
    HP: 620.7816918,
    LP: 4098.766609,
    TAXP: 345.7693424,
    TDCP: 5065.317643,
    HS: 7329923.108,
    LS: 48396472.51,
    TAXS: 4082695.618,
    TDCS: 59809091.24
  },
  {
    COMMUNITY: 'Los Feliz',
    'HCIDLA FUNDED': 4390000,
    LEVERAGE: 25158278,
    'TAX EXEMPT CONDUIT BOND': 8579256,
    TDC: 38127534,
    JOBS: 104,
    POPULATION: 36933,
    SQUAREMILE: 2.61,
    HP: 118.8638887,
    LP: 681.1869602,
    TAXP: 232.2924214,
    TDCP: 1032.34327,
    HS: 1681992.337,
    LS: 9639186.973,
    TAXS: 3287071.264,
    TDCS: 14608250.57
  },
  {
    COMMUNITY: 'Mid-City',
    'HCIDLA FUNDED': 0,
    LEVERAGE: 7438473,
    'TAX EXEMPT CONDUIT BOND': 4641342,
    TDC: 12079815,
    JOBS: 0,
    POPULATION: 55016,
    SQUAREMILE: 3.47,
    HP: 0,
    LP: 135.2056311,
    TAXP: 84.36349426,
    TDCP: 219.5691253,
    HS: 0,
    LS: 2143652.161,
    TAXS: 1337562.536,
    TDCS: 3481214.697
  },
  {
    COMMUNITY: 'Mid-Wilshire',
    'HCIDLA FUNDED': 0,
    LEVERAGE: 7103994,
    'TAX EXEMPT CONDUIT BOND': 10208936,
    TDC: 17312930,
    JOBS: 0,
    POPULATION: 47176,
    SQUAREMILE: 2.78,
    HP: 0,
    LP: 150.5849161,
    TAXP: 216.4010514,
    TDCP: 366.9859674,
    HS: 0,
    LS: 2555393.525,
    TAXS: 3672279.137,
    TDCS: 6227672.662
  },
  {
    COMMUNITY: 'North Hills',
    'HCIDLA FUNDED': 28148241,
    LEVERAGE: 101577401,
    'TAX EXEMPT CONDUIT BOND': 250000,
    TDC: 129975642,
    JOBS: 957,
    POPULATION: 58500,
    SQUAREMILE: 5.31,
    HP: 481.1665128,
    LP: 1736.365829,
    TAXP: 4.273504274,
    TDCP: 2221.805846,
    HS: 5300987.006,
    LS: 19129454.05,
    TAXS: 47080.97928,
    TDCS: 24477522.03
  },
  {
    COMMUNITY: 'North Hollywood',
    'HCIDLA FUNDED': 6281533.68,
    LEVERAGE: 34991165,
    'TAX EXEMPT CONDUIT BOND': 3211916,
    TDC: 44484614.68,
    JOBS: 332,
    POPULATION: 87241,
    SQUAREMILE: 5.87,
    HP: 72.00208251,
    LP: 401.0862439,
    TAXP: 36.81658853,
    TDCP: 509.9049149,
    HS: 1070107.952,
    LS: 5961016.184,
    TAXS: 547174.7871,
    TDCS: 7578298.923
  },
  {
    COMMUNITY: 'Pacoima',
    'HCIDLA FUNDED': 5614285,
    LEVERAGE: 66330847,
    'TAX EXEMPT CONDUIT BOND': 9100000,
    TDC: 81045132,
    JOBS: 573,
    POPULATION: 81318,
    SQUAREMILE: 7.14,
    HP: 69.04111021,
    LP: 815.6969798,
    TAXP: 111.906343,
    TDCP: 996.644433,
    HS: 786314.4258,
    LS: 9290034.594,
    TAXS: 1274509.804,
    TDCS: 11350858.82
  },
  {
    COMMUNITY: 'Panorama City',
    'HCIDLA FUNDED': 34877221,
    LEVERAGE: 139833827,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 174711048,
    JOBS: 1258,
    POPULATION: 69630,
    SQUAREMILE: 3.65,
    HP: 500.8935947,
    LP: 2008.241089,
    TAXP: 0,
    TDCP: 2509.134683,
    HS: 9555403.014,
    LS: 38310637.53,
    TAXS: 0,
    TDCS: 47866040.55
  },
  {
    COMMUNITY: 'Pico-Union',
    'HCIDLA FUNDED': 18089821,
    LEVERAGE: 115271772,
    'TAX EXEMPT CONDUIT BOND': 41932704,
    TDC: 175294297,
    JOBS: 556,
    POPULATION: 44664,
    SQUAREMILE: 1.67,
    HP: 405.0201728,
    LP: 2580.865395,
    TAXP: 938.8479312,
    TDCP: 3924.733499,
    HS: 10832228.14,
    LS: 69025013.17,
    TAXS: 25109403.59,
    TDCS: 104966644.9
  },
  {
    COMMUNITY: 'Rancho Park',
    'HCIDLA FUNDED': 2400000,
    LEVERAGE: 8573015,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 10973015,
    JOBS: 108,
    POPULATION: 4556,
    SQUAREMILE: 0.6,
    HP: 526.7778753,
    LP: 1881.697761,
    TAXP: 0,
    TDCP: 2408.475637,
    HS: 4000000,
    LS: 14288358.33,
    TAXS: 0,
    TDCS: 18288358.33
  },
  {
    COMMUNITY: 'Reseda',
    'HCIDLA FUNDED': 5143467,
    LEVERAGE: 83352486,
    'TAX EXEMPT CONDUIT BOND': 13000000,
    TDC: 101495953,
    JOBS: 662,
    POPULATION: 66574,
    SQUAREMILE: 5.87,
    HP: 77.25939556,
    LP: 1252.027608,
    TAXP: 195.2714273,
    TDCP: 1524.558431,
    HS: 876229.4719,
    LS: 14199742.08,
    TAXS: 2214650.767,
    TDCS: 17290622.32
  },
  {
    COMMUNITY: 'San Pedro',
    'HCIDLA FUNDED': 4875640,
    LEVERAGE: 10632391,
    'TAX EXEMPT CONDUIT BOND': 1162445,
    TDC: 16670476,
    JOBS: 144,
    POPULATION: 86012,
    SQUAREMILE: 12.06,
    HP: 56.68557876,
    LP: 123.6152049,
    TAXP: 13.51491652,
    TDCP: 193.8157001,
    HS: 404281.9237,
    LS: 881624.461,
    TAXS: 96388.4743,
    TDCS: 1382294.859
  },
  {
    COMMUNITY: 'Sherman Oaks',
    'HCIDLA FUNDED': 0,
    LEVERAGE: 7321491,
    'TAX EXEMPT CONDUIT BOND': 9334100,
    TDC: 16655591,
    JOBS: 61,
    POPULATION: 65436,
    SQUAREMILE: 9.15,
    HP: 0,
    LP: 111.887814,
    TAXP: 142.6447216,
    TDCP: 254.5325356,
    HS: 0,
    LS: 800162.9508,
    TAXS: 1020120.219,
    TDCS: 1820283.169
  },
  {
    COMMUNITY: 'Silver Lake',
    'HCIDLA FUNDED': 9951842,
    LEVERAGE: 50525695,
    'TAX EXEMPT CONDUIT BOND': 1850000,
    TDC: 62327537,
    JOBS: 357,
    POPULATION: 32890,
    SQUAREMILE: 2.75,
    HP: 302.5795683,
    LP: 1536.202341,
    TAXP: 56.24809973,
    TDCP: 1895.030009,
    HS: 3618851.636,
    LS: 18372980,
    TAXS: 672727.2727,
    TDCS: 22664558.91
  },
  {
    COMMUNITY: 'South Park',
    'HCIDLA FUNDED': 14315894,
    LEVERAGE: 67842406,
    'TAX EXEMPT CONDUIT BOND': 25008278,
    TDC: 107166578,
    JOBS: 481,
    POPULATION: 32851,
    SQUAREMILE: 1.41,
    HP: 435.7825941,
    LP: 2065.154972,
    TAXP: 761.2638276,
    TDCP: 3262.201394,
    HS: 10153116.31,
    LS: 48115181.56,
    TAXS: 17736367.38,
    TDCS: 76004665.25
  },
  {
    COMMUNITY: 'Sun Valley',
    'HCIDLA FUNDED': 4326358.32,
    LEVERAGE: 27325430,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 31651788.32,
    JOBS: 239,
    POPULATION: 81788,
    SQUAREMILE: 9.42,
    HP: 52.897226,
    LP: 334.1007238,
    TAXP: 0,
    TDCP: 386.9979498,
    HS: 459273.707,
    LS: 2900788.747,
    TAXS: 0,
    TDCS: 3360062.454
  },
  {
    COMMUNITY: 'Sunland',
    'HCIDLA FUNDED': 0,
    LEVERAGE: 9454441,
    'TAX EXEMPT CONDUIT BOND': 5245559,
    TDC: 14700000,
    JOBS: 0,
    POPULATION: 16450,
    SQUAREMILE: 4,
    HP: 0,
    LP: 574.7380547,
    TAXP: 318.8789666,
    TDCP: 893.6170213,
    HS: 0,
    LS: 2363610.25,
    TAXS: 1311389.75,
    TDCS: 3675000
  },
  {
    COMMUNITY: 'Sylmar',
    'HCIDLA FUNDED': 10300000,
    LEVERAGE: 28718513,
    'TAX EXEMPT CONDUIT BOND': 5442000,
    TDC: 44460513,
    JOBS: 259,
    POPULATION: 79614,
    SQUAREMILE: 12.46,
    HP: 129.3742307,
    LP: 360.7218956,
    TAXP: 68.35481197,
    TDCP: 558.4509383,
    HS: 826645.2648,
    LS: 2304856.581,
    TAXS: 436757.6244,
    TDCS: 3568259.47
  },
  {
    COMMUNITY: 'Tujunga',
    'HCIDLA FUNDED': 1745082,
    LEVERAGE: 12860088,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 14605170,
    JOBS: 121,
    POPULATION: 28336,
    SQUAREMILE: 10.02,
    HP: 61.58533315,
    LP: 453.8427442,
    TAXP: 0,
    TDCP: 515.4280774,
    HS: 174159.8802,
    LS: 1283441.916,
    TAXS: 0,
    TDCS: 1457601.796
  },
  {
    COMMUNITY: 'University Park',
    'HCIDLA FUNDED': 3827162,
    LEVERAGE: 54123580,
    'TAX EXEMPT CONDUIT BOND': 25515342,
    TDC: 83466084,
    JOBS: 114,
    POPULATION: 25181,
    SQUAREMILE: 1.17,
    HP: 151.9861006,
    LP: 2149.381677,
    TAXP: 1013.277551,
    TDCP: 3314.645328,
    HS: 3271078.632,
    LS: 46259470.09,
    TAXS: 21807984.62,
    TDCS: 71338533.33
  },
  {
    COMMUNITY: 'Valley Glen',
    'HCIDLA FUNDED': 19265428,
    LEVERAGE: 31899352,
    'TAX EXEMPT CONDUIT BOND': 13299726,
    TDC: 64464506,
    JOBS: 412,
    POPULATION: 62846,
    SQUAREMILE: 4.81,
    HP: 306.5497884,
    LP: 507.5796709,
    TAXP: 211.6240652,
    TDCP: 1025.753524,
    HS: 4005286.486,
    LS: 6631881.913,
    TAXS: 2765015.8,
    TDCS: 13402184.2
  },
  {
    COMMUNITY: 'Van Nuys',
    'HCIDLA FUNDED': 3228000,
    LEVERAGE: 46918514,
    'TAX EXEMPT CONDUIT BOND': 48608645,
    TDC: 98755159,
    JOBS: 285,
    POPULATION: 110747,
    SQUAREMILE: 8.99,
    HP: 29.14751641,
    LP: 423.6549432,
    TAXP: 438.9161332,
    TDCP: 891.7185928,
    HS: 359065.6285,
    LS: 5218967.075,
    TAXS: 5406968.298,
    TDCS: 10985001
  },
  {
    COMMUNITY: 'Venice',
    'HCIDLA FUNDED': 750000,
    LEVERAGE: 4590602,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 5340602,
    JOBS: 10,
    POPULATION: 40885,
    SQUAREMILE: 3.17,
    HP: 18.34413599,
    LP: 112.2808365,
    TAXP: 0,
    TDCP: 130.6249725,
    HS: 236593.0599,
    LS: 1448139.432,
    TAXS: 0,
    TDCS: 1684732.492
  },
  {
    COMMUNITY: 'Vermont Knolls',
    'HCIDLA FUNDED': 4650000,
    LEVERAGE: 6013775,
    'TAX EXEMPT CONDUIT BOND': 0,
    TDC: 10663775,
    JOBS: 101,
    POPULATION: 21568,
    SQUAREMILE: 1.14,
    HP: 215.597181,
    LP: 278.8285886,
    TAXP: 0,
    TDCP: 494.4257697,
    HS: 4078947.368,
    LS: 5275241.228,
    TAXS: 0,
    TDCS: 9354188.596
  },
  {
    COMMUNITY: 'Vermont Square',
    'HCIDLA FUNDED': 15698398,
    LEVERAGE: 94019663,
    'TAX EXEMPT CONDUIT BOND': 6787000,
    TDC: 116505061,
    JOBS: 633,
    POPULATION: 47555,
    SQUAREMILE: 2.54,
    HP: 330.1103564,
    LP: 1977.072085,
    TAXP: 142.718957,
    TDCP: 2449.901398,
    HS: 6180471.654,
    LS: 37015615.35,
    TAXS: 2672047.244,
    TDCS: 45868134.25
  },
  {
    COMMUNITY: 'Vermont Vista',
    'HCIDLA FUNDED': 14941938,
    LEVERAGE: 87778039,
    'TAX EXEMPT CONDUIT BOND': 38751898,
    TDC: 141471875,
    JOBS: 382,
    POPULATION: 24891,
    SQUAREMILE: 1.65,
    HP: 600.2948054,
    LP: 3526.497087,
    TAXP: 1556.863846,
    TDCP: 5683.655739,
    HS: 9055720,
    LS: 53198811.52,
    TAXS: 23485998.79,
    TDCS: 85740530.3
  },
  {
    COMMUNITY: 'Vermont-Slauson',
    'HCIDLA FUNDED': 945683,
    LEVERAGE: 10103159,
    'TAX EXEMPT CONDUIT BOND': 1584000,
    TDC: 12632842,
    JOBS: 48,
    POPULATION: 28374,
    SQUAREMILE: 1.44,
    HP: 33.32920984,
    LP: 356.0710157,
    TAXP: 55.82575597,
    TDCP: 445.2259815,
    HS: 656724.3056,
    LS: 7016082.639,
    TAXS: 1100000,
    TDCS: 8772806.944
  },
  {
    COMMUNITY: 'Watts',
    'HCIDLA FUNDED': 11986178,
    LEVERAGE: 101259325,
    'TAX EXEMPT CONDUIT BOND': 40874374,
    TDC: 154119877,
    JOBS: 471,
    POPULATION: 41028,
    SQUAREMILE: 2.12,
    HP: 292.1462903,
    LP: 2468.054134,
    TAXP: 996.2555816,
    TDCP: 3756.456006,
    HS: 5653857.547,
    LS: 47763832.55,
    TAXS: 19280365.09,
    TDCS: 72698055.19
  },
  {
    COMMUNITY: 'West Adams',
    'HCIDLA FUNDED': 14375000,
    LEVERAGE: 88470220,
    'TAX EXEMPT CONDUIT BOND': 69699714,
    TDC: 172544934,
    JOBS: 87,
    POPULATION: 22857,
    SQUAREMILE: 1.48,
    HP: 628.9101807,
    LP: 3870.596316,
    TAXP: 3049.381546,
    TDCP: 7548.888043,
    HS: 9712837.838,
    LS: 59777175.68,
    TAXS: 47094401.35,
    TDCS: 116584414.9
  },
  {
    COMMUNITY: 'Westlake',
    'HCIDLA FUNDED': 125407638,
    LEVERAGE: 438351225,
    'TAX EXEMPT CONDUIT BOND': 105039117,
    TDC: 668797980,
    JOBS: 3337,
    POPULATION: 117756,
    SQUAREMILE: 2.72,
    HP: 1064.978753,
    LP: 3722.538342,
    TAXP: 892.0064965,
    TDCP: 5679.523591,
    HS: 46105749.26,
    LS: 161158538.6,
    TAXS: 38617322.43,
    TDCS: 245881610.3
  },
  {
    COMMUNITY: 'Wilmington',
    'HCIDLA FUNDED': 6744285,
    LEVERAGE: 51072686,
    'TAX EXEMPT CONDUIT BOND': 22337212,
    TDC: 80154183,
    JOBS: 635,
    POPULATION: 54512,
    SQUAREMILE: 9.14,
    HP: 123.7211073,
    LP: 936.9072131,
    TAXP: 409.766877,
    TDCP: 1470.395197,
    HS: 737886.7615,
    LS: 5587821.225,
    TAXS: 2443896.28,
    TDCS: 8769604.267
  },
  {
    COMMUNITY: 'L.A. Average',
    'HCIDLA FUNDED': 871818863,
    LEVERAGE: 4172275854,
    'TAX EXEMPT CONDUIT BOND': 1059773752,
    TDC: 6103868469,
    JOBS: 32669,
    POPULATION: 2999807,
    SQUAREMILE: 243.18,
    HP: 290.6249845,
    LP: 1390.848096,
    TAXP: 353.2806451,
    TDCP: 2034.753725,
    HS: 3585076.334,
    LS: 17157150.48,
    TAXS: 4357980.722,
    TDCS: 25100207.54
  }
];

/***/ })
/******/ ]);