import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('connection-know-button')
export default class ConnectionKnowButton extends LitElement{

    static override get styles(): CSSResult{

        return css`
            *, *::after, *::before {
                box-sizing: border-box;
            }

            :host{
                display: inline-block;
            }

            .conexao-saber-botao{
                border: none;
                outline: none;
            }

            .conexao-saber-botao:hover{
                filter: brightness(1.2);
            }
        `;

    }

    @property()
    cor: string = 'transparent';

    @property()
    corHover: string = 'auto';

    @property()
    largura: string = 'fit-content';

    @property()
    altura: string = 'fit-content';

    @property()
    cursor: string = 'pointer';

    @property({attribute: false})
    funcao: Function = () => {};

    protected override render(): TemplateResult{

        return html`
            <style>
                
                :host{
                    width: ${this.largura};
                    height: ${this.altura};
                }

                .conexao-saber-botao{
                    width: inherit;
                    height: inherit;
                    background-color: ${this.cor};
                    cursor:${this.cursor};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .conexao-saber-botao:hover{
                    background-color: ${this.corHover};
                }

            </style>
            <button @click=${this.funcao} class="conexao-saber-botao">
                <slot name="botao-texto"></slot>
            </button>
        `;

    }


}

declare global{
   interface HTMLElementTagNameMap{
    'connection-know-button': ConnectionKnowButton
   }
}