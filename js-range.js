class jSRange {
    constructor(args) {
        this.el = document.querySelector(args.element);
        this.min = +this.el.min || 0;
        this.max = +this.el.max || 100;
        this.step = +this.el.step || 1;
        this.tick = args.tick || this.step;
        this.addTicks();
    }
    addTicks() {
        // div to contain everything
        let wrap = document.createElement("div");
        wrap.className = "range";
        this.el.parentElement.insertBefore(wrap,this.el);
        wrap.appendChild(this.el);

        // div to contain the ticks
        let ticks = document.createElement("div");
        ticks.className = "range__ticks";
        wrap.appendChild(ticks);

        // draw the ticks
        for (let t = this.min; t <= this.max; t += this.tick) {
            // zero-width span to allow proper space between each tick
            let tick = document.createElement("span");
            tick.className = "range__tick";
            ticks.appendChild(tick);

            let tickText = document.createElement("span");
            tickText.className = "range__tick-text";
            tick.appendChild(tickText);
            tickText.textContent = t;
        }
    }
}

new jSRange({
    element: "#meter",
    tick: 10
});
let trackLength = document.getElementById("progress").getTotalLength();

let val = (document.getElementById("meter").value * trackLength)/ 100;
let poz = document.getElementById("progress").getPointAtLength(val)
document.getElementById("progress").setAttribute('stroke-dasharray', `${document.getElementById("meter").value} 101`)
document.getElementById("dot").setAttributeNS(null,"transform", `translate(${poz.x},${poz.y})`)

document.getElementById("meter").addEventListener("input",()=>{
    let val = (document.getElementById("meter").value * trackLength)/ 100;
    let poz = document.getElementById("progress").getPointAtLength(val)
    document.getElementById("progress").setAttribute('stroke-dasharray', `${document.getElementById("meter").value} 101`)
    document.getElementById("dot").setAttributeNS(null,"transform", `translate(${poz.x},${poz.y})`)
    document.querySelector(".widget"+" ._inner_child strong span").textContent = document.getElementById("meter").value
})