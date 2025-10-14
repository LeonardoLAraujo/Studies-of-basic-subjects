import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Triangulo from "../images/triangulo.png";
import Bola from "../images/bola.png";
import QuadradoAcento from "../images/quadrado-acento.png";

@customElement('connection-background')
export default class ConnectionBackground extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
                height: 100%;
            }

            .connectionBackground{
                width: 100%;
                height: 100%;
                position: relative;
            } 

            .connectionBackground__triangle{
                background-repeat: no-repeat;
                width: 700px;
                height: 700px;
                position: absolute;
                right: 31rem;
                bottom: -7rem;
            }

            .connectionBackground__ball{
                width: 300px;
                height: 310px;
                background-repeat: no-repeat;
                position: absolute;
                right: 43rem;
                top: -5rem;
            } 

            .connectionBackground__square{
                width: 253px;
                height: 357px;
                background-repeat: no-repeat;
                background-size: contain;
                position: absolute;
                right: 53rem;
                top: 6rem;
            }

            .connectionBackground__people{
                width: 816px;
                height: 100%;
                background-repeat: no-repeat;
                position: absolute;
                z-index: 2;
                background-size: cover;
                right: 35rem;
            }

            .image__shadow{ 
                position: absolute;
                width: 600px;
                height: 600px;
                border-radius: 50%;
                filter: blur(15.5em);
                top: 13rem;
                right: 60rem;
                background-color: var(--lilas-claro);
            }

            @media (min-width: 1346px){
                .connectionBackground__ball{
                    right: 43rem;
                }

                .connectionBackground__triangle{
                    right: 40rem;
                    bottom: -5rem;
                }

                .connectionBackground__square{
                    right: 62rem;
                    top: 5rem;
                }

                .connectionBackground__people{
                    right: 42rem;
                    top: 3rem;
                    width: 907px;
                }
            }

            @media (min-width: 1500px){
                .connectionBackground__people{
                    top: 0rem;
                    background-size: contain;
                    right: 45rem;
                }

                .connectionBackground__square{
                    right: 65rem;
                    top: 2rem;
                }
            }

            @media (min-width: 1920px){
                .connectionBackground__triangle{
                    right: 43rem;
                    bottom: -2rem;
                }

                .connectionBackground__square{
                    width: 295px;
                    right: 66rem;
                    top: 2rem;
                }
            }

            
        `;
    }

    @property({type: String})
    image: string = "";

    @property({type: String})
    right: string = "43";

    protected override render(): TemplateResult{
        return html`
            <style>
                .connectionBackground__triangle{
                    background-image: url(${Triangulo});
                }

                .connectionBackground__ball{
                    background-image: url(${Bola});
                }

                .connectionBackground__square{
                    background-image: url(${QuadradoAcento});
                }

                .connectionBackground__people{
                    background-image: url(${this.image})
                }

                @media (min-width: 1500px){
                    .connectionBackground__people{
                        right: ${this.right}rem !important;
                    }
                }
            </style>
            <div class="connectionBackground">
                <div class="image__shadow"></div>
                <div class="connectionBackground__triangle"></div>
                <div class="connectionBackground__ball"></div>
                <div class="connectionBackground__square"></div>
                <div class="connectionBackground__people"></div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'connection-background': ConnectionBackground
   }
}