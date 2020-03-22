export const typesOfCommunication ={ 
    information:{
        title:'information',
        factor:0,
        color:0x34b1eb,
    },
    direct:{
        title:'direct',
        factor:0,
        color:0xfc5203,
    },
    methaphores: {
        title:'metaphore',
        factor:0,
        color:0xfcdb03
    }
}

export class AgentsStats{
    
    constructor(){
        this.stats = {};
        this._trust = Phaser.Math.Between(25,75); 
        this._communicationStyles = Object.assign({},typesOfCommunication);
        this.nameCollection = ['Dave','John','Smith','Oliver'];
        
    }
    
    set name(value){
        this.stats['name'] = value;
    }
    get name(){
        return this.stats['name'];
    }
    getStyleColor(){
        return this._prefferedStyle.color;
    }
    setCommunicationStyle(informationFactor,directFactor,metaphoresFactor){
        this._communicationStyles.direct.factor = directFactor;
        this._communicationStyles.methaphores.factor = metaphoresFactor;
        this._communicationStyles.information.factor = informationFactor;
        
    }
    applyPowerUpHandler(style){
        // apply bonus 
        if(style == this._prefferedStyle.title)
        {
            this._trust = Phaser.Math.Clamp(this._trust+2,0,100);      
        }
        
        // apply penalty 
        if(style == this._leastPrefferedStyle.title)
        {
            this._trust -= Phaser.Math.Clamp(this._trust-2,0,100);
        }
        
    }

    randomStats(){
        this.setCommunicationStyle(
            Phaser.Math.Between(15,95),
            Phaser.Math.Between(15,95),
            Phaser.Math.Between(15,95));
        
        var stylesArray = [this._communicationStyles.direct.factor,
            this._communicationStyles.information.factor,
            this._communicationStyles.methaphores.factor];
        
        this._prefferedStyle = this._communicationStyles.direct;
        this._leastPrefferedStyle = this._communicationStyles.information;
        console.log(stylesArray);
        if(Math.max(...stylesArray)===this._communicationStyles.direct.factor){

            this._prefferedStyle = this._communicationStyles.direct;
        }
        if(Math.max(...stylesArray)===this._communicationStyles.information.factor){
            this._prefferedStyle = this._communicationStyles.information;
        }
        if(Math.max(...stylesArray)===this._communicationStyles.methaphores.factor){
            this._prefferedStyle = this._communicationStyles.methaphores;
        }
        
        if(Math.min(...stylesArray)===this._communicationStyles.direct.factor){
            this._leastPrefferedStyle = this._communicationStyles.direct;
        }
        if(Math.min(...stylesArray)===this._communicationStyles.information.factor){
            this._leastPrefferedStyle = this._communicationStyles.information;
        }
        if(Math.min(...stylesArray)===this._communicationStyles.methaphores.factor){
            this._leastPrefferedStyle = this._communicationStyles.methaphores;
        }
        this.stats['name'] = this.nameCollection[Phaser.Math.Between(0,this.nameCollection.length-1)];
        // set starting trust by random value 
    }

    
}