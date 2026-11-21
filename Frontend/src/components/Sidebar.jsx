import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from 'react-toastify'
import api from '../services/api'
import CriarPlaylist from './CriarPlaylist'
import { IoMdSearch, IoIosMusicalNotes } from "react-icons/io";

export default function Sidebar({playlists = []}) {
     const [showCriar, setShowCriar] = useState(false)
     const navigate = useNavigate()

     async function handleLogout() {
        try {
            await api.post('/logout')
        }catch {
            
        }
        localStorage.removerItem('token')
        toast.info('Até logo!')
        navigate('/login')
     }

    return(
     <aside className="sidebar-kokushibo hidden w-64 shrink-0 flex-col md:flex">
        <div className="p-6">
            <h1 className="text-2xl font-black tracking-tight">
                Spoti<span className="text-accent">Clone</span>
            </h1>
        </div>

        <nav className="flex flex-col gap-1 px-4">
            <NavLink to="/"
            className={({isActive}) =>
            isActive ? 'flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold text-cream' : 'flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted transition hover:text-cream hover:bg-white/5'}>
                <span className="text-lg"><IoMdSearch /></span>
                Buscar
            </NavLink>
        </nav>

        <div className="mt-6 flex items-center justify-between px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Sua Biblioteca</p>
            <button onClick={() => setShowCriar(true)} className="text-lg text-muted transition hover:text-accent hover:rotate-90" title="Criar playlist">+</button>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-4">
            {playlists.length === 0 ? (
                <div className="mt-4 rounded-xl bg-white/5 p-4">
                    <p className="text-sm font-bold">Crie sua primeira playlist</p>
                    
                    <button onClick={() => setShowCriar(true)} className="mt-3 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black transition hover:scale-105">Criar playlist</button>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {playlists.map((playlist) => (
                        <NavLink key={playlist.id}
                        to={'/playlist/' + playlist.id} className={({isActive}) => 
                        isActive ? 'flex items-center gap-3 rounded-lg -bg-white/10 px-3 py-2.5' :'flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5' }>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-purple-900/50 to-red-900/30">
                            {playlist.cover ? (
                                <img src={playlist.cover} alt={playlist.name} className="h-full w-full rounded-md object-cover" />
                            ) : (
                                <span className="text-sm"><IoIosMusicalNotes /></span>
                            )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold">{playlist.name}</p>
                                <p className="truncate text-xs text-muted">
                                    Playlist ° {playlist.total_songs || 0} músicas
                                </p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>

        <div className="p-4">
            <button onClick={handleLogout} className="w-full rounded-full border border-white/15 py-2.5 texxt-sm text-muted transition hover:border-accent hover:text-accent">Sair</button>
        </div>

        {showCriar && (
            <CriarPlaylist onClose={() => setShowCriar(false)}/>
        )}
     </aside>  
    );
}