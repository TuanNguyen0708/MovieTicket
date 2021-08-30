import React from 'react'
import _ from 'lodash'
export default function UniqLodashDemo() {

    const arr = [1,2,2,2,4,5,6]
    console.log(_.uniq(arr))


    const arr2 = [
        {id:1,name:'iphonex',price:1000},
        {id:2,name:'iphonexs',price:2000},
        {id:3,name:'iphonexsmax',price:3000},
        {id:1,name:'iphonex',price:1000},
        {id:1,name:'iphonex',price:1000},
        {id:1,name:'iphonex',price:1000}
    ]
    console.log(_.uniqBy(arr2,'id'))



    return (
        <div>
            ghghgh
        </div>
    )
}
