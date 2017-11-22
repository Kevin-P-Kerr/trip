var Record = function (name,utility,timeCost,openTime,closeTime) {
  this.name = name;
  this.utility = utility;
  this.timeCost = timeCost;
  this.openTime = openTime;
  this.closeTime = closeTime;
  this.visited = false;
};

var findDistance = function (startPoint,endPoint,distanceTable) {
  var paths = {};
  paths[endPoint] = 0;
  var vertices = distanceTable.locations;
  vertices.forEach(function (v) {
    if (v==endPoint) {return;}
    paths[v] = Infinity;
  });
  var edges= distanceTable.edges;
  vertices.forEach(function (vertex) {
    edges.forEach(function (e) {
      var u = e[0];
      var v = e[1];
      var w = e[2];
      if (u == endPoint) {
        paths[v] = w;
      }
      else if (v == endPoint) {
        paths[u] = w;
      }
      else if (paths[u] +w < paths[v]) {
        paths[v] = paths[u]+w;
      }
      else if (paths[v]+w < paths[u]) {
        paths[u] = paths[v]+w;
      }
    });
  });
  return paths[startPoint];
}

var inWindow = function (record,tod) {
  return record.openTime < tod && record.closeTime > tod;};

var getTotalPoints = function (recordTable) {
  var  i =0;
  var k;
  for (k in recordTable) {
    if (recordTable[k].visited) { continue; }
    i+=recordTable[k].utility;
  }
  return i;
};


var findTrip = function (recordTable,distanceTable,budget,startingPoint,itenary,tod) {
  if (budget <= 0) {
    return itenary;
  }
  var k;
  var localCosts = {};
  var distance;
  for (k in recordTable) {
    distance = findDistance(startingPoint,k,distanceTable);
    localCosts[k] = distance+(recordTable[k].timeCost*60);
  }
  var totalPoints = getTotalPoints(recordTable);
  var orderedPoints = [];
  for (k in localCosts) {
    var timeRat = localCosts[k]/(budget*60);
    var utilityRat;
    if (inWindow(recordTable[k],tod) && !recordTable[k].visited) {
      utilityRat = recordTable[k].utility/totalPoints;
    }
    else {
      utilityRat = 0;
    }
    orderedPoints.push([k,utilityRat*timeRat]);
  }
  orderedPoints.sort(function (a,b) { if (a[1] > b[1]) { return -1; } else { return 1; }});
  var winner = orderedPoints[0];
  winner.push(tod);
  itenary.push(winner);
  recordTable[winner[0]].visited = true;
  var localCostsHours = localCosts[winner[0]]/60;
  var newBudget = budget-localCostsHours;
  var newTOD = round(tod+localCostsHours);
  winner.push(newTOD);
  return findTrip(recordTable,distanceTable,newBudget,winner[0],itenary,newTOD);
};

var round = function (tod) {
  var n = Math.round(tod);
  if (tod > n) {
    if (tod-n > 0.25) {
      return n+0.5;
    }
  }
  if (tod < n) {
    if (n-tod > 0.25) {
      return n-0.5;
    }
  }
  return n;
};

var places = [];
places.push(new Record("louvre",30,2,9,16));
places.push(new Record("gustave m house",50,1.5,10,16));
places.push(new Record("ble sucre",15,0.3,8,19));
places.push(new Record("parc luxem",30,0.5,6,19));
places.push(new Record("petite pal",25,1.5,10,17))
places.push(new Record("canal st martin",30,0.5,6,19));
places.push(new Record("batignolles",25,0.5,6,19));
places.push(new Record("minzon",38,1,12,21));
places.push(new Record("l'as fal",20,0.5,12,22));
places.push(new Record("pastry cyril",38,0.5,7,20));
places.push(new Record("comptoir",38,1,18,24));
places.push(new Record("east mama",35,1.5,19,22));
places.push(new Record("pause cafe",29,0.5,8,24));
places.push(new Record("mama shelter",36,1,18,24));

var p = {};
places.forEach(function (pl) {
  p[pl.name] = pl;
});

var edges = [];
edges.push(["louvre","gustave m house",19]);
edges.push(["louvre","ble sucre",30]);
edges.push(["louvre","parc luxem",23]);
edges.push(["louvre","petite pal",20]);
edges.push(["louvre","canal st martin",27]);
edges.push(["louvre","batignolles",30]);
edges.push(["louvre","minzon",20]);
edges.push(["louvre","l'as fal",20]);
edges.push(["louvre","comptoir",25]);
edges.push(["louvre","east mama",27]);
edges.push(["louvre","pause cafe",27]);
edges.push(["louvre","mama shelter",40]);
edges.push(["pasty cyril","gustave m house",35]);
edges.push(["pastry cyril","ble sucre",10]);
edges.push(["pastry cyril","parc luxem",34]);
edges.push(["pastry cyril","petite pal",35]);
edges.push(["pastry cyril","canal st martin",19]);
edges.push(["pastry cyril","batignolles",44]);
edges.push(["pastry cyril","minzon",20]);
edges.push(["pastry cyril","l'as fal",28]);
edges.push(["pastry cyril","comptoir",28]);
edges.push(["pastry cyril","east mama",8]);
edges.push(["pastry cyril","pause cafe",9]);
edges.push(["pastry cyril","mama shelter",20]);
edges.push(["gustave m house","ble sucre",36]);
edges.push(["gustave m house","parc luxem",31]);
edges.push(["gustave m house","petite pal",17]);
edges.push(["gustave m house","canal st martin",26]);
edges.push(["gustave m house","batignolles",22]);
edges.push(["gustave m house","minzon",37]);
edges.push(["gustave m house","l'as fal",25]);
edges.push(["gustave m house","comptoir",35]);
edges.push(["gustave m house","east mama",39]);
edges.push(["gustave m house","pause cafe",35]);
edges.push(["gustave m house","mama shelter",31]);
edges.push(["ble sucre","parc luxem",35]);
edges.push(["ble sucre","petite pal",40]);
edges.push(["ble sucre","canal st martin",35]);
edges.push(["ble sucre","batignolles",26]);
edges.push(["ble sucre","minzon",23]);
edges.push(["ble sucre","l'as fal",25]);
edges.push(["ble sucre","comptoir",37]);
edges.push(["ble sucre","east mama",39]);
edges.push(["ble sucre","pause cafe",40]);
edges.push(["ble sucre","mama shelter",43]);
edges.push(["parc luxem","petite pal",30]);
edges.push(["parc luxem","canal st martin",33]);
edges.push(["parc luxem","batignolles",51]);
edges.push(["parc luxem","minzon",26]);
edges.push(["parc luxem","l'as fal",25]);
edges.push(["parc luxem","comptoir",25]);
edges.push(["parc luxem","east mama",40]);
edges.push(["parc luxem","pause cafe",42]);
edges.push(["parc luxem","mama shelter",60]);
edges.push(["petite pal","canal st martin",35]);
edges.push(["petite pal","batignolles",25]);
edges.push(["petite pal","minzon",27]);
edges.push(["petite pal","l'as fal",27]);
edges.push(["petite pal","comptoir",39]);
edges.push(["petite pal","east mama",40]);
edges.push(["petite pal","pause cafe",42]);
edges.push(["petite pal","mama shelter",49]);
edges.push(["east mama","minzon",20]);
edges.push(["east mama","l'as fal",25]);
edges.push(["east mama","comptoir",32]);
edges.push(["east mama","pause cafe",5]);
edges.push(["east mama","mama shelter",23]);
edges.push(["mama shelter","l'as fal",23]);
var distances = {};
distances.locations = (function () {
  var x = [];
  places.forEach(function (p) {
    x.push(p.name);
  });
  return x;
})();
distances.edges = edges;

var main = function () {
  var t = findTrip(p,distances,14,"louvre",[],7);
  console.log(t);
};

main();



    


  
