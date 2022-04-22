type CountdownProps = {
  time: string
}

export const Countdown = ({ time }: CountdownProps) => (
  <div>Time until next phase: {time}</div>
)
