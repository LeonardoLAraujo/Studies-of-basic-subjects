import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import Livro from "../images/livro-modulo.png";
import { Icon } from './connection-icon';
import { ModuleObject } from '../data/disciplina';

@customElement('connection-card-module')
export default class ConnectionCardModule extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .card{
                display: flex;
                align-items: center;
                height: 83px;
                padding: 0.5rem;
                position: relative;
                gap: 10px;
                background-color: var(--lilas-escuro);
            }

            .card:hover{
                background-color: var(--roxo-claro) !important;
            }

            .card__image{
                width: 68px;
                height: 65px;
                background-repeat: no-repeat;
            }

            

            .card__text p{
                width: 230px;
                height: auto;
                color: #fff;
                margin: 0;
                padding: 0;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .card__icon{
                display: flex;
                position: absolute;
                right: 10px;
                top: 0;
                gap: 5px;
            }

            @media (min-width: 768px){
                .card__text p{
                    width: 420px;
                    white-space: pre-wrap; 
                }

                .card__text{
                    overflow-y: auto;
                    overflow-x: hidden;
                    height: 100%;
                }

                .card__text::-webkit-scrollbar{
                    width: 0;
                }
            }

            @media (min-width: 1200px){
                .card__text p{
                    width: 242px;
                }

                .card{
                    width: 425px;
                }
            }
        `;
    }

    @query(".card")
    card!: HTMLDivElement;

    @property({attribute: false})
    module!: ModuleObject;

    public currentCard(): void{
        this.card.style.backgroundColor = "var(--roxo-claro)";
    }

    public resertCard(): void{
        if(this.card == undefined){
            return;
        }
        
        this.card.style.backgroundColor = "var(--lilas-escuro)";
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .card__image{
                    background-image: url(${Livro});
                }
            </style>
            <div class="card" @click=${() => {this.currentCard()}}>
                <div class="card__image"></div>
                <div class="card__text">
                    <p>${this.module.titulo}</p>
                </div>
                <div class="card__icon">
                    <connection-icon color="#fff" .icon=${Icon.PictureAsPDF}    size=19></connection-icon>
                    <connection-icon color="#fff" .icon=${Icon.Youtube}         size=19></connection-icon>
                    <connection-icon color="#fff" .icon=${Icon.DesignServices}  size=19></connection-icon>
                </div>
            </div>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
    'connection-card-module': ConnectionCardModule
   }
}