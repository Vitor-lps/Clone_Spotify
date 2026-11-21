import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";

export default function TopBar({ onSearch }) {
    const [termo, setTermo] = useState('');

    function handleChange(e) {
        setTermo(e.target.value);
        if (onSearch) onSearch(e.target.value);
    }

    return (
        <header className="flex items-center justify-between gap-4 border-b border-white/5 px-8 py-6">
            <div className="relative max-w-md flex-1">
                <input
                    type="search"
                    value={termo}
                    onChange={handleChange}
                    placeholder="Buscar músicas, álbuns, artistas..."
                    className="w-full rounded-full bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none ring-accent transition focus:ring-2"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"><IoMdSearch /></span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-black/40 py-1 pl-1 pr-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    V
                </div>
                <span className="text-sm font-bold">Vitor</span>
            </div>
        </header>
    );
}