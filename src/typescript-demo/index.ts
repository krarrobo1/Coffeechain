import { Context, Contract } from "fabric-contract-api";

class DemoContract extends Contract{
    constructor(){
        super("DemoContract");
    }
    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async put(ctx: Context, key: string, value: string){
        await ctx.stub.putState(key, Buffer.from(value));
    }

    async get(ctx: Context, key: string) {
        const buffer = await ctx.stub.getState(key);
        if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
        return { success: buffer.toString() };
    }
}

export const contracts = [DemoContract];