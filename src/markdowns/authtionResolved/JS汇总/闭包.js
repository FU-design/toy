function createComparisonFunction(propertyName) {
    return function (obj1, obj2) {
        let val1 = obj1[propertyName]
        let val2 = obj2[propertyName]

        if (val1 < val2) {
            return function () {
                return val1
            }
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }

    }
}
const a = {
    foo: 2
}
const b = {
    foo: 3
}
console.dir(createComparisonFunction('foo')(a, b))


