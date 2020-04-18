class ConwayLife {
    width: number;
    height: number;
    data: number[][];
    nextData: number[][];
    alive: boolean;
    constructor(w:number, h:number) {
        this.width = w;
        this.height = h;
        this.data = this.init(0)
        this.nextData = this.init(0)
        this.alive = true
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
    next() {
        // if (!(this.alive)) { return; }
        // let max = 0
        for (let y=0; y<this.height; y+=1) {
            for (let x=0; x<this.width; x+=1) {
                this.nextData[y][x] = this.aliveOrDie(x, y, this.get(x, y))
            }
        }
        // this.data = this.nextData
        for (let y1=0; y1<this.height; y1+=1) {
            for (let x1=0; x1<this.width; x1+=1) {
                this.set(x1, y1, this.nextData[y1][x1])
                // max = this.nextData[y1][x1]
            }
        }

        // if (max == 0) {
            // this.update_value(1, 2000)
            // this.alive = false
        // }
    }
    aliveOrDie(x:number, y:number, e:number): number {
        let lifes = 0
        let res = 0
        let c = this.get(x, y)
        if (c>0) {
            lifes = -1
        }
        for (let y1=Math.max(y-1, 0); y1<=Math.min(y+1, this.height-1); y1+=1) {
            for (let x1=Math.max(x-1, 0); x1<=Math.min(x+1, this.width-1); x1+=1) {
                lifes += this.get(x1, y1)
            }
        }
        if (lifes==2) {
            res = c;
        } else if (lifes==3) {
            res = 1;
        } else {
            res = 0;
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

const render = (cl: ConwayLife, ctx: CanvasRenderingContext2D) => {
    for (let y=0; y<cl.height; y+=1) {
        for (let x=0; x<cl.width; x+=1) {
            if (cl.data[y][x]>0) {
                ctx.fillStyle = "green"
                ctx.fillRect(x*5, y*5, 4, 4)
            } else {
                ctx.fillStyle = "white"
                ctx.fillRect(x*5, y*5, 5, 5)
            }
        }
    }
}
// test
function main() {
    let cvs:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas")
    let ctx = cvs.getContext("2d")
    let W = cvs.width
    let H = cvs.height
    let cl = new ConwayLife(W/5, H/5)
    cl.update_value(1, 1000)
    // console.log(cl.data)
    // console.log(cl.nextData)
    setInterval(()=>{
        // if (cl.alive==false) { ctx.fillText("Nothing left.",0,0,20); return; }
        cl.next()
        render(cl, ctx)
        // console.log(cl.nextData)
    }, 1000/80)

}

main()