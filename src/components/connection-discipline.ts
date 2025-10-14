import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import "./connection-container";
import HomemTable from "../images/homem-tablet.png";
import { Disciplina, ModuleObject } from '../data/disciplina';
import "./connection-know-accordion-menu";
import "./connection-know-accordion-menu-item";
import ConexaoSaberMenuSanfona from './connection-know-accordion-menu';
import ConexaoSaber from '../connection-know';

@customElement('connection-discipline')
export default class ConnectionDiscipline extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .connectionDiscipline{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 15px;
                position: relative;
                z-index: 3;
                margin-top: 5rem;
                gap: 30px;
            }

            .connectionDiscipline__title{
                color: #fff;
                font-family: PoppinsRegular;
                font-size: 29px;
                text-align: center;
                margin: 0;
                padding: 0;
            }

            .connectionDiscipline__materia{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }

            connection-know-accordion-menu{
                cursor: pointer;
            }

            @media (orientation: landscape) {
                .connectionDiscipline {
                   align-items: center;
                   margin-top: 6rem;
                }
            }

            @media (min-width: 1024px){
                .connectionDiscipline__animationTitle,
                .connectionDiscipline__animationMateria{
                    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
                }

                .connectionDiscipline__title{
                    transform: translateY(400px);
                    animation: titleAnimation 800ms cubic-bezier(0, 0, 0.04, 1) forwards;
                }

                .connectionDiscipline__materia{
                    transform: translateX(-600px);
                    animation: materiaAnimation 900ms cubic-bezier(0, 0, 0.04, 1) forwards;
                }
                
                @keyframes titleAnimation{
                    0%{
                        transform: translateY(400px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }

                @keyframes materiaAnimation{
                    0%{
                        transform: translateX(-600px);
                    }
                    100%{
                        transform: translateX(0px);
                    }
                }
            }

            @media (min-width: 1200px){
                .connectionDiscipline{
                    padding: 0rem 6rem 0rem 6rem;
                }

                .connectionDiscipline,
                .connectionDiscipline__materia{
                    align-items: flex-start;
                }

                .connectionDiscipline__title{
                    width: 400px;
                    text-align: left;
                }

                .connectionDiscipline__materia{
                    overflow-y: auto;
                    overflow-x: hidden;
                    height: 500px;
                }

                .connectionDiscipline__materia::-webkit-scrollbar{
                    background-color: var(--roxo-claro);
                    color: #fff;
                    width: 13px;
                }

                .connectionDiscipline__materia::-webkit-scrollbar-thumb{
                    background-color: #fff;
                    border-radius: 20px;
                }
            }
        `;
    }

    @state()
    disciplines: any = Disciplina;

    @queryAll("conexao-saber-menu-sanfona")
    connectionsMenuDiscipline!: NodeListOf<ConexaoSaberMenuSanfona>;

    @property({attribute: false})
    referenceProject!: ConexaoSaber;

    protected firstUpdated(): void {
        this.referenceProject.topBar.isShowArrowBack = false;
    }

    private goToLeveling(materia: string, module: ModuleObject): void{
        sessionStorage.setItem("discipline", JSON.stringify({"materia": materia, modules: module}));
        
        this.referenceProject.goToRouter("/leveling");
    }

    private openMenuAccordion(e: MouseEvent): void{
        const element: ConexaoSaberMenuSanfona = e.target as ConexaoSaberMenuSanfona;

        this.connectionsMenuDiscipline.forEach((connection: ConexaoSaberMenuSanfona) => {
            if(connection != element){
                connection.close();
            }
        });
    }

    private generateMateria(): Array<TemplateResult>{
        return this.disciplines.map((disciplina: any) => html`<connection-know-accordion-menu label=${disciplina.materia} @click=${(e: MouseEvent) => {this.openMenuAccordion(e)}}>
                                                                ${disciplina.modulos.map((modulo: ModuleObject) => html` 
                                                                    <connection-know-accordion-menu-item 
                                                                                            slot="sanfona-item" 
                                                                                            rotulo="MODULO-${Object.keys(modulo)[0].slice(6)}" 
                                                                                            @click=${() => {this.goToLeveling(disciplina.materia ,modulo)}}>
                                                                    </connection-know-accordion-menu-item>`)}
                                                            </connection-know-accordion-menu>`);
    }

    protected override render(): TemplateResult{
        return html`
            <connection-container .image=${HomemTable} right="36">
                <div class="connectionDiscipline" slot="content">
                    <div class="connectionDiscipline__animationTitle">
                        <p class="connectionDiscipline__title">Escolha a <strong>matéria</strong> que deseja iniciar sua jornada!</p>
                    </div>
                    <div class="connectionDiscipline__animationMateria">
                        <div class="connectionDiscipline__materia">
                            ${this.generateMateria()}
                        </div>
                    </div>
                </div>     
            </connection-container>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
        'connection-discipline': ConnectionDiscipline
   }
}