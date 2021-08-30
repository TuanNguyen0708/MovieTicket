import _ from 'lodash'
import React from 'react'

export default function FillLodashDemo() {
    const arr= [
        {id:1,name:'Iphone'},
        {id:2,name:'Iphone X'},
        {id:3,name:'Iphone XS'},
        {id:4,name:'Iphone XS Max'},
        {id:5,name:'Iphone 11'}
    ]

    _.fill(arr,{id:'4',name:'SS galaxy s10'},1,4)
    console.log(arr)
    return (
        <div>
            123
        </div>
    )
}
