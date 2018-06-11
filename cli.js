#!/usr/bin/env node

const { render } = require('.');

(async () => {
   const rendered = await render(process.cwd());
   process.stdout.write(rendered);
})();
