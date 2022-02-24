"use strict";

// Import Task Module
import Task  from './task.js';

/**
 * Task List
 * @class
 */
class List {

    // Class Properties
    list = [];
    data = [{
        id       : 'hgfhfgwsx',
        name     : 'Walk Dog',
        project  : '',
        due      : '',
        created  : '2022-02-23',
        complete : '',
        status   : 0,
        archive  : 0
    }, {
        id       : 'jukurbdfr',
        name     : 'Make Bed',
        project  : '',
        due      : '',
        created  : '2022-02-22',
        complete : '2022-02-23',
        status   : 1,
        archive  : 0
    }];

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        this.data.forEach((task) => {
            this.list.push(new Task(
                task.id,
                task.name,
                task.project,
                task.due,
                task.created,
                task.complete,
                task.status,
                task.archive,
            ));
        });

        this.thead = document.querySelector('main table thead');
        this.tbody = document.querySelector('main table tbody');
        this.tfoot = document.querySelector('main table tfoot');

        const head = {
            select   : ' ',
            name     : 'Task',
            project  : 'Project',
            due      : 'Due By',
            created  : 'Created',
            complete : 'Complete',
            edit     : ' '
        };

        this.thead.appendChild(this.tableHead(head));

        this.list.forEach((task) => {
            this.tbody.appendChild(this.tableRow(task));
        });

        this.tfoot.appendChild(this.tableFoot(7));
    }

    /**
     * Build Table Head
     * @param {object} headings - Object of Heading Names
     * @returns {object} - Table Row Element
     */
    tableHead(headings) {
        const row = document.createElement('tr');
        for (let index in headings) {
            const cell = document.createElement('th');
            const link = document.createElement('a');
            link.setAttribute('id', 'head_' + index);
            link.setAttribute('href', '#');
            link.innerText = headings[index];
            cell.appendChild(link);
            row.appendChild(cell);
        }
        return row;
    }

    /**
     * Build Table Row
     * @param {object} task - Task Object
     * @returns {object} - Table Row Element
     */
    tableRow(task) {
        let check;
        const row = document.createElement('tr');
        row.setAttribute('id', task.id);
        if(task.status) {
            row.classList.add('complete');
            check = ' checked';
        } else {
            row.classList.add('incomplete');
            check = '';
        }
        row.innerHTML = `
            <td class="task_check"><input type="checkbox" id="check_${task.id}"${check}></td>
            <td class="task_name"><label for="check_${task.id}">${task.getName()}</label></td>
            <td class="task_project">${task.getProject()}</td>
            <td class="task_due">${task.getDue()}</td>
            <td class="task_created">${task.getCreated()}</td>
            <td class="task_complete">${task.getComplete()}</td>
            <td class="task_edit">
                <a data-id="${task.id}" data-action="archive" title="Archive Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" />
                </svg></a><a data-id="${task.id}" data-action="delete" title="Delete Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a><a data-id="${task.id}" data-action="edit" title="Edit Task" href="#"><svg viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg></a>
            </td>
        `;
        return row;
    }

    /**
     * Build Table Foot
     * @param {number} columns - Number of Columns
     * @returns {object} - Table Row Element
     */
    tableFoot(columns) {
        const first   = 1;
        const last    = columns - 1;
        const row     = document.createElement('tr');
        row.innerHTML = `
            <td colspan="${first}">
            
            </td>
            <td colspan="${last}">
                <a href="#"><svg viewBox="0 0 24 24">
                    <path d="M19 19V8H5V19H19M16 1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1M11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z" />
                </svg></a>
            </td>
        `;
        return row;
    }

    /**
     * Generate Random Unique ID
     * @returns {string} - Unique ID
     */
    generateId() {
        return (Math.round(Date.now())).toString(36);
    }
}

export default List;