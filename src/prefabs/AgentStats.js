export const AgentStatsEvents = {
    AgentSickEvent:'AgentSickEvents'
}
export class AgentsStats{
    
    constructor(){
        this.stats = {};
        this.nameCollection = ['Duce','John','Smith','Oliver'];
        this._isSick = false;
        this._colors = [0xff0000,0xffffff]
        this._events = new Phaser.Events.EventEmitter();
    }
    
    set name(value){
        this._name = value;
    }
    get name(){
        return this._name;
    }
    random(){
        this._name = this.nameCollection[Phaser.Math.Between(0,this.nameCollection.length-1)];
        var sickChance = Phaser.Math.Between(0,100);
        if(sickChance > 90){
            this._isSick = true;
        }
        else {
            this._isSick = false;
        }
        
    }
    getColor(){
        return this._isSick === true ? this._colors[0]:this._colors[1];
    }
    getSick(){
        this._isSick = true;
        this._events.emit(AgentStatsEvents.AgentSickEvent,true);
    }
    
    
}