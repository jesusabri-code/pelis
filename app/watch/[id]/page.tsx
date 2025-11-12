"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Play, Plus, ThumbsUp, Volume2, VolumeX, ArrowLeft, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Hls from "hls.js"

interface JellyfinItem {
  Id: string
  Name: string
  Overview?: string
  ImageTags?: {
    Primary?: string
  }
  PremiereDate?: string
  CommunityRating?: number
  RunTimeTicks?: number
  Genres?: string[]
  ProductionYear?: number
  Taglines?: string[]
  Type: string
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<JellyfinItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [episodes, setEpisodes] = useState<JellyfinItem[]>([])
  const [relatedEpisodes, setRelatedEpisodes] = useState<JellyfinItem[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // Primero intentar buscar en películas
        const moviesResponse = await fetch(
          `https://nas.mypelis.site/emby/Items?ParentId=7395ad25fd6ccc51e38fc3a842c6b8bd&api_key=516ea09a9b5d47a0a53d590f47a72124`
        )
        const moviesData = await moviesResponse.json()
        const foundItem = moviesData.Items?.find((item: any) => item.Id === params.id)

        if (foundItem) {
          setItem({ ...foundItem, Type: "Movie" })
          setLoading(false)
          return
        }

        // Si no está en películas, buscar en series
        const seriesResponse = await fetch(
          `https://nas.mypelis.site/emby/Items?ParentId=155afb96767843735a9ee8e8c7699399&api_key=516ea09a9b5d47a0a53d590f47a72124`
        )
        const seriesData = await seriesResponse.json()
        const foundSeries = seriesData.Items?.find((item: any) => item.Id === params.id)

        if (foundSeries) {
          setItem({ ...foundSeries, Type: "Series" })

          // Cargar todo el contenido de la serie
          const contentResponse = await fetch(
            `https://nas.mypelis.site/emby/Items?ParentId=${params.id}&api_key=516ea09a9b5d47a0a53d590f47a72124`
          )
          const contentData = await contentResponse.json()

          // Separar archivos de video (episodios sueltos) y carpetas (temporadas)
          const videos = (contentData.Items || []).filter((item: any) => !item.IsFolder && item.Type === "Movie")
          const folders = (contentData.Items || []).filter((item: any) => item.IsFolder)

          let allEpisodes: any[] = [...videos]

          // Cargar episodios dentro de cada carpeta de temporada
          for (const folder of folders) {
            const episodesResponse = await fetch(
              `https://nas.mypelis.site/emby/Items?ParentId=${folder.Id}&api_key=516ea09a9b5d47a0a53d590f47a72124`
            )
            const episodesData = await episodesResponse.json()
            const folderVideos = (episodesData.Items || []).filter((item: any) => !item.IsFolder && item.Type === "Movie")
            allEpisodes = [...allEpisodes, ...folderVideos]
          }

          // Ordenar episodios por nombre
          allEpisodes.sort((a, b) => a.Name.localeCompare(b.Name))

          setEpisodes(allEpisodes)
          setLoading(false)
          return
        }

        // Si no es ni película ni serie, buscar recursivamente en todas las series por episodios
        const allSeriesContent = await fetch(
          `https://nas.mypelis.site/emby/Items?ParentId=155afb96767843735a9ee8e8c7699399&api_key=516ea09a9b5d47a0a53d590f47a72124&Recursive=true`
        )
        const allContent = await allSeriesContent.json()
        const foundEpisode = allContent.Items?.find((item: any) => item.Id === params.id)

        if (foundEpisode) {
          setItem({ ...foundEpisode, Type: "Episode" })

          // Cargar todos los episodios de la misma serie para mostrar el siguiente
          const parentId = foundEpisode.ParentId || foundEpisode.SeriesId

          if (parentId) {
            // Buscar la serie padre
            let seriesId = parentId
            const parentResponse = await fetch(
              `https://nas.mypelis.site/emby/Items?ParentId=155afb96767843735a9ee8e8c7699399&api_key=516ea09a9b5d47a0a53d590f47a72124`
            )
            const parentData = await parentResponse.json()
            const series = parentData.Items?.find((s: any) => s.Id === parentId)

            if (series) {
              seriesId = series.Id
            }

            // Cargar todos los episodios de la serie
            const allContentResponse = await fetch(
              `https://nas.mypelis.site/emby/Items?ParentId=${seriesId}&api_key=516ea09a9b5d47a0a53d590f47a72124&Recursive=true`
            )
            const allContentData = await allContentResponse.json()
            const allEps = (allContentData.Items || []).filter((i: any) => !i.IsFolder && i.Type === "Movie")
            allEps.sort((a: any, b: any) => a.Name.localeCompare(b.Name))

            // Encontrar el índice actual y obtener los siguientes episodios
            const currentIndex = allEps.findIndex((e: any) => e.Id === params.id)
            if (currentIndex !== -1) {
              const nextEpisodes = allEps.slice(currentIndex + 1, currentIndex + 6)
              setRelatedEpisodes(nextEpisodes)
            }
          } else {
            // Buscar todas las series
            const allSeriesResponse = await fetch(
              `https://nas.mypelis.site/emby/Items?ParentId=155afb96767843735a9ee8e8c7699399&api_key=516ea09a9b5d47a0a53d590f47a72124`
            )
            const allSeriesData = await allSeriesResponse.json()

            // Buscar en cuál serie está este episodio
            for (const series of allSeriesData.Items || []) {
              const contentResponse = await fetch(
                `https://nas.mypelis.site/emby/Items?ParentId=${series.Id}&api_key=516ea09a9b5d47a0a53d590f47a72124&Recursive=true`
              )
              const contentData = await contentResponse.json()

              // Filtrar solo videos
              const allEpisodes = (contentData.Items || []).filter((item: any) => !item.IsFolder && item.Type === "Movie")

              // Verificar si el episodio actual está en esta serie
              const foundInSeries = allEpisodes.find((e: any) => e.Id === params.id)

              if (foundInSeries) {
                // Ordenar alfabéticamente
                allEpisodes.sort((a: any, b: any) => a.Name.localeCompare(b.Name))

                // Encontrar el índice actual
                const currentIndex = allEpisodes.findIndex((e: any) => e.Id === params.id)

                if (currentIndex !== -1) {
                  const nextEpisodes = allEpisodes.slice(currentIndex + 1, currentIndex + 6)
                  setRelatedEpisodes(nextEpisodes)
                }
                break
              }
            }
          }

          setLoading(false)
          return
        }

        setLoading(false)
      } catch (error) {
        console.error("Error al cargar item:", error)
        setLoading(false)
      }
    }

    if (params.id) {
      fetchItem()
    }
  }, [params.id])

  // Inicializar HLS cuando el item esté disponible
  useEffect(() => {
    if (!item || !videoRef.current || item.Type === "Series") return

    const video = videoRef.current
    const streamUrl = getStreamUrl(item.Id, item.Type)

    // Limpiar HLS anterior si existe
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    // Para películas y episodios con HLS
    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
      })

      hls.loadSource(streamUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.volume = 1.0
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad()
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError()
          }
        }
      })

      hlsRef.current = hls

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy()
          hlsRef.current = null
        }
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari soporta HLS nativamente
      video.src = streamUrl
      video.volume = 1.0
    }
  }, [item?.Id])

  const getImageUrl = (movie: JellyfinItem) => {
    if (movie.ImageTags?.Primary) {
      return `https://nas.mypelis.site/emby/Items/${movie.Id}/Images/Primary?api_key=516ea09a9b5d47a0a53d590f47a72124`
    }
    return "/abstract-movie-poster.png"
  }

  const getBackdropUrl = (movie: JellyfinItem) => {
    return `https://nas.mypelis.site/emby/Items/${movie.Id}/Images/Backdrop?api_key=516ea09a9b5d47a0a53d590f47a72124`
  }

  const getStreamUrl = (itemId: string, itemType?: string) => {
    // Para películas y episodios, usar transcoding con alta calidad
    const params = new URLSearchParams({
      api_key: "516ea09a9b5d47a0a53d590f47a72124",
      VideoCodec: "h264",
      AudioCodec: "aac,mp3",
      AudioStreamIndex: "1",
      VideoBitrate: "20000000",
      AudioBitrate: "320000",
      MaxWidth: "3840",
      MaxHeight: "2160",
      TranscodingMaxAudioChannels: "2",
      SegmentContainer: "ts",
      MinSegments: "1",
      BreakOnNonKeyFrames: "true",
      MediaSourceId: itemId,
      DeviceId: "webapp",
      PlaySessionId: Math.random().toString(36).substring(7),
    })

    return `https://nas.mypelis.site/emby/Videos/${itemId}/master.m3u8?${params.toString()}`
  }

  const formatRuntime = (ticks?: number) => {
    if (!ticks) return "N/A"
    const minutes = Math.floor(ticks / 600000000)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error al reproducir video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoEnded = () => {
    // Cuando termina el episodio, ir al siguiente
    if (item?.Type === "Episode" && relatedEpisodes.length > 0) {
      const nextEpisode = relatedEpisodes[0]
      router.push(`/watch/${nextEpisode.Id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">No se encontró el contenido</div>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <button
          onClick={() => router.push("/")}
          className="fixed top-4 left-4 md:top-8 md:left-8 z-50 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative h-[50vh] md:h-[70vh]">
          <Image
            src={getBackdropUrl(item)}
            alt={item.Name}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = getImageUrl(item)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

          {item.Type !== "Series" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div ref={containerRef} className="relative w-full max-w-4xl mx-4 md:mx-8 group">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    onEnded={handleVideoEnded}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              {item.ProductionYear && (
                <Badge variant="secondary" className="bg-red-600 text-white">
                  {item.ProductionYear}
                </Badge>
              )}
              {item.Type === "Series" && <Badge className="bg-purple-600 text-white">Serie</Badge>}
              {item.CommunityRating && (
                <div className="flex items-center text-yellow-400 font-semibold">
                  <span className="text-xl">★</span>
                  <span className="ml-1">{item.CommunityRating.toFixed(1)}</span>
                </div>
              )}
              {item.RunTimeTicks && <span className="text-gray-400">{formatRuntime(item.RunTimeTicks)}</span>}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{item.Name}</h1>

            {item.Taglines && item.Taglines.length > 0 && (
              <h2 className="text-xl md:text-2xl text-gray-300 mb-6">{item.Taglines[0]}</h2>
            )}

            {item.Type !== "Series" && (
              <div className="flex flex-wrap gap-3 mb-8">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold" onClick={handlePlay}>
                  <Play className="w-5 h-5 mr-2" />
                  Reproducir
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Mi Lista
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-gray-800 rounded-full w-12 h-12 p-0 bg-transparent"
                >
                  <ThumbsUp className="w-5 h-5" />
                </Button>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-300">Sinopsis</h3>
                  <p className="text-base leading-relaxed text-gray-400">
                    {item.Overview || "Sin descripción disponible."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {item.Genres && item.Genres.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Géneros</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.Genres.map((genre) => (
                        <Badge key={genre} variant="secondary" className="bg-gray-800 text-gray-300">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {item.PremiereDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Fecha de estreno</h3>
                    <p className="text-gray-300">{new Date(item.PremiereDate).toLocaleDateString("es-ES")}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Tipo</h3>
                  <p className="text-gray-300">{item.Type === "Series" ? "Serie de TV" : "Película"}</p>
                </div>
              </div>
            </div>

            {item.Type === "Series" && episodes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Episodios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.Id}
                      className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => router.push(`/watch/${episode.Id}`)}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={getImageUrl(episode)}
                          alt={episode.Name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{episode.Name}</h3>
                        {episode.Overview && (
                          <p className="text-sm text-gray-400 line-clamp-2">{episode.Overview}</p>
                        )}
                        {episode.RunTimeTicks && (
                          <p className="text-xs text-gray-500 mt-2">{formatRuntime(episode.RunTimeTicks)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.Type === "Episode" && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Próximos Episodios ({relatedEpisodes.length})</h2>
                {relatedEpisodes.length === 0 && (
                  <p className="text-gray-400">Cargando episodios...</p>
                )}
                {relatedEpisodes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedEpisodes.map((episode) => (
                      <div
                        key={episode.Id}
                        className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
                        onClick={() => router.push(`/watch/${episode.Id}`)}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={getImageUrl(episode)}
                            alt={episode.Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1">{episode.Name}</h3>
                          {episode.Overview && (
                            <p className="text-sm text-gray-400 line-clamp-2">{episode.Overview}</p>
                          )}
                          {episode.RunTimeTicks && (
                            <p className="text-xs text-gray-500 mt-2">{formatRuntime(episode.RunTimeTicks)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
