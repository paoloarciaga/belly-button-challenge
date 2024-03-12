// Fetch the JSON data and console log it
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Populate the dropdown menu
    var select = d3.select("#selDataset");
    data.names.forEach((name) => {
        select.append("option").text(name).property("value", name);
    });

    // Add event listener for the dropdown menu change
    select.on("change", function () {
        var newSample = d3.select(this).property("value");
        optionChanged(newSample);
    });

    // Initialize page with the first sample
    var firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    // Initialize page with the first sample for gauge chart
    buildGaugeChart(firstSample); 
});

// Function to handle changes in the dropdown selection
function optionChanged(newSample) {
    console.log("New sample selected:", newSample);
    buildCharts(newSample);
    buildMetadata(newSample);
    buildGaugeChart(newSample); 
};


// Function to create the data visualization charts
function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Create the Bar Chart
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barLayout = {
            margin: { t: 30, l: 150 },
            height: 500, 
            width: 600   
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Create the Bubble Chart
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }];

        var bubbleLayout = {
            showlegend: false,
            height: 550, 
            width: 1000, 
            xaxis: { title: 'OTU ID' },
            hovermode: 'closest'
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
};


// Function to build the metadata panel
function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        // Clear any existing metadata
        PANEL.html("");
        
        // Add each key-value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6")
            .style("font-size", "13px")
            .text(`${key.toLowerCase()}: ${value}`);
        });
    });
}

// Function to build the Gauge Chart
function buildGaugeChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      var metadata = data.metadata;
      var result = metadata.find(sampleObj => sampleObj.id == sample);
      var wfreq = result.wfreq;
  
      // Calculate angle for needle
      var degrees = 180 - (wfreq * 20),
        radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);
  
      // Path for the needle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
      var path = mainPath.concat(pathX, space, pathY, pathEnd);
  
      var data = [
        {
          type: 'scatter',
          x: [0], y: [0],
          marker: { size: 28, color: '850000' },
          showlegend: false,
          name: 'frequency',
          text: wfreq,
          hoverinfo: 'text+name'
        },
        {
          type: 'pie',
          showlegend: false,
          hole: 0.5,
          rotation: 90,
          values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
          text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
          direction: 'clockwise',
          textinfo: 'text',
          textposition: 'inside',
          marker: {
            colors: [
              'rgba(247, 242, 236, .5)', 'rgba(244, 241, 229, .5)',
              'rgba(232, 226, 202, .5)', 'rgba(210, 206, 145, .5)',
              'rgba(202, 209, 95, .5)', 'rgba(170, 202, 42, .5)',
              'rgba(110, 154, 22, .5)', 'rgba(14, 127, 0, .5)',
              'rgba(0, 105, 11, .5)', 'rgba(255, 255, 255, 0)' 
            ]
          },
          labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          hoverinfo: 'label'
        }
      ];
  
      var layout = {
        shapes: [{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
        yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] }
      };
  
      Plotly.newPlot('gauge', data, layout);
    });
  };



