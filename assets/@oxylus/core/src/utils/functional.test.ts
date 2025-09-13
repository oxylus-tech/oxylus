import {reactive} from 'vue'
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


describe("assignNonEmpty", () => {
    test("assign keys except null and undefined"), () => {
        const target = {}
        const source = {"a": 12, "b": 0.0, "c": null, "d": [], "e": 0}

        expect(utils.assignNonEmpty(target, source)).toEqual({"a": 12, "b": 0.0, "d": [], "e": 0})
    }
})

describe("reset", () => {
    test("reset object assign values", () => {
        expect(utils.reset({...objs[0]}, objs[1])).toEqual(objs[1])
    })

    test("reset object skip undefined values", () => {
        expect(utils.reset({...objs[0]}, {"a": 12, "b": undefined})).toEqual({"a": 12})
    })

    test("reset object to empty object", () => {
        expect(utils.reset({...objs[0]})).toEqual({})
    })
})


describe("ifNotEqual", () => {
    test("equal with reactive objects", () => {
        expect(utils.ifNotEqual(objs[0], reactive(objs[0]), () => 1)).toEqual(undefined)
    })

    test("not equal with reactive objects", () => {
        expect(utils.ifNotEqual(objs[0], reactive(objs[1]), () => 1)).toEqual(1)
    })
})
