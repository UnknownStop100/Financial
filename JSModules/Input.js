export function getNumber(id){
    const element = document.getElementById(id);
    const value = parseFloat(element.value);
    return isNaN(value) ? 0 : value;
};
export function getSelectValue(id){
    const element = document.getElementById(id);
    return element.value;
}
export function validateNumber(value){
    return !isNaN(value) && value >= 0;
}