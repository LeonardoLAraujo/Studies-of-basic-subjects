import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Icon } from './connection-icon';

@customElement('connection-know-accordion-menu')
export default class ConnectionKnowAccordionMenu extends LitElement{


    static override get styles(): CSSResult{

        return css`
        
            *, *::before, *::after{
                box-sizing: border-box;
            }

            :host{
                user-select: none;
                -webkit-user-select: none;
                display: block;
                width: 100%;
                max-width: 522px;
                min-width: 360px;
            }

            .conexao-saber-menu-sanfona{
                width: inherit;
                max-width: inherit;
                min-width: inherit;
                background-color: var(--roxo-medio);
                color: var(--branco);
            }

            .conexao-saber-menu-sanfona:hover{
                background-color: var(--roxo-claro);
            }

            .conexao-saber-menu-sanfona__containerTopo{
                height: 82px;
                display: grid;
                grid-template-columns: 1fr 82px;
                align-items: center;
                justify-content: center;
                text-align: center;
                border-bottom: 1px solid var(--roxo-escuro);
            }

            .containerTopo__label{
                font-size: 24px;
                font-family: PoppinsBold;
                grid-column: 1 / -1;
                grid-row: 1;
            }

            .containerTopo__botao{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 83px;
                height: 50px;
                border-left: 1px solid var(--branco);
                grid-column: 2;
                grid-row: 1;
                cursor: pointer;
            }

            .conexao-saber-menu-sanfona__containerItems{
                display: flex;
                flex-direction: column;
                gap: 10px;
                transition: height 0.3s ease-out;
            }
        `;

    }

    @property()
    label: string = '';

    @state()
    _estaAberto: boolean = false;

    public alternarAbriFecha(): void {
        this._estaAberto = !this._estaAberto;
    }

    public close(): void{
        this._estaAberto = false;
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .botao__icone{
                    transform: rotateZ(${this._estaAberto ? '90deg' : '270deg'});
                }

                .conexao-saber-menu-sanfona__containerItems{
                    overflow: hidden;
                    height: ${this._estaAberto ? '404px' : '0'};
                }

            </style>
            <div class="conexao-saber-menu-sanfona"  @click=${this.alternarAbriFecha}>
                <div class="conexao-saber-menu-sanfona__containerTopo">
                    <div class="containerTopo__label">${this.label}</div>
                    <div class="containerTopo__botao">
                        <connection-icon class="botao__icone" .icon=${Icon.ArrowBack} color="var(--branco)"></connection-icon>
                    </div>
                </div>
                <div class="conexao-saber-menu-sanfona__containerItems">
                    <slot name="sanfona-item"></slot>
                </div>
            </div>
        `;
    }
}

declare global{

    interface HTMLElementTagNameMap{

        'connection-know-accordion-menu': ConnectionKnowAccordionMenu

    }
}