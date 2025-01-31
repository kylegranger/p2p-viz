
import { EKeyId } from './core'
import { CApp } from './app'

export class CMousekeyCtlr {
    app: CApp;

    constructor(app: CApp) {
        let self = this;
        this.app = app;
        window.addEventListener('keydown', (evt) => {
            this.onKeydownEvent(evt);
        });
        window.addEventListener('keyup', (evt) => {
            this.onKeyupEvent(evt);
        });
        window.addEventListener('mousedown', function(evt) {
            self.onMouseEvent(evt);
            evt.preventDefault();
        }, false);
        window.addEventListener('mouseup', function(evt) {
            self.onMouseEvent(evt);
        });
        window.addEventListener('mousemove', (evt) => {
            self.onMouseEvent(evt);
        });
        window.addEventListener('wheel', (evt) => {
            self.onMouseEvent(evt);
        });
    }

    public onMouseLeftDown(x: number, y: number) {
        this.app.handleClick(x, y);
    }

    public onMouseRightDown(x: number, y: number, evt: MouseEvent) {
    }

    public onMouseMiddleDown(x: number, y: number) {
        console.log('onMouseMiddleDown');
    }

    public onMouseMove(x: number, y: number) {
        this.app.handleMouseMove(x, y);
    }

    public onMouseLeftUp(x: number, y: number) {
        this.app.handleClickRelease(x, y);
    }

    public onMouseEvent(evt: any) {
        if (!this.app) {
            return;
        }

        let x = evt.offsetX;
        let y = evt.offsetY;
        if (evt.type == 'mousedown') {
            if(evt.button == 0) {
                this.onMouseLeftDown(x, y);
            } else if(evt.button == 1) {
                this.onMouseMiddleDown(x, y);
            } else if(evt.button == 2) {
                this.onMouseRightDown(x, y, evt);
            }
        } else if (evt.type == 'mousemove') {
            this.onMouseMove(evt.movementX, evt.movementY);
        } else if (evt.type == 'mouseup') {
            if(evt.button == 0) {
                this.onMouseLeftUp(x, y);
            }
        } else if (evt.type == 'wheel') {
            if (evt.deltaY > 0) {
                this.app.zoomOutTicks += evt.deltaY/16;
                if (this.app.zoomOutTicks > 10) {
                    this.app.zoomOutTicks = 10;
                }
            } else {
                this.app.zoomInTicks += -evt.deltaY/16;
                if (this.app.zoomInTicks > 10) {
                    this.app.zoomInTicks = 10;
                }
            }
        }
    }

    public onKeydownEvent(evt: KeyboardEvent) {
        if (evt.code == 'ArrowUp') {
            this.app.onAction(true, EKeyId.ArrowUp);
        } else if (evt.code == 'ArrowDown') {
            this.app.onAction(true, EKeyId.ArrowDown);
        } else if (evt.code == 'ArrowLeft') {
            this.app.onAction(true, EKeyId.ArrowLeft);
        } else if (evt.code == 'ArrowRight') {
            this.app.onAction(true, EKeyId.ArrowRight);
        } else if (evt.code == 'KeyC') {
            this.app.onAction(true, EKeyId.ColorMode);
        } else if (evt.code == 'KeyG') {
            this.app.onAction(true, EKeyId.ToggleGradient);
        } else if (evt.code == 'KeyH') {
            this.app.onAction(true, EKeyId.ToggleHistogram);
        } else if (evt.code == 'KeyN') {
            this.app.onAction(true, EKeyId.ToggleConnection);
        } else if (evt.code == 'KeyX') {
            this.app.onAction(true, EKeyId.ToggleCommand);
        } else if (evt.code == 'KeyF') {
            this.app.onAction(true, EKeyId.ToggleFps);
        } else if (evt.code == 'KeyI') {
            this.app.onAction(true, EKeyId.ZoomIn);
        } else if (evt.code == 'KeyO') {
            this.app.onAction(true, EKeyId.ZoomOut);
        }
    }

    public onKeyupEvent(evt: KeyboardEvent) {
        if (evt.code == 'ArrowUp') {
            this.app.onAction(false, EKeyId.ArrowUp)
        } else if (evt.code == 'ArrowDown') {
            this.app.onAction(false, EKeyId.ArrowDown)
        } else if (evt.code == 'ArrowLeft') {
            this.app.onAction(false, EKeyId.ArrowLeft)
        } else if (evt.code == 'ArrowRight') {
            this.app.onAction(false, EKeyId.ArrowRight)
        } else if (evt.code == 'KeyI') {
            this.app.onAction(false, EKeyId.ZoomIn)
        } else if (evt.code == 'KeyO') {
            this.app.onAction(false, EKeyId.ZoomOut)
        }
    }
}
