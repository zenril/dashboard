
class UUID {
    static v4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
}


export class Gate
{
    constructor(props) {
        this.uuid = UUID.v4();

        this.connections = {
            parents : [],
            children : []
        };

        this.state = false;
        this.pullstate = null;
        this.values = [];
        this.calcedValue = props;
        this.events = {

        };
        Gate.gates().push(this);
    }

    static gates() {
        if(!Gate.all) Gate.all = [];
        return Gate.all;
    }

    static tick(after) {
        setTimeout(function(){
            Gate.gates().forEach((g) => {
                g.run();
            });

            Gate.gates().forEach((g) => {
                g.evaluate();
            });

            if(after) after();

            Gate.tick(after);
        }, 50);


    }

    pullState(fn) {
        this.pullState = fn;
    }

    grabState(){
        if(this.pullState){
            this.state = this.pullState();
        }

        return this.state;
    }

    calc(values) {
        values.forEach((v) => {
            if(v) return true;
        });
        return false;
    }

    add(gate) {
        gate.connections.parents.push(this);
    }

    run() {
        var _this = this;
        _this.state = _this.grabState();

        _this.values = [];
        this.connections.parents.forEach((g) => {
            _this.values.push(g.state);
        });
    }

    evaluate() {
        var _this = this;
        var old = _this.state;
        var calced = _this.calc(_this.values);

        if(calced !== null){
            _this.state =  calced;
        }

        if(this.calcedValue){
            this.calcedValue(_this.state, _this.values);
        }

        if(!old && _this.state) this.trigger('state:true');
    }

    on(event, fn) {
        var _this = this;
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
    }

    trigger(event) {
        var _this = this;
        if(this.events[event]) {
            this.events[event].forEach((fn) => {
                fn(_this);
            });
        }
    }
}

export class OR_Gate extends Gate
{
    constructor(props) {
        super(props);
    }

    calc(values) {

        var resp = false;
        values.forEach((v) => {
            if(v) resp = true;
        });
        return resp;
    }
}

export class AND_Gate extends Gate
{
    constructor(props) {
        super(props);
    }

    calc(values) {
        var ret = true;
        values.forEach((v)=>{
            if(!v) ret = false;
        })
        return ret;
    }

}

export class NOT_Gate extends Gate
{
    constructor(props) {
        super(props);
    }

    calc(values) {
        var resp = true;
        values.forEach((v)=>{
            if(v) resp = false;
        })
        return resp;
    }
}

export class Output extends Gate
{
    constructor(props) {
        super(props);
    }

    calc(values) {
        return null;
    }
}

// window.o1  = new OR_Gate();
// window.o2  = new OR_Gate();
// window.annd = new AND_Gate();
// window.o1.add(window.annd);
// window.o2.add(window.annd);
// window.annd.on('state:true', function(){ console.log("yesy"); });

// window.annd.add(new Output(function(){

// }));

window.GATE = Gate;