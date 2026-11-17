export function formatDuration(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2,'0')
    const seg = String(segundos % 60).padStart(2, '0')
    return min + ':' + seg
}

export function formatDate(dataIso) {
    return new Date(dataIso).toLocaleDateString('pt-BR')
}