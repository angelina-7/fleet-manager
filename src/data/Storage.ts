export type RecordId = string;

export interface Record {
    id: RecordId
};

export interface Storage {
    getAll(collectionName: string): Promise<Record[]>;
    getById(collectionName:string, id: RecordId): Promise<Record>;
    create(collectionName: string, data: any): Promise<Record>;
    update(collectionName: string, id: RecordId, data: any): Promise<Record>;
    delete(collectionName:string, id: RecordId): Promise<void>;

}