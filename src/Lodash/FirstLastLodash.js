import React from 'react'
import _ from 'lodash'

export default function FirstLastLodash() {

    const arrStudent = [
        {id:1, name:'peter'},
        {id:2, name:'barry'},
        {id:3, name:'iris'},
    ]

    const FirstItem = _.first(arrStudent)
    const LastItem = _.last(arrStudent)

    const arr = [['001','alice'],['002','pop'],['003','bary']]
    const [id,name] = _.first(arr);
    const [id2,name2] = _.last(arr)

    return (
        <div>
            <div>FirstItem: {FirstItem.name}</div>
            <div>LastItem: {LastItem.name}</div>
            <div>FirstItem: {id} - {name}</div>
            <div>LastItem: {id2} - {name2}</div>
        </div>
    )
}
