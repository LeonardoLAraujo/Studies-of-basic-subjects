import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import Logo from "../images/logo-svg.svg"
import "./connection-icon";
import { Icon } from './connection-icon';
import ConexaoSaber from '../connection-know';
import { Disciplina } from '../data/disciplina';

@customElement('top-bar')
export default class TopBar extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .topBar{
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 94px;
                background-color: var(--preto);
                width: 100%;
            }

            .topBar__logo{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
            }

            .topBar__image{
                width: 142px;
                cursor: pointer;
            }

            .topBar__central{
                width: 121px;
                height: 46px;
                padding: 0.5rem;
                background-color: var(--roxo-claro);
                color: #fff;
                border: none;
                font-family: PoppinsRegular;
                font-size: 12px;
                cursor: pointer;
            }

            .topBar__central:hover{
                background-color: var(--roxo-medio);
            }

            .search__uninove,
            .topBar__search{
                display: flex;
                align-items: center;
                position: relative;
                max-width: 100%;
            }

            .uninove__icon,
            .search__icon{
                position: absolute;
                left: 10px;
            }

            .search__icon{
                cursor: pointer;
            }

            .uninove__input,
            .search__input{
                width: -webkit-fill-available;
                height: 34px;
                font-size: 15px;
                font-family: PoppinsRegular;
                background-color: var(--cinza-claro);
                color: #fff;
                border: none;
                padding: 0.5rem 0.5rem 0.5rem 2.5rem;
                outline: none;
            }

            .uninove__input::placeholder,
            .search__input::placeholder{
                color: #fff;
            }

            .topBar__search{
                display: none;
            }

            .topBar__back{
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                padding: 0.6rem;
            }

            .topBar__back p{
                margin: -0.7rem 0rem 0rem 0rem;
                padding: 0;
                color: #fff;
            }

            .topBar__back:hover{
                background-color: var(--roxo-claro);
            }

            @media (min-width: 1200px){
                .topBar__search{
                    display: block;
                    width: 70%;
                }

                .search__uninove{
                    display: none;
                }
            }
        `;
    }

    private _disciplines = Disciplina;

    @state()
    listDiscipline: any = [];

    @query('.uninove__input')
    input!: HTMLInputElement;

    @query(".search__input")
    searchInput!: HTMLInputElement;

    @property({type: Boolean})
    isShowArrowBack: boolean = false;

    @property({attribute: false})
    referenceProject!: ConexaoSaber;

    public cleanInput(): void {
        this.input.value = "";
    }

    private searchUninove(e: MouseEvent): void{
        e.preventDefault();

        let listDisciplineAux = [];
        this.listDiscipline = [];

        this._disciplines.forEach((discipline) => {
            discipline.modulos.map((modulo: any) => {
                modulo[Object.keys(modulo)[0]].map((matter: any) => {
                    this.listDiscipline.push(matter);
                });
            });
        });

        listDisciplineAux = this.listDiscipline.filter((matter: any) => 
            matter.titulo.toLowerCase().includes(this.searchInput?.value.toLowerCase())
        );

        sessionStorage.setItem("discipline", JSON.stringify({"materia": "Resultados", modules: listDisciplineAux}));
        this.referenceProject.goToRouter("/leveling");
    }

    private toGoCentralAluno(){
        window.open("https://aluno.uninove.br/seu/CENTRAL/aluno/", "_blank");
    }

    private goToBackPage(): void{
        this.referenceProject.goToRouter("/disciplines");
    }

    private backHomePage(): void{
        this.referenceProject.goToRouter("/");
    }

    protected override render(): TemplateResult{
        return html`
            <div class="topBar">
                <img src=${Logo} class="topBar__image" @click=${this.backHomePage}>
                <div class="topBar__search">
                    <connection-icon class="search__icon" .icon=${Icon.Search} color="#fff" @click=${(e: MouseEvent) => {this.searchUninove(e); this.cleanInput()}}></connection-icon>
                    <input class="search__input" type="text" placeholder="Pesquise por palavra chave">
                </div>
                <button class="topBar__central" @click=${this.toGoCentralAluno}>Central do aluno</button>
                ${this.isShowArrowBack ? html`  <div class="topBar__back" @click=${this.goToBackPage}>
                                                    <connection-icon class="back__icon" .icon=${Icon.ArrowBack} color="#fff"></connection-icon>
                                                    <p>Voltar</p>
                                                </div>` : html``}
            </div>
            <form class="search__uninove">
                <connection-icon class="uninove__icon" .icon=${Icon.Search} color="#fff" @click=${(e: MouseEvent) => {this.searchUninove(e); this.cleanInput()}}></connection-icon>
                <input class="uninove__input" type="text" placeholder="Pesquise por palavra chave">
            </form>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'top-bar': TopBar
   }
}