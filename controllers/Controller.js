const autoBind = require('auto-bind');

class Controller {
    constructor() {
        autoBind(this);
    }
    showError(message, status) {
        let error = new Error(message);
        error.status = status;
        throw error;
    }
}


module.exports = Controller;