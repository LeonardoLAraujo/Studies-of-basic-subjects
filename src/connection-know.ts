import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import "./components/top-bar";
import "./components/connection-home";
import "./components/connection-discipline";
import "./components/connection-leveling";
import TopBar from './components/top-bar';

@customElement('connection-know')
export default class ConnectionKnow extends LitElement{
	

	static override get styles(): CSSResult{
		return css`
			.teste{
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
		`;
	}

	public routes = new Router(this, [
		{path: '/', 				render: () => html`<connection-home .referenceProject=${this}></connection-home>`},
		{path: '/disciplines', 		render: () => html`<connection-discipline .referenceProject=${this}></connection-discipline>`},
		{path: '/leveling', 		render: () => html`<connection-leveling .referenceProject=${this}></connection-leveling>`},
	]);

	@query("top-bar")
	topBar!: TopBar;

	@query("connection-leveling")
	teste: any;

	public goToRouter(router: string): void{
		window.location.href = this.routes.link(router);
	}

	protected override render(): TemplateResult{
		return html`
			<top-bar .referenceProject=${this}></top-bar>
			
			${this.routes.outlet()}
		`;
	}

}

declare global{
   interface HTMLElementTagNameMap{
    	'connection-know': ConnectionKnow
   }
}