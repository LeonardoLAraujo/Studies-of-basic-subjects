import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { DisciplineObject, ModuleObject } from '../data/disciplina';
import "./connection-card-module";
import "./connection-module";
import ConnectionCardModule from './connection-card-module';
import ConnectionModule from './connection-module';
import ConexaoSaber from '../connection-know';

const RESULT = "Resultados";

@customElement('connection-leveling')
export default class ConnectionLeveling extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .leveling{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .leveling__information{
                display: flex;
                flex-direction: column;
            }

            .leveling__text{
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
                justify-content: center;
                padding: 1rem;
            }

            .information__animation{
                border-bottom: 2px solid #fff;
            }

            .leveling__text p{
                font-size: 30px;
                font-family: PoppinsBold;
                padding: 0;
                margin: 0;
            }

            .leveling__card{
                display: flex;
                flex-direction: column;
                gap: 4px;
                overflow-x: hidden;
            }

            .leveling__card::-webkit-scrollbar{
                background-color: var(--roxo-claro);
                color: #fff;
                width: 13px;
            }

            .leveling__card::-webkit-scrollbar-thumb{
                background-color: #fff;
                border-radius: 20px;
            }

            .text__title{
                color: #fff;
            }

            .text__module{
                color: var(--azul-claro);
            }

            .leveling__learning{
                display: none;
            }

            connection-card-module{
                cursor: pointer;
            }

            .card__module{
                display: block;
            }

            .leveling__animationLearning{
                width: 100%;
            }

            @media (min-width: 1024px){
                .information__animation,
                .information__animationCard,
                .leveling__animationLearning{
                    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
                }

                .information__animation{
                    width: 100%;
                }

                .leveling__text{
                    justify-content: flex-start;
                    transform: translateY(200px);
                    animation: titleAnimation 1s cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                .leveling__card{
                    transform: translateX(-700px);
                    animation: cardAnimation 1s cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                @keyframes learningAnimation{
                    0%{
                        transform: translateX(1700px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }

                @keyframes titleAnimation{
                    0%{
                        transform: translateY(200px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }

                @keyframes cardAnimation{
                    0%{
                        transform: translateX(-700px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }
            }

            @media (min-width: 1200px){
                .leveling{
                    flex-direction: row;
                    padding: 1rem;
                    gap: 20px;
                }

                .card__module{
                    display: none;
                }

                .leveling__learning{
                    display: block;
                    width: 100%;
                }

                .leveling__information{
                    gap: 20px;
                    padding: 3rem 1rem 0rem 2rem;
                }

                .leveling__card{
                    height: 718px;
                    overflow-y: auto;
                    gap: 7px;
                }
            }
        `;
    }

    private _body: HTMLBodyElement | null;

	constructor(){
        super();
        this._body = document.querySelector("body");
        this._body!.style!.overflowY = "auto";
    }

    private connectionModule!:  ConnectionModule;
    private learningModule!:    ConnectionModule;

    @state()
    private _discipline: DisciplineObject = JSON.parse(sessionStorage.getItem("discipline") as string) as DisciplineObject;

    @query(".leveling__learning")
    containerLevelingLearning!: HTMLDivElement;

    @queryAll("connection-card-module")
    connectionCardModule!: NodeListOf<ConnectionCardModule>;

    @queryAll(".card__module")
    cardModule!: NodeListOf<HTMLDivElement>;

    @property({attribute: false})
    referenceProject!: ConexaoSaber;

    protected firstUpdated(): void {
        this.referenceProject.topBar.isShowArrowBack = true;
        this.connectionCardModule[0]?.click();

        setTimeout(() => {
            this.connectionCardModule[0]?.currentCard();
        }, 100);
    }

    private alterCard(e: MouseEvent, index: number): void{
        const element: ConnectionCardModule = e.target as ConnectionCardModule;

        this.connectionCardModule.forEach((card: ConnectionCardModule) => {
            if(card != element){
                card.resertCard();
            }
        }); 

        sessionStorage.setItem("module", JSON.stringify(element.module));

        this.learningModule = this.shadowRoot?.querySelector(".learning__module") as ConnectionModule;

        if(window.getComputedStyle(this.cardModule[index]).getPropertyValue("display") != "none"){
            this.connectionModule = this.shadowRoot?.querySelector(".connectionModule") as ConnectionModule;

            this.cardModule[index].insertAdjacentHTML("afterbegin", `<connection-module class="connectionModule"></connection-module>`);
            this.connectionModule?.remove();
        }else{
            this.containerLevelingLearning.insertAdjacentHTML("afterbegin", `<connection-module class="learning__module"></connection-module>`);
            this.learningModule?.remove();
        }
        
        this.connectionModule?.remove();
        this.learningModule?.remove();
    }
    

    private generateCard(): Array<TemplateResult>{

        let listAux = [];

        if(this._discipline.materia == RESULT){
            listAux = this._discipline.modules;
        }else{
            let namePropertyModules: string | any = Object.keys(this._discipline.modules)[0];

            listAux = this._discipline.modules[namePropertyModules];
        }

        return listAux.map((module: ModuleObject, index: number) => html`<connection-card-module .module=${module}
                                                                            @click=${(e: MouseEvent, ) => {this.alterCard(e, index)}}>
                                                                        </connection-card-module>
                                                                        <div class="card__module"></div>`);
    }

    protected override render(): TemplateResult{
        return html`
            <div class="leveling">
                <div class="leveling__information">
                    <div class="information__animation">
                        <div class="leveling__text">
                            <p class="text__title">${this._discipline.materia} </p>
                            ${this._discipline.materia != RESULT ? html`<p class="text__module">- Módulo ${Object.keys(this._discipline.modules)[0]?.slice(6)}</p>` : html``}
                        </div>
                    </div>
                   <div class="information__animationCard">
                        <div class="leveling__card">
                            ${this.generateCard()}
                        </div>
                   </div>
                </div>
                <div class="leveling__animationLearning">
                    <div class="leveling__learning"></div>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'connection-leveling': ConnectionLeveling
   }
}