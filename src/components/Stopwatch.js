/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef} from 'react'


const Stopwatch = ({ setTime, stopTimer }) => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)
    }

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    useEffect(() => {
        handleStart()
        return () => {
            handlePause()
        }
    }, [])
    
    useEffect(() => {
        if (stopTimer) {
            handlePause()
            setTime(timer)
        }
    })
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    return (
        <div className='stopwatch-card'>
            <p>{getMinutes}:{getSeconds}</p>
        </div>
    );


}

export default Stopwatch
