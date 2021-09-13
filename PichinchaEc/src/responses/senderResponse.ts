class Sender{
    public message: String;
    public to: String;
    public from: String;
    public timeToLifeSec: Number;
    constructor({
        message = undefined,
        to = undefined,
        from = undefined,
        timeToLifeSec = undefined
    }){
        this.message = message;
        this.to = to;
        this.from = from;
        this.timeToLifeSec = timeToLifeSec
    }
}

export default Sender;