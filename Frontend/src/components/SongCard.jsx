import { formatDuration } from "../utils/format";
import {usePlayer} from '../context/PlayerContext'

export default function SongCard({song}) {
    const {currentSong, isPlaying, playSong, togglePlay} = usePlayer()
    const isCurrent = currentSong && currentSong.id === song.id

    function handleClick() {
        if (isCurrent) {
            togglePlay()
        }else {
            playSong(song)
        }
    }

    return (
       <article className="card-glow group rounded-2xl bg-surface p-3 transition hover:bg-white/5">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-red-900/30">
        {song.album?.cover && (
            <img src={song.album.cover} alt={song.title} className="h-full w-full object-cover" />
        )}

        {!song.album?.cover && (
            <div className="flex h-full items-center justify-center">
                <span className="text-5xl opacity-50">♪</span>
            </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100"/>

        <button onClick={handleClick} className="btn-blood absolute bottom-2 right-2 rounded-full px-4 py-2 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
            {isCurrent && isPlaying ? '❚❚' : '▶'}
        </button>

        {isCurrent && (
            <div className="pulse-blood absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-accent"/>
        )}
        </div>

        <h3 className="mt-2 truncate text-sm font-bold">{song.title}</h3>
        <p className="truncate text-xs text-muted">{song.album?.artist?.name || 'Artista'}</p>
        <p className="mt-1 font-mono text-xs text-accent">{formatDuration(song.duration)}</p>
       </article>
    )
}