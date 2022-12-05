import { Record, RecordId, Storage } from "./Storage";

export interface Service<T, TData> {
    getAll(): Promise<T[]> 
    getById(id: RecordId): Promise<T> 
    create(data: TData): Promise<T> 
    update(id: RecordId, data: TData): Promise<T> 
    delete(id: RecordId): Promise<void>
}

export abstract class DataService<T, TData> implements Service<T, TData> {
    protected name: string;
    constructor(
        private storage: Storage
    ) { }

    async getAll(): Promise<T[]> {
        const records = (await this.storage.getAll(this.name)).map(r => this.parseRecord(r));
        return records;
    }
    async getById(id: RecordId): Promise<T> {
        const record = await this.storage.getById(this.name, id);
        return this.parseRecord(record);
    }
    async create(data: TData): Promise<T> {
        this.validate(data);
        const record = await this.storage.create(this.name, data);
        return this.parseRecord(record);

    }
    async update(id: RecordId, data: TData): Promise<T> {
        this.validate(data);
        const record = await this.storage.update(this.name, id, data);
        return this.parseRecord(record);
    }
    async delete(id: RecordId): Promise<void> {
        return this.storage.delete(this.name, id);
    }

    protected abstract parseRecord(record: Record): T;
    protected abstract validate(data: TData): void;

}
