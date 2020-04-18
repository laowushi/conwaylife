var ConwayLife = /** @class */ (function () {
    function ConwayLife(w, h) {
        this.width = w;
        this.height = h;
        this.data = this.init(0);
        this.nextData = this.init(0);
        this.alive = true;
    }
    ConwayLife.prototype.init = function (v) {
        var dt = new Array(this.height);
        for (var y = 0; y < this.height; y += 1) {
            dt[y] = new Array(this.width);
        }
        for (var y = 0; y < this.height; y += 1) {
            for (var x = 0; x < this.width; x += 1) {
                dt[y][x] = v;
            }
        }
        return dt;
    };
    ConwayLife.prototype.next = function () {
        // if (!(this.alive)) { return; }
        // let max = 0
        for (var y = 0; y < this.height; y += 1) {
            for (var x = 0; x < this.width; x += 1) {
                this.nextData[y][x] = this.aliveOrDie(x, y, this.get(x, y));
            }
        }
        // this.data = this.nextData
        for (var y1 = 0; y1 < this.height; y1 += 1) {
            for (var x1 = 0; x1 < this.width; x1 += 1) {
                this.set(x1, y1, this.nextData[y1][x1]);
                // max = this.nextData[y1][x1]
            }
        }
        // if (max == 0) {
        // this.update_value(1, 2000)
        // this.alive = false
        // }
    };
    ConwayLife.prototype.aliveOrDie = function (x, y, e) {
        var lifes = 0;
        var res = 0;
        var c = this.get(x, y);
        if (c > 0) {
            lifes = -1;
        }
        for (var y1 = Math.max(y - 1, 0); y1 <= Math.min(y + 1, this.height - 1); y1 += 1) {
            for (var x1 = Math.max(x - 1, 0); x1 <= Math.min(x + 1, this.width - 1); x1 += 1) {
                lifes += this.get(x1, y1);
            }
        }
        if (lifes == 2) {
            res = c;
        }
        else if (lifes == 3) {
            res = 1;
        }
        else {
            res = 0;
        }
        return res;
    };
    ConwayLife.prototype.get = function (x, y) {
        if (x >= this.width || y >= this.height) {
            return;
        }
        return this.data[y][x];
    };
    ConwayLife.prototype.set = function (x, y, v) {
        if (this.data.length == 0 || this.data.length < y || x >= this.width || y >= this.height) {
            return;
        }
        this.data[y][x] = v;
    };
    ConwayLife.prototype.update_value = function (v, n) {
        var x = Math.min(Math.floor(Math.random() * this.width), this.width);
        var y = Math.min(Math.floor(Math.random() * this.height), this.height);
        for (var i = 0; i < n; i += 1) {
            while (this.get(x, y) > 0) {
                x = Math.min(Math.floor(Math.random() * this.width), this.width);
                y = Math.min(Math.floor(Math.random() * this.height), this.height);
            }
            this.set(x, y, v);
        }
    };
    return ConwayLife;
}());
var render = function (cl, ctx) {
    for (var y = 0; y < cl.height; y += 1) {
        for (var x = 0; x < cl.width; x += 1) {
            if (cl.data[y][x] > 0) {
                ctx.fillStyle = "green";
                ctx.fillRect(x * 5, y * 5, 4, 4);
            }
            else {
                ctx.fillStyle = "white";
                ctx.fillRect(x * 5, y * 5, 5, 5);
            }
        }
    }
};
// test
function main() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");
    var W = cvs.width;
    var H = cvs.height;
    var cl = new ConwayLife(W / 5, H / 5);
    cl.update_value(1, 1000);
    // console.log(cl.data)
    // console.log(cl.nextData)
    setInterval(function () {
        // if (cl.alive==false) { ctx.fillText("Nothing left.",0,0,20); return; }
        cl.next();
        render(cl, ctx);
        // console.log(cl.nextData)
    }, 1000 / 80);
}
main();
