import React from 'react'

export default function DemoGrid() {
    return (
        <div className='container grid grid-cols-5 text-center gap-2'>
            <div className='bg-blue-300'>1</div>
            <div className='bg-red-300'>2</div>
            <div className='bg-green-300'>3</div>
            <div className='bg-purple-300'>4</div>
            <div className='bg-yellow-300'>5</div>
        </div>
    )
}
