export enum BatchStatus{
    ADMIN = 'ADMIN',
    INSPECTOR = 'INSPECTOR',
    HARVESTER = 'HARVESTER',
    EXPORTER = 'EXPORTER',
    IMPORTER = 'IMPORTER'
}

export interface BatchAsset {
    uuid: string;
    status: BatchStatus;
    createdAt: Date;    
    coffeeFamily?: string;
    typeofSeed?: string;
    fertilizerUsed?: string;
    coffeeVariety?: string;
    temperature?: string;
    humidity?: string; 
    destAddr?: string;
    shipName?: string;
    shipNo?: string; 
    estimatedDatetime?: string;
    exporterId?: string; 
    transportInfo?: string;
    warehouseName?: string; 
    warehouseAddr?: string;
    importerId?: string;
    roastingTemp?: string;
    packagingDatetime?: Date;
    timeForRoasting?: string;
    processorName?: string;
    processorAddr?: string; 
    exportedQuantity?: string;
    importedQuantity?: string; 
    processedQuantity?: string;
    cultivator?: SystemUser;
    cultivatedAt?: Date;
    farmInspector?: SystemUser;
    inspectedAt?: Date;
    harvestedAt?: Date;
    exportedAt?: Date; 
    importedAt?: Date;
    processedAt?: Date;
}

export interface TxCultivate{
    cultivator: SystemUser;
    batchId?: string;
    cultivatedAt: Date;
}

export interface TxInspect{
    inspector:SystemUser;
    batchId: string;
    batch: BatchAsset;
    previousHandler: SystemUser;
    currentHandler: SystemUser;
    typeofSeed: string; 
    coffeeFamily: string;
    fertilizerUsed: string;
    batchstatus: BatchStatus;
    inspectedAt?: Date;
}
