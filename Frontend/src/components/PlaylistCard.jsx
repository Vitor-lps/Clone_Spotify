import {Link} from 'react-router-dom'

export default function PlaylistCard({playlist}) {
    return (
        <Link to={'/playlist/' + playlist.id} className='card-glow group block rounded-2xl bg-surface p-3 transition hover:bg-white/5'>
            <div className='relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-red-900/30'>
            {playlist.cover && (
                <img src={playlist.cover} alt={playlist.name} className='h-full w-full object-cover transition group-hover:scale-110' />
            )}
            </div>

            <h3 className='mt-2 truncate text-sm font-bold'>{playlist.name}</h3>
            <p className='truncate text-xs text-muted'>{playlist.total_songs} músicas</p>
        </Link>
    );
}