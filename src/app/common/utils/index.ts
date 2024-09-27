export * from './set-properties-in-objet';
export const isCellphone = (val: any): boolean => {
    const regex = /^\+\d+ \d{3} \d{3} \d{4}$/;
    if (typeof val == 'string'){
        return regex.test(val);
    }
    return false;
}
