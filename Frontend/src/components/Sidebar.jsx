import { NavLink } from "react-router-dom";

const links = [ {to: '/', label: 'Início'}, {to: '/playlist/1', label: 'Minha Playlist'},];

export default function Sidebar() {
    return(
        <aside className="hidden w-64 shrink-0 flex-col gap-6 bg-surface p-6 md:flex">
            <h1 className="text-2xl font-black tracking-tight">Spoti 
                <span className="text-accent">Clone</span>
            </h1>

            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                    key={link.to}
                    to={link.to}
                    className={(isActive) =>
                        isActive ? 'rounded-lg bg-accent px-4 py-2 font-mono text-sm text-ink' : 'rounded-lg px-4 py-2 font-mono text-sm text-muted transition hover:text-cream'
                    }>
                      {link.label}  
                    </NavLink> 
                    
                ))}
            </nav>
        </aside>
    );
}