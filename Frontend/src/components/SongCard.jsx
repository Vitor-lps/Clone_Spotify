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
        <article className="group rounded-2xl bg-surface p-4 transition hover:bg-white/10">
            <div className="relative">
                <img src={song.album.cover} alt={song.title}
                className="aspect-square w-full rounded-xl object-cover" />

                <button onClick={handleClick} className="absolute bottom-3 right-3 rounded-full bg-accent px-4 py-2 font-mono text-sm text-ink opacity-0 transition group-hover:opacity-100">
                    {isCurrent && isPlaying ? 'Pausar' : 'Tocar'}
                </button>
            </div>

            <h3 className="mt-3 truncate font-bold">{song.title}</h3>
            <p className="truncate text-sm text-muted">{song.album.artist.name}</p>
            <p className="mt-1 font-mono text-xs text-accent">{formatDuration(song.duration)}</p>
        </article>
    )
}