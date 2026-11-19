import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify'
import api from "../services/api";
import HeroButton from "../components/HeroButton";

export default function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(evento) {
        evento.preventDefault()
        setLoading(true)

        try {
            await api.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            })

            toast.success('Conta criada com sucesso! Faça login.')
            navigate('/login')
        } catch (erro) {
            if (erro.response?.data?.message) {
                toast.error(erro.response.data.message)
            } else {
                toast.error('Erro ao criar conta. Tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

            <video
                src="/kokushibo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-surface/ backdrop-blur-md p-8"
            >
                <h1 className="text-3xl font-black">
                    Spoti<span className="text-[#A855F7]">Clone</span>
                </h1>
                <p className="mt-1 text-sm text-muted">Crie sua conta para começar</p>

                <label className="mt-8 block text-sm text-muted" htmlFor="name">Nome</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(evento) => setName(evento.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                    placeholder="Seu nome"
                    required
                />

                <label className="mt-5 block text-sm text-muted" htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                    placeholder="exemplo@gmail.com"
                    required
                />

                <label className="mt-5 block text-sm text-muted" htmlFor="senha">Senha</label>
                <input
                    id="senha"
                    type="password"
                    value={password}
                    onChange={(evento) => setPassword(evento.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    required
                />

                <label className="mt-5 block text-sm text-muted" htmlFor="confirmar">Confirmar Senha</label>
                <input
                    id="confirmar"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(evento) => setPasswordConfirmation(evento.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-accent focus:ring-2"
                    placeholder="Repita a senha"
                    required
                />

                <HeroButton type="submit" disabled={loading}>
                    {loading ? 'Criando conta...' : 'Criar Conta'}
                </HeroButton>

                <p className="mt-6 text-center text-sm text-muted">
                    Já tem conta?{' '}
                    <Link to="/login" className="text-[#F87171] hover:underline">
                        Faça login
                    </Link>
                </p>
            </form>
        </main>
    )
}