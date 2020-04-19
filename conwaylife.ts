class ConwayLife {
    width: number;
    height: number;
    data: number[][];
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    cellsize: number;
    isPause: boolean;
    constructor(cellsize: number, cvs:HTMLCanvasElement) {
        this.cellsize = Math.max(2, cellsize)
        this.width = Math.floor(cvs.width/this.cellsize)-1;
        this.height = Math.floor(cvs.width/this.cellsize)-1;
        this.data = this.init(0)
        this.canvas = cvs
        this.ctx = cvs.getContext("2d")
        this.isPause = false
        //event
        window.addEventListener("keypress", (e)=>{
            if (e.key=='p'){
                this.pause()
            }
        })
    }
    init(v: number): number[][]{
        let dt = new Array(this.height)
        for (let y=0; y<this.height; y+=1) {
            dt[y] = new Array(this.width)
        }
        for (let y=0; y<this.height; y+=1) {
            for (let x=0; x<this.width; x+=1) {
                dt[y][x] = v
            }
        }
        return dt;
    }
    pause() {
        if (this.isPause) { this.isPause = false; return;}
        if (!(this.isPause)) { this.isPause = true; return; }
    }
    next() {
        if (this.isPause) { return; }
        let ndt = new Array(this.height)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y=0; y<this.height; y+=1) {
            let row = new Array(this.width)
            for (let x=0; x<this.width; x+=1) {
                if (this.data[y][x] > 0) {
                    this.ctx.fillStyle = "green"
                    this.ctx.fillRect(x*this.cellsize, y*this.cellsize, this.cellsize-1, this.cellsize-1)
                } //else {
                    // this.ctx.fillStyle = "white"
                    // this.ctx.fillRect(x*2, y*2, 2, 2)
                // }
                row[x] = this.aliveOrDie(x, y, this.get(x, y))
            }
            ndt[y] = row
        }
        this.data = ndt
    }
    aliveOrDie(x:number, y:number, e:number): number {
        let lifes = 0
        let res = 0
        let c = this.get(x, y)
        for (let y1=Math.max(y-1, 0); y1<=Math.min(y+1, this.height-1); y1+=1) {
            for (let x1=Math.max(x-1, 0); x1<=Math.min(x+1, this.width-1); x1+=1) {
                lifes += this.get(x1, y1)
            }
        }

        if (c==1) {
            if (lifes==3 || lifes==4) {
                res=c
            }
        } else {
            if (lifes==3) {
                res = 1
            }
        }
        return res;
    }
 
    get(x:number, y:number): number {
        if (x>=this.width || y>=this.height) { return; }
        return this.data[y][x]
    }

    set(x:number, y:number, v:number):void {
        if (this.data.length == 0 || this.data.length < y || x>=this.width || y>=this.height) { return; }
        this.data[y][x] = v
    }   
    update_value(v: number, n: number) {
        let x = Math.min(Math.floor(Math.random() * this.width),this.width)
        let y = Math.min(Math.floor(Math.random() * this.height),this.height)
        for (let i=0; i<n; i+=1) {
            while (this.get(x, y)>0) {
                x = Math.min(Math.floor(Math.random() * this.width),this.width)
                y = Math.min(Math.floor(Math.random() * this.height),this.height)
            }
            this.set(x, y, v)
        }
    }

}
// test
function main() {
    let cvs:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas")
    let ctx = cvs.getContext("2d")
    let W = cvs.width
    let H = cvs.height
    let cl = new ConwayLife(2, cvs)
    cl.update_value(1, 30000*2)
    setInterval(()=>{
        cl.next()
    }, 1000/100)

}

main()