export default function EmptyState({title, description}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
            <p className="text-2xl font-bold">{title}</p>
            <p className="mt-2 text-muted">{description}</p>
        </div>
    )
}