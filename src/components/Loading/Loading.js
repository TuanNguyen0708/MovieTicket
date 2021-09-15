import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer)



    return (
        <Fragment>
            {isLoading ?
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '20' }}>
                <div className='text-4xl text-white'>
                    <img src='https://i.stack.imgur.com/kOnzy.gif' style={{ width: 100, height: 100, backgroundColor: 'transparent' }} />
                </div>
            </div> : ''}
        </Fragment>
    )
}
