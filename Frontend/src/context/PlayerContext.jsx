import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
    const audioRef = useRef(null)
    const lastSongRef = useRef(null)
    const seekingRef = useRef(false)        // ← TRAVA DE SEEK
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(0.8)
    const [queue, setQueue] = useState([])

    // Atualiza o progresso (BLOQUEADO durante seek)
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        function updateProgress() {
            if (seekingRef.current) return    // ← NÃO atualiza se está fazendo seek
            setProgress(audio.currentTime)
        }

        audio.addEventListener('timeupdate', updateProgress)
        return () => audio.removeEventListener('timeupdate', updateProgress)
    }, [])

    // Aplica o volume
    useEffect(() => {
        const audio = audioRef.current
        if (audio) audio.volume = volume
    }, [volume])

    // Toca quando a música muda
    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !currentSong) return

        if (lastSongRef.current === currentSong.id) return
        lastSongRef.current = currentSong.id

        audio.src = currentSong.audio_url
        audio.volume = volume
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false))
    }, [currentSong])

    function playSong(musica, lista = []) {
        if (lista.length > 0) setQueue(lista)
        lastSongRef.current = null
        setCurrentSong(musica)
        setProgress(0)
    }

    function togglePlay() {
        const audio = audioRef.current
        if (!audio || !currentSong) return

        if (audio.paused) {
            audio.play()
            setIsPlaying(true)
        } else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    function playNext() {
        if (queue.length === 0 || !currentSong) return
        const index = queue.findIndex((s) => s.id === currentSong.id)
        const next = queue[(index + 1) % queue.length]
        lastSongRef.current = null
        setCurrentSong(next)
        setProgress(0)
    }

    function playPrev() {
        if (queue.length === 0 || !currentSong) return
        const index = queue.findIndex((s) => s.id === currentSong.id)
        const prev = queue[(index - 1 + queue.length) % queue.length]
        lastSongRef.current = null
        setCurrentSong(prev)
        setProgress(0)
    }

    function seekTo(percent) {
        const audio = audioRef.current
        if (!audio || !currentSong) return

        const dur = audio.duration && !isNaN(audio.duration)
            ? audio.duration
            : Number(currentSong.duration)

        if (!dur || isNaN(dur)) return

        const p = Math.max(0, Math.min(1, percent))
        const novoTempo = p * dur

        // ATIVA A TRAVA
        seekingRef.current = true

        // Define a posição
        audio.currentTime = novoTempo
        setProgress(novoTempo)

        // DEPOIS de 300ms, libera a trava e confere se funcionou
        setTimeout(() => {
            seekingRef.current = false

            // Debug: mostra se o seek funcionou
            console.log('depois do seek:', {
                esperado: novoTempo,
                real: audio.currentTime,
                funcionou: Math.abs(audio.currentTime - novoTempo) < 2,
            })

            setProgress(audio.currentTime)
        }, 300)
    }

    function changeVolume(valor) {
        setVolume(Math.max(0, Math.min(1, valor)))
    }

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            progress,
            volume,
            playSong,
            togglePlay,
            playNext,
            playPrev,
            seekTo,
            changeVolume,
        }}>
            <audio ref={audioRef} onEnded={playNext} />
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext)
}