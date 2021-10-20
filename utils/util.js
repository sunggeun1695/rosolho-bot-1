module.exports = class Util {
    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }
}