var tile = require('./tile.js')
var winston = require('winston')
var bot_logger = winston.loggers.get('bot')

class Board {
  constructor(numRows, numCols, generalPos) {
    this.tiles = []
    for (var i=0; i<numCols*numRows; i++) {
      this.tiles[i] = new tile.Tile()
    }
    this.numRows = numRows
    this.numCols = numCols
    this.length = numRows*numCols
    this.generalPos = generalPos
  }

  /* Returns a tile for this players general
   */
  getGeneral() {
    return this.tiles[this.generalPos]
  }

  /* Returns all valid tiles that are directly adjacent to this tile, not
   * including diagonally adjacent tiles
   */
  getAdjacents(tile) {
    var adjacents = []
    // left
    var p = tile.position - 1
    if (((p % this.numCols) !== (this.numCols - 1)) && (p > 0)) {
      adjacents.push(this.tiles[p])
    }
    // right
    p = tile.position + 1
    if ((p % this.numCols) !== 0) {
      adjacents.push(this.tiles[p])
    }
    // top
    p = tile.position - this.numCols
    if (p >= 0) {
      adjacents.push(this.tiles[p])
    }
    // bottom
    p = tile.position + this.numCols
    if (p < this.length) {
      adjacents.push(this.tiles[p])
    }
    return adjacents
  }


  /* Returns all valid tiles that are a neighbor to this tile, which includes
   * diagonally adjacent tiles. 
   */
  getNeighbors(tile) {
    var result = this.getAdjacents(tile)
    var candidates = []
    candidates.push(this.tiles[tile.position-1-this.numCols])
    candidates.push(this.tiles[tile.position+1-this.numCols])
    candidates.push(this.tiles[tile.position-1+this.numCols])
    candidates.push(this.tiles[tile.position+1+this.numCols])
    for (var i=0; i<candidates.length; i++){
      if (candidates[i]) {
        result.push(candidates[i])
      }
    }

    return result
  }

  /* Returns an array of all tiles for a given player index
   */
  allTilesforPlayer(playerIndex) {
    var result = []
    for (var i=0; i<this.tiles.length; i++) {
      if (this.tiles[i].terrainType == playerIndex){
        result.push(this.tiles[i])
      }
    }
    return result
  }
  
  getTotalArmies(playerIndex) {
    var armies = 0
    for (var i=0; i<this.tiles.length; i++) {
      if (this.tiles[i].terrainType == playerIndex){
        armies += this.tiles[i].armies
      }
    }
    return armies
  }
  
  getTotalMovableArmies(playerIndex) {
    var armies = 0
    for (var i=0; i<this.tiles.length; i++) {
      if (this.tiles[i].terrainType == playerIndex){
        armies += this.tiles[i].armies - 1
      }
    }
    return armies
  }
  
  getMeanMovableArmies(playerIndex) {
    var armies = 0
    var owned_tiles = 0
    for (var i=0; i<this.tiles.length; i++) {
      if (this.tiles[i].terrainType == playerIndex){
        armies += this.tiles[i].armies - 1
        owned_tiles++
      }
    }
    return Math.floor(armies/owned_tiles)
  }

  /* doesn't include armies */
  shortestDistance(fromTile, toTile) {
    return shortestPath(fromTile, toTile).length
  }

  /* Returns an array of tiles in the shortest path from A to B with the shortest path */
  shortestPath(fromTile, toTile) {
    var result = []

    return result
  }

  /* includes armies */
  shortestWeightedDistance(tileA, tileB) {

  }
  
  manhattanDistance(a, b) {
    var rc = this.getRCFromIndex(a.position);
    var rows_a = rc[0];
    var cols_a = rc[1];
    var rc = this.getRCFromIndex(b.position);
    var rows_b = rc[0];
    var cols_b = rc[1];
    var res = Math.abs(rows_a-rows_b) + Math.abs(cols_a-cols_b)
    return res;
  }
  
  modifiedManhattanDistance(a,b) {
    var rc = this.getRCFromIndex(a.position);
    var rows_a = rc[0];
    var cols_a = rc[1];
    var rc = this.getRCFromIndex(b.position);
    var rows_b = rc[0];
    var cols_b = rc[1];
    var y = Math.abs(rows_a-rows_b)
    if (y > 0) y--;
    var x = Math.abs(rows_a-rows_b)
    if (x > 0) x--;
    return x + y;
  }
  
  getRCFromIndex(i) {
    return [Math.floor(i / this.numCols), i % this.numCols];
  }
}

module.exports.Board = Board
