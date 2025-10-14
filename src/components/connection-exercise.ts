import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { Exercice, Question } from '../data/disciplina';

@customElement('connection-exercise')
export default class ConnectionExercise extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .connection-exercice{
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                background-color: var(--cinza-escuro);
                align-items: center;
                overflow: auto;
            }
            
            .exercice{
                display: flex;
                flex-direction: column;
                position: relative;
                padding: 1rem;
                align-items: center;
                height: 100%;
            }

            .exercice__text{
                width: 100%;
                color: #fff;
                background-color: var(--roxo-medio);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
            }

            .text__info{
                width: 100%;
                height: 100%;
                padding: 1rem;
          
            }

            .text__info p{
                height: 100%;
                font-size: 16px;
                margin: 0;
                overflow: auto;
            }

            .text__info img{
                display: none;
                width: 223px;
            }

            .exercice__options{
                width: 100%;
                height: auto;
                display: flex;
                color: #fff;
                align-items: center;
                cursor: pointer;
                background-color: var(--roxo-medio);
                margin-top: 0.5rem;
            }

            .exercice__options:hover{
                background-color: var(--roxo-claro) !important; 
            }

            .options__index{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 10px;
                height: 20px;
                padding: 1rem;
                font-size: 24px;
                border-right: 6px solid #000;
            }

            .divisor{
                display: none;
            }

            .options__text{
                display: flex;
                align-items: center;
                width: 100%;
                height: auto;
                font-size: 14px;
            }

            .options__text p{
                margin: 0rem 0rem 0rem 1rem;
            }

            .whiteColor{
                color: #fff;
            }

            .exercice__button{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 229px;
                height: 46px;
                font-size: 18px;
                margin-top: 1rem;
                padding: 0.5rem;
                font-family: PoppinsRegular;
                background-color: var(--roxo-medio);
                border: none;
                color: #fff;
                cursor: pointer;
            }

            .exercice__button:hover{
                background-color: var(--roxo-claro);
            }

            .modal{
                width: 98%;
                color: #fff;
                display: none;
                flex-direction: column;
                margin-top: 1rem;
                height: 100%;
            }

            .modal__correctModal{
                display: flex;
                flex-direction: column-reverse;
                width: initial;
                padding: 1rem;
                background-color: #3d3b3b;
            }

            .correctModal__text{
                display: flex;
                flex-direction: column;
            }

            .text__title{
                font-size: 30px;
                border-bottom: 1px solid #ffff;
                padding-bottom: 1rem;
            }

            .text__description{
                width: 100%;
                font-size: 18px;
                height: auto;
                overflow-y: auto;
            }

            .text__description::-webkit-scrollbar{
                width: 0;
            }

            .text__description p {
                margin: 0;
                text-align: justify;
            }

            .correctModal__image{
                display: flex;
                justify-content: center;
            }

            .correctModal__image img{
                width: 14rem;
            }

            .modal__button{
                display: flex;
                justify-content: center;
                margin: 1rem;
            }

            @media (min-width: 500px){
                .correctModal__image img{
                    width: 17rem;
                }
            }

            @media (min-width: 1200px){
                .text__info{
                    padding: 2rem;
                }

                .text__info p{
                    margin-top: 1rem;
                }

                .exercice__options{
                    margin-top: 0.8rem;
                }

                .exercice__button{
                    margin-top: 4rem;
                }

            }   

            @media (min-width: 1400px){
                :host{
                    margin-bottom: 3rem;
                }

                .eng-exercice{
                    display: flex;
                    flex-direction: column;
                    margin-top: 3rem;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                }

                .divisor{
                    display: block;
                    width: 6px;
                    height: 100%;
                    background-color: var(--cinza-escuro);
                }
                
                .exercice{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    padding: 2rem;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    max-width: 849px;
                }

                .exercice__text{
                    width: 100%;
                    color: #fff;
                    background-color: var(--roxo-medio);
                    height: 200px;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                }

                .text__info{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    gap: 20px;
                    justify-content: space-evenly;
                    align-items: center;
                    padding: 1rem;
                }

                .text__info p{
                    height: calc(100% - 2rem);
                    width: 56%;
                    margin: 0;
                }

                .text__info img{
                    display: block;
                }

                .exercice__options{
                    width: 100%;
                    height: auto;
                    display: flex;
                    color: #fff;
                    align-items: center;
                    cursor: pointer;
                    margin-top: 0.8rem;
                }

                .options__index{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    padding: 1.3rem;
                    font-size: 24px;
                    border-right: none;
                    font-family: PoppinsBold;
                }

                .options__text{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 55px;
                    font-size: 16px;
                    height: 100%;
                    margin-left: -0.1rem;
                }

                .options__text p{
                    margin: 0rem 0rem 0rem 1rem;
                }

                .whiteColor{
                    color: #fff;
                }

                .exercice__button{
                    padding: 1.8rem;
                    margin-top: 5rem;
                    font-family: PoppinsBold;
                    font-size: 16px;
                }

                .modal{
                    width: 98%;
                    color: #fff;
                    display: none;
                    flex-direction: column;
                    margin-top: 1rem;
                    height: 100%;
                }

                .modal__correctModal{
                    display: flex;
                    width: initial;
                    flex-direction: row;
                    height: 65%;
                    padding: 4rem 3rem 2.5rem 3rem;
                    gap: 91px;
                    justify-content: space-around;
                    align-items: flex-start;
                    background-color: var(--roxo-medio);
                }

                .correctModal__text{
                    display: flex;
                    flex-direction: column;
                }

                .text__title{
                    font-size: 50px;
                    border-bottom: 1px solid #ffff;
                    padding-bottom: 1rem;
                }

                .text__description{
                    width: 100%;
                    font-size: 16px;
                    height: 251px;
                    overflow-y: auto;
                }

                .text__description::-webkit-scrollbar{
                    width: 0;
                }

                .text__description p {
                    margin: 0;
                    text-align: justify;
                }

                .correctModal__image img{
                    width: 400px;
                }

                .modal__button{
                    display: flex;
                    justify-content: center;
                    margin: 2.8rem 0rem 0rem 0rem 0rem;
                }
            }

            
        `;
    }

    @state()
    optionCorrect: string | null = "";

    @state()
    indexOptionSelect: number = 0;

    @state()
    isCorrect: boolean = false;

    @property({attribute: false})
    exercices!: Exercice;

    @queryAll(".exercice__options")
    exerciceOptions!: NodeListOf<HTMLDivElement>;

    @query(".modal")
    modalResponse!: HTMLDivElement;

    @query(".exercice")
    modalExercice!: HTMLDivElement;

    public showExercice(): void{
        this.style.display = "block";
    }

    public hiddenExercice(): void{
        this.style.display = "none";
    }

    public resertOptions(): void{
        this.exerciceOptions.forEach((option: HTMLDivElement) => {
            option.style.background = "var(--roxo-medio)";
        });
    }

    public generateExercise(): TemplateResult{
        console.log(this.exercices.image);
        return html`<div class="exercice">
                        <div class="exercice__text">
                            <div class="text__info">
                                <p>${this.exercices.titleExercice}</p>
                                ${this.exercices.image == "" ? html`` : html`<img src=${this.exercices.image}>`}
             
                            </div>
                        </div>
                        ${this.exercices.questions?.map((question: Question, index: number) => html`
                            <div class="exercice__options" correct=${question.correct} @click=${() => {this.selectOption(index)}}>   
                                <div class="options__index">
                                    ${question.text}
                                </div>
                                <div class="divisor"></div>
                                <div class="options__text">
                                    <p>${question.question}</p>
                                </div>
                            </div>
                        `)}
                        <button @click=${this.confirmExercice} class="exercice__button">Confirmar</button>
                    </div>`;
    }

    private correctModal(): TemplateResult{
        return html`
            <div class="modal">
                <div class="modal__correctModal">
                    <div class="correctModal__text">
                        <h1 class="text__title">${this.isCorrect ? "MUITO BEM!" : "OPA! NÃO É BEM ASSIM"} </h1>
                        <div class="text__description">
                            <p>${this.exercices.questions[this.indexOptionSelect].resolution}</p>
                        </div>
                    </div>
                    <div class="correctModal__image">
                        <img src=${this.isCorrect ? "https://img.freepik.com/vetores-gratis/trofeu-em-estilo-simples_78370-3222.jpg" : "https://canaldaenfermagem.com.br/wp-content/uploads/2024/09/pessoa-triste-isolada-em-um-canto.png"}>
                    </div>
                </div>

                <div  class="modal__button">
                    <button @click=${this.goToBack} class="exercice__button">Voltar</button>
                </div>
             
            </div>
        `;
    }

    private hiddenModalExercice(): void{
        this.modalExercice.style.display = "none";
    }

    private showModalExercice(): void{
        this.modalExercice.style.display = "flex";
    }

    private hiddenModalResponse(): void{
        this.modalResponse.style.display = "none";
    }

    private showModalResponse(): void{
        this.modalResponse.style.display = "flex";
    }

    private selectOption(index: number): void{

        this.exerciceOptions.forEach((option: HTMLDivElement) => {
            option.style.background = "var(--roxo-medio)";
        });

        this.exerciceOptions[index].style.backgroundColor = "var(--roxo-claro)";
        this.optionCorrect = this.exerciceOptions[index].getAttribute("correct");
        this.indexOptionSelect = index;
    }

    private confirmExercice(): void{
        if(this.optionCorrect == ""){
            return;
        }

        if(this.optionCorrect == "true"){
            this.isCorrect = true;
            this.showModalResponse();
            this.hiddenModalExercice();
           
        }else{
            this.isCorrect = false;
            this.showModalResponse()
            this.hiddenModalExercice();
        }

        this.requestUpdate();
    }

    private goToBack(): void{
        this.hiddenModalResponse();
        this.showModalExercice();
        this.resertOptions();

        this.optionCorrect = "";
    }

    protected override render(): TemplateResult{
        return html`
            <div class="connection-exercice">
                ${this.generateExercise()}
                ${this.correctModal()}
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'connection-exercise': ConnectionExercise
   }
}