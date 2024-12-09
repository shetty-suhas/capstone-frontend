export class EventUser {
    id: any;
    name: string;
    password: string;

    constructor(
        name: any,
        password: string,
        id: string | null
    ) {
        this.name = name;
        this.password = password;
        this.id = id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            password: this.password
        };
    }

    static fromJSON(json: any): EventUser {
        return new EventUser(
            json.name,
            json.password,
            json.id
        );
    }
}