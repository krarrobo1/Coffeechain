import { Context, Contract } from "fabric-contract-api";
import { v4 as uuidv4 } from 'uuid';
import { BatchStatus, TxCultivate, BatchAsset, TxInspect } from 'shared/models/batch';
import { parseUint } from 'shared/utils/decoder';
import { isProducer, isInspector } from 'shared/utils/userValidation';


class DemoContract extends Contract{
    constructor(){
        super("DemoContract");
    }
    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async getBatchById(ctx: Context, batchId: string){
        return await ctx.stub.getState(batchId);
    }

    async batchCultivation(ctx: Context, txCultivate: TxCultivate): Promise<void>{
        if(!isProducer(txCultivate.cultivator)) throw new Error('Unauthorized');
        if(txCultivate.batchId){
            const alreadyExists = await this.getBatchById(ctx, txCultivate.batchId)
            if(alreadyExists) throw new Error(`Batch with ${txCultivate.batchId} already exists`)
        }
        const batch: BatchAsset = {
            uuid: txCultivate.batchId ?? uuidv4(),
            status: BatchStatus.ADMIN,
            createdAt: new Date(),
            cultivatedAt: txCultivate.cultivatedAt ?? new Date(),
            cultivator: txCultivate.cultivator
        }
        await ctx.stub.putState(batch.uuid, Buffer.from(JSON.stringify(batch)));
    }


    async batchFarmInspection(ctx: Context, txInspect: TxInspect){
        if(!isInspector(txInspect.inspector)) throw new Error('Unauthorized');
        const toBeInspected = await this.getBatchById(ctx, txInspect.batchId);
        if(!toBeInspected) throw new Error(`Batch with ${txInspect.batchId} does not exist!`);

        const batch = parseUint<BatchAsset>(toBeInspected);
        batch.cultivator = txInspect.previousHandler;
        batch.farmInspector = txInspect.currentHandler;
        batch.typeofSeed = txInspect.typeofSeed;
        batch.coffeeFamily  = txInspect.coffeeFamily;
        batch.fertilizerUsed = txInspect.fertilizerUsed;
        batch.status = txInspect.batchstatus;
        batch.inspectedAt = new Date();

        await ctx.stub.putState(batch.uuid, Buffer.from(JSON.stringify(batch)));
    }
}

export const contracts = [DemoContract];
