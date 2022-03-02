"use strict";

// Import Modules
import Task  from './task.js';
import Table from './table.js';

/**
 * Task List
 * @class
 * @property {array}  list     - Array of Task Objects
 * @property {object} modal    - Modal Object
 * @property {object} storage  - LocalStorage
 * @property {array}  projects - Task Projects
 * @property {object} table    - Table Object
 * @property {array}  default  - Default Task Data
 * @author Dean Wagner <info@deanwagner.net>
 */
class List {

    // Class Properties
    list     = [];
    modal    = {};
    storage  = {};
    projects = [];
    table    = {};

    // Default Tasks
    default = [{
        id       : 'jukurbdfr',
        name     : 'Make Bed',
        project  : 'Daily Chores',
        due      : 0,
        created  : new Date('2022-02-22').getTime(),
        complete : new Date('2022-02-23').getTime(),
        status   : 1,
        archive  : 0
    }, {
        id       : 'hgfhfgwsx',
        name     : 'Walk Dog',
        project  : 'Daily Chores',
        due      : 0,
        created  : new Date('2022-02-23').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'bnmkhdrt',
        name     : 'Get Oil Change',
        project  : '',
        due      : Date.now() + 345600000,
        created  : new Date('2022-02-20').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'edcrfvujmygv',
        name     : 'Renew Drivers License',
        project  : '',
        due      : Date.now() + 10800000,
        created  : new Date('2022-02-18').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'greahjtjk',
        name     : 'Mow Yard',
        project  : 'Weekly Chores',
        due      : 0,
        created  : new Date('2022-02-21').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'ewqrtfdcvlk',
        name     : 'Schedule Dentist Appointment',
        project  : '',
        due      : Date.now() - 345600000,
        created  : new Date('2022-02-18').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'hgkkludgjz',
        name     : 'Empty Dishwasher',
        project  : 'Daily Chores',
        due      : 0,
        created  : new Date('2022-02-20').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'bvfsdhghrykl',
        name     : 'Put Out Trash',
        project  : 'Weekly Chores',
        due      : 0,
        created  : new Date('2022-02-21').getTime(),
        complete : new Date('2022-02-21').getTime(),
        status   : 1,
        archive  : 0
    }, {
        id       : 'mjhuihgihavb',
        name     : 'Plan Dinner',
        project  : 'Daily Chores',
        due      : 0,
        created  : new Date('2022-02-21').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'ewrttthgbkloxzc',
        name     : 'Recycle Center',
        project  : 'Weekly Chores',
        due      : 0,
        created  : new Date('2022-02-21').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'dfggdshjkjvbn',
        name     : 'Intermediate HTML and CSS',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-11').getTime(),
        complete : new Date('2022-01-12').getTime(),
        status   : 1,
        archive  : 0
    }, {
        id       : 'lkjhkfhuimhj',
        name     : 'JavaScript',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-11').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'zxcvfdsdsar',
        name     : 'Advanced HTML and CSS',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-11').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'mnbvhgjkliuy',
        name     : 'NodeJS',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-11').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'vcxxzdfkljh',
        name     : 'Getting Hired',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-11').getTime(),
        complete : 0,
        status   : 0,
        archive  : 0
    }, {
        id       : 'qwerrgfdfgd',
        name     : 'Introduction',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-02').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'jhkkgkgyign',
        name     : 'Installations',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-03').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'tryhgfgjjyut',
        name     : 'Git Basics',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-04').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'trytrytyjhfgds',
        name     : 'HTML Foundations',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-05').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'trytrytyjhfgds',
        name     : 'CSS Foundations',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-06').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'qxcxzkjlkjiio',
        name     : 'Flexbox',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-07').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'poipopoujhkh',
        name     : 'JavaScript Basics',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-08').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'uiuyrrtytrgh',
        name     : 'The Back End',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-09').getTime(),
        status   : 1,
        archive  : 1
    }, {
        id       : 'bvnbcghqwerty',
        name     : 'Conclusion',
        project  : 'Odin Project',
        due      : 0,
        created  : new Date('2022-01-01').getTime(),
        complete : new Date('2022-01-10').getTime(),
        status   : 1,
        archive  : 1
    }];

    /**
     * Constructor
     * @constructor
     * @param {object} modal - Modal Object
     */
    constructor(modal) {

        // Class Properties
        this.modal   = modal;
        this.table   = new Table();
        this.storage = window.localStorage;

        // Load Tasks
        this.loadTasks();

        // Update Projects
        this.updateProjects();

        // Build Table
        this.buildTable();

        // Add Task Form Submit
        document.getElementById('new_task').addEventListener('submit', (e) => {
            e.preventDefault();
            this.taskAdd();
            this.modal.close('modal_edit');
            return false;
        });

        // New Project
        document.getElementById('new_project').addEventListener('input', (e) => {
            if (e.currentTarget.value === '__new__') {
                document.getElementById('new_add').style.display = 'block';
                document.getElementById('new_add').required = true;
                document.querySelector("label[for='new_add']").style.display = 'block';
            } else {
                document.getElementById('new_add').style.display = 'none';
                document.getElementById('new_add').required = false;
                document.querySelector("label[for='new_add']").style.display = 'none';
            }
        });
    }

    /**
     * Build Table
     */
    buildTable(filter = 'all') {

        switch (filter) {
            case 'all':
                this.filterAll();
                break;
            case 'today':
                this.filterToday();
                break;
            case 'upcoming':
                this.filterUpcoming();
                break;
            case 'overdue':
                this.filterOverdue();
                break;
            case 'archive':
                this.filterArchive();
                break;
            default:
                this.filterProject(filter);
        }

        this.table.head();
        this.table.body();
        this.table.foot();

        // Task Edit Buttons
        this.editButtons();

        // Update Stats
        this.updateStats();

        // Add Task Button
        document.getElementById('add_task').addEventListener('click', (e) => {
            e.preventDefault();
            this.formClear();
            this.modal.open('modal_edit');
        });
    }

    /**
     * Purge All User Data
     */
    dataPurge() {
        this.storage.removeItem('todo_list');
    }

    /**
     * Store All User Data
     */
    dataStore() {
        this.storage.setItem('todo_list', JSON.stringify(this.list));
    }

    /**
     * Add Event Listeners for Edit Buttons
     * @param {object} container - Container Element
     */
    editButtons(container = null) {
        if (container === null) {
            container = document.querySelector('main table tbody');
        }

        // Task Edit Buttons
        const a = container.querySelectorAll('.task_edit a');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.editEntry(e);
            });
        }

        // Task Checkboxes
        const checkboxes = container.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('input', () => {
                const taskID = checkboxes[i].id.replace('check_', '');
                const index  = this.indexFromTaskID(taskID);
                this.list[index].toggleStatus();
                const row  = document.getElementById(taskID);
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
        switch (action) {
            case 'delete':
                this.taskDelete(taskID);
                break;
            case 'archive':
                this.taskArchive(taskID);
                break;
            case 'restore':
                this.taskRestore(taskID);
                break;
            default:
                this.formLoad(taskID);
                this.modal.open('modal_edit');
        }
    }

    /**
     * All Tasks Section
     */
    filterAll() {
        this.table.setColumns({
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created',
            complete : 'Complete'
        });

        // Build Tasks
        const tasks = this.list.filter(task => task.archive === 0);
        this.table.setTasks(tasks);
    }

    /**
     * Archived Section
     */
    filterArchive() {
        this.table.setColumns({
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created',
            complete : 'Complete'
        });

        // Build Tasks
        const tasks = this.list.filter(task => task.archive === 1);
        this.table.setTasks(tasks);
    }

    /**
     * Overdue Section
     */
    filterOverdue() {
        this.table.setColumns({
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created'
        });

        // Build Tasks
        const today = new Date().getTime();
        const tasks = this.list.filter(task => {
            if (task.due !== 0) {
                const date = new Date(task.due).getTime();
                return ((date <= today) && (task.complete === 0) && (task.archive === 0));
            } else {
                return false;
            }
        });
        this.table.setTasks(tasks);
    }

    /**
     * Archived Section
     * @param {string} project - Project Name
     */
    filterProject(project) {
        this.table.setColumns({
            name     : 'Task',
            due      : 'Due By',
            created  : 'Created',
            complete : 'Complete'
        });

        // Build Tasks
        let tasks;
        if (project === 'Other Tasks') {
            tasks = this.list.filter(task => ((task.project === '') && (task.archive === 0)));
        } else {
            tasks = this.list.filter(task => ((task.project === project) && (task.archive === 0)));
        }
        this.table.setTasks(tasks);
    }

    /**
     * Today Section
     */
    filterToday() {
        this.table.setColumns({
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created'
        });

        // Build Tasks
        const start = new Date();
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        const stop = new Date();
        stop.setHours(23);
        stop.setMinutes(59);
        stop.setSeconds(59);
        const tasks = this.list.filter(task => {
            if (task.due !== 0) {
                const date = new Date(task.due).getTime();
                return ((date >= start.getTime()) && (date <= stop.getTime()) && (task.complete === 0) && (task.archive === 0));
            } else {
                return false;
            }
        });
        this.table.setTasks(tasks);
    }

    /**
     * Upcoming Section
     */
    filterUpcoming() {
        this.table.setColumns({
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created'
        });

        // Build Tasks
        const today = new Date().getTime();
        const tasks = this.list.filter(task => {
            if (task.due !== 0) {
                const date = new Date(task.due).getTime();
                return ((date >= today) && (task.complete === 0) && (task.archive === 0));
            } else {
                return false;
            }
        });
        this.table.setTasks(tasks);
    }

    /**
     * Clear Form for New Task
     */
    formClear() {
        document.querySelector('#modal_edit h3').innerText = 'Add New Task';
        document.querySelector('#new_task button').innerText = 'Add Task';
        document.getElementById('new_name').value = '';
        document.getElementById('new_project').value = '';
        document.getElementById('new_due').value = '';
        document.getElementById('new_id').value = '';

        const newProj = document.getElementById('new_add');
        newProj.value = '';
        newProj.style.display = 'none';
        newProj.required = false;
        document.querySelector("label[for='new_add']").style.display = 'none';
    }

    /**
     * Load Form to Edit Task
     * @param {string} taskID - Task ID
     */
    formLoad(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Populate Form with Existing Values
        document.querySelector('#modal_edit h3').innerText = 'Edit Task';
        document.querySelector('#new_task button').innerText = 'Update Task';
        document.getElementById('new_name').value = this.list[index].name;
        document.getElementById('new_project').value = this.list[index].project;
        document.getElementById('new_id').value = this.list[index].id;

        if (this.list[index].due > 0) {
            document.getElementById('new_due').valueAsDate = new Date(this.list[index].due);
        } else {
            document.getElementById('new_due').value = '';
        }

        const newProj = document.getElementById('new_add');
        newProj.value = '';
        newProj.style.display = 'none';
        newProj.required = false;
        document.querySelector("label[for='new_add']").style.display = 'none';
    }

    /**
     * Generate Random Unique ID
     * @returns {string} - Unique ID
     */
    generateId() {
        return (Math.round(Date.now())).toString(36);
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
     * Load Tasks into List
     */
    loadTasks() {
        let json;
        if (this.storage.hasOwnProperty('todo_list')) {
            // Load from LocalStorage
            json = JSON.parse(this.storage.getItem('todo_list'));
        } else {
            // Load Default Tasks
            json = JSON.parse(JSON.stringify(this.default));
        }

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
            if ((json[i].project !== '') && (!this.projects.includes(json[i].project)) && (!parseInt(json[i].archive))) {
                this.projects.push(json[i].project);
            }
        }
    }

    /**
     * Add New or Edit Existing Task
     */
    taskAdd() {
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
            this.list[index].due     = document.getElementById('new_due').valueAsNumber;

            // Update Table from Library
            const row = document.getElementById(taskID);
            row.querySelector('.task_name').innerText    = this.list[index].getName();
            row.querySelector('.task_project').innerText = this.list[index].getProject();
            row.querySelector('.task_due').innerText     = this.list[index].getDue();

        } else {

            /* * * * * * * * * * * *\
             *    Add New Task     *
            \* * * * * * * * * * * */

            let project;
            const proj    = document.getElementById('new_project').value;
            const name    = document.getElementById('new_add').value;
            const created = Date.now();

            if ((proj === '__new__') && (name !== '')) {
                this.projects.push(name);
                project = name;
            } else {
                project = proj;
            }

            // Create New Task from Form
            const newTask = new Task(
                this.generateId(),
                document.getElementById('new_name').value,
                project,
                document.getElementById('new_due').valueAsNumber,
                created.toString(),
                '0',
                '0',
                '0'
            );

            // Add Task to List
            this.list.push(newTask);

            // Add Task to Table
            this.table.addTask(newTask);

            // Get New Row
            const newRow = document.getElementById(newTask.id);

            // Add Edit Button Event Listeners
            this.editButtons(newRow);
        }

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.dataStore();
    }

    /**
     * Archive Task
     * @param {string} taskID - Task ID
     */
    taskArchive(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Archive Task
        this.list[index].archiveTask();

        // Remove Task from Table
        this.table.removeRow(taskID);

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.dataStore();
    }

    /**
     * Delete Task
     * @param {string} taskID - Task ID
     */
    taskDelete(taskID) {
        // Delete Task
        this.list = this.list.filter(task => task.id !== taskID);

        // Remove Task from Table
        this.table.removeTask(taskID);

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.dataStore();
    }

    /**
     * Restore Task
     * @param {string} taskID - Task ID
     */
    taskRestore(taskID) {
        // Get List Index from Task ID
        const index = this.indexFromTaskID(taskID);

        // Restore Task
        this.list[index].restoreTask();

        // Remove Task from Table
        this.table.removeRow(taskID);

        // Update Projects
        this.updateProjects();

        // Update Stats
        this.updateStats();

        // Update Storage
        this.dataStore();
    }

    /**
     * Update All Project Data
     */
    updateProjects() {

        // Nav Project Container
        const projNav = document.getElementById('nav_projects_list');

        // New Task Project Select Element
        const projNew = document.getElementById('new_project');

        // Reset Elements
        projNav.innerHTML = '';
        projNew.innerHTML = '<option value="">none</option>';

        // Loop through Projects
        this.projects.forEach((proj) => {

            // Count Total Tasks in Project
            const total = this.list.filter(task => ((task.project === proj) && (!task.archive))).length;

            if (total > 0) {

                // Count Incomplete Tasks in Project
                const todo = this.list.filter(task => ((task.project === proj) && (!task.status) && (!task.archive))).length;

                // Add Option to New Task Project Select Element
                projNew.innerHTML += `<option>${proj}</option>`;
                projNav.innerHTML += `<a href="#"><span class="bubble">${todo}</span><span class="label">${proj}</span></a>`;

            } else {

                // Remove Project, No Associated Tasks
                this.projects = this.projects.filter(p => p !== proj);
            }
        });

        // Get Count for "Other Tasks"
        const none = this.list.filter(task => ((task.project === '') && (!task.status) && (!task.archive))).length;

        // Add "Other Tasks" to Nav Project Container
        projNav.innerHTML += `<a href="#"><span class="bubble">${none}</span><span class="label">Other Tasks</span></a>`;

        // Add "New Project" Option to New Task Project Select Element
        projNew.innerHTML += '<option value="__new__">New Project</option>';

        // Click Event Listener
        const projLinks = document.querySelectorAll('#nav_projects_list a');
        for (let i = 0; i < projLinks.length; i++) {
            projLinks[i].addEventListener('click', (e) => {
                e.preventDefault();

                // Get Project Name from Anchor Element
                const a = e.currentTarget;
                const name = a.getElementsByClassName('label')[0].textContent;

                // Remove "disable" Class from Other and Add to Link
                const last = document.getElementsByClassName('disable')[0];
                if (typeof last !== 'undefined') { last.classList.remove('disable'); }
                a.classList.add('disable');

                // Update Title Text
                document.querySelector('h2').innerText = name;

                // Build New Table
                this.buildTable(name);
            });
        }

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
            <div>Total:      <span>${total.toLocaleString()}</span></div>
            <div>Incomplete: <span>${incomplete.toLocaleString()}</span></div>
            <div>Complete:   <span>${complete.toLocaleString()}</span></div>
            <div>Projects:   <span>${projects.toLocaleString()}</span></div>
            <div>Archived:   <span>${archived.toLocaleString()}</span></div>`;
    }
}

export default List;