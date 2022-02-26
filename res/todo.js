"use strict";

// Import Modules
import Theme from './theme.js';
import List  from './list.js';
import Modal from 'https://deanwagner.github.io/modules/modal/modal.js';

/**
 * To-Do List
 * @class
 * @property {object} theme   - Theme Module
 * @property {object} list    - List Module
 * @property {object} modal   - Modal Module
 */
class ToDo {

    // Class Properties
    theme   = {};
    list    = {};
    modal   = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Load Modules
        this.theme = new Theme();
        this.list  = new List();
        this.modal = new Modal();

        // Settings Button
        document.getElementById('nav_settings').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.open('modal_settings');
        });

        // Settings Save Button
        document.getElementById('settings_save').addEventListener('click', (e) => {
            e.preventDefault();
            this.theme.save();
            this.modal.close('modal_settings');
        });

        // Settings Reset Button
        document.getElementById('settings_reset').addEventListener('click', (e) => {
            e.preventDefault();
            this.theme.resetSettings();
        });

        // Open History Modal
        document.getElementById('nav_restore').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.open('modal_default');
        });

        // History Cancel Button
        document.getElementById('default_cancel').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.close('modal_default');
        });

        // History Confirm Button
        document.getElementById('default_confirm').addEventListener('click', (e) => {
            e.preventDefault();
            this.theme.purge();
            this.list.purge();
            this.modal.close('modal_default');
            location.reload();
        });
    }
}

export default ToDo;