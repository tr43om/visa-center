'use client'

import { cn } from 'src/utilities/cn'
import React, { Ref, useEffect, useRef, useState } from 'react'
import type { Props as MediaProps } from '../types'

import { getClientSideURL } from '@/utilities/getURL'
import { Button } from '@/components/ui/button'
import {
  RiPauseMiniFill,
  RiPlayCircleFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from '@remixicon/react'
import Player from 'next-video/player'
import { VideoControls } from './video-controls'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showFallback, setShowLoading] = useState<boolean>()
  const [videoDuration, setVideoDuration] = useState<number>()
  const [videoProgress, setVideoProgress] = useState<number>(0)

  useEffect(() => {
    if (isPaused) return
    const currentTime = videoRef.current?.currentTime
    if (videoDuration != null && currentTime != null) {
      const loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001)
        } else {
          setVideoProgress(currentTime / videoDuration)
        }
      }, 10)

      return () => {
        clearTimeout(loadingTimeout)
      }
    }
  }, [videoProgress, videoDuration, isPaused])

  const onPlayPause = () => {
    const video = videoRef.current
    if (video) {
      setIsPaused(!video.paused)
      if (video.paused) video.play()
      else video.pause()
    }
  }

  const onMute = () => {
    const video = videoRef.current
    if (video) {
      setIsMuted(!video.muted)
      video.muted = !video.muted
    }
  }

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <div className="relative cursor-pointer h-full">
        <VideoControls
          isMuted={isMuted}
          isPaused={isPaused}
          onMute={onMute}
          onPlayPause={onPlayPause}
          progress={videoProgress}
        />
        <Player
          autoPlay
          playsInline
          controls={false}
          loop
          poster="0ucJFYI3lohfdohYl8hleZ+h80wb"
          blurDataURL="0ucJFYI3lohfdohYl8hleZ+h80wb"
          muted={isMuted}
          ref={videoRef}
          className={cn(videoClassName)}
          src={`${getClientSideURL()}/api/videos/file/${filename}`}
          onCanPlay={(e) => setVideoDuration(e.currentTarget.duration)}
        >
          loading
        </Player>
      </div>
    )
  }

  return null
}
