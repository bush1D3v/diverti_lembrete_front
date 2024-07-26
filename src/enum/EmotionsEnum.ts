export class EmotionsEnum {
    private static raiva = "raiva";
    private static tristeza = "tristeza";
    private static inveja = "inveja";
    private static nojinho = "nojinho";
    private static alegria = "alegria";
    private static medo = "medo";
    private static vergonha = "vergonha";
    private static tédio = "tédio";
    private static ansiedade = "ansiedade";

    public static translateEmotionToENG(emotion: EmotionsEnum) {
        switch (emotion) {
            case EmotionsEnum.raiva:
                return "angry";
            case EmotionsEnum.tristeza:
                return "sad";
            case EmotionsEnum.inveja:
                return "envy";
            case EmotionsEnum.nojinho:
                return "disgust";
            case EmotionsEnum.alegria:
                return "happiness";
            case EmotionsEnum.medo:
                return "fear";
            case EmotionsEnum.vergonha:
                return "shame";
            case EmotionsEnum.tédio:
                return "boredom";
            case EmotionsEnum.ansiedade:
                return "anxiety";
        }
    }

    private static angry = "angry";
    private static sad = "sad";
    private static envy = "envy";
    private static disgust = "disgust";
    private static happiness = "happiness";
    private static fear = "fear";
    private static shame = "shame";
    private static boredom = "boredom";
    private static anxiety = "anxiety";

    public static translateEmotionToPT(emotion: EmotionsEnum) {
        switch (emotion) {
            case EmotionsEnum.angry:
                return "Raiva";
            case EmotionsEnum.sad:
                return "Tristeza";
            case EmotionsEnum.envy:
                return "Inveja";
            case EmotionsEnum.disgust:
                return "Nojinho";
            case EmotionsEnum.happiness:
                return "Alegria";
            case EmotionsEnum.fear:
                return "Medo";
            case EmotionsEnum.shame:
                return "Vergonha";
            case EmotionsEnum.boredom:
                return "Tédio";
            case EmotionsEnum.anxiety:
                return "Ansiedade";
        }
    }

    public static getBackgroundEmotion(emotion: EmotionsEnum) {
        switch (emotion) {
            case EmotionsEnum.angry:
                return "bg-angry";
            case EmotionsEnum.sad:
                return "bg-sad";
            case EmotionsEnum.envy:
                return "bg-envy";
            case EmotionsEnum.disgust:
                return "bg-disgust";
            case EmotionsEnum.happiness:
                return "bg-happiness";
            case EmotionsEnum.fear:
                return "bg-fear";
            case EmotionsEnum.shame:
                return "bg-shame";
            case EmotionsEnum.boredom:
                return "bg-boredom";
            case EmotionsEnum.anxiety:
                return "bg-anxiety";
        }
    }

    public static getTextEmotion(emotion: EmotionsEnum) {
        switch (emotion) {
            case EmotionsEnum.angry:
                return "text-angry";
            case EmotionsEnum.sad:
                return "text-sad";
            case EmotionsEnum.envy:
                return "text-envy";
            case EmotionsEnum.disgust:
                return "text-disgust";
            case EmotionsEnum.happiness:
                return "text-happiness";
            case EmotionsEnum.fear:
                return "text-fear";
            case EmotionsEnum.shame:
                return "text-shame";
            case EmotionsEnum.boredom:
                return "text-boredom";
            case EmotionsEnum.anxiety:
                return "text-anxiety";
        }
    }
}
