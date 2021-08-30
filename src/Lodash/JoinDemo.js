import React from 'react'
import _ from 'lodash'

export default function JoinDemo() {

    let arr = ['tuan','nam','hoang']

    let arrPerson = [
        {id:1, name:'tuan'},
        {id:2, name:'nam'},
        {id:3, name:'hoang'},
    ]
    //es6
    const result = arr.join('-')

    //lodash
    const result2 = _.join(arr,'*')

    const Person = _.find(arrPerson,item=>item.id===2)

    return (
        <div>
            {result}
            <br />
            {result2}
            <br />
            <p>Name: {Person.name} - id: {Person.id}</p>
        </div>
    )
}
