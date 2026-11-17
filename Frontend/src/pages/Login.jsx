import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import api from "../services/api";
import HeroButton from "../components/HeroButton";

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ loading, setLoading] = useState(false)

    async function hadleSubmit(evento) {
        evento.preventDefault()
        setLoading(true)

        try {
            const resposta = await api.post('/login', {email, password});

            localStorage.setItem('token', resposta.data.token)

            toast.success('Login com sucesso!');
            navigate('/')
        }catch {
            toast.error('senha incorreta. Tente novamente')
        }finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ink via-surface to-ink px-6">
            <form onSubmit={hadleSubmit}
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-surface p-8">
                <h1 className="text-3xl font-black">Spoti
                    <span className="text-accent">Clone</span>
                </h1>
                <p className="mt-1 text-sm text-muted">Entre para ouvir suas músicas</p>

                <label className="mt-8 block text-sm text-muted" htmlFor="email">E-mail</label>
                <input
                id="email" 
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                placeholder="exemplo@gmail.com" 
                required/>

                <label className="mt-5 block text-sm text-muted" htmlFor="senha"></label>
                <input 
                id="senha"
                type="password" 
                value={password}
                onChange={(evento)=> setPassword(evento.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                placeholder="**********"
                required/>

                <HeroButton type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </HeroButton>
            </form>
        </main>
    )
}