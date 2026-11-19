import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { formatDuration, formatDate } from "../utils/format";
import { usePlayer } from "../context/PlayerContext";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EstadoVazio";

export default function Playlist() {
    const {id} = useParams()
    const {playSong, currentSong, isPlaying, togglePlay} = usePlayer()
    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPlaylist() {
            try {
                const resposta = await api.get('/playlists/' + id)
                setPlaylist(resposta.data.data)
            }catch {
                toast.error('Playlist não encontrada.')
            }finally {
                setLoading(false)
            }
        }
        loadPlaylist()
    }, [id])

    if (loading) {
        return (
            <div className="px-6">
                <Skeleton className="h-56 w-full"/>
                <Skeleton className="mt-6 h-4 w-full"/>
                <Skeleton className="mt-3 h-4 w-4/5"/>
            </div>
        );
    }

    if (!playlist) {
        return(
            <div className="px-6">
                <EmptyState title="Playlist vazia" description="Adicione músicas para começar"/>
            </div>
        );
    }
    return (
        <div className="px-6 pb-10">
            <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
                <img src={playlist.cover} alt={playlist.name}  className="h-52 w-52 rounded-2xl object-cover shadow-2xl"/>

                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">Playlist</p>
                    <h2 className="mt-2 text-5xl font-black tracking-tight">{playlist.name}</h2>
                    <p className="mt-2 text-muted">{playlist.description}</p>
                    <p className="mt-3 font-mono text-sm text-muted">{playlist.songs.length} músicas ° criada  em {formatDate(playlist.created_at)}</p>
                </div>
            </header>

            <ol className="mt-10 divide-y divide-white/5">{playlist.songs.map((song, index) => {
                const isCurrent = currentSong && currentSong.id === song.id

                return (
                    <li key={song.id} className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-white/5">
                        <span className="w-8 font-mono text-sm text-muted">{index + 1}</span>
                        <div className="min-w-0 flex-1">
                            <p className={isCurrent ? 'truncate font-bold text-accent' : 'truncate font-bold'}>{song.title}</p>
                            <p className="truncate text-sm text-muted">{song.album.artist.name}</p>
                        </div>

                        <span className="font-mono text-sm text-muted">{formatDuration(song.duration)}</span>

                        <button onClick={() => (isCurrent ? togglePlay() : playSong(song))} className="rounded-full bg-accent px-4 py-1.5 font-mono text-xs text-ink">{isCurrent && isPlaying ? 'Pausar' : 'Tocar'}</button>
                    </li>
                )
            })}
            </ol>
        </div>
    );
}