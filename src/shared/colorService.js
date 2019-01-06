const colorMap = {
    orange: [ '#B05C30', '#E9C350'],
    blue: ['#375264', '#86C6E0'],
    green: ['#466626', '#99D158'],
    gray: ['#C1C1C1', '#6B6B6B']
};
/**
 * Helper function that returns a list of two colors (first darker, second lighter)
 * 
 * @param {String} color Color that we want
 * 
 * @return {Array} Array of two Hex Color Codes 
 */
export function getColor(color) {
    if (!['orange', 'blue', 'green', 'gray'].includes(color)) {
        throw new Error('Invalid color');
    }
    return colorMap[color];
}