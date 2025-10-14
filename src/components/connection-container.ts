import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "./connection-background";
import Eneagono from "../images/eneagono.png";

@customElement('connection-container')
export default class ConnectionContainer extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .connectionHome{
                display: flex;
                width: 100%;
                height: 100%;
                position: relative;
            }

            .connectionHome__shadow{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.2;
                background: radial-gradient(circle, rgb(255 255 255 / 63%) 0%, rgba(8, 7, 31, 1) 100%);
            }

            .connectionHome__eneagono{
                background-repeat: no-repeat;
                position: absolute;
                width: 86px;
                height: 98px;
                top: 20px;
                left: 0;
            }

            .connectionHome__image{
                display: none;
            }


            @media (orientation: landscape) {
                .connectionHome {
                    height: -webkit-fill-available;
                }
            }

            @media (min-width: 1200px){
                .connectionHome{
                    overflow: hidden;
                }

                .connectionHome__shadow{
                    display: none;
                }
                
                .connectionHome__image{
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: absolute;
                    left: 43rem;
                }
            }

        `;
    }   

    @property({type: String})
    image: string = "";

    @property({type: String})
    right: string = "";

    protected override render(): TemplateResult{
        return html`
            <style>
                .connectionHome__eneagono{
                    background-image: url(${Eneagono});
                }
            </style>
            <div class="connectionHome">
                <div class="connectionHome__eneagono"></div>
                <div class="connectionHome__shadow"></div>
                <slot name="content" class="content"></slot>
                <div class="connectionHome__image">
                    <connection-background .image=${this.image} .right=${this.right}></connection-background>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
        'connection-container': ConnectionContainer
   }
}