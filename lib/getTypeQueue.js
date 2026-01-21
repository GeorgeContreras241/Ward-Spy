export const getTypeQueue = (queueId) => {
    switch (queueId) {
        case 420:
            return "Ranked Solo/Duo";
        case 440:
            return "Ranked Flex";
        case 400:
            return "Normal Draft";
        case 430:
            return "Normal Blind";
        case 450:
            return "ARAM";
        case 700:
            return "Clash";
        case 900:
            return "Urf";
        case 1020:
            return "One for All";
        case 1030:
            return "One for All";
    
        default:
            return "Classic";
    }
}