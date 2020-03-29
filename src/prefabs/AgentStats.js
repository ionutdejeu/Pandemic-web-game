export const AgentStatsEvents = {
    AgentSickEvent:'AgentSickEvents'
}
export class AgentsStats{
    
    constructor(){
        this.stats = {};
        this.nameCollection = ['Dave','John','Smith','Oliver'];
        this._isSick = false;
        this._colors = [0x34b1eb,0xfcdb03]
        this._events = new Phaser.Events.EventEmitter();
    }
    
    set name(value){
        this.stats['name'] = value;
    }
    get name(){
        return this.stats['name'];
    }
    getColor(){
        return this._isSick === true ? this._colors[0]:this._colors[1];
    }
    getSick(){
        this._isSick = true;
        this._events.emit(AgentStatsEvents.AgentSickEvent,true);
    }
    
    
}