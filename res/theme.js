"use strict";

/**
 * Theme Manager
 * @class
 * @property {string} default  - Default Color Scheme
 * @property {array}  light    - CSS Properties for Light Mode
 * @property {array}  dark     - CSS Properties for Dark Mode
 * @property {object} settings - Settings Object
 * @property {array}  styles   - Array of CSS Property Keys
 * @author Dean Wagner <info@deanwagner.net>
 */
class Theme {

    // Class Properties
    default  = 'light';
    light    = [];
    dark     = [];
    settings = {};

    // CSS Property Keys
    styles = [
        'color-accent',
        'color-notice',
        'color-shadow',
        'color-bg',
        'color-item',
        'color-text',
        'color-title',
        'shadow-body',
        'shadow-text',
        'shadow-title',
        'shadow-link',
        'shadow-box',
        'shadow-notice',
        'glow-text',
        'glow-box',
        'glow-notice',
        'color-scheme'
    ];

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Class Properties
        this.storage = window.localStorage;

        // Get Values from CSS
        this.styles.forEach(index => {
            this.light[index] = this.getStyleProperty(index);
            this.dark[index]  = this.getStyleProperty('dark-' + index);
        });

        // Load Settings
        if (this.storage.hasOwnProperty('todo_settings')) {
            // Load from LocalStorage
            this.settings = JSON.parse(this.storage.getItem('todo_settings'));
            this.setStyleProperty('color-accent', this.settings.accent);
            this.setStyleProperty('color-notice', this.settings.notice);
            if (this.settings.scheme === 'dark') {
                this.changeMode(this.dark);
            }
        } else {
            // Auto-Load Dark Mode
            const isDark = parseInt(this.getStyleProperty('dark-mode'));
            if (isDark) {
                this.settings.accent = this.dark['color-accent'];
                this.settings.notice = this.dark['color-notice'];
                this.settings.scheme = 'dark';
                this.changeMode(this.dark);
                this.default = this.settings.scheme;
            } else {
                this.settings.accent = this.light['color-accent'];
                this.settings.notice = this.light['color-notice'];
                this.settings.scheme = 'light';
            }
        }

        // Accent Color
        const accentColor = document.getElementById('color-accent');
        accentColor.value = this.settings.accent;
        accentColor.addEventListener('input', (e) => {
            this.settings.accent = e.target.value;
            this.setStyleProperty('color-accent', this.settings.accent);
        });

        // Priority Color
        const noticeColor = document.getElementById('color-notice');
        noticeColor.value = this.settings.notice;
        noticeColor.addEventListener('input', (e) => {
            this.settings.notice = e.target.value;
            this.setStyleProperty('color-notice', this.settings.notice);
        });

        // Color Scheme
        const colorScheme = document.getElementById('color-scheme');
        colorScheme.value = this.settings.scheme;
        colorScheme.addEventListener('input', (e) => {
            this.settings.scheme = e.target.value;
            if (this.settings.scheme === 'dark') {
                this.changeMode(this.dark);
            } else {
                this.changeMode(this.light);
            }
            this.settings.accent = this.getStyleProperty('color-accent');
            document.getElementById('color-accent').value = this.settings.accent;
        });

        // Collapse Navigation
        document.getElementsByTagName('h1')[0].addEventListener('click', () => {
            document.body.classList.toggle('collapsed');
        });

        // Resize Window Event Listener
        window.addEventListener('resize', () => {
            if ((window.innerHeight >= window.innerWidth) || (window.innerWidth <= 1200)) {
                document.body.classList.add('collapsed');
            } else {
                document.body.classList.remove('collapsed');
            }
        });

        // Automatically Collapse Nav for Mobile Devices
        const isMobile = parseInt(this.getStyleProperty('mobile-view'));
        if (isMobile) {
            document.body.classList.add('collapsed');
        }

        // Enable Transitions
        this.setStyleProperty('transition-all', this.getStyleProperty('transition-start'));
    }

    /**
     * Change Light/Dark Mode
     * @param {object}  colors - [this.light] or [this.dark]
     * @param {boolean} custom - Respect User Custom Color
     */
    changeMode(colors, custom = true) {
        for (let index in colors) {
            // Only change Accent Color if Custom Accent Color has not been set
            if ((custom) && (index === 'color-accent')) {
                const color = this.getStyleProperty(index);
                if ((color === this.light[index]) || (color === this.dark[index])) {
                    this.setStyleProperty(index, colors[index]);
                }
            } else {
                this.setStyleProperty(index, colors[index]);
            }
        }
    }

    /**
     * Get CSS Property
     * @param   {string} prop - Property
     * @returns {string} - Value
     */
    getStyleProperty(prop) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    }

    /**
     * Set CSS Property
     * @param {string} prop  - Property
     * @param {string} value - Value
     */
    setStyleProperty(prop, value) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        document.documentElement.style.setProperty(property, value);
    }

    /**
     * Reset Settings from Last Save
     */
    resetSettings() {
        if(this.storage.hasOwnProperty('todo_settings')) {
            this.settings = JSON.parse(this.storage.getItem('todo_settings'));
            this.setStyleProperty('color-accent', this.settings.accent)
            if (this.settings.scheme === 'dark') {
                this.changeMode(this.dark);
            }
        } else {
            this.settings.scheme = this.default;
            if (this.default === 'dark') {
                this.changeMode(this.dark, false);
            } else {
                this.changeMode(this.light, false);
            }
            this.settings.accent = this.getStyleProperty('color-accent');
        }
        document.getElementById('color-accent').value = this.settings.accent;
        document.getElementById('color-scheme').value = this.settings.scheme;
    }

    /**
     * Save Settings to LocalStorage
     */
    save() {
        this.storage.setItem('todo_settings', JSON.stringify(this.settings));
    }

    /**
     * Purge All User Data
     */
    purge() {
        this.storage.removeItem('todo_settings');
    }
}

export default Theme;