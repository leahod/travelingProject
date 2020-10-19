export class User {
    
    public Identity: string;
    public Name: string;
    public Mail:string;
    public Gender: boolean;

    constructor(identity:string, name:string,mail:string,gender: boolean) {
        this.Identity = identity;
        this.Name = name;
        this.Mail=mail;
        this.Gender=gender;
    }
}