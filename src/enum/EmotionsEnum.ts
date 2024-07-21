export class EmotionsEnum {
    private static angry = "angry";
    private static sad = "sad";
    private static envy = "envy";
    private static disgust = "disgust";
    private static happiness = "happiness";
    private static fear = "fear";
    private static shame = "shame";
    private static boredom = "boredom";
    private static anxiety = "anxiety";

    public static findEmotionColor(emotion: EmotionsEnum) {
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

    public static RouteTypeList = {
        [ EmotionsEnum.angry ]: "/reminders/angry",
        [ EmotionsEnum.sad ]: "/reminders/sad",
        [ EmotionsEnum.envy ]: "/reminders/envy",
        [ EmotionsEnum.disgust ]: "/reminders/disgust",
        [ EmotionsEnum.happiness ]: "/reminders/happiness",
        [ EmotionsEnum.fear ]: "/reminders/fear",
        [ EmotionsEnum.shame ]: "/reminders/shame",
        [ EmotionsEnum.boredom ]: "/reminders/boredom",
        [ EmotionsEnum.anxiety ]: "/reminders/anxiety",
    };
}
