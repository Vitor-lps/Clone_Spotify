import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import api from '../services/api'
import SongCard from '../components/SongCard'
import PlaylistCard from '../components/PlaylistCard'
import CriarPlaylist from "../components/CriarPlaylist";
import Skeleton from  '../components/Skeleton'
import EmptyState from '../components/EstadoVazio'

export default function Home() {
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [showCriar, setShowCriar] = useState(false)

    useEffect(() => {
        async function loadData() {
            try {
                const [songsResponse, playlistsResponse] = await Promise.all([
                    api.get('/songs'),
                    api.get('/playlists'),
                ])

                setSongs(songsResponse.data.data)
                setPlaylists(playlistsResponse.data.data)
                setError(false)
            }catch {
                setError(true)
                toast.error('Não foi possível carregar as músicas.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    function handlePlaylistCreated(nova) {
        setPlaylists((antigas) => [nova, ...antigas])
    }

    const hora = new Date().getHours()
    const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
    return (
       <div className="px-8 pb-12">
        <div className="flex items-center justify-between pt-8">
            <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    SpotiClone
                </p>
                <h1 className="mt-2 text-5xl font-black tracking-tight">
                    {saudacao}
                </h1>
            </div>

            <button onClick={() => setShowCriar(true)} className="btn-blood rounded-full px-6 py-3 text-sm font-bold text-cream">
                + Nova Playlist
            </button>
        </div>

        {loading  && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item}>
                        <Skeleton className="aspect-square w-full rounded-xl"/>
                        <Skeleton className="mt-2 h-4 w-3/4 rounded"/>
                        <Skeleton className="mt-1 h-3 w-1/2 rounded"/>
                    </div>
                ))}
            </div>
        )}

        {!loading && error && (
            <div className="mt-10">
                <EmptyState title="Servidor fora do ar"
                description="Verifique sua conexão e tente novamente"/>
            </div>
        )}

       {!loading && !error && songs.length === 0 && (
            <div className="mt-10">
                <EmptyState title="Nenhuma música por aqui"
                description="adicione músicas"/>
            </div>
        )}

        {!loading && !error && songs.length > 0 && (
            <>
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black">Músicas em alta</h2>
                    <span className="font-mono text-xs text-muted">
                        {songs.length} faixas
                    </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {songs.slice(0, 12).map((song) => (
                        <SongCard key={song.id} song={song}/>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black">Suas Playlists</h2>
                    <button onClick={() => setShowCriar(true)} className="font-mono text-xs text-accent hover:underline">
                        + Criar nova
                    </button>
                </div>

                {playlists.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-10 text-center">
                        <p className="text-4xl">♫</p>
                        <p className="mt-2 text-muted">Crie sua primeira playlist!</p>

                        <button onClick={() => setShowCriar(true)} className="btn-blood  mt-4 rounded-full px-6 py-2 text-sm font-bold text-cream">
                            + Nova Playlist
                        </button>
                    </div>
                ) : (
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {playlists.map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist}/>
                        ))}
                    </div>
                )}
            </section>
            </>
        )}

        {showCriar && (
            <CriarPlaylist onClose={() => setShowCriar(false)} onCreated={handlePlaylistCreated}/>
        )}
       </div>
    );
}