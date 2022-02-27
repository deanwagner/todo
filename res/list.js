"use strict";

// Import Task Module
import Task from './task.js';

/**
 * Task List
 * @class
 * @property {array}  list     - Array of Task Objects
 * @property {object} thead    - <thead>
 * @property {object} tbody    - <tbody>
 * @property {object} tfoot    - <tfoot>
 * @property {object} modal    - Modal Object
 * @property {object} storage  - LocalStorage
 * @property {array}  projects - Task Projects
 * @property {array}  default  - Default Task Data
 * @author Dean Wagner <info@deanwagner.net>
 */
class List {

    // Class Properties
    list     = [];
    thead    = {};
    tbody    = {};
    tfoot    = {};
    modal    = {};
    storage  = {};
    projects = [];

    // Default Tasks
    default = [{
        id       : 'hgfhfgwsx',
        name     : 'Walk Dog',
        project  : 'Daily Chores',
        due      : '',
        created  : '2022-02-23',
        complete : '',
        status   : 0,
        archive  : 0
    }, {
        id       : 'jukurbdfr',
        name     : 'Make Bed',
        project  : 'Daily Chores',
        due      : '',
        created  : '2022-02-22',
        complete : '2022-02-23',
        status   : 1,
        archive  : 0
    }, {
        id       : 'greahjtjk',
        name     : 'Mow Yard',
        project  : 'Weekly Chores',
        due      : '',
        created  : '2022-02-21',
        complete : '',
        status   : 0,
        archive  : 0
    }, {
        id       : 'hgkkludgjz',
        name     : 'Empty Dishwasher',
        project  : 'Daily Chores',
        due      : '',
        created  : '2022-02-20',
        complete : '',
        status   : 0,
        archive  : 0
    }, {
        id       : 'mjhuihgihavb',
        name     : 'Plan Dinner',
        project  : 'Daily Chores',
        due      : '',
        created  : '2022-02-21',
        complete : '',
        status   : 0,
        archive  : 0
    }];

    /**
     * Constructor
     * @constructor
     * @param {object} modal - Modal Object
     */
    constructor(modal) {

        // Class Properties
        this.modal   = modal;
        this.storage = window.localStorage;
        this.thead   = document.querySelector('main table thead');
        this.tbody   = document.querySelector('main table tbody');
        this.tfoot   = document.querySelector('main table tfoot');

        // Load Tasks
        if (this.storage.hasOwnProperty('todo_list')) {
            // Load from LocalStorage
            this.loadTasks(JSON.parse(this.storage.getItem('todo_list')));
        } else {
            // Load Default Tasks
            this.defaultTasks();
        }

        /* * * * * * * * * * * *\
         *   Event Listeners   *
        \* * * * * * * * * * * */

        // Open Add Task Modal
        document.getElementById('add_task').addEventListener('click', (e) => {
            e.preventDefault();
            this.clearForm();
            this.modal.open('modal_edit');
        });

        // Add Task Form Submit
        document.getElementById('new_task').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
            this.modal.close('modal_edit');
            return false;
        });

        // Task Checkboxes
        const checkboxes = this.tbody.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('input', () => {
                const taskID = checkboxes[i].id.replace('check_', '');
                const index  = this.indexFromTaskID(taskID);
                this.list[index].toggleStatus();
                const row  = this.tbody.querySelector('#' + taskID);
                const comp = row.querySelector('.task_complete');
                comp.innerText = this.list[index].getComplete();
                if (checkboxes[i].checked) {
                    row.classList.replace('incomplete', 'complete');
                } else {
                    row.classList.replace('complete', 'incomplete');
                }
                this.updateProjects();
                this.updateStats();
            });
        }

        // Table Header Sort Links
        const tableHeaders = document.querySelectorAll('th a');
        for (let i = 0; i < tableHeaders.length; i++) {
            tableHeaders[i].addEventListener('click', (e) => {
                e.preventDefault();
                const prop = e.target.id.replace('head_', '');
                this.sortList(e, prop);
            });
        }

        // New Project
        document.getElementById('new_project').addEventListener('input', (e) => {
            if (e.currentTarget.value === '__new__') {
                document.getElementById('new_add').style.display = 'block';
                document.querySelector("label[for='new_add']").style.display = 'block';
            } else {
                document.getElementById('new_add').style.display = 'none';
                document.querySelector("label[for='new_add']").style.display = 'none';
            }
        });
    }

    /**
     * Sort Table by Heading
     * @param {object} e    - Event Object
     * @param {string} prop - Property to Sort By
     */
    sortList(e, prop) {
        // Sort Library
        this.list.sort((a, b) => (a[prop].toString().toLowerCase() > b[prop].toString().toLowerCase()) ? 1 : -1);

        // Toggle Ascending/Descending
        const link = e.target;
        if (link.classList.contains('asc')) {
            // From Ascending to Descending
            link.classList.remove('asc');
            link.classList.add('dec');
            this.list.reverse();
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
        this.tableBody();
    }

    /**
     * Delete, Archive, Restore, or Edit Task
     * @param {object} e - Event Object
     */
    editEntry(e) {
        e.preventDefault();

        // Get Data from Element
        const taskID = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;

        // Handle Action
        switch (true) {
            case (action === 'delete'):
                this.deleteTask(taskID);
                break;
            case (action === 'archive'):
                this.archiveTask(taskID);
                break;
            case (action === 'restore'):
                this.restoreTask(taskID);
                break;
            default:
                this.loadForm(taskID);
                this.modal.open('modal_edit');
        }
    }

    /**
     * Add New or Edit Existing Task
     */
    addTask() {
        // Get Task ID from Hidden Form Value
        const taskID = document.getElementById('new_id').value;

        // Check for Task ID
        if (taskID !== '') {

            /* * * * * * * * * * * *\
             * Edit Existing Task  *
            \* * * * * * * * * * * */

            // Get Task Index from Task ID
            const index = this.indexFromTaskID(taskID);

            // Update Library from Form
            const proj = document.getElementById('new_project').value;
            const name = document.getElementById('new_add').value;
            this.list[index].project = ((proj === '__new__') && (name !== '')) ? name : proj;
            this.list[index].name    = document.getElementById('new_name').value;
            this.list[index].due     = document.getElementById('new_due').value;

            // Update Table from Library
            const row = document.getElementById(taskID);
            row.querySelector('.task_name').innerText    = this.list[index].getName();
            row.querySelector('.task_project').innerText = this.list[index].getProject();
            row.querySelector('.task_due').innerText     = this.list[index].getDue();

        } else {

            /* * * * * * * * * * * *\
             *    Add New Task     *
            \* * * * * * * * * * * */

            const proj    = document.getElementById('new_project').value;
            const name    = document.getElementById('new_add').value;
            const project = ((proj === '__new__') && (name !== '')) ? name : proj;
            const now     = new Date();
            const created = now.getFullYear() + '-' +
                ('0' + (now.getMonth()+1)).slice(-2) + '-' +
                ('0' + now.getDate()).slice(-2);

            // Create New Task from Form
            const newTask = new Task(
                this.generateId(),
                document.getElementById('new_name').value,
                project,
                document.getElementById('new_due').value,
                created,
                '',
                '0',
                '0'
            );

            // Add Book to Library
            this.list.push(newTask);

            // Add Book to Table
            this.tbody.appendChild(this.tableRow(newTask));
        }

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.save();
    }

    /**
     * Delete Task
     * @param {string} taskID - Task ID
     */
    deleteTask(taskID) {
        // Delete Task
        this.list = this.list.filter(task => task.id !== taskID);

        // Remove Task from Table
        this.removeTableRow(taskID);

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.save();
    }

    /**
     * Archive Task
     * @param {string} taskID - Task ID
     */
    archiveTask(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Archive Task
        this.list[index].archiveTask();

        // Remove Task from Table
        this.removeTableRow(taskID);

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.save();
    }

    /**
     * Restore Task
     * @param {string} taskID - Task ID
     */
    restoreTask(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Restore Task
        this.list[index].restoreTask();

        // Add Task to Table
        this.tbody.appendChild(this.tableRow(taskID));

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.save();
    }

    /**
     * Build Table
     */
    buildTable() {

        const head = {
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created',
            complete : 'Complete'
        };

        this.thead.innerHTML = '';
        this.tfoot.innerHTML = '';

        this.thead.appendChild(this.tableHead(head));
        this.tableBody();
        this.tfoot.appendChild(this.tableFoot(5));

        // Update Stats
        this.updateStats();
    }

    /**
     * Build Table Head
     * @param {object} headings - Object of Heading Names
     * @returns {object} - Table Row Element
     */
    tableHead(headings) {

        // Create Row Element
        const row   = document.createElement('tr');
        const empty = document.createElement('th');
        empty.innerHTML = ' ';
        row.appendChild(empty);

        // Loop through Headings
        for (let index in headings) {

            // Create Cell Element
            const cell = document.createElement('th');

            // Check for Empty Data
            if ((headings[index] !== ' ') || (headings[index] !== '')) {

                // Create Link Element
                const link = document.createElement('a');
                link.setAttribute('id', 'head_' + index);
                link.setAttribute('href', '#');
                link.innerText = headings[index];

                // Insert into Cell
                cell.appendChild(link);
            } else {
                // Empty String
                cell.innerText = headings[index];
            }

            // Add Cell to Row
            row.appendChild(cell);
        }

        // Create Task Button
        const add = document.createElement('th');
        add.innerHTML = '<a id="add_task" href="#"><svg viewBox="0 0 24 24"><path d="M19 19V8H5V19H19M16 1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1M11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z" /></svg></a>';
        row.appendChild(add);

        // Return Table Row Element
        return row;
    }

    /**
     * Build Table Body
     */
    tableBody(archive = false) {

        // Clear Existing Data
        this.tbody.innerHTML = '';

        // Add Rows to Table
        this.list.forEach((task) => {
            if (archive) {
                if (task.archive) {
                    this.tbody.appendChild(this.tableRow(task));
                }
            } else {
                if (!task.archive) {
                    this.tbody.appendChild(this.tableRow(task));
                }
            }
        });
    }

    /**
     * Build Table Row
     * @param {object} task - Task Object
     * @returns {object} - Table Row Element
     */
    tableRow(task) {

        // Checked/Unchecked
        let check;

        // Create Table Row Element
        const row = document.createElement('tr');
        row.setAttribute('id', task.id);

        if(task.status) {
            // Task Complete
            row.classList.add('complete');
            check = ' checked';
        } else {
            // Task Incomplete
            row.classList.add('incomplete');
            check = '';
        }

        // Create HTML String
        let html =  `
            <td class="task_check"><input type="checkbox" id="check_${task.id}"${check}></td>
            <td class="task_name"><label for="check_${task.id}">${task.getName()}</label></td>
            <td class="task_project">${task.getProject()}</td>
            <td class="task_due">${task.getDue()}</td>
            <td class="task_created">${task.getCreated()}</td>
            <td class="task_complete">${task.getComplete()}</td>
            <td class="task_edit">`;

        if (task.archive) {
            html += `<a data-id="${task.id}" data-action="restore" title="Restore Task" href="#"><svg viewBox="0 0 24 24"><path d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" /></svg></a>`;
        } else {
            html += `<a data-id="${task.id}" data-action="archive" title="Archive Task" href="#"><svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" /></svg></a>`;
        }

        html += `<a data-id="${task.id}" data-action="delete" title="Delete Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a><a data-id="${task.id}" data-action="edit" title="Edit Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg></a>
            </td>`;

        // Add Cells to Table Row
        row.innerHTML = html;

        // Add Event Listeners for Edit Buttons
        const a = row.querySelectorAll('.task_edit a');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.editEntry(e);
            });
        }

        // Return Table Row Element
        return row;
    }

    /**
     * Remove Task from Table
     * @param {string} taskID - Task ID
     */
    removeTableRow(taskID) {
        document.getElementById(taskID).remove();
    }

    /**
     * Build Table Foot
     * @param {number} columns - Number of Columns
     * @returns {object} - Table Row Element
     */
    tableFoot(columns) {
        const col = columns + 2;
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="${col}"><div id="task_stats"></div></td>`;
        return row;
    }

    /**
     * Update All Project Data
     */
    updateProjects() {

        const projNav = document.getElementById('nav_projects_list');
        const projNew = document.getElementById('new_project');

        projNav.innerHTML = '';
        projNew.innerHTML = '<option value="">none</option>';

        this.projects.forEach((proj) => {
            const todo  = this.list.filter(task => ((task.project === proj) && (!task.status) && (!task.archive))).length;
            const total = this.list.filter(task => ((task.project === proj) && (!task.archive))).length;
            if (total) {
                projNav.innerHTML += `<a href="#"><span class="bubble">${todo}</span><span class="label">${proj}</span></a>`;
                projNew.innerHTML += `<option>${proj}</option>`;
            } else {
                //TODO: remove project from array
            }
        });

        const none = this.list.filter(task => ((task.project === '') && (!task.status) && (!task.archive))).length;
        projNav.innerHTML += `<a href="#"><span class="bubble">${none}</span><span class="label">Rogue Tasks</span></a>`;
        projNew.innerHTML += '<option value="__new__">New Project</option>';
    }

    /**
     * Update <tfoot> Stats
     */
    updateStats() {
        let incomplete = 0;
        let complete   = 0;
        let archived   = 0;
        let total      = 0;
        const projects = this.projects.length;

        this.list.forEach((task) => {
            if (task.archive) {
                archived++;
            } else {
                total++;
                if (task.complete) {
                    complete++;
                } else {
                    incomplete++;
                }
            }
        });

        document.getElementById('task_stats').innerHTML = `
            <div>Total:      <span>${total}</span></div>
            <div>Incomplete: <span>${incomplete}</span></div>
            <div>Complete:   <span>${complete}</span></div>
            <div>Archived:   <span>${archived}</span></div>
            <div>Projects:   <span>${projects}</span></div>`;
    }

    /**
     * Load Tasks into List from JSON
     * @param {array} json - Parsed JSON Array of Tasks
     */
    loadTasks(json) {
        // Loop through JSON
        for (let i = 0; i < json.length; i++) {
            // Add Task to List
            this.list[i] = new Task(
                json[i].id,
                json[i].name,
                json[i].project,
                json[i].due,
                json[i].created,
                json[i].complete,
                json[i].status,
                json[i].archive
            );

            // Add Project
            if ((!this.projects.includes(json[i].project)) && (!parseInt(json[i].archive))) {
                this.projects.push(json[i].project);
            }
        }

        // Update Projects
        this.updateProjects();

        // Add Books to Table
        this.buildTable();
    }

    /**
     * Loads Default Tasks
     */
    defaultTasks() {
        this.loadTasks(this.default);
    }

    /**
     * Load Form to Edit Task
     * @param {string} taskID - Task ID
     */
    loadForm(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Populate Form with Existing Values
        document.querySelector('#modal_edit h3').innerText   = 'Edit Task';
        document.querySelector('#new_task button').innerText = 'Update Task';
        document.getElementById('new_name').value    = this.list[index].name;
        document.getElementById('new_project').value = this.list[index].project;
        document.getElementById('new_add').value     = '';
        document.getElementById('new_due').value     = this.list[index].due;
        document.getElementById('new_id').value      = this.list[index].id;
    }

    /**
     * Clear Form for New Task
     */
    clearForm() {
        document.querySelector('#modal_edit h3').innerText = 'Add New Task';
        document.querySelector('#new_task button').innerText = 'Add Task';
        document.getElementById('new_name').value = '';
        document.getElementById('new_project').value = '';
        document.getElementById('new_add').value = '';
        document.getElementById('new_due').value = '';
        document.getElementById('new_id').value = '';
    }

    /**
     * Get Task Index from Task ID
     * @param   {string} id - Task ID
     * @returns {number} - Task Index
     */
    indexFromTaskID(id) {
        return this.list.findIndex(task => task.id === id);
    }

    /**
     * Generate Random Unique ID
     * @returns {string} - Unique ID
     */
    generateId() {
        return (Math.round(Date.now())).toString(36);
    }

    /**
     * Purge All User Data
     */
    purge() {
        this.storage.removeItem('todo_list');
    }

    /**
     * Save All User Data
     */
    save() {
        this.storage.setItem('todo_list', JSON.stringify(this.list));
    }
}

export default List;