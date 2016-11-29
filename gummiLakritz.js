var cluster = require('cluster');

function gummiLakritz(g, l) {
    while((g+l) >= 2)
    {
        switch(getRandomInt(0,3))
        {
            case 0: // g g
                if(g < 2) continue;
                g -= 2;
                l +=1;
                break;
            case 1: // g l
            case 2: // l g
                if(g == 0 || l == 0) continue;
                l -= 1;
                break;
            case 3: // l l
                if(l < 2) continue;
                l -= 1;
                break;
        }
    }
    return {g: g, l: l};
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



(function(){
    var results = [];

    for(var i = 1; i < 100; ++i) {
        for(var j = 1; j < 100; ++j) {
            results.push(gummiLakritz(i, j));
        }
    }

    var counts = {};
    results.map(function(elem) {
        return elem.g + " " + elem.l;
    }).forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    console.log(counts);
})();