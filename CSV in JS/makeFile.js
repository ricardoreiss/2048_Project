get_media = function(array) {
    var vetor = array;
    var soma = 0;
    for (var id = 0; id < vetor.length; id++){
        soma += vetor[id];
    };

    return soma/vetor.length;
};

var values = [];
var values_depth = new Map([
    [1,[64,64,128,256,128,128,256,256,512,512]],
    [2,[512,512,512,512,512,512,1024,1024,1024,1024]],
    [3,[256,512,512,512,1024,1024,1024,1024,1024,2048]],
    [4,[512,512,1024,1024,1024,1024,1024,1024,1024,2048]],
    [5,[1024,1024,1024,1024,1024,1024,2048,2048,2048,2048]],
    [6,[1024,1024,1024,2048,2048,2048,2048,2048,2048,2048]],
    [7,[1024,1024,1024,2048,2048,2048,2048,2048,2048,2048]],
    [8,[1024,1024,2048,2048,2048,2048,2048,2048,2048,2048]],
    [9,[512,512,1024,1024,1024,2048,2048,2048,2048,2048]],
    [10,[1024,1024,1024,2048,2048,2048,2048,2048,4096,4096]]
]);
var values_width = new Map([
    [100,[128,256,256,512,512,512,512,512,512,512]],
    [300,[256,128,128,128,256,256,256,512,512,512]],
    [500,[128,64,128,128,128,256,256,256,256,256]],
    [700,[128,64,64,128,128,256,256,256,256,512]],
    [900,[64,128,128,128,128,128,128,256,512,512]],
    [1100,[128,64,128,128,128,128,256,256,256,512]],
    [1300,[128,128,128,256,256,256,256,512,512,512]],
    [1500,[128,128,256,256,256,256,256,256,256,512]],
    [1700,[64,128,128,128,128,128,128,256,256,256]],
    [1900,[64,128,128,128,128,256,128,256,256,512]]
]);

for(var d = 1; d < 11; d++){
    var width = 100;
    var depth = d;
    var results = get_media(values_depth.get(d));
    values.push(`${width}, ${depth}, ${results}\n`);
};

for(var w = 100; w < 2000; w += 200){
    var width = w;
    var depth = 1;
    var results = get_media(values_width.get(w));
    values.push(`${width}, ${depth}, ${results}\n`);
};

const data = [
    ["Width, Depth, Media\n"],
    values  
];
let csvContent = "data:text/csv;charset=utf-8," + data;

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data_test.csv");
document.body.appendChild(link); 
link.click();