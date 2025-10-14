import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import MeninaTable from "../images/menina-tablet.png";
import "./connection-container";
import ConexaoSaber from '../connection-know';

@customElement('connection-home')
export default class ConnectionHome extends LitElement{

    static override get styles(): CSSResult{
        return css`
            /* .connectionHome{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: calc(100% - 144px);
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
            } */

            .connectionHome__description{
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0.80rem;
                gap: 15px;
                position: relative;
                z-index: 1;
                margin-top: 3rem;
            }

            .text__introduction,
            .description__title{
                margin: 0;
                padding: 0;
                color: #fff;
                text-align: center;
            }

            .description__title{
                font-family: PoppinsBold;
                font-size: 60px;
                line-height: 1.3;
            }

            .text__introduction{
                font-size: 15px;
                padding: 1rem;
            }

            .description__button{
                width: 100%;
                padding: 1rem;
                font-size: 20px;
                color: #fff;
                background-color: var(--roxo-medio);
                font-family: PoppinsBold;
                border: none;
                cursor: pointer;
                margin-top: 1rem;
            }

            .connectionHome__image{
                display: none;
            }

            .description__button:hover{
                background-color: var(--roxo-claro);
            }

            .description__image{
                display: none;
            }

            @media (min-width: 768px){
                .connectionHome__description{
                    padding: 1rem;
                }

                .connectionHome__description{
                    margin-top: 2rem;
                }

                .description__title{
                    font-size: 70px;
                }

                .description__text{
                    display: flex;
                    justify-content: center;
                }

                .text__introduction{
                    width: 100%;
                    font-size: 18px;
                }

                .description__image{
                    display: flex;
                    justify-content: center;
                    
                }

                .description__image img{
                    width: 56%;
                }

                .description__animationButton{
                    padding-bottom: 2rem;
                }
            }
            

            @media (min-width: 1024px){
                .description__text,
                .discription__animationTitle,
                .description__animationButton{
                    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
                }

                .text__introduction{
                    transform: translateX(-900px);
                    animation: introductionAnimation 1s cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                .description__title{
                    transform: translateY(-400px);
                    animation: titleAnimation 1s cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                .description__button{
                    transform: translateY(200px);
                    animation: buttonAnimation 1s cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                @keyframes introductionAnimation{
                    0%{
                        transform: translateX(-900px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }

                @keyframes titleAnimation{
                    0%{
                        transform: translateY(-400px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }

                @keyframes buttonAnimation{
                    0%{
                        transform: translateY(200px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }

            }

            @media (min-width: 1200px){
                .connectionHome__description{
                    padding: 0rem 0rem 0rem 4rem;
                    margin-top: 8rem;
                }

                .description__title{
                    width: 200px;
                    font-size: 80px;
                    text-align: left;
                }
                
                .description__text{
                    justify-content: flex-start;
                }

                .text__introduction{
                    font-size: 15px;
                    width: 686px;
                    text-align: left;
                    padding: 0rem;
                }

                .description__button{
                    width: 351px;
                    margin-top: 4rem;
                }
                
                .connectionHome__image{
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: absolute;
                    left: 43rem;
                }
                
                .description__image{
                    display: none;
                }
            }
        `;
    }

    @property({attribute: false})
    referenceProject!: ConexaoSaber;

    private goToDiscipline(): void{
       this.referenceProject.goToRouter("/disciplines");
    }

    protected override render(): TemplateResult{
        return html`
           <connection-container .image=${MeninaTable}>
                <div class="connectionHome__description" slot="content">
                    <div class="description__image">
                        <img src=${MeninaTable}>
                    </div>
                    <div class="discription__animationTitle">
                        <h1 class="description__title">Conexão Saber</h1>
                    </div>
                    <div class="description__text">
                        <p class="text__introduction">No Conexão Saber, oferecemos aulas super dinâmicas de <strong>Português, Matemática, Biologia, 
                            Física, Química entre outros </strong>, preparadas especialmente para você. Aqui, você não apenas aprende, mas também se transforma! 
                            Nossa missão é equipá-lo com o conhecimento e a confiança que você precisa para brilhar no <strong>ambiente acadêmico.</strong> 🚀 
                            <br><br>
                            Pronto para desbravar esse novo capítulo da sua vida? Venha fazer parte do Conexão Saber e descubra como <strong>tornar seu 
                            futuro ainda mais promissor!</strong> ✨
                        </p>
                    </div>
                    <div class="description__animationButton">
                        <button class="description__button" @click=${this.goToDiscipline}>Entrar</button>
                    </div>
                </div>
           </connection-container>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'connection-home': ConnectionHome
   }
}