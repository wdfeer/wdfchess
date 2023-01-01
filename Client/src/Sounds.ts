class Sounds{
    private static loadSound(path: string): HTMLAudioElement{
        let audio = new Audio(path);
        audio.src = path;
        audio.load();
        Elements.disableElement(audio);
        return Elements.BODY.appendChild(audio);
    }

    static readonly MOVE = this.loadSound('./sounds/move.mp3');
    static readonly NOTIFY = this.loadSound('./sounds/notify.mp3');
}