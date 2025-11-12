"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ChevronDown, Play, Info, Volume2, VolumeX, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function NetflixPortfolio() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [movies, setMovies] = useState<JellyfinItem[]>([])
  const [series, setSeries] = useState<JellyfinItem[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredMovie, setFeaturedMovie] = useState<JellyfinItem | null>(null)

  const fetchContent = async () => {
    try {
      const moviesResponse = await fetch(
        "https://nas.mypelis.site/emby/Items?ParentId=ed2a25286c558a96e1424971742ca250&api_key=516ea09a9b5d47a0a53d590f47a72124",
      )
      const moviesData = await moviesResponse.json()
      const movieList = (moviesData.Items || []).map((item: any) => ({ ...item, Type: "Movie" }))
      setMovies(movieList)

      const seriesResponse = await fetch(
        "https://nas.mypelis.site/emby/Items?ParentId=5ddaa59a73205234890fdcfc683e14ed&api_key=516ea09a9b5d47a0a53d590f47a72124",
      )
      const seriesData = await seriesResponse.json()
      const seriesList = (seriesData.Items || []).map((item: any) => ({ ...item, Type: "Series" }))
      setSeries(seriesList)

      if (movieList.length > 0) {
        setFeaturedMovie(movieList[0])
      }
      setLoading(false)
    } catch (error) {
      console.error("Error al cargar contenido:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const getImageUrl = (movie: JellyfinItem) => {
    if (movie.ImageTags?.Primary) {
      return `https://nas.mypelis.site/emby/Items/${movie.Id}/Images/Primary?api_key=516ea09a9b5d47a0a53d590f47a72124`
    }
    return "/abstract-movie-poster.png"
  }

  const getBackdropUrl = (movie: JellyfinItem) => {
    return `https://nas.mypelis.site/emby/Items/${movie.Id}/Images/Backdrop?api_key=516ea09a9b5d47a0a53d590f47a72124`
  }

  const formatRuntime = (ticks?: number) => {
    if (!ticks) return "N/A"
    const minutes = Math.floor(ticks / 600000000)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const handleMovieClick = (item: JellyfinItem) => {
    router.push(`/watch/${item.Id}`)
  }

  const handlePlayFeatured = () => {
    if (featuredMovie) {
      router.push(`/watch/${featuredMovie.Id}`)
    }
  }

  const handleMoreInfo = () => {
    if (featuredMovie) {
      router.push(`/watch/${featuredMovie.Id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Cargando contenido...</div>
          <div className="text-gray-400">Conectando con tu biblioteca</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link href="/">
              <div
                className="text-red-600 text-xl md:text-2xl font-bold tracking-tight uppercase cursor-pointer"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 800,
                }}
              >
                MisPelis
              </div>
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link href="/" className="text-white font-semibold text-sm">
                Inicio
              </Link>
              <Link href="/movies" className="hover:text-gray-300 transition-colors text-sm">
                Películas
              </Link>
              <Link href="/series" className="hover:text-gray-300 transition-colors text-sm">
                Series
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <Search className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-300" />
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              <ChevronDown className="w-4 h-4" />
            </div>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link href="/" className="text-white font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Inicio
              </Link>
              <Link
                href="/movies"
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Películas
              </Link>
              <Link
                href="/series"
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Series
              </Link>
            </nav>
          </div>
        )}
      </header>

      {featuredMovie && (
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(featuredMovie) || "/placeholder.svg"}
              alt={featuredMovie.Name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-full md:max-w-2xl">
            {featuredMovie.ProductionYear && (
              <Badge variant="secondary" className="bg-red-600 text-white mb-4 text-xs">
                {featuredMovie.ProductionYear}
              </Badge>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {featuredMovie.Name}
            </h1>

            {featuredMovie.Taglines && featuredMovie.Taglines.length > 0 && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
                {featuredMovie.Taglines[0]}
              </h2>
            )}

            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-300 max-w-lg leading-relaxed line-clamp-4">
              {featuredMovie.Overview || "Una película increíble te espera."}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              {featuredMovie.CommunityRating && (
                <div className="flex items-center text-yellow-400 font-semibold">
                  <span className="text-2xl">★</span>
                  <span className="ml-1 text-lg">{featuredMovie.CommunityRating.toFixed(1)}</span>
                </div>
              )}
              {featuredMovie.RunTimeTicks && (
                <span className="text-gray-300">{formatRuntime(featuredMovie.RunTimeTicks)}</span>
              )}
              {featuredMovie.Genres && featuredMovie.Genres.length > 0 && (
                <span className="text-gray-300">{featuredMovie.Genres.slice(0, 2).join(", ")}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 font-semibold px-6 md:px-8 w-full sm:w-auto"
                onClick={handlePlayFeatured}
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Reproducir
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-white hover:bg-gray-800 px-6 md:px-8 bg-transparent w-full sm:w-auto"
                onClick={handleMoreInfo}
              >
                <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Más Información
              </Button>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-24 md:right-16 flex items-center space-x-2 md:space-x-4">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-gray-500 text-white hover:bg-gray-800 bg-transparent p-2"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-3 h-3 md:w-4 md:h-4" /> : <Volume2 className="w-3 h-3 md:w-4 md:h-4" />}
            </Button>
          </div>
        </section>
      )}

      <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Películas Disponibles</h2>
        <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.Id}
              className="relative flex-shrink-0 group cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative w-36 h-52 md:w-48 md:h-72 rounded-lg overflow-hidden">
                <Image
                  src={getImageUrl(movie) || "/placeholder.svg"}
                  alt={movie.Name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {movie.ProductionYear && (
                  <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">{movie.ProductionYear}</Badge>
                )}

                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{movie.Name}</h3>
                  {movie.CommunityRating && (
                    <div className="flex items-center text-xs text-yellow-400">
                      ★ {movie.CommunityRating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {series.length > 0 && (
        <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Series Disponibles</h2>
          <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {series.map((show) => (
              <div
                key={show.Id}
                className="relative flex-shrink-0 group cursor-pointer"
                onClick={() => handleMovieClick(show)}
              >
                <div className="relative w-36 h-52 md:w-48 md:h-72 rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(show) || "/placeholder.svg"}
                    alt={show.Name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">Serie</Badge>

                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{show.Name}</h3>
                    {show.CommunityRating && (
                      <div className="flex items-center text-xs text-yellow-400">
                        ★ {show.CommunityRating.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
