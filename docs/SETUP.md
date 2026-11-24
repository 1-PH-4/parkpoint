# ParkPoint: setup after cloning

Do these steps once, in order. Every step says **where** to do it, **what** to do, and how to **check** that it worked. If a check fails, stop and do not continue until it works.

Before you start, install Git and your JetBrains IDE (WebStorm for the frontend, PyCharm Professional for the backend, DataGrip for the database).

## Quick rules (read once)

- **The repository folder** is the folder named `parkpoint` that you clone. Always open this whole folder in your IDE, never only `backend` or `frontend`.
- **How to open a Terminal in the right folder.** The Terminal is the command window inside your IDE. In the Project panel (the file list on the left) right-click the folder that the step names → **Open in** → **Terminal** (older IDE versions: **Open in Terminal**). Before you type, read the end of the Terminal line: its last word must be the name of that folder. If it is not, close the Terminal with the **X** and try again. Do not use the `cd` command unless a step tells you to.
- **How to create a file.** In the Project panel right-click the folder that the step names → **New** → **File** → type the exact name (keep the dot at the start, as in `.env`) → press Enter. The file opens: click inside it, paste the text, and press Ctrl+S (Cmd+S on a Mac).
- **How to type a command.** Paste one command, press Enter, and wait until the line ends with the folder name again before you type the next one. If red error text appears, stop and ask the team. Do not try random fixes.

## Step 1. Clone the repository

**Where:** the welcome screen of your IDE.

**Do:**

1. On the repository page on github.com click the green **Code** button, open the **HTTPS** tab, and click the copy icon next to the address.
2. In the IDE click **Clone Repository**. On the left choose **Repository URL**, set **Version control** to **Git**, and paste the address into **URL**.
3. In **Directory** pick a folder whose path has no spaces and no letters with accents, for example `C:\Projects\parkpoint`. Click **Clone**.
4. If it asks you to log in, choose **Log In via GitHub** and click **Authorize** in the browser. Click **Trust Project** when asked.

**Check:** the Project panel shows the folder `parkpoint` with `README.md`, `backend` and `frontend` inside. If you see "repository not found", you have no access yet: tell the team.

## Step 2. Make sure the IDE is signed in to GitHub

**Where:** the IDE settings. Press Ctrl+Alt+S (Cmd+, on a Mac) and open **Version Control** → **GitHub**.

**Do:** if your GitHub username is in the list, do nothing. If the list is empty, click **+** → **Log In via GitHub**, and click **Authorize** in the browser.

**Check:** your GitHub username is in the list.

## Step 3. Tell Git who you are

**Where:** a Terminal opened in the folder `parkpoint` (right-click `parkpoint` in the Project panel → **Open in** → **Terminal**). The line must end with `parkpoint`.

**Do:** type these two commands one after the other and press Enter after each. Replace `Your Name` and `you@example.com` with your own name and your GitHub email. Keep the quotes.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**Check:** type `git --version`: it prints a version number. Then type `git config --global user.name`: it prints your name.

## Step 4. Create your own `.env` file

**Where:** the top folder `parkpoint` in the Project panel, next to the file `.env.example`.

**Do:**

1. Right-click `parkpoint` → **New** → **File**, type `.env` and press Enter. If the IDE asks "Add file to Git?", click **Cancel**.
2. Double-click `.env.example` to open it, press Ctrl+A (select all), then Ctrl+C (copy).
3. Click inside the empty `.env` file, press Ctrl+V (paste), then Ctrl+S (save).
4. Replace placeholder values with the real ones the team gives you. If you do not have a value yet, leave it as it is and ask the team.

**Check:** in the Project panel the name `.env` is grey, which means Git ignores it. If it is green or red, stop and ask the team. Never send the content of `.env` in a chat and never commit it. Anything starting with `VITE_` is public in the browser, so it must never hold a secret.

## Step 5. Practice pull request

This proves that your access works before real tasks start. Commit messages and pull request descriptions are in Slovak.

**Where:** your IDE, with the folder `parkpoint` open.

**Do:**

1. **Update `main`.** Click the branch name at the top of the IDE window → choose `main` → **Checkout**. Then choose **Git → Pull…** → **Pull**.
2. **Create a branch.** Click the branch name again → **New Branch…**, type `feature/setup-yourname` (small letters, numbers and dashes only, no spaces, no accents), and click **Create**. Never work directly on `main`.
3. **Create the file `TEAM.md`.** Right-click `parkpoint` → **New** → **File**, type `TEAM.md` and press Enter. If the IDE asks "Add file to Git?", click **Add**. Type your name inside the file and press Ctrl+S.
4. **Commit and push.** Open the **Commit** window (Ctrl+K, or Cmd+K on a Mac). Tick `TEAM.md`, write the message `Pridaj moje meno do TEAM.md`, click **Commit and Push**, and click **Push** in the next window.
5. **Open the pull request.** Click **Create Pull Request** in the pop-up. If you missed it, open the repository on github.com and click the yellow **Compare & pull request** button. Fill in the description in Slovak, following the pull request template, and click **Create pull request**.
6. **Get it merged.** Wait until the CI check is green. GitHub Copilot may add review comments; a teammate must still approve. Ask a teammate to open your pull request on github.com, click **Review changes** → **Approve** → **Submit review**, and then click **Squash and merge** and **Delete branch**.

**Check:** the pull request page says **Merged**. In your IDE choose the branch `main` and **Git → Pull…**: the file `TEAM.md` is now in your project.

## Next

Setup is done. Follow the guide for your role (frontend, backend, database, AI, hosting or design), and read the `CLAUDE.md` files in the repository root and in `frontend/` and `backend/` for the project rules. The daily routine is: update `main`, create a `feature/...` branch, commit small and often, open a pull request, get one approval, squash and merge.
