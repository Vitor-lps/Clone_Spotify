import { usePlayer } from "../context/PlayerContext";
import { formatDuration } from "../utils/format";

export default function PlayerBar() {
    const {currentSong, isPlaying, togglePlay} = usePlayer()

    return(
        <footer className="flex items-center justify-between gap-4 border-t border-white/10 bg-surface px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">{currentSong ? (
                <>
                <img src={currentSong.album.cover} alt={currentSong.title} className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0">
                    <p className="truncate font-bold">{currentSong.title}</p>
                    <p className="truncate text-sm text-muted">{currentSong.album.artist.name}</p>
                </div>
                </>
                ): (
                    <p className="text-sm text-muted">Escolha uma música para começar</p>
                )}
                </div>

                <button onClick={togglePlay}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-ink transition hover:scale-105">
                    {isPlaying ? '||' : '>'}
                </button>

                <p className="font-mono text-sm text-muted">
                    {currentSong ? formatDuration(currentSong.duration) : '00:00'}
                </p>
        </footer>
    )
}