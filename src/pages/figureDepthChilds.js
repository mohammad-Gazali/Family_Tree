export function getDepth(fathers, indexedId) {
    let target;
    fathers.forEach(father => {
        if (father.id === indexedId) {
            target = father.depth
        }
    })
    target++;

    return target
}


export function getChilds(fathers, indexedId) {
    let target;
    fathers.forEach(father => {
        if (father.id === indexedId) {
            target = father.direct_children.map(item => ({ id: item.id }))
        }
    })

    return target
}