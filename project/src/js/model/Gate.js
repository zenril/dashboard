
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
    constructor(opts) {

        this.uuid = UUID.v4();
        this.id = (opts && opts.id) ? opts.id : this.uuid;
        this.callback_afterCalc = (opts && opts.after) ? opts.after : null;

        this.connections = {
            parents : [],
            children : []
        };

        this.state = false;
        this.pullstate = null;
        this.values = [];
        this.events = {};
        Gate.gates().push(this);
        Gate.addToSearch(this);
    }

    static gates() {
        if(!Gate.all) Gate.all = [];
        return Gate.all;
    }

    static addToSearch(gate_instance) {
        if(!Gate.searchMap) Gate.searchMap = {};
        if(Gate.byID(gate_instance.id)) return;
        return Gate.searchMap[gate_instance.id] = gate_instance;
    }

    static byID(id){
        if(!Gate.searchMap) Gate.searchMap = {};
        if(!Gate.searchMap[id]) return null;
        return Gate.searchMap[id];
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
        }, 1000);


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
        return gate;
    }

    join(id) {
        var g = Gate.byID(id);
        this.add(g);
        return g;
    }

    joinFrom(id) {
        var g = Gate.byID(id);
        g.add(this);
        return g;
    }

    from(id) {
        var g = Gate.byID(id);
        return g;
    }

    static addGateType(gate_class){
        Gate.prototype[gate_class.type] = function(p){
            var g = new gate_class(p);
            this.add(g);
            return g;
        }
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

        if(this.callback_afterCalc){
            this.callback_afterCalc(_this.state, _this.values);
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
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'OR';
    }

    calc(values) {

        var resp = false;
        values.forEach((v) => {
            if(v) resp = true;
        });
        return resp;
    }
}
Gate.addGateType(OR_Gate);

export class AND_Gate extends Gate
{
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'AND';
    }

    calc(values) {
        var ret = true;
        values.forEach((v)=>{
            if(!v) ret = false;
        });
        return ret;
    }

}

Gate.addGateType(AND_Gate);

export class NAND_Gate extends Gate
{
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'NAND';
    }

    calc(values) {
        var allon = true;
        values.forEach((v)=>{
            if(!v) allon = false;
        });
        return !allon;
    }

}

Gate.addGateType(NAND_Gate);

export class XOR_Gate extends Gate
{
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'XOR';
    }

    calc(values) {
        var num = 0;
        values.forEach((v)=>{
            if(v) num++;
        });
        return num == 1;
    }

}


Gate.addGateType(XOR_Gate);

export class MEM extends Gate
{
    constructor(opts) {
        super(opts);
        this.persistState = false;
    }

    static get type() {
        return 'MEM';
    }

    calc(values) {
        var num = 0;
        values.forEach((v)=>{
            if(v) num++;
        });

        this.persistState = num>0? !this.persistState : this.persistState;
        return this.persistState;
    }

}
Gate.addGateType(MEM);
export class Pulse extends Gate
{
    constructor(opts) {
        super(opts);
        this.hasBeenOff = true;
    }

    static get type() {
        return 'Pulse';
    }

    calc(values) {
        var num = 0;
        values.forEach((v)=>{
            if(v) num++;
        });

        if(this.hasBeenOff && num > 0){
            this.hasBeenOff = false;
            return true;
        }
        this.hasBeenOff = !num;
        return false;
    }
}


Gate.addGateType(Pulse);

export class NOT_Gate extends Gate
{
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'NOT';
    }

    calc(values) {
        var resp = true;
        values.forEach((v)=>{
            if(v) resp = false;
        });
        return resp;
    }
}
Gate.addGateType(NOT_Gate);

export class Output extends Gate
{
    constructor(opts) {
        super(opts);
    }

    static get type() {
        return 'Output';
    }

    calc(values) {
        return null;
    }
}

Gate.addGateType(Output);

window.GATE = Gate;