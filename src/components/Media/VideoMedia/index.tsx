'use client'

import { cn } from 'src/utilities/cn'
import React, { Ref, useCallback, useEffect, useRef, useState } from 'react'
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
import { useIsVisible } from '@/hooks/use-is-visible'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(true)
  const [showFallback, setShowLoading] = useState<boolean>(true)
  const [videoDuration, setVideoDuration] = useState<number>()
  const [videoProgress, setVideoProgress] = useState<number>(0)
  const { isVisible, targetRef } = useIsVisible(
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
    false,
  )

  const startVideoOnMouseMove = useCallback(async () => {
    try {
      const video = videoRef.current
      if (video) {
        await video.play()
        setVideoDuration(video.duration)
        setShowLoading(false)
        setIsPaused(false)
      }
    } catch (e) {
      // do nothing
    }
  }, [])

  const stopVideoOnMouseMove = useCallback(() => {
    try {
      const video = videoRef.current
      if (video) {
        video.pause()
        setIsPaused(true)
      }
    } catch (e) {
      // do nothing
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      startVideoOnMouseMove()
      console.log('visible')
    } else {
      stopVideoOnMouseMove()
      console.log('not visible')
    }
  }, [isVisible, startVideoOnMouseMove, stopVideoOnMouseMove, showFallback])

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

  const onPlayPause = async () => {
    const video = videoRef.current
    if (video) {
      setIsPaused(!video.paused)
      if (video.paused) await video.play()
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
      <div className="relative cursor-pointer h-full bg-zinc-950 " ref={targetRef as any}>
        {showFallback && (
          <div className="absolute inset-0 z-50  justify-center w-full h-full flex mx-0 m-auto place-items-center">
            <TextShimmerWave className="[--base-color:#dbdbdb] [--base-gradient-color:#ffffff]">
              Загружаем видео...
            </TextShimmerWave>
          </div>
        )}
        {!showFallback && (
          <VideoControls
            isMuted={isMuted}
            isPaused={isPaused}
            onMute={onMute}
            onPlayPause={onPlayPause}
            progress={videoProgress}
          />
        )}
        <Player
          autoPlay={false}
          playsInline
          controls={false}
          loop
          poster="0ucJFYI3lohfdohYl8hleZ+h80wb"
          blurDataURL="0ucJFYI3lohfdohYl8hleZ+h80wb"
          muted={isMuted}
          ref={videoRef}
          className={cn(videoClassName)}
          src={`${getClientSideURL()}/api/videos/file/${filename}`}
          onCanPlay={(e) => {
            setVideoDuration(e.currentTarget.duration)
            setShowLoading(false)
          }}
        />
      </div>
    )
  }

  return null
}
