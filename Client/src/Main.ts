class Elements {
    static readonly BODY = document.querySelector('body')!;

    static readonly CONNECT_FORM = this.BODY.querySelector('#connect-form') as HTMLFormElement;
    static readonly CONNECTED = this.BODY.querySelector('#connected-text') as HTMLSpanElement;

    static readonly GAME = this.BODY.querySelector('#game') as HTMLSpanElement;
    static readonly CANVAS = this.GAME.querySelector('canvas')!;
    static readonly MY_NAME = this.GAME.querySelector('#my-name') as HTMLSpanElement;
    static readonly ENEMY_NAME = this.GAME.querySelector('#enemy-name') as HTMLSpanElement;

    static readonly GAME_END_SCREEN = this.GAME.querySelector('#post-game') as HTMLSpanElement;
    static readonly GAME_RESULT = this.GAME_END_SCREEN.querySelector('#game-result') as HTMLSpanElement;
    static readonly GAME_REMATCH_BUTTON = this.GAME_END_SCREEN.querySelector('#rematch-button') as HTMLButtonElement;

    static readonly INPUT_IP = this.BODY.querySelector('#ip-input') as HTMLInputElement;
    static readonly INPUT_PORT = this.BODY.querySelector('#port-input') as HTMLInputElement;
    static readonly INPUT_USERNAME = this.BODY.querySelector('#username-input') as HTMLInputElement;

    static enableElement(element: HTMLElement) {
        element.classList.remove('disabled');
    }
    static disableElement(element: HTMLElement) {
        element.classList.add('disabled');
    }
    static isActive(element: HTMLElement) {
        return !element.classList.contains('disabled');
    }
    static setElementActive(element: HTMLElement, active: boolean) {
        if (active)
            this.enableElement(element);
        else
            this.disableElement(element);
    }
}

setTimeout(() => {
    Elements.CONNECT_FORM.onsubmit = () => {
        Network.connect(Elements.INPUT_IP.value,
            Number.parseInt(Elements.INPUT_PORT.value),
            Elements.INPUT_USERNAME.value);
        return false;
    };
    Elements.CANVAS.onclick = (event: MouseEvent) => {
        Game.onCanvasClick(event.offsetX, event.offsetY);
    }

    Elements.GAME_REMATCH_BUTTON.onclick = () => Player.sendRematch();
}, 5);