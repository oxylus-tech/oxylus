import * as utils from './functional'

const objs = [
    {"a": 12, "b": 13, "c": 14},
    {"a": 15, "b": 16, "c": 0},
    {"a": 17, "b": 17, "c": [14, 16, 18]}
]


describe("collectAttr", () => {
    test("collect simple attribute", () => {
        expect(utils.collectAttr(objs, "a")).toEqual(new Set([12, 15, 17]))
        expect(utils.collectAttr(objs, "b")).toEqual(new Set([13, 16, 17]))
    })

    test("collect attribute with array", () => {
        expect(utils.collectAttr(objs, "c")).toEqual(new Set([14, 0, 16, 18]))
    })

    // TODO: missing value
})


describe("mapToObject", () => {
    test("map array of keys and object", () => {
        expect(utils.mapToObject(["a", "b"], objs[0])).toEqual({"a": 12, "b": 13})
    })

    test("map keys of an object and object", () => {
        expect(utils.mapToObject(objs[0], objs[1])).toEqual({"a": 15, "b": 16, "c": 0})
    })

    test("map keys and function", () => {
        expect(utils.mapToObject(["a", "b", "c"], (v) => v.toUpperCase()))
            .toEqual({"a": "A", "b": "B", "c": "C"})
    })
})
