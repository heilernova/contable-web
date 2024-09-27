export const setPropertiesInObject = <V = { [key: string]:  any }>(obj: any, value: any ) => {
    let properties: PropertyDescriptorMap = {};
    let entries = Object.entries(value)
    entries.forEach(entry => {
        properties[entry[0]] = { 
            writable: false,
            value: entry[1]
        }
    })
    Object.defineProperties(obj, properties);
}