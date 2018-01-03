const fs = require('fs');
const { render } = require('../');

const [,,...snapshots] = process.argv;

snapshots.forEach(async snapshot => {
    const rendered = await render(__dirname + '/mocks/' + snapshot);
    fs.writeFileSync(__dirname + '/snapshots/' + snapshot + '.md', rendered);
});
