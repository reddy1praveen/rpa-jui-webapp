import { Injectable } from '@angular/core';
import { RenderOptions } from './js-wrapper/renderOptions.model';

@Injectable()
export class PdfRenderService {

    private RENDER_OPTIONS: RenderOptions;

    getRenderOptions() {
        return Object.assign({}, this.RENDER_OPTIONS);
    }

    setRenderOptions(RENDER_OPTIONS: RenderOptions): any {
        this.RENDER_OPTIONS = RENDER_OPTIONS;
    }
}
