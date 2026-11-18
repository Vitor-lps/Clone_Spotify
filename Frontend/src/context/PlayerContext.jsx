import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext(null)

export function PlayerProvider({children}) {
    const audioRef = useRef(null)
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const audio = audioRef.current

        if (!audio || !currentSong) return

        audio.src = currentSong.audio_url
        audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }, [currentSong])

    function playSong(musica) {
        setCurrentSong(musica)
    }

    function togglePlay() {
        const audio = audioRef.current

        if (!audio || !currentSong) return

        if (audio.paused) {
            audio.play()
            setIsPlaying(true)
        }else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    return (
        <PlayerContext.Provider value={{currentSong, isPlaying, playSong, togglePlay}}>
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext)
}