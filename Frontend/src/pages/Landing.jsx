import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { formatDuration } from '../utils/format';
import Carrossel from '../components/Carrossel';
import { IoMdSearch, IoMdHome, IoIosMusicalNotes } from "react-icons/io";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaVolumeUp } from "react-icons/fa";

export default function Landing() {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        api.get('/songs-preview')
            .then((res) => {
                setSongs(res.data.data);
            })
            .catch(() => {});

        api.get('/playlists-preview')
            .then((res) => {
                setPlaylists(res.data.data);
            })
            .catch(() => {});
    }, []);

    const hora = new Date().getHours();
    const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="sidebar-kokushibo hidden w-64 shrink-0 flex-col md:flex">
                <div className="p-6">
                    <h1 className="text-2xl font-black tracking-tight">
                        Spoti<span className="text-accent">Clone</span>
                    </h1>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold text-cream">
                        <span className="text-lg"><IoMdHome /></span>
                        Início
                    </div>
                    <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted">
                        <span className="text-lg"><IoMdSearch /></span>
                        Buscar
                    </div>
                </nav>

                <div className="mt-6 px-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">
                        Sua Biblioteca
                    </p>
                </div>

                <div className="mt-3 flex-1 overflow-y-auto px-4">
                    <div className="mt-4 rounded-xl bg-white/5 p-4">
                        <p className="text-sm font-bold">Crie sua primeira playlist</p>
                        <p className="mt-1 text-xs text-muted">É fácil, vamos lá!</p>
                        <Link
                            to="/register"
                            className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black transition hover:scale-105"
                        >
                            Criar playlist
                        </Link>
                    </div>
                </div>

                <div className="p-4">
                    <Link
                        to="/login"
                        className="block w-full rounded-full border border-white/15 py-2.5 text-center text-sm text-muted transition hover:border-accent hover:text-accent"
                    >
                        Entrar
                    </Link>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">

                <header className="flex items-center gap-4 border-b border-white/5 px-8 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-muted">
                                ←
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-muted">
                                →
                            </button>
                        </div>

                        <div className="relative w-72">
                            <input
                                type="search"
                                placeholder="Buscar músicas, álbuns, artistas..."
                                className="w-full rounded-full bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none"
                                disabled
                            />
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"><IoMdSearch /></span>
                        </div>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center gap-3">
                        <Link
                            to="/register"
                            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-bold text-white transition hover:border-white hover:scale-105"
                        >
                            Registar-te
                        </Link>
                        <Link
                            to="/login"
                            className="rounded-full bg-white px-8 py-2.5 text-sm font-bold text-black transition hover:scale-105"
                        >
                            Iniciar sessão
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-8 pb-24">
                    <div className="pt-8">
                        <p className="font-mono text-xs uppercase tracking-widest text-accent">
                            SpotiClone 
                        </p>
                        <h1 className="mt-2 text-5xl font-black tracking-tight">
                            {saudacao}
                        </h1>
                        <p className="mt-2 text-muted">
                            Entre para ouvir suas músicas.
                        </p>
                    </div>

                    {songs.length > 0 && (
                       <Carrossel titulo="Músicas em alta">
                        {songs.map((song) => (
                            <Link key={song.id} to="/register" className='group w-44 shrink-0 rounded-2xl bg-surface p-3 transition hover:bg-white/5'>
                                <div className='relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-red-900/30'>
                                {song.album?.cover ? (
                                    <img src={song.album.cover} alt={song.title} className='h-full w-full object-cover' />
                                ) : (
                                    <div className='flex h-full itmes-center justify-center'>
                                        <span className='text-5xl opacity-50'><IoIosMusicalNotes /></span>
                                    </div>
                                )}
                                </div>
                                <h3 className='mt-2 truncate text-sm font-bold'>{song.title}</h3>
                                <p className='truncate text-xs text-muted'>{song.album?.artist?.name || 'Artista'}</p>
                                <p className='mt-1 font-mono text-xs text-accent'>{formatDuration(song.duration)}</p>
                            </Link>
                        ))}
                       </Carrossel>
                    )}

                    {playlists.length > 0 && (
                        <Carrossel titulo="Suas Playlists">
                            {playlists.map((playlist) => (
                                <Link key={playlist.id}
                                to="/register"
                                className='group w-44 shrink-0 rounded-2xl bg-surface p-3 transition hover:bg-white/5'>
                                    <div className='relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-red-900/30'>
                                    {playlist.cover ? (
                                        <img src={playlist.cover} alt={playlist.name} className='h-full w-full object-cover' />
                                    ) : (
                                        <div className='flex h-full items-center justify-center'>
                                            <span className='text-5xl opacity-50'><IoIosMusicalNotes /></span>
                                        </div>
                                    )}
                                    </div>
                                    <h3 className='mt-2 truncate text-sm font-bold'>{playlist.name}</h3>
                                    <p className='truncate text-xs text-muted'>{playlist.total_song || 0} músicas</p>
                                </Link>
                            ))}
                        </Carrossel>
                    )}
                </main>

                <footer className="flex items-center gap-4 border-t border-white/10 bg-surface px-4 py-3">
                    <div className="flex min-w-0 w-[30%] items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/50 to-red-900/30">
                            <span className="text-xl"><IoIosMusicalNotes /></span>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-muted">Escolha uma música</p>
                            <p className="truncate text-xs text-muted">Entre para ouvir</p>
                        </div>
                    </div>

                    <div className="flex w-[40%] flex-col items-center">
                        <div className="flex items-center gap-5">
                            <span className="text-muted/50"><GrChapterPrevious /></span>
                            <Link
                                to="/register"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-muted transition hover:scale-110"
                            >
                              <FaCirclePlay />
                            </Link>
                            <span className="text-muted/50"><GrChapterNext /></span>
                        </div>

                        <div className="mt-2 flex w-full items-center gap-2">
                            <span className="font-mono text-[10px] text-muted">00:00</span>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10" />
                            <span className="font-mono text-[10px] text-muted">00:00</span>
                        </div>
                    </div>

                    <div className="flex w-[30%] items-center justify-end gap-3">
                        <span className="text-sm text-muted/50"><FaVolumeUp /></span>
                        <div className="h-1.5 w-24 rounded-full bg-white/10" />
                    </div>
                </footer>
            </div>

            <div className="fixed bottom-[68px] left-0 right-0 z-50">
                <div className="flex flex-col items-center justify-between gap-3 bg-gradient-to-r from-[#af2896] to-[#509bf5] px-8 py-3 sm:flex-row">
                    <div>
                        <p className="font-bold text-white text-sm">Pré-visualização do SpotiClone</p>
                        <p className="text-xs text-white/80">
                            Regista-te para ouvires músicas ilimitadas. Não é necessário cartão de crédito.
                        </p>
                    </div>

                    <Link
                        to="/register"
                        className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition hover:scale-105"
                    >
                        Registar-te já gratuitamente
                    </Link>
                </div>
            </div>
        </div>
    );
}