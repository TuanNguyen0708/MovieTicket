import React from 'react'
import _ from 'lodash'
export default function SortLodashDEmo() {


    const user = [
        {id:5,name:'tuan',age:'20'},
        {id:7,name:'thanh',age:'22'},
        {id:3,name:'tuan',age:'19'},
        {id:6,name:'tu',age:'21'}
    ]

    const resultSortByAge = _.sortBy(user,['age'])
    console.log(resultSortByAge)

    const resultSortByName = _.sortBy(user,['name', 'age'])
    console.log(resultSortByName)

    return (
        <div>
            12322
        </div>
    )
}
