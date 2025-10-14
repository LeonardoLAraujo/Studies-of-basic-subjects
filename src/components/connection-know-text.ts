import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('connection-know-text')
export default class ConnectionKnowText extends LitElement{


    static override get styles(): CSSResult{

        return css`
           *, *::after, *::before{

                box-sizing: border-box;

            }

            :host{
                width: fit-content;
                user-select: none;
                -webkit-user-select: none;
            }

            .conexao-saber-texto{
                width: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
            }

        `;

    }

    @property()
    familha: string = 'PoppinsRegular';

    @property()
    tamanho: string = '16px';

    @property()
    peso: string = '500';

    @property()
    cor: string = 'black';

    @property()
    altura: string = '1';

    @property()
    aparencia: string = 'block';

    protected override render(): TemplateResult{

        return html`
        <style>

            :host{
                display: ${this.aparencia};
            }

        </style>
        <div class="conexao-saber-texto" style="${styleMap({
            fontFamily: this.familha,
            fontSize: this.tamanho, 
            fontWeight: this.peso,
            color: this.cor,
            lineHeight: this.altura 
            })}">
            <slot></slot>
        </div>
        `;

    }


}

declare global{
    interface HTMLElementTagNameMap{
        'connection-know-text': ConnectionKnowText
    }
}