

let dataArr;

axios.get("/data").then((resp) => {
    const line1 = [];
    const line2 = [];
    let x1Set = [];
    let x2Set = [];
    resp.data.map((obj) => {

        const irisObj1 = {
            "x": obj.petalLength,
            "y": obj.sepalLength
        };
        const irisObj2 = {
            "x": obj.petalWidth,
            "y": obj.sepalWidth
        };
        if(x1Set.indexOf(obj.petalLength) >= 0)
            line1.push(irisObj1);
        if(x2Set.indexOf(obj.sepalLength) >= 0)
            line2.push(irisObj2);

        x1Set.push(obj.petalLength)
        x1Set.push(obj.petalWidth)
    });
    dataArr = [line1, line2];
}).then(() => {

    console.log(dataArr)
    selectionSort(dataArr[0])
    selectionSort(dataArr[1])
    console.log(dataArr)

    dataArr.map((lineArr => showLine(lineArr)));

})

function showLine(data) {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const width = window.innerWidth - margin.left - margin.right // Use the window's width 
    const height = window.innerHeight - margin.top - margin.bottom; // Use the window's height


    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, 7]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 8]) // input 
        .range([height, 0]); // output 


    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


    var line = d3.line()
        // .x(function (d) { return xScale(d.x); }) // set the x values for the line generator
        // .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
        .x(function (d) { return xScale(d.x) }) // set the x values for the line generator
        .y(function (d) { return yScale(d.y) }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return xScale(d.x) })
        .attr("cy", function (d) { return yScale(d.y) })
        .attr("r", 5)
        .on("mouseover", function (a, b, c) {
            d3.voronoi
        })
        .on("mouseout", function () { })
}

function selectionSort(items){

    var len = items.length,
        min;

    for (i=0; i < len; i++){

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (j=i+1; j < len; j++){
            if (items[j].x < items[min].x){
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min){
            swap(items, i, min);
        }
    }

    return items;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}