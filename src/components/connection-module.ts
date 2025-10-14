import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { Icon } from './connection-icon';
import "./connection-button-module";
import "./connection-video";
import "./connection-pdf";
import "./connection-exercise";
import { ModuleObject } from '../data/disciplina';
import ConnectionButtonModule from './connection-button-module';
import ConnectionVideo from './connection-video';

enum LearningModule {
    video       = 0,
    pdf         = 1,
    exercice    = 2
}

@customElement('connection-module')
export default class ConnectionModule extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .module{
                width: 100%;
                display: flex;
                flex-direction: column;
            }

            .module__options{
                display: flex;
                flex-direction: column;
            }

            .module__exercice,
            .module__pdf{
                display: none;
            }

            .module__video,
            .module__pdf,
            .module__exercice{
                height: 460px;
            }

            .module__exercice{
                height: auto;
            }

            @media (min-width: 1024px){
                .module__video,
                .module__pdf,
                .module__exercice{
                    height: 504px;
                }
            }

            @media (min-width: 1200px){
                .module__video,
                .module__pdf,
                .module__exercice{
                    height: 592px;
                }

                .module__options{
                    background-color: var(--cinza);
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.5rem;
                    padding: 1rem;
                }
            }

            @media (min-width: 1375px){
                .module__video,
                .module__pdf,
                .module__exercice{
                    height: 749px;
                }

                .module__options{
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                }
               
            }
        `;
    }

    @state()
    private _module: ModuleObject = JSON.parse(sessionStorage.getItem("module") as string) as ModuleObject;

    @queryAll("connection-button-module")
    connectionButtonModule!: NodeListOf<ConnectionButtonModule>;

    @queryAll(".module__learning")
    containerModule!: NodeListOf<HTMLDivElement>;

    @query("connection-video")
    connectionVideo!: ConnectionVideo;

    @property({attribute: false})
    moduleLearning!: ModuleObject;

    protected firstUpdated(_changedProperties: PropertyValues): void {
    
        setTimeout(() => {
            this.connectionButtonModule[0].currentButton();
        }, 200);
    }

    private alterLearning(e: MouseEvent, index: number): void{
        const element: ConnectionButtonModule = e.target as ConnectionButtonModule;

        this.connectionVideo.stopVideo();

        this.connectionButtonModule.forEach((button: ConnectionButtonModule) => {
            if(element != button){
                button.resertButton();
            }
        });

        this.containerModule[index].style.display = "block";

        this.containerModule.forEach((container: HTMLDivElement) => {
            if(this.containerModule[index] != container){
                container.style.display = "none";
            }
        });
    }

    protected override render(): TemplateResult{
        this.moduleLearning != undefined ?  this._module = this.moduleLearning : "";
        return html`
            <div class="module">
                <div class="module__learning module__video">
                    <connection-video .video=${this._module.sourceVideo}></connection-video>
                </div>
                <div class="module__learning module__pdf">
                    <connection-pdf .sourcePdf=${this._module.sourcePDF}></connection-pdf>
                </div>
                <div class="module__learning module__exercice">
                    <connection-exercise .exercices=${this._module.exercice}></connection-exercise>
                </div>
                <div class="module__options">
                    <connection-button-module text="Vídeo"      .icon=${Icon.Youtube}        @click=${(e: MouseEvent) => {this.alterLearning(e, LearningModule.video)}}></connection-button-module>
                    <connection-button-module text="PDF"        .icon=${Icon.PictureAsPDF}   @click=${(e: MouseEvent) => {this.alterLearning(e, LearningModule.pdf)}}></connection-button-module>
                    <connection-button-module text="Exercício"  .icon=${Icon.DesignServices} @click=${(e: MouseEvent) => {this.alterLearning(e, LearningModule.exercice)}}></connection-button-module>
                </div>
            </div>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
    'connection-module': ConnectionModule
   }
}