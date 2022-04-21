import { useEffect, useState } from 'react'
import mintPhases from '../data/phases'

// Returns mint phases objects, current mintphase, and time to remaining mintphase
export const useMintPhases = () => {
  const [currentPhase, setCurrentPhase] = useState(null)
  const [currentPhaseName, setCurrentPhaseName] = useState(null)
  const [countdown, setCountdown] = useState(null)

  // Set the date we're counting down to
  const countDownDate = new Date('Jan 5, 2024 15:37:25').getTime()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(calculateTimeLeft(countDownDate))
    }, 1000)

    return () => clearTimeout(timer)
  })

  const calculateTimeLeft = (countDownDate: number) => {
    const now = new Date().getTime()

    // Find the distance between now and the count down date
    const distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    let countdown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
    return countdown
  }
  // mintPhases.forEach((phase, index) => {
  //   if (
  //     now > phase.startTimestamp &&
  //     now < mintPhases[index + 1].startTimestamp
  //   ) {
  //     setCurrentPhase(phase)
  //     console.log('we made it', index, phase)
  //     setCurrentPhase(index + 1)
  //   }
  // })

  return [...mintPhases, countdown]
}
