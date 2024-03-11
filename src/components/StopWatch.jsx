/* eslint-disable tailwindcss/no-custom-classname */
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import ButtonIcon from './ButtonIcon'
import { IconPause, IconPlay, IconStop, IconWatch } from './Icons'

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const timeInterval = useRef(null)
  const startedTime = useRef(null)

  const handleStart = () => {
    if (isRunning) return
    setIsRunning(true)

    // If the stopwatch is paused, add the time that has already passed
    startedTime.current = dayjs().valueOf() - currentTime * 10

    timeInterval.current = setInterval(() => {
      // Calculate the difference between the current time and the started time.
      // This ensures that if the browser tab becomes inactive, the time calculation is still correct.
      const difference = dayjs().diff(startedTime.current, 'millisecond') / 10
      setCurrentTime(difference)
    }, 10)
  }

  const handlePause = () => {
    if (!isRunning) return
    setIsRunning(false)
    clearInterval(timeInterval.current)
  }

  const handleReset = () => {
    setIsRunning(false)
    clearInterval(timeInterval.current)
    setCurrentTime(0)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor((time / 100) % 60)
      .toString()
      .padStart(2, '0')
    const milliseconds = Math.floor(time % 100)
      .toString()
      .padStart(2, '0')

    return `${minutes}:${seconds}:${milliseconds}`
  }

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current)
      }
    }
  }, [])

  return (
    <div className="fixed -bottom-2 left-2 z-[9999]">
      <ReactGridLayout
        rowHeight={60}
        cols={1}
        isResizable={false}
        draggableHandle=".draggable"
      >
        <span
          key="stopwatch"
          className="flex select-none items-center justify-between gap-6 rounded-full rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-customLightPurple p-4 text-customPurple shadow-customClassic"
        >
          <ButtonIcon
            className="!gap-2 bg-customLightPurple text-customDarkBlue shadow-none"
            onClick={handleReset}
          >
            <IconStop className="size-6" title="Reset icon" />
            <span className="hidden font-bold sm:block">Reset</span>
          </ButtonIcon>
          <span className="draggable flex gap-2 text-customDarkBlue">
            <IconWatch
              className={`size-5 ${
                currentTime >= 18000 ? 'text-customRed' : 'text-customPurple  '
              }`}
            />
            <p>{formatTime(currentTime)}</p>
          </span>
          {!isRunning && (
            <ButtonIcon
              className="!gap-2 bg-customLightPurple text-customDarkBlue shadow-none"
              onClick={handleStart}
            >
              <span className="hidden font-bold sm:block">Play</span>
              <IconPlay className="size-6" title="Reset icon" />
            </ButtonIcon>
          )}
          {isRunning && (
            <ButtonIcon
              className="!gap-2 bg-customLightPurple text-customDarkBlue shadow-none"
              onClick={handlePause}
            >
              <span className="hidden font-bold sm:block">Stop</span>
              <IconPause className="size-6" title="Reset icon" />
            </ButtonIcon>
          )}
        </span>
      </ReactGridLayout>
    </div>
  )
}
export default StopWatch
