# Contributing to World of Jackson

## Collaborating

If you'd like to be actively involved with the team, you can [contact us to join the Basecamp](https://blacksocialists.us/contact), and we'll get you set up to join calls, chat with us about the vision, ideas, and design, and get access to more documentation and ways to collaborate. Anyone outside the team is also welcome to collaborate with us through the [issues](https://github.com/BSA-US/world-of-jackson/issues) and [pull requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

## Rules for pull requests

The `master` branch has the following safety rules applied for pull requests, which _**all contributors must follow**:_

- Signed commits
  - So we know your commits aren't from [the FBI :eyes:](https://twitter.com/BlackSocialists/status/1240649771741777920)
  - Here's [a guide on setting up GPG to sign your commits.](https://help.github.com/en/github/authenticating-to-github/signing-commits)
- Linear history: _**This means your code needs to be rebased to match `master`!**_. There is a [super quick guide here](https://akrabat.com/the-beginners-guide-to-rebasing-your-pr/), and a [longer tutorial here](https://www.youtube.com/watch?v=CEtqad1jM2E), but you can read on for simple steps

### Rebasing when collaborating from a fork

1. The first time you do this, add this repo as a remote in your forked repo:
    ```sh
    git remote add upstream https://github.com/https://github.com/BSA-US/world-of-jackson.git
    git fetch upstream
    ```
2. Rebase `upstream/master` onto your local branch
    ```sh
    git checkout my-branch
    git rebase upstream/master
    ```
3. Resolve the merge conflicts, choosing to keep your changes wherever you made them, and for all other conflicts choosing what is on `upstream/master`
4. When finished, force-push your newly in-sync branch:
    ```sh
    git push -f origin my-branch
    ```
5. Create a pull request across forks, making note of your changes

### Rebasing when collaborating from within this repo

1. Rebase `upstream/master` onto your local branch
    ```sh
    git checkout my-branch
    git rebase master
    ```
2. Resolve the merge conflicts, choosing to keep your changes wherever you made them, and for all other conflicts choosing what is on `master`
3. When finished, force-push your newly in-sync branch:
    ```sh
    git push -f origin my-branch
    ```
4. Create a pull request, making note of your changes
