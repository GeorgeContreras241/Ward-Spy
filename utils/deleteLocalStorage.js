export const deleteLocalStorage = () => {
    console.log("Borrando localStorage en ejecucion")
    const timeStorage = localStorage.getItem('time')

    if (timeStorage) {
        const time = new Date(timeStorage)
        const now = new Date()
        if (now.getTime() - time.getTime() > 12 * 60 * 60 * 1000) {
            localStorage.clear()
            localStorage.setItem('timeStorage', new Date().getTime())
            console.log("borrado")
        }
    }
}

