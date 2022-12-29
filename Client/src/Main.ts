class Elements {
    static readonly body = document.querySelector('body')!;

    static readonly connectForm = this.body.querySelector('#connect-form')! as HTMLFormElement;
    static readonly connectedSuccessfully = this.body.querySelector('#connected-text')! as HTMLSpanElement;
    static readonly canvas = this.body.querySelector('canvas')!;

    static readonly ipInputElement = document.querySelector('#ip-input') as HTMLInputElement;
    static readonly portInputElement = document.querySelector('#port-input') as HTMLInputElement;
    static readonly usernameInputElement = document.querySelector('#username-input') as HTMLInputElement;

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


Elements.connectForm.onsubmit = () => {
    Network.connect(Elements.ipInputElement.value,
        Number.parseInt(Elements.portInputElement.value),
        Elements.usernameInputElement.value);
    return false;
};