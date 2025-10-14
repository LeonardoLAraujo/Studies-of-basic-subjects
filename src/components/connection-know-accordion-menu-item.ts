import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import ConexaoSaberBotao from './connection-know-button';
import "./connection-know-text";

@customElement('connection-know-accordion-menu-item')
export default class ConnectionKnowAccordionMenuItem extends LitElement{


    static override get styles(): CSSResult{

        return css`
        
            *, *::before, *::after{
                box-sizing: border-box;
            }

            :host{
                display: grid;
                text-align: -webkit-center;
                grid-template-columns: 439px 0px;
                justify-content: center;
                align-items: center;
                height: 59px;
            }

            connection-know-button{
                padding: 1rem;
            }

            connection-know-button:hover{
                background-color: var(--cinza);
            }

            connection-know-button[selecionado]{
                background-color: var(--roxo-escuro);
            }

        `;

    }

    @property({attribute: false})
    evento: Function = () => {};

    @property()
    rotulo: string = '';

    @query('conexao-saber-botao')
    botao!: ConexaoSaberBotao;

    @property({type: Boolean})
    estaSelecionado: boolean = false;
    
    public alternaSelecionado(): void {

        this.estaSelecionado = !this.estaSelecionado;

        this.botao.toggleAttribute('selecionado');

    }

    protected override render(): TemplateResult{

        return html`
            <connection-know-button @click=${this.alternaSelecionado} .funcao=${this.evento} largura="522px" altura="59px" corHover="var(--roxo-escuro)">
                <connection-know-text slot="botao-texto" cor="var(--branco)" peso="100" familha="PoppinsExtraLight">${this.rotulo}</connection-know-text>
            </connection-know-button>
        `;

    }



}

declare global{
    interface HTMLElementTagNameMap{
        'connection-know-accordion-menu-item': ConnectionKnowAccordionMenuItem
    }
}        