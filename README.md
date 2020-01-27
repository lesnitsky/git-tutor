# Git Tutor

[![lesnitsky.dev](https://lesnitsky.dev/icons/shield.svg?hash=42)](https://lesnitsky.dev?utm_source=git-tutor)
[![Build Status](https://travis-ci.com/lesnitsky/git-tutor.svg?branch=master)](https://travis-ci.com/R1ZZU/git-tutor)
![GitHub stars](https://img.shields.io/github/stars/lesnitsky/git-tutor.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/lesnitsky_dev.svg?label=Follow%20me&style=social)](https://twitter.com/lesnitsky_dev)

![Git Tutor Logo](https://git-tutor-assets.s3.eu-west-2.amazonaws.com/git-tutor-logo-100.png)

Generate step-by-step markdown tutorials from your git history

## Motivation

There is tons of tutorials on medium, personal blogs etc.
Writing detailed and complete guide how to build things is kinda hard and people are lazy, so those tutorials sometimes incomplete, code examples don't work as-is (some "prerequisite" step was not included in tutorial), sometimes it walks you through only some pieces of code and you can find the rest in repo. But you have no idea how the rest works.

Git is a perfect tool to build smth incrementally (commits). `git-tutor` walks through commit history and generates markdown, placing commit message first, content of a commit afterwards. Write markdown to your commit messages – have a nice tutorial later with single command

## Example tutorials

-   [Tic Tac Toe](https://github.com/R1ZZU/tic-tac-toe)

## Some rules

-   keep commits small and explain almost every line of code you're writing
-   write markdown to your commit messages
-   don't skip anything. Simple copy-paste should work to reproduce the result of your tutorial
-   writing code is fun. Explaining how code works is even more of fun

## Installation

```sh
npm i -g nodegit
npm i -g git-tutor
```

## Usage

```sh
git-tutor . > README.md
```

## Tips and tricks

### I don't like commiting every line of code. What should I do to keep tutorial clean?

That's fine, I don't like it either. You can use `git add -p` and split your work into smaller chunks later

### Git treats `#` as a comment by default

To be able to use this symbol and add headings you should reconfigure git cleanup symbol

```sh
git config commit.cleanup whitespace
```

### What if I want to leave general comment/explanation without any code

Git allows commits without any content

```sh
git commit --allow-empty
```

### How to use my favorite editor for writing markdown

Writing a lot of markdown is not really convenient in default git editor like `vi`, I prefer doing it in `vscode` as it allows to preview parsed markdown with all styling applied. To use `vscode` as git editor

-   Install `code` command in `$PATH` (<kbd>Shift</kbd> + <kbd>CMD</kbd> + <kbd>P</kbd> => Search for `PATH`)
-   `git config core.editor "code --wait"`

### Default commit message template contains status in comment, how to remove it

You can pass `--no-status` flag to a `commit` command, this will strip those commented lines

```sh
git commit --no-status
```

You can also use your custom commit template:

-   create empty file and place it somwhere in your file system (e.g. `~/.gitmsg`)
-   `git config commit.template ~/.gitmsg`

## Unsolved issues

-   i18n (cherry-pick to new locale branch with translation?)
-   updates to previous commits (rebase works, but not convenient)
-   collobaration

## LICENSE

[WTFPL](http://www.wtfpl.net/)

[![lesnitsky.dev](https://lesnitsky.dev/icons/shield.svg?hash=42)](https://lesnitsky.dev?utm_source=git-tutor)
![GitHub stars](https://img.shields.io/github/stars/lesnitsky/git-tutor.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/lesnitsky_dev.svg?label=Follow%20me&style=social)](https://twitter.com/lesnitsky_dev)
