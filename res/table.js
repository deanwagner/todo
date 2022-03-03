"use strict";

/**
 * Table
 * @class
 * @property {object} thead   - <thead>
 * @property {object} tbody   - <tbody>
 * @property {object} tfoot   - <tfoot>
 * @property {object} columns - Table Columns
 * @property {object} tasks   - Array of Task Objects
 * @author Dean Wagner <info@deanwagner.net>
 */
class Table {

    // Class Properties
    thead   = {};
    tbody   = {};
    tfoot   = {};
    columns = {};
    tasks   = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        this.thead = document.querySelector('main table thead');
        this.tbody = document.querySelector('main table tbody');
        this.tfoot = document.querySelector('main table tfoot');
    }

    /**
     * Sort Table by Heading
     * @param {object} e    - Event Object
     */
    sortList(e) {
        // Sort Library
        const prop = e.target.id.replace('head_', '');
        this.tasks.sort((a, b) => (a[prop].toString().toLowerCase() > b[prop].toString().toLowerCase()) ? 1 : -1);

        // Toggle Ascending/Descending
        const link = e.target;
        if (link.classList.contains('asc')) {
            // From Ascending to Descending
            link.classList.remove('asc');
            link.classList.add('dec');
            this.tasks.reverse();
        } else if (link.classList.contains('dec')) {
            // From Descending to Ascending
            link.classList.remove('dec');
            link.classList.add('asc');
        } else {
            // From No Sort to Ascending
            const links = document.querySelectorAll('th a');
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove(...links[i].classList);
            }
            link.classList.add('asc');
        }

        // Rebuild Table
        this.body();
    }

    /**
     * Build Table Head
     */
    head() {

        // Create Row Element
        const row   = document.createElement('tr');

        // Empty Heading for Checkbox Column
        const empty = document.createElement('th');
        empty.innerHTML = ' ';
        row.appendChild(empty);

        // Loop through Headings
        for (let index in this.columns) {

            // Create Cell Element
            const cell = document.createElement('th');

            // Check for Empty Data
            if ((this.columns[index] !== ' ') || (this.columns[index] !== '')) {

                // Create Link Element
                const link = document.createElement('a');
                link.setAttribute('id', 'head_' + index);
                link.setAttribute('href', '#');
                link.innerText = this.columns[index];

                // Table Header Sort Links
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.sortList(e);
                });

                // Insert into Cell
                cell.appendChild(link);
            } else {
                // Empty String
                cell.innerText = this.columns[index];
            }

            // Add Cell to Row
            row.appendChild(cell);
        }

        // Create Task Button
        const add = document.createElement('th');
        add.innerHTML = '<a id="add_task" href="#"><svg viewBox="0 0 24 24"><path d="M19 19V8H5V19H19M16 1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1M11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z" /></svg></a>';
        row.appendChild(add);

        // Insert Table Head
        this.thead.innerHTML = '';
        this.thead.appendChild(row);
    }

    /**
     * Build Table Body
     */
    body() {
        // Clear Existing Data
        this.tbody.innerHTML = '';

        // Check for Tasks
        if (this.tasks.length > 0) {
            // Add Tasks to Table
            this.tasks.forEach((task) => {
                this.row(task);
            });
        } else {
            // No Tasks
            const col = Object.keys(this.columns).length + 2;
            const row = document.createElement('tr');
            row.innerHTML = `<td id="no_results" colspan="${col}">There are no tasks here.</td>`;
            this.tbody.innerHTML = '';
            this.tbody.appendChild(row);
        }
    }

    /**
     * Build Table Row
     * @param {object} task - Task Object
     */
    row(task) {

        // Checked/Unchecked
        let check;

        // Create Table Row Element
        const row = document.createElement('tr');
        row.setAttribute('id', task.id);

        // Task Stats Class
        if(task.status) {
            // Task Complete
            row.classList.add('complete');
            check = ' checked';
        } else {
            // Task Incomplete
            row.classList.add('incomplete');
            check = '';
        }

        // Priority Class
        if(task.getPriority()) {
            // High Priority
            row.classList.add('priority');
        }

        // Create HTML String
        let html = `<td class="task_check"><input type="checkbox" id="check_${task.id}"${check}></td>`;
        if ('name' in this.columns) {
            html += `<td class="task_name"><label for="check_${task.id}">${task.getName()}</label></td>`;
        }
        if ('project' in this.columns) {
            html += `<td class="task_project">${task.getProject()}</td>`;
        }
        if ('due' in this.columns) {
            html += `<td class="task_due">${task.getDue()}</td>`;
        }
        if ('complete' in this.columns) {
            html += `<td class="task_complete">${task.getComplete()}</td>`;
        }
        if ('created' in this.columns) {
            html += `<td class="task_created">${task.getCreated()}</td>`;
        }
        html += '<td class="task_edit">';

        // Archive/Restore Button
        if (task.archive) {
            html += `<a data-id="${task.id}" data-action="restore" title="Restore Task" href="#"><svg viewBox="0 0 24 24"><path d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" /></svg></a>`;
        } else {
            html += `<a data-id="${task.id}" data-action="archive" title="Archive Task" href="#"><svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" /></svg></a>`;
        }

        // Delete and Edit Buttons
        html += `<a data-id="${task.id}" data-action="delete" title="Delete Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a><a data-id="${task.id}" data-action="edit" title="Edit Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg></a>
            </td>`;

        // Add Cells to Table Row
        row.innerHTML = html;

        // Insert Table Row Element
        this.tbody.appendChild(row);
    }

    /**
     * Remove Task from Table
     * @param {string} taskID - Task ID
     */
    removeRow(taskID) {
        document.getElementById(taskID).remove();
    }

    /**
     * Build Table Foot
     */
    foot() {
        const col = Object.keys(this.columns).length + 2;
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="${col}"><div id="task_stats"></div></td>`;
        this.tfoot.innerHTML = '';
        this.tfoot.appendChild(row);
    }

    /**
     * Add Task to Table
     * @param {object} task - Task Object
     */
    addTask(task) {
        // Add Task to Tasks
        this.tasks.push(task);

        // Add Task to Table
        this.row(task);
    }

    /**
     * Remove Task from Table
     * @param {string} taskID - Task ID
     */
    removeTask(taskID) {
        // Remove Task from Tasks
        this.tasks = this.tasks.filter(task => task.id !== taskID);

        // Remove Task from Table
        this.removeRow(taskID);
    }

    /**
     * 
     * @param {object} cols - Columns Object
     */
    setColumns(cols) {
        this.columns = cols;
    }

    /**
     *
     * @param {object} tasks - Array of Task Objects
     */
    setTasks(tasks) {
        this.tasks = tasks;
    }
}

export default Table;