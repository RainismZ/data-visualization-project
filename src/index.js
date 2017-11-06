import {details} from "./details.js"

var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 11,
    center: new google.maps.LatLng(34.0522, -118.2437),
    mapTypeId: google.maps.MapTypeId.TERRAIN
});

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
    data = details.filter(function(detail){
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