export const Countdown = ({ time }) => {
  return (
    <div className="flex">
      {Object.keys(time).map((key, index) => {
        return (
          <div
            key={index}
            className="mx-4 flex flex-col items-center justify-center sm:mx-10"
          >
            <span className="text-xl sm:text-6xl">{time[key]}</span>
            <span className="text-sm">{key}</span>
          </div>
        )
      })}
    </div>
  )
}
