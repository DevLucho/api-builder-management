require('dotenv').config();
const app = require('./app');

function initApp() {
    try {
        app.listen(app.get('port'), () => {
            console.log(`Server on port ${app.get('port')}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
}

initApp();