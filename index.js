const path = require('path');
const git = require('nodegit');
const _ = require('lodash');

const Tags = {
    IGNORE: '[GTI]',
};

async function formatCommits(commits) {
    const formattedCommits = await Promise.all(commits.map(async commit => {
        const message = commit.message();
        const diffs = await commit.getDiff();

        const patches = _.flatten(await Promise.all(diffs.map(diff => diff.patches())));

        const files = await Promise.all(patches.map(async patch => {
            const hunks = await patch.hunks();
            const lines = _.flatten(await Promise.all(hunks.map(hunk => hunk.lines())));

            const diff = lines.map(line => ({
                origin: String.fromCharCode(line.origin()),
                content: line.content(),
            }))
            .filter(line => line.origin === '+' || line.origin === '-' || line.origin === ' ');

            return {
                isAdded: patch.isAdded(),
                newPath: patch.newFile().path(),
                oldPath: patch.oldFile().path(),
                diff,
            };
        }));

        return {
            message,
            files,
        };
    }));

    return formattedCommits;
}

async function getCommits(history) {
    let resolve = () => {};
    const p = new Promise(_ => resolve = _);
    const commits = [];

    history.on('commit', (c) => {
        commits.unshift(c);
    });

    history.on('end', () => resolve(commits));
    history.start();

    return await formatCommits(await p);
}

function formatNewFile(file) {
    const ext = path.extname(file.newPath).substr(1);
    const text = file.diff.map(line => line.content).join('');

    return '```' + ext +'\n' +
        text +
        '\n```';
}

function formatDiff(file) {
    const text = file.diff.map(line => line.origin + ' ' + line.content).join('');
    return '```diff\n' +
        text +
        '\n```';
}

exports.render = async function render(pathToRepo) {
    const repo = await git.Repository.open(pathToRepo);
    const firstCommitOnMaster = await repo.getMasterCommit();

    const history = firstCommitOnMaster.history();
    const commits = await getCommits(history);
    const tutorialCommits = commits.filter(commit => !commit.message.startsWith(Tags.IGNORE));

    const markdown = tutorialCommits.map(commit => [
        commit.message,
        commit.files.map(file => {
            let formatted;
            if (file.isAdded) {
                formatted = formatNewFile(file);
            } else {
                formatted = formatDiff(file);
            }

            return `📄 ${file.newPath}\n` + formatted;
        }).join('\n')
    ].join('\n')).join('\n');

    return markdown;
};
