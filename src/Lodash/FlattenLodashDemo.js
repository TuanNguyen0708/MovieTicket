import React from 'react'
import _, { flattenDeep } from 'lodash'

export default function FlattenLodashDemo() {
    const arr = [[1,[2,[3,[4]]],5]]

    console.log(_.flatten(arr))
    console.log(flattenDeep(arr))



    return (
        <div>
            ádasd1
        </div>
    )
}
