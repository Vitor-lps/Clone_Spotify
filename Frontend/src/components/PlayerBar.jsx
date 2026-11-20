import { usePlayer } from "../context/PlayerContext";
import { formatDuration } from "../utils/format";

export default function PlayerBar() {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        playNext,
        playPrev,
        progress,
        seekTo,
        volume,
        changeVolume,
    } = usePlayer()

    const dur = currentSong ? Number(currentSong.duration) : 0
    const percentual = dur > 0 ? (progress / dur) * 100 : 0

    return (
        <footer className="flex items-center gap-4 border-t border-white/10 bg-surface px-4 py-3">

            {/* ESQUERDA */}
            <div className="flex min-w-0 w-[30%] items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/50 to-red-900/30">
                    {currentSong?.album?.cover ? (
                        <img src={currentSong.album.cover} alt={currentSong.title} className="h-full w-full rounded-lg object-cover" />
                    ) : (
                        <span className="text-xl">♪</span>
                    )}
                </div>

                <div className="min-w-0">
                    {currentSong ? (
                        <>
                            <p className="truncate text-sm font-bold cursor-pointer hover:underline">{currentSong.title}</p>
                            <p className="truncate text-xs text-muted cursor-pointer hover:underline">{currentSong.album?.artist?.name || 'Artista'}</p>
                        </>
                    ) : (
                        <p className="text-xs text-muted">Escolha uma música</p>
                    )}
                </div>
            </div>

            {/* CENTRO */}
            <div className="flex flex-col items-center w-[40%]">
                <div className="flex items-center gap-5">
                    <button onClick={playPrev} className="text-muted transition hover:text-cream">
                        ⏮
                    </button>

                    <button onClick={togglePlay} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-110">
                        {isPlaying ? '❚❚' : '▶'}
                    </button>

                    <button onClick={playNext} className="text-muted transition hover:text-cream">
                        ⏭
                    </button>
                </div>

                {/* Barra de progresso */}
                <div className="mt-2 flex w-full items-center gap-2">
                    <span className="w-10 text-right font-mono text-[10px] text-muted">
                        {currentSong ? formatDuration(Math.floor(progress)) : '00:00'}
                    </span>

                    <div
                        className="group h-1.5 flex-1 cursor-pointer rounded-full bg-white/10"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const percent = (e.clientX - rect.left) / rect.width
                            seekTo(percent)
                        }}
                    >
                        <div
                            className="relative h-full rounded-full transition-all"
                            style={{
                                width: percentual + '%',
                                background: 'linear-gradient(90deg, #c41e3a, #6b21a8)',
                            }}
                        >
                            <div className="absolute -right-1.5 -top-1 h-4 w-4 rounded-full bg-white shadow-md opacity-0 transition group-hover:opacity-100" />
                        </div>
                    </div>

                    <span className="w-10 font-mono text-[10px] text-muted">
                        {currentSong ? formatDuration(dur) : '00:00'}
                    </span>
                </div>
            </div>

            {/* DIREITA — Volume */}
            <div className="flex w-[30%] items-center justify-end gap-3">
                <button
                    onClick={() => changeVolume(volume > 0 ? 0 : 0.8)}
                    className="text-sm text-muted transition hover:text-cream"
                >
                    {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                </button>

                <div
                    className="group h-1.5 w-24 cursor-pointer rounded-full bg-white/10"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const percent = (e.clientX - rect.left) / rect.width
                        changeVolume(percent)
                    }}
                >
                    <div
                        className="relative h-full rounded-full bg-white/50 transition-all"
                        style={{ width: (volume * 100) + '%' }}
                    >
                        <div className="absolute -right-1.5 -top-1 h-4 w-4 rounded-full bg-white shadow-md opacity-0 transition group-hover:opacity-100" />
                    </div>
                </div>

                <span className="w-8 font-mono text-[10px] text-muted">
                    {Math.round(volume * 100)}%
                </span>
            </div>
        </footer>
    )
}