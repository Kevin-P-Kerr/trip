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

var distances = {};
var edges = [['A','B',22],['A','C',100],['E','F',20],['A','E',30],['E','G',5]];
distances.locations = ['A','C','D','E','F','G','B'];
distances.edges = edges;
var main = function () {
  var f = findDistance('B','G',distances);
  console.log(f);
};


main();



    


  
