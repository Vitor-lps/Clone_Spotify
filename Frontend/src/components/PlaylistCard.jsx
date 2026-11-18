import {Link} from 'react-router-dom'

export default function PlaylistCard({playlist}) {
    return (
        <Link to={'/playlist' + playlist.id} className='group block rounded-2xl bg-surface p-4 transition hover:bg-white/10'>
            <div className='aspect-square w-full overflow-hidden rounded-xl bg-white/5'>
               {playlist.cover && ( <img src={playlist.cover} alt={playlist.name} className='h-full w-full object-cover'/>)}
            </div>

            <h3 className='mt-3 truncate font-bold'>{playlist.name}</h3>
            <p className='truncate text-sm text-muted'>{playlist.total_songs} músicas</p>
        </Link>
    );
}