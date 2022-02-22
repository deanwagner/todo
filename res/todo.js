"use strict";

// Import Modules
import Theme    from './theme.js';
import Settings from './settings.js';
import Task     from './task.js';
import Modal    from 'https://deanwagner.github.io/odin_project/modules/modal/modal.js';

/**
 * To-Do List
 * @class
 */
class ToDo {

    // Class Properties
    theme    = {};
    settings = {};
    modal    = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Load Modules
        this.theme    = new Theme();
        this.settings = new Settings();
        this.modal    = new Modal();

        // Modal Test
        this.modal.open('modal_test');
    }

}

export default ToDo;