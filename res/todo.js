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
        this.modal = new Modal();
        this.list  = new List(this.modal);

        // Class Elements
        this.title = document.querySelector('h2');

        // All Tasks Link
        document.getElementById('nav_all').addEventListener('click', (e) => {
            e.preventDefault();
            const last = document.getElementsByClassName('disable')[0];
            last.classList.remove('disable');
            e.currentTarget.classList.add('disable');
            this.title.innerText = 'All Tasks';
            this.list.buildTable();
        });

        // Today Link
        document.getElementById('nav_today').addEventListener('click', (e) => {
            e.preventDefault();
            const last = document.getElementsByClassName('disable')[0];
            last.classList.remove('disable');
            e.currentTarget.classList.add('disable');
            this.title.innerText = 'Today';
            this.list.buildTable('today');
        });

        // Upcoming Link
        document.getElementById('nav_upcoming').addEventListener('click', (e) => {
            e.preventDefault();
            const last = document.getElementsByClassName('disable')[0];
            last.classList.remove('disable');
            e.currentTarget.classList.add('disable');
            this.title.innerText = 'Upcoming';
            this.list.buildTable('upcoming');
        });

        // Overdue Link
        document.getElementById('nav_overdue').addEventListener('click', (e) => {
            e.preventDefault();
            const last = document.getElementsByClassName('disable')[0];
            last.classList.remove('disable');
            e.currentTarget.classList.add('disable');
            this.title.innerText = 'Overdue';
            this.list.buildTable('overdue');
        });

        // Project Links
        const projects = document.querySelectorAll('#nav_projects_list a');
        projects.forEach((proj) => {
            proj.addEventListener('click', (e) => {
                e.preventDefault();
                const link = e.currentTarget;
                const name = link.getElementsByClassName('label')[0].textContent;
                const last = document.getElementsByClassName('disable')[0];
                last.classList.remove('disable');
                link.classList.add('disable');
                this.title.innerText = name;
                this.list.buildTable(name);
            });
        });

        // Archive Link
        document.getElementById('nav_archive').addEventListener('click', (e) => {
            e.preventDefault();
            const last = document.getElementsByClassName('disable')[0];
            last.classList.remove('disable');
            e.currentTarget.classList.add('disable');
            this.title.innerText = 'Archive';
            this.list.buildTable('archive');
        });

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

        // Open Restore Modal
        document.getElementById('nav_restore').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.open('modal_default');
        });

        // Restore Cancel Button
        document.getElementById('default_cancel').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.close('modal_default');
        });

        // Restore Confirm Button
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