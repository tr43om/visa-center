import {
  RiPauseMiniFill,
  RiPlayCircleFill,
  RiPlayFill,
  RiPlayLine,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from '@remixicon/react'

type VideoControlsProps = {
  progress: number
  size?: number | undefined
  width?: number | undefined
  isPaused: boolean
  isMuted: boolean
  onPlayPause: () => void
  onMute: () => void
}

export const VideoControls = ({
  isPaused,
  isMuted,
  onPlayPause,
  progress,
  size = 38,
  width = 3,
  onMute,
}: VideoControlsProps) => {
  const center = size / 2
  const radius = center - width
  const dashArray = 2 * Math.PI * radius
  const dashOffset = dashArray * (1 - progress)

  console.log({ dashArray, dashOffset, progress })

  return (
    <div
      className="top-1/2 absolute z-50 right-4 -translate-y-1/2 grid gap-2  justify-items-center"
      onClick={() => console.log('first')}
    >
      <div className="relative flex justify-center items-center">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#aaaaaa"
            strokeWidth={width}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#ffffff"
            strokeWidth={width}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute">
          <button
            onClick={onPlayPause}
            className="text-white group cursor-pointer flex justify-center items-center"
          >
            <div className=" fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200 ease-in-out">
              {isPaused ? <RiPlayFill /> : <RiPauseMiniFill />}
            </div>
          </button>
        </div>
      </div>
      <button onClick={onMute} className="text-white">
        {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
      </button>
    </div>
  )
}
