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
  console.log(paths);
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
  console.log(paths);
  return paths[startPoint];
}

var findTrip = function (recordTable,distanceTable,budget,startingPoint,itenary,tod) {
  if (budget <= 0) {
    return itenary;
  }
  var k;
  var localCosts = {};
  var distance;
  for (k in recordTable) {
    distance = calculateDistance(startingPoint,k,distanceTable);
    localCosts[k] = distance+recordTable[k].timeCost;
  }
  var totalPoints = getTotalPoints(recordTable);
  var orderedPoints = [];
  for (k in localCosts) {
    var timeRat = localCosts[k]/budget;
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
  var winner = orderdPoints[0];
  itenary.push(winner);
  recordTable[winner[0]].visisted = true;
  return findTrip(recordTable,distanceTable,budget-localCosts[winner[0]],winner[0],itenary,tod+localCosts[winner[0]]);
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

var main = function () {
};


main();



    


  
