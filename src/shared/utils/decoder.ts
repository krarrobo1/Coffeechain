export const parseUint = <T>(input: Uint8Array) =>{
    const data = new TextDecoder("utf-8").decode(input);
    return <T> JSON.parse(data);
}
