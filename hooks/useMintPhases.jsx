import { useEffect, useState } from 'react'
import mintPhases from '../data/phases'

const calculateTimeLeft = (countDownDate) => {
  const now = new Date().getTime()

  // Find the distance between now and the count down date
  const distance = countDownDate - now

  // Time calculations for days, hours, minutes and seconds
  const DAYS = Math.floor(distance / (1000 * 60 * 60 * 24))
  const HOURS = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const MINS = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const SECS = Math.floor((distance % (1000 * 60)) / 1000)

  // Display the result in the element with id="demo"
  const countdown = {
    DAYS,
    HOURS,
    MINS,
    SECS,
  }
  return countdown
}

// Returns an index
const determineMintPhaseIndex = () => {
  const now = new Date().getTime()
  const phaseIndex = mintPhases.findIndex((phase, index) => {
    if (
      now > phase.startTimestamp &&
      now < mintPhases[index + 1]?.startTimestamp
    ) {
      return true
    } else if (index === mintPhases.length - 1) {
      return true
    } else {
      return false
    }
  })

  return phaseIndex
}

// Returns mint phases objects, current mintphase, and time to remaining mintphase
export const useMintPhases = () => {
  const [currentPhaseName, setCurrentPhaseName] = useState('')
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [countdown, setCountdown] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPhaseIndex(determineMintPhaseIndex())
      setCurrentPhaseName(mintPhases[currentPhaseIndex]?.name)

      if (currentPhaseIndex === mintPhases.length - 1) {
        // If we're in the last phase, no more countdown
        setCountdown('')
      } else {
        setCountdown(
          calculateTimeLeft(
            new Date(mintPhases[currentPhaseIndex + 1].startTimestamp).getTime()
          )
        )
      }
    }, 1000)
    return () => clearTimeout(timer)
  })
  return [countdown, currentPhaseName, currentPhaseIndex]
}
