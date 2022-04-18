var threads = [
    [
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');",
        "document.write('Foo <br/>');"
    ],
    [
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');",
        "document.write('Bar <br/>');"
    ]
];

window.onload = function() {
var lines = 0, quantum = 3, max = 0;

/* get the longer thread length */
for(var i=0; i<threads.length; i++) {
    if(max < threads[i].length) {
        max = threads[i].length;
    }
}

/* execute them */
while(lines < max) {
    for(var i=0; i<threads.length; i++) {
        for(var j = lines; j < threads[i].length && j < (lines + quantum); j++) {
            eval(threads[i][j]);
        }
    }
    lines += quantum;
}
}