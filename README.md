# Git Tutor

Generate step-by-step tutorials from your git history

## Tips and tricks

### Git treats `#` as a comment by default

To be able to use this symbol and add headings you should reconfigure git cleanup symbol

```sh
git config commit.cleanup whitespace
```

### How to use my favorite editor for writing markdown

Writing a lot of markdown is not really convenient in default git editor like `vi`, I prefer doing it in `vscode` as it allows to preview parsed markdown with all styling applied. To use `vscode` as git editor

* Install `code` command in `$PATH` (<kbd>Shift</kbd> + <kbd>CMD</kbd> + <kbd>P</kbd> => Search for `PATH`)
* `git config core.editor "code --wait"`

### Default commit template contains a lot of comments

To override default git template:

* create empty file and place it somwhere in your file system (e.g. `~/.gitmsg`)
* `git config commit.template ~/.gitmsg`
