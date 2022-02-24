"use strict";

// Import Modules
import Theme from './theme.js';
import List  from './list.js';
import Modal from 'https://deanwagner.github.io/modules/modal/modal.js';

/**
 * To-Do List
 * @class
 * @property {object} theme - Theme Module
 * @property {object} list  - List Module
 * @property {object} modal - Modal Module
 */
class ToDo {

    // Class Properties
    theme = {};
    list  = {};
    modal = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Load Modules
        this.theme = new Theme();
        this.list  = new List();
        this.modal = new Modal();

        // Modal Test
        // this.modal.open('modal_test');
    }

}

export default ToDo;