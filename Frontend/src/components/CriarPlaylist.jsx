import { useState } from "react";
import {toast} from 'react-toastify'
import api from '../services/api'

export default function CriarPlaylist({onClose, onCreated}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(evento) {
        evento.preventDefault();
        setLoading(true)

        try {
            const resposta = await api.post('/playlist', {
                name,
                description,
            });

            toast.success('Playlist criada!')
            onCreated(resposta.data.data)
            onClose()
        } catch (erro) {
            toast.error('Erro ao criar playlist')
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop:-blur-sm">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-white/10 bg-surface p-8">
                <h2 className="text-2xl font-black">Nova Playlist</h2>
                <p className="mt-1 text-sm text-muted">Crie sua coleção de músicas</p>

                <label htmlFor="name" className="mt-6 block text-sm text-muted">Nome</label>
                <input type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                placeholder="Minha Playlist"
                required />

                <label htmlFor="desc" className="mt-4 block text-sm text-muted">Descrição</label>
                 <textarea id="desc"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2" placeholder="O que tem nessa playlist?"
                 rows={3}/>

                 <div className="mt-6 flex gap-3">
                    <button type="button"
                    onClick={onClose}
                    className="flex-1 rounded-full border border-white/15 py-3 font-bold text-muted transition hover:text-cream">Cancelar</button>

                    <button type="submit"
                    disabled={loading}
                    className="btn-blood flex-1 rounded-full py-3 font-bold text-cream">
                        {loading ? 'Criando...' : 'Crair'}
                    </button>
                    </div>                
            </form>
        </div>
    );
}