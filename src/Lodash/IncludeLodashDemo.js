import React from 'react'
import _ from 'lodash'

export default function IncludeLodashDemo() {

    const arr = ['1','2','3'];
    console.log(_.includes(arr,'1'))


    const object = {id:1, name:'nguyen van a', age:10}

    console.log(_.includes(object,10))

    return (
        <div>
            123123
        </div>
    )
}
