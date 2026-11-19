import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import api from '../services/api'
import SongCard from '../components/SongCard'
import PlaylistCard from '../components/PlaylistCard'
import Skeleton from  '../components/Skeleton'
import EmptyState from '../components/EstadoVazio'

export default function Home() {
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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

    return (
        <div className="px-6 pb-10">
            <h2 className="text-4xl font-black tracking-tight">Boa noite</h2>

            {loading && (
                <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {[1, 2, 3, 4, 5].map ((item) => (
                        <div key={item}>
                            <Skeleton className="aspect-square w-full"/>
                            <Skeleton className="mt-3 h-4 w-3/4"/>
                            <Skeleton className="mt-2 h-3 w-1/2"/>
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="mt-8">
                    <EmptyState title="Servidor fora do ar" description="Verifique sua conexão e tente novamente em instantes."/>
                </div>
            )}

            {!loading && !error && songs.length === 0 && (
                <div className="mt-8">
                    <EmptyState title="Nenhuma música por aqui" description="Assim que o backend enviar as faixas, elas aparecem nesta tela"/>
                </div>
            )}

            {!loading && !error && songs.length > 0 && (
                <>
                <section className="mt-8">
                    <h3 className="text-xl font-bold">Músicas em alta</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {songs.map((song) => (
                            <SongCard key={song.id} song={song}/>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h3 className="text-xl font-bold">Suas playlists</h3>
                    <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                        {playlists.map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist}/>
                        ))}
                    </div>
                </section>
                </>
            )}
        </div>
    );
}