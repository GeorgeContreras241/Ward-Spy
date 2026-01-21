export const CtaSection = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-8 rounded-2xl border border-primary/10 overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">¿Listo para mejorar tu juego?</h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Descubre Ward Spy y lleva tu rendimiento en League of Legends al siguiente nivel con análisis detallados.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a
                                href="/summoner"
                                className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Buscar invocador
                            </a>
                            <a
                                href="#about"
                                className="inline-flex items-center justify-center px-6 py-2.5 bg-background text-foreground font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
                            >
                                Saber más
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}