import { usePlayer } from "../context/PlayerContext";
import { formatDuration } from "../utils/format";

export default function PlayerBar() {
    const {currentSong, isPlaying, togglePlay} = usePlayer()

    return(
       <footer className="flex items-center justify-between gap-4 border-t border-white/10 bg-surface px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/50 to-red-900/30">
            {currentSong?.album?.cover ? (
                <img src={currentSong.album.cover} alt={currentSong.title} className="h-full w-full rounded-lg object-cover" />
            ): (
                <span className="text-lg">♪</span>
            )}
            </div>
            <div className="min-w-0">
                {currentSong ? (
                    <>
                    <p className="truncate text-sm font-bold">{currentSong.title}</p>
                    <p className="truncate text-xs text-muted">{currentSong.album?.artist?.name || 'Artista'}</p>
                    </>
                ) : (
                    <p className="text-xs text-muted">Escolha uma música para começar</p>
                )}
            </div>
        </div>

        <button onClick={togglePlay} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-white transition hover:scale-110">
            {isPlaying ? '❚❚' : '▶'}
        </button>

        <p className="font-mono text´xs text-muted">{currentSong ? formatDuration(currentSong.duration) : '00:00'}</p>
       </footer>
    )
}