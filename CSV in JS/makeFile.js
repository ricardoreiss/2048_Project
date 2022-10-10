var depthList = [];

for(var d = 1; d < 11; d++){
    var width = 100;
    var depth = d;
    var results = player.depthyield.get(d);
    depthList.push(["\n", width, depth, results]);
};

for(var w = 100; w < 2000; w += 200){
    var width = w;
    var depth = 1;
    var results = player.widthyield.get(w);
    depthList.push(["\n", width, depth, results]);
};

const data = [
    ["Width", "Depth", "Results"],
    depthList

    
];
let csvContent = "data:text/csv;charset=utf-8," 
    + data.map(e => e.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link); 
link.click();