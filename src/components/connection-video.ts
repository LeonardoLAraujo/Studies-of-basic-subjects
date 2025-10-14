import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ConnectionIcon, Icon } from './connection-icon';

const HOURS_SECONDS: number = 3600;

@customElement('connection-video')
export default class ConnectionVideo extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .connectionVideo{
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .connectionVideo__fade{
                width: 100%;
                height: 100%;
                position: absolute;
                background-color: transparent;
                opacity: 0.7;
            }

            #player{
                width: 100%;
                height: 100%;
            }

            .connectionVideo__players{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 50;
            }

            .players__pauseVideo{
                display: none;
            }

            .player__icon{
                width: 160px;
                height: 160px;
                background: linear-gradient(to top, #d7e4ff, transparent);;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 4px 2px 98px 5px rgba(0,0,0,0.75);
                cursor: pointer;
            }

            .connectionVideo__animationControls{
                position: absolute;
                width: 100%;
                height: 100%;
                border: 0;
                clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
            }

            .connectionVideo__controls{
                position: absolute;
                bottom: 0;
                background-color: var(--cinza);
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid var(--cinza);
            }

            .players__playerVideo,
            .players__pauseVideo{
                z-index: 2;
            }

            .controls__container{
                display: flex;
                align-items: center;
            }

            .control__volume{
                display: none; 
            }

            connection-icon{
                margin: 0rem 1rem 0rem 1rem;
                cursor: pointer;
            }

            .container__pauseVideo{
                display: none;
            }
            

            .players__progressVideo{
                width: 100%;
                background-color: #fff;
                height: 10px;
                border-radius: 0px;
                cursor: pointer;
                position: absolute;
                bottom: 60px;
                z-index: 2;
            }

            .progressVideo__timer{
                position: relative;
                width: 0%;
                transition: width cubic-bezier(0.95, 0.05, 0.795, 0.035);
                height: 100%;
                background-color: #E11111;
                max-width: 100%;
            }

            .timer__circle{
                width: 17px;
                height: 17px;
                position: absolute;
                background-color: red;
                border-radius: 50%;
                bottom: -3px;
                left: -1px;
            }

            .container__duration{
                color: #fff;
                margin-left: 10px;
                font-size: 14px;
            }

            @media (min-width: 1024px){
                /**Volume do Controle */
                .control__volume{
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .control__volume input{
                    display: block;
                    cursor: pointer;
                    width: 65px;
                    height: 3px;
                    margin-left: -0.70rem;
                    border: none;
                    -webkit-appearance: none;
                    appearance: none;
                    position: relative;
                    outline: none;
                    background-color: transparent;
                    z-index: 2;
                }

                /**Bolinha do Input */
                .control__volume input::-webkit-slider-thumb{
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #fff;
                    box-shadow: 0 0 0 0 black;
                }

                .progressAudio{
                    display: block;
                    position: absolute;
                    width: 60px;
                    height: 3px;
                    z-index: 1;
                    background: linear-gradient(to top, var(--preto), transparent);
                    left: 2.9rem;
                    overflow: hidden;
                }

                .progressAudioFill{
                    display: block;
                    width: 20%;
                    height: 100%;
                    background-color: #fff;
                }

                .animationAudioVideo{
                    display: flex;
                    align-items: center;
                    height: 20px;
            
                }
                
                #playerVideo:fullscreen .connectionVideo{
                    width: 100vw;
                    height: 100vh;
                }

                .connectionVideo__controls{
                    transform: translateX(400px);
                    animation: animationControl 400ms cubic-bezier(0, 0, 0.04, 1) forwards;
                }
                    
                @keyframes animationControl{
                    0%{
                        transform: translateY(400px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }
                
            }
        `;
    }

    @state()
    public _player!: Window;

    @state()
    private _videoDoId: string = "";

    @state()
    private _isPlaying: boolean = false;

    @state()
    private _muted: boolean = false;

    @state()
    private _fullScreen: boolean = true;

    @state()
    private _numberProgressBar: number = 0;

    @state()
    private _openControllerPlayer: boolean = false;

    @query("#player")
    private _containerPlayer!: Window;

    @query("#containerMain")
    private _containerMain!: any;

    @query(".players__playerVideo")
    private _containerPlayerVideo!: HTMLDivElement;

    @query(".players__pauseVideo")
    private _containerPauseVideo!: HTMLDivElement;

    @query(".connectionVideo__players")
    private _containerPlayers!: HTMLDivElement;

    @query(".progressAudioFill")
    progressAudioFill!: HTMLSpanElement;

    @query(".progressAudio")
    progressAudio!: HTMLSpanElement;

    @query(".audio__volume")
    audioVolume!: HTMLInputElement;

    @query(".volume__icon")
    volumeIcon!: ConnectionIcon;

    @query(".playerVideo__player")
    playerVideoPlayerContainer!: HTMLDivElement;

    @query(".connectionVideo__controls")
    containerControls!: HTMLDivElement;

    @query(".container__playerVideo")
    containerPlayerVideo!: HTMLDivElement;

    @query(".container__pauseVideo")
    containerPauseVideo!: HTMLDivElement;

    @query(".players__progressVideo")
    progressBarVideo!: HTMLDivElement;

    @query(".progressVideo__timer")
    progressVideoTimer!: HTMLDivElement;

    @query(".timer__circle")
    timerCircle!: HTMLDivElement;

    @query(".duration__start")
    durationStart!: HTMLSpanElement;

    @query(".duration__end")
    durationEnd!: HTMLSpanElement;

    @property({attribute: false})
    video: string = "";

    protected firstUpdated(): void {
        this._videoDoId = this._youTubeGetID(this.video);
        
        this?.onYouTubeIframeAPIReady();
        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();
    }

    /***
     * Instancia o Iframe do youtube
     * @private
     * @method
     * @returns {void}
     */
     private onYouTubeIframeAPIReady(): void{
        try{
            window.YT.ready(() => {
                this._player = new window.YT.Player(this._containerPlayer, {
                    videoId: this._videoDoId,
                    playerVars: {
                        cc_load_policy: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        playersinline: 0,
                        autoplay: 0,
                        controls: 0,
                        disablekb: 1,
                        fs: 1,
                        loop: 0,
                        allowfullscreen: 1,
                        enablejsapi: 1,      
                        hl: 'pt-br',
                        cc_lang_pref: "pt-br",
                    },
                    events: {
                        onReady: this.onPlayerReady.bind(this),
                    },
                })
                window.player = this._player;
            });
        }catch(error){
            console.log(error);
        }   
    }

    /**
     * Quando o Youtube estiver pronto, podemos manipular com esse método
     * @private 
     * @method
     * @returns {void}
     */
    private onPlayerReady(_event: any): void{
        this.durationEnd.textContent = this.durationEndVideo(_event.target.playerInfo.duration);

        window.addEventListener("message", () => {          
            this.progressVideoTimer.style.width = `${this.progressBarVideo.clientWidth * (this._player.playerInfo.currentTime / (_event.target.playerInfo.duration - 1) )}px`;
            this.timerCircle.style.left = this.progressVideoTimer.style.width;

            this.durationEnd.textContent        = this.durationEndVideo(_event.target.playerInfo.duration);
            this.durationStart.textContent      = this.durationStartVideo(_event.target.playerInfo.currentTime);
        });
    }  

    /***
     * Pegando a url do youtube e cortando ela até pegar o id necessario
     * @private
     * @method
     * @returns {string}
     */
    private _youTubeGetID(url: string): string{
        let id: string = '';
        let idArray: Array<string>;
        let urlArray: Array<string>;

        let expressionRegular: number;
        let list: RegExp;

        list = new RegExp(/(?<=list=).*(?=[\&])|(?<=list=).*/, "gi");

        expressionRegular = url.search(list);  

        if(expressionRegular != -1){
            //Pegar a lista do vídeo 

            if(url.includes("&", expressionRegular)){
                id = url.substring(url.search(list), url.lastIndexOf("&"));
            }else{
                id = url.substring(url.search(list), url.lastIndexOf(""));
            } 
        }else{
            //Pegar um único vídeo
            urlArray = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

            if(urlArray[2] !== undefined){
                idArray = urlArray[2].split(/[^0-9a-z_\-]/i);
                id = idArray[0];
            }else{
                id = url;
            }
        }

        return id;
    }

    private stateIsPlaying(): boolean{
        return this._isPlaying = !this._isPlaying;
    }

    private playerVideo(): void{
        this.currentContainerPlayer();
        this._player.playVideo();
    }

    private pauseVideo(): void{
        this.currentContainerPlayer();
        this._player.pauseVideo();
    }

    public stopVideo(): void{
        this._isPlaying = false;
        this._player.pauseVideo();
        this.hiddenContainerPauseVideoAndShowContainerPlayerVideo();
    }

    private hiddenContainerPlayerVideoAndShowPauseVideo(): void{
        this._containerPlayerVideo.style.display = "none";
        this.containerPlayerVideo.style.display = "none";
        this._containerPauseVideo.style.display = "flex";
        this.containerPauseVideo.style.display = "flex";
    }

    private hiddenContainerPauseVideoAndShowContainerPlayerVideo(): void{
        this._containerPlayerVideo.style.display = "flex";
        this.containerPlayerVideo.style.display = "flex";
        this._containerPauseVideo.style.display = "none";
        this.containerPauseVideo.style.display = "none";
    }

    private currentContainerPlayer(): void{
        this._isPlaying ? this.hiddenContainerPlayerVideoAndShowPauseVideo() : this.hiddenContainerPauseVideoAndShowContainerPlayerVideo();
    }

    private onMouseLeave(): void{
        this._containerPlayers.style.display = "none";
        this.containerControls.style.display = "none";
    }
    private onMouseOver(): void{
        this._containerPlayers.style.display = "flex";
        this.containerControls.style.display = "flex";
    }  

    /**
     * Método informa a duração final do vídeo em string
     * @private
     * @returns {string}
     */
    private durationEndVideo(currentTime: number): string{
        let duration = currentTime < HOURS_SECONDS ? 
        new Date(currentTime * 1000).toISOString().slice(14, 19) : 
        new Date(currentTime * 1000).toISOString().slice(11, 19);

        return duration;
    }

    /**
     * Método informa a duração do vídeo em string
     * @private
     * @returns {string}
     */
    private durationStartVideo(currentTime: number): string{
        let duration = currentTime < HOURS_SECONDS ? 
        new Date(currentTime * 1000).toISOString().slice(14, 19) : 
        new Date(currentTime * 1000).toISOString().slice(11, 19);

        return duration;
    }

    /**
     * Altera o background do volume
     * @private
     * @returns {void}
     */
    private controlFillVolumeAudio(): void{
        if(this.progressAudioFill?.style == null || this.progressAudioFill?.style == undefined){
            return;
        }
        this.progressAudioFill.style.width = `${this.audioVolume.value}%`;
    }

    /**
     * Retorna o estado do vídeo em fullScreen 
     * @private
     * @returns {boolean}
     */
    private stateMute(): boolean{
        return this._muted = !this._muted;
    }

    private iconPlayerVolumeCurrent(): void{
        if(this.audioVolume?.value <= String(0)){
            this.volumeIcon.icon = Icon.NoSound;
        }else if(this.audioVolume?.value > String(0) && this.audioVolume?.value <= String(65)){
            this.volumeIcon.icon = Icon.VolumeDown;
        }else if(this.audioVolume?.value > String(70) || this.audioVolume?.value == String(100)){
            this.volumeIcon.icon = Icon.VolumeUp;
        }
    }

    private muteVolume(): void{
        this.stateMute();

        if(this._muted){
            this._player.mute();
            this.audioVolume.value = "0";
        }else{
            this._player.unMute();
            this.audioVolume.value = "50";
        }

        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();
    }

    /**
     * Controla o volume do audio do vídeo
     * @private
     * @returns {void}
     */
    private controlVolumeAudioVideo(): void{
        
        this._player.isMuted() ? this.muteVolume() : this.audioVolume.value;

        if(this.audioVolume.value <= "0"){
            this.muteVolume();
        }

        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();

        this._player.setVolume(Number(this.audioVolume.value));
    }

    /**
     * Retorna o estado do vídeo em fullScreen 
     * @private
     * @returns {boolean}
     */
    public stateFullScreen(): boolean{
        return this._fullScreen = !this._fullScreen;
    }

    /**
     * Ativa o fullScreen do vídeo
     * @private
     * @returns {void}
     */
    private fullScreen(): void{
        this.stateFullScreen();

        if(this._fullScreen){
            if(document.fullscreenElement === null){
                this.openFullScreen();
            }

            this.openFullScreen();
        }else{
            if(document.fullscreenElement === null){
                this.openFullScreen();
            }
            this.closeFullScreen();
        }
    }

    /**
     * Abri o vídeo em tela cheia
     * @method
     * @returns {void}
     */
    private openFullScreen(): void{  
        if (this._containerMain.requestFullscreen) {
            this._containerMain.requestFullscreen();
        } else if (this._containerMain.webkitRequestFullscreen) { /* Safari */
            this._containerMain.webkitRequestFullscreen();
        } else if (this._containerMain.msRequestFullscreen) { /* IE11 */
            this._containerMain.msRequestFullscreen();
        }
    }

    /**
     * Fecha a tela cheia do vídeo
     * @method
     * @returns {void}
     */
    private closeFullScreen(): void{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }else if ((document as any).webkitExitFullscreen) { /* Safari */
            (document as any).webkitExitFullscreen();
        }else if ((document as any).msExitFullscreen) { /* IE11 */
            (document as any).msExitFullscreen();
        }
    }

    /**
     * Altera o momento do vídeo ao clicar na barra de progresso
     * @private
     * @returns {void}
     */
    private alterTimerVideo(e: MouseEvent): void{
        this._numberProgressBar = (e.offsetX / this.progressBarVideo.offsetWidth) * this._player.playerInfo.duration - 1;

        this._player.seekTo(this._numberProgressBar, true);

        this.hiddenContainerPlayerVideoAndShowPauseVideo();
    }  

    /**
     * Verifica se controller esta aberto
     * @private
     * @returns {boolean}
     */
    private stateControllerPlayer(): boolean{
        return this._openControllerPlayer = !this._openControllerPlayer;
     }
 
     /**
      * Aparece os controller do vídeo
      * @private
      * @returns {void}
      */
     private openPopPupControllerPlayer(): void{

        setTimeout(() => {
            if(!this._openControllerPlayer){
                this.onMouseOver();
             }else{
                this.onMouseLeave();
             }
        }, 1000);
         
     }

    protected override render(): TemplateResult{
        return html`
            <div id="containerMain" class="connectionVideo" @mouseleave=${this.onMouseLeave} @mouseover=${this.onMouseOver}  @click=${() => {this.stateControllerPlayer(); this.openPopPupControllerPlayer()}}>
                <div class="connectionVideo__fade" ></div>
                <div id="player"></div>
                <div class="connectionVideo__players">
                   
                    <div class="players__playerVideo" @click=${() => {this.stateIsPlaying(); this.playerVideo()}}>
                        <connection-icon class="player__icon" .icon=${Icon.PlayArrow} color="#fff" size=100 ?filled=${true}></connection-icon>
                    </div>
                    <div class="players__pauseVideo" @click=${() => {this.stateIsPlaying(); this.pauseVideo()}}>
                        <connection-icon class="player__icon" .icon=${Icon.Pause} color="#fff" size=100 ?filled=${true}></connection-icon>
                    </div>
                </div>

                <div class="connectionVideo__animationControls">
                    <div class="connectionVideo__controls">
                        <div class="players__progressVideo" @click=${this.alterTimerVideo}>
                            <div class="progressVideo__timer">
                                <div class="timer__circle"></div>
                            </div>
                        </div>
                        <div class="controls__container">
                            <connection-icon .icon=${Icon.PlayArrow} ?filled=${true} color="#fff" size=30 class="container__playerVideo"  @click=${() => {this.stateIsPlaying(); this.playerVideo()}}></connection-icon>
                            <connection-icon .icon=${Icon.Pause} ?filled=${true} color="#fff" size=30 class="container__pauseVideo" @click=${() => {this.stateIsPlaying(); this.pauseVideo()}}></connection-icon>
                            <div class="control__volume">
                                <connection-icon class="volume__icon" size=26 color="#fff" ?filled=${true} @click=${this.muteVolume}></connection-icon>
                                <div class="animationAudioVideo">
                                    <input type="range" max="95" class="audio__volume" @input=${this.controlVolumeAudioVideo}>
                                    <span class="progressAudio"><span class="progressAudioFill"></span></span>
                                </div>
                            </div>
                    
                            <div class="container__duration">
                                <span class="duration__start">00:00</span>/<span class="duration__end">00:00</span>
                            </div>
                        </div>
                        <div class="controls__fullscreen">
                            <connection-icon .icon=${Icon.Fullscreen} color="#fff" size=30 @click=${this.fullScreen}></connection-icon>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
        'connection-video': ConnectionVideo
   }

   interface Window {
        YT: any;
        player: any;
        playVideo(): void;
        pauseVideo(): void;
        mute(): void;
        unMute(): void;
        getVolume(): number;
        setVolume(valume: number): void;
        isMuted(): boolean;
        getPlayerState(): number;
        requestFullScreen(): any;
        loadVideoById(id: string, numberProgressBar: number): void;
        seekTo(seconds: number, allow: boolean): void;
        nextVideo(): void;
        previousVideo(): void;
        loadPlaylist(list: any): void;
        getPlaybackRate(): number;
        setPlaybackRate(velocity: number): void;
        getPlaybackQuality(): string;
        setPlaybackQuality(qualidade: string): void;
        getAvailableQualityLevels(): Array<string>;
        setSize(num1: number, num2: number): void;
        destroy(): void;
        getVideoUrl(): string;
        clearVideo(): void;
        playerInfo: any;
        currentTime: number;
        duration: number;
    }
}