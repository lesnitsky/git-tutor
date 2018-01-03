const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { render } = require('../');

const pathToMocks = path.join(__dirname, 'mocks');

const snapshots = fs.readdirSync(pathToMocks);

snapshots.forEach(async snapshot => {
    const pathToSnapshot = path.join(__dirname, 'snapshots', `${snapshot}.md`);
    const pathToSource = path.join(pathToMocks, snapshot);

    const expected = fs.readFileSync(pathToSnapshot, 'utf-8');
    const actual = await render(pathToSource);

    assert.equal(actual, expected, `Unexpected diff at ${snapshot}`);
});

process.on('unhandledRejection', err => { throw err });
