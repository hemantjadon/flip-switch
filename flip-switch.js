/*
@license
Copyright (c) 2016 Hemant Jadon. All rights reserved.
*/

'use strict';

class FlipSwitch extends HTMLElement {

	static get observedAttributes() {
		return [];
	}

	constructor() {
		super();
		const doc = document.currentScript.ownerDocument;
		const tmpl = doc.querySelector('#fs-tmpl');
		this._root = this.attachShadow({ mode: 'open' });
		this._root.appendChild(tmpl.content.cloneNode(true));
		this._container = this._root.querySelector('.container');
		this._front = this._container.querySelector('.front');
		this._back = this._container.querySelector('.back');
		this._ripple = this._root.querySelector('.ripple');

		this._onResize = this._onResize.bind(this);

		this._onResize();
	}

	connectedCallback(){
		this._addEventListeners();
	}

	disconnectedCallback(){
		
	}

	attributeChangedCallback(){
		
	}

	set value(_value) {
		this._value = _value;
		this._front.querySelector('button').textContent = _value;
	}

	get value() {
		return this._value;
	}

	flip() {
		this._container.classList.toggle('flipped');
		this._ripple.classList.toggle('expanded');
	}

	_addEventListeners() {
		this._front.addEventListener('click', _ => this.flip());
		this._back.addEventListener('click', evt => {
			if (evt.target === evt.currentTarget) {
				return;
			}

			this.value = evt.target.textContent;
			this.flip();
		});

		window.addEventListener('resize', this._onResize) ;
	}

	_onResize() {
		const midX = window.innerWidth*0.5;
		const midY = window.innerHeight*0.5;

		const radius = Math.sqrt(midX*midX + midY*midY);

		this._ripple.style.width = `${radius * 2}px`;
		this._ripple.style.height  = `${radius * 2}px`;
	}

}

customElements.define('flip-switch',FlipSwitch);