import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Carrossel({titulo, children}) {
    const scrollRef = useRef(null)

    function scrollLeft() {
        scrollRef.current.scrollBy({left: -400, behavior: 'smooth'})
    }

    function scrollRight() {
        scrollRef.current.scrollBy({left : 400, behavior: 'smooth'})
    }

    return (
        <section className="relative mt-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">{titulo}</h2>
            </div>

            <div className="group/carrossel relative mt-5">
                <button onClick={scrollLeft} className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 opacity-0 group-hover/carrossel:opacity-100 text-white shadow-lg transition hover::scale-110 hover:bg-accent">
                     <IoIosArrowBack />
                </button>

                <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
                    {children}
                </div>

                <button onClick={scrollRight} className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 opacity-0 group-hover/carrossel:opacity-100 text-white shadow-lg transition hover:scale-110 hover:bg-accent">
                 <IoIosArrowForward />
                </button>
            </div>
        </section>
    )
}