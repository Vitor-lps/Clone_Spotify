import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import api from '../services/api'

export default function TopBar() {
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await api.post('/logout')
            toast.success('Até logo!')
        }catch {
            toast.info('Sessão encerrada.')
        } finally {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }

    return(
        <header className="flex items-center justify-between gap-4 px-6 py-4">
            <input type="search"
            placeholder="Buscar músicas, álbuns, artistas..." 
            className="w-full max-w-md rounded-full bg-surface px-5 py-3 text-sm outline-none ring-accent focus:ring-2"/>

            <button onClick={handleLogout}
            className="rounded-full border border-white/15 px-5 py-2 font-mono text-sm transition hover:border-accent hover:text-accent">Sair</button>
        </header>
    );
}