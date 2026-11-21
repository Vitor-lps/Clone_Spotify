import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import api from "../services/api";
import HeroButton from "../components/HeroButton";


export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ loading, setLoading] = useState(false)
    const [erro, setErro] = useState('')

    async function hadleSubmit(evento) {
        evento.preventDefault()
        setLoading(true)
        setErro('')

        try {
            const resposta = await api.post('/login', {email, password});

            localStorage.setItem('token', resposta.data.token)

            toast.success('Login com sucesso!');
            navigate('/home')
        }catch (e) {
             if (e.response) {
                const status = e.response.status

                if (status === 401) {
                    setErro('E-mail ou senha incorretos. Verifique e tente novamente.')
                    toast.error('E-mail ou senha incorretos.')
                } else if (status === 422) {
                    setErro('Preencha todos os campos corretamente.')
                    toast.error('Dados inválidos.')
                } else if (status === 500) {
                    setErro('Servidor fora do ar. Tente mais tarde.')
                    toast.error('Erro no servidor.')
                } else {
                    setErro(e.response.data?.message || 'Erro ao fazer login.')
                    toast.error('Erro ao fazer login.')
                }
            } else {
                setErro('Sem conexão com o servidor.')
                toast.error('Sem conexão.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="fundo-login flex min-h-screen items-center justify-center px-6">
            
            <video src="/kokushibo2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"/>

            <div className="absolute inset-0 bg-black/50"></div>

            <form onSubmit={hadleSubmit}
            className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-surface/ backdrop-blur-md p-8">
                <h1 className="text-3xl font-black">Spoti
                    <span className="text-[#A855F7]">Clone</span>
                </h1>
                <p className="mt-1 text-sm text-muted">Entre para ouvir suas músicas</p>

                    {erro && (
                        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                            <p className="flex items-center gap-2 text-sm text-red-400">
                                <span className="text-lg">Erro</span>
                                {erro}
                            </p>
                        </div>
                    )}
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

                <p className="mt-6 text-center text-sm text-muted">
                    Não tem conta?{' '}
                    <Link to="/register" className="text-[#F87171] hover:underline">
                    Cadastre-se
                    </Link>
                </p>
            </form>
        </main>
    )
}