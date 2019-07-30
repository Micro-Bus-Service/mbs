/// <reference types="../types/Service" />

export default class Service {
    private name: string;
    private version: string;
    private ip: string;
    private port: number;
    private messageAccepted: string[];
    private url: string;
    private uuid?: string;

    constructor(data: ServiceInterface) {
        this.name = data.name;
        this.version = data.version;
        this.ip = data.ip;
        this.port = data.port;
        this.messageAccepted = data.messageAccepted;
        this.url = data.url;
        this.uuid = data.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getVersion(): string {
        return this.version;
    }

    public setVersion(version: string): void {
        this.version = version;
    }

    public getIp(): string {
        return this.ip;
    }

    public setIp(ip: string): void {
        this.ip = ip;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number): void {
        this.port = port;
    }

    public getMessageAccepted(): string[] {
        return this.messageAccepted;
    }

    public setMessageAccepted(messageAccepted: string[]): void {
        this.messageAccepted = messageAccepted;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getUuid?(): string|undefined {
        return this.uuid;
    }

    public setUuid?(uuid: string): void {
        this.uuid = uuid;
    }
}
