"use strict";

/**
 * Task Object
 * @class
 * @property {string} id
 * @property {string} name
 * @property {string} project
 * @property {string} due;
 * @property {string} created
 * @property {string} complete
 * @property {number} status
 * @property {number} archive
 * @author Dean Wagner <info@deanwagner.net>
 */
class Task {

    // Class Properties
    id;
    name;
    project;
    due;
    created;
    complete;
    status;
    archive;

    /**
     * Constructor
     * @constructor
     * @param {string} id
     * @param {string} name
     * @param {string} project
     * @param {string} due;
     * @param {string} created
     * @param {string} complete
     * @param {string} status
     * @param {string} archive
     */
    constructor(id, name, project, due, created, complete, status, archive) {
        this.id       = id;
        this.name     = name;
        this.project  = project;
        this.due      = due;
        this.created  = created;
        this.complete = complete;
        this.status   = parseInt(status);
        this.archive  = parseInt(archive);
    }

    /**
     * Get Name
     * @returns {string} - Task Name
     */
    getName() {
        return this.name;
    }

    /**
     * Get Project
     * @returns {string} - Project Name
     */
    getProject() {
        if (this.project !== '') {
            return this.project;
        } else {
            return 'none';
        }
    }

    /**
     * Get Due Date
     * @returns {string} - Due Date
     */
    getDue() {
        return Task.#formatDate(this.due);
    }

    /**
     * Get Created Date
     * @returns {string} - Created Date
     */
    getCreated() {
        return Task.#formatDate(this.created);
    }

    /**
     * Get Complete Date
     * @returns {string} - Created Date
     */
    getComplete() {
        return Task.#formatDate(this.complete);
    }

    /**
     * Get Task Status
     * @returns {string} - Task Status
     */
    getStatus() {
        return (this.status) ? 'Complete' : 'Incomplete';
    }

    /**
     * Toggle Status
     */
    toggleStatus() {
        if (this.status) {
            this.status   = 0;
            this.complete = '';
        } else {
            const now = new Date();
            this.status   = 1;
            this.complete = now.getFullYear() + '-' +
                ('0' + (now.getMonth()+1)).slice(-2) + '-' +
                ('0' + now.getDate()).slice(-2);
        }
    }

    /**
     * Archive Task
     */
    archiveTask() {
        this.archive = 1;
    }

    /**
     * Restore Task
     */
    restoreTask() {
        this.archive = 0;
    }

    /**
     * Format Date to Local String
     * @param   {string} str - Raw Date
     * @returns {string} - Formatted Date
     */
    static #formatDate(str) {
        if (str !== '') {
            if (str.length < 11) {
                str = str + ' 12:00:00';
            }
            return new Date(str).toLocaleDateString();
        } else {
            return 'n/a';
        }
    }
}

export default Task;