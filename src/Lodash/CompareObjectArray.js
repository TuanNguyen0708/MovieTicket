import React from 'react'
import _ from 'lodash'
export default function CompareObjectArray() {
    const arrA = [1,2]
    const arrB = [2,1]
 
    const result = _.isEqual(arrA.sort(),arrB.sort())
    console.log(result);


    const arrObject1 = [
        {id:1,name:'tuan'},
        {id:2,name:'minh'}
    ]
    const arrObject2 = [
        {id:1,name:'tuan'},
        {id:2,name:'minh'},
        {id:3,name:'hang'},
    ]
    const result2 = _.differenceWith(arrObject2,arrObject1,_.isEqual)
    console.log(result2)

    return (
        <div>
            sfwer
        </div>
    )
}
