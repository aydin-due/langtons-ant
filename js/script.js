function Simulation() {
  function f() {
    function h() {
      for (var d = 0, e = b.get.intervalCount; d < e; d++) {
        if (i()) {
          clearInterval(a), c.printIterationCount(f);
          break;
        }
        f++;
      }
      c.printIterationCount(f);
    }

    function i() {
      var a = d.getCellState(e.cellIndex),
        f = (a + 1) % b.get.behavior.colors.length;
      if (
        (d.setCellState(e.cellIndex, f),
        c.printCellState(a),
        c.printAntOrientation(),
        e.turn(a),
        e.move(),
        e.cellIndex < 0 || e.cellIndex > d.cells.length)
      )
        return !0;
    }
    g(), (a = setInterval(h, b.get.milliseconds));
    var f = 0;
  }

  function g() {
    clearInterval(a),
      c.clearBehaviorAlgorithm(),
      c.clearIterationCount(),
      d.init(),
      e.init();
  }

  var a = null,
    b = (function () {
      function c() {
        return void 0 != b
          ? b
          : (b = [{ turns: "RL".split(""), colors: ["#5f5", "#f55"] }]);
      }
      var b,
        a = {
          gridSize: 50,
          behavior: c()[0],
          orientationIndex: 0,
          intervalCount: 1,
          milliseconds: 250,
        };
      return (
        (function () {})(),
        {
          setGridSize: function (b) {
            a.gridSize = parseInt(b);
          },
          setAntBehavior: function (b) {
            a.behavior = c()[parseInt(b)];
          },
          setCustomAntBehavior: function (b) {
            var c = b.split("");
            a.behavior = { turns: c, colors: d(c.length) };
          },
          setAntOrientation: function (b) {
            a.orientationIndex = parseInt(b);
          },
          setRefreshInterval: function (b) {
            a.intervalCount = parseInt(b);
          },
          setRefreshDelayInterval: function (b) {
            a.milliseconds = parseInt(b);
          },
          get: a,
        }
      );
    })(),
    c = (function () {
      var a = document.getElementById("displayAntBehavior"),
        c = document.getElementById("iterationCount"),
        d = document.getElementById("theBoard"),
        f = d.getContext("2d"),
        g = 15,
        h = 0.5,
        i = [
          [
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 0 },
          ],
          [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
          ],
          [
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
          ],
          [
            { x: 0, y: -1 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
          ],
        ];
      return {
        setCanvasSize: function (a) {
          (d.width = a), (d.height = a);
        },
        clearCanvas: function () {
          f.clearRect(0, 0, d.width, d.height);
        },
        printGrid: function () {
          var a = b.get.gridSize * g + 2 * g;
          this.setCanvasSize(a);
          for (var c = h; c < a; c += g) f.moveTo(c, 0), f.lineTo(c, a - g);
          for (var d = h; d < a; d += g) f.moveTo(0, d), f.lineTo(a - g, d);
          (f.strokeStyle = "#555"), f.stroke();
        },
        printCellState: function (a) {
          var c = e.x * g + 1,
            d = e.y * g + 1,
            h = g - 1;
          (f.fillStyle = b.get.behavior.colors[a]), f.fillRect(c, d, h, h);
        },
        printIterationCount: function (a) {
          c.innerText = a.toLocaleString();
        },
        clearIterationCount: function () {
          c.innerText = "0";
        },
        printAntOrientation: function () {
          var a = e.x * g + h + g / 2,
            b = e.y * g + h + g / 2,
            c = i[e.orientation];
          (f.fillStyle = "#555"),
            f.beginPath(),
            f.moveTo(a + c[0].x, b + c[0].y),
            f.lineTo(a + c[1].x , b + c[1].y),
            f.lineTo(a + c[2].x, b + c[2].y),
            f.fill();
        },
        clearBehaviorAlgorithm: function () {
          a.innerHTML = "";
        },
      };
    })(),
    d = {
      init: function () {
        (this.cells = new Int8Array(
          b.get.gridSize + b.get.gridSize * b.get.gridSize
        )),
          c.clearCanvas(),
          c.printGrid();
      },
      getCellState: function (a) {
        return this.cells[a];
      },
      setCellState: function (a, b) {
        this.cells[a] = b;
      },
    },
    e = {
      init: function () {
        (this.x = Math.floor(b.get.gridSize / 2)),
          (this.y = Math.floor(b.get.gridSize / 2)),
          (this.orientation = b.get.orientationIndex),
          (this.cellIndex = this.y + this.x * b.get.gridSize);
      },
      turn: function (a) {
        "R" === b.get.behavior.turns[a]
          ? (this.orientation = (this.orientation + 5) % 4)
          : (this.orientation = (this.orientation + 3) % 4);
      },
      move: function () {
        this.orientation % 2
          ? (this.x -= this.orientation - 2)
          : (this.y += this.orientation - 1),
          (this.cellIndex = this.y + this.x * b.get.gridSize);
      },
    };
  return { run: f, reset: g, Options: b };
}
