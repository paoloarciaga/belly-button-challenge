# Microbial Species Analysis

![image](https://github.com/paoloarciaga/belly-button-challenge/assets/60936744/0edfdcdd-ef68-4e2b-b92e-c52dedddf082)

This project explores microbial data using the D3.js library to interpret and visualize information from a comprehensive JSON dataset. It aims to reveal top Operational Taxonomic Units (OTUs) in individuals, utilizing dynamic visualizations like horizontal bar charts and bubble charts. The user-friendly interface features dropdown menus and responsive charts for seamless navigation, offering insights into microbial communities within each sample. Demographic metadata is also displayed, enhancing dataset context. Hosted on GitHub Pages for accessibility, the project emphasizes the potential of web-based data visualization tools in understanding microbiological ecosystems through analytics.

## Deployment
Check out my interactive dashboard on microbial ecosystems here: [Visualizing Microbial Ecosystems](https://paoloarciaga.github.io/belly-button-challenge/)

## Features 
1. Used D3 library to read samples.json from provided URL.
2. ### Horizontal Bar Chart with a dropdown menu for the top 10 OTUs.
    - Used sample_values as chart values.
    - Used otu_ids as labels.
    - Used otu_labels for hovertext.
3. ### Bubble Chart displaying each sample.
    - Used otu_ids for x values.
    - Used sample_values for y values and marker size.
    - Used otu_ids for marker colors.
    - Used otu_labels for text values.
4. ### Demographic Information Panel with sample metadata. 
    - Displayed key-value pairs from the metadata JSON object on the page.
5. ### Gauge Chart
    - Displayed the weekly washing frequency of the selected individual
6. Updated all plots when a new sample was selected.

I worked with my tutor who helped edited parts of my code such as initializing the page with the first sample, and the sections where I edit the gauge chart. Upon doing so, I was able to complete this project and successfully deploy my dashboard to GitHub pages. 
