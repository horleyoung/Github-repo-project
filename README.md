# GitHub Repo Explorer

Search a GitHub username and see their public repositories. Built with React, Vite and Tailwind CSS for the DevConnect internship task on data fetching with **loading, error and empty states**.

**Live demo:** https://YOUR-APP.vercel.app

## Run locally

1. Clone the repo: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the address the terminal prints (usually http://localhost:5173)

## Reaching each state

Every state can be reached from the URL alone, with no code changes. A `?state=` query parameter replaces the real request with a mock one.

| State | Live link | Local path | What you should see |
|---|---|---|---|
| Loading | [/?state=loading](https://YOUR-APP.vercel.app/?state=loading) | `/?state=loading` | Six grey skeleton cards that stay on screen (the request never finishes on purpose) |
| Error | [/?state=error](https://YOUR-APP.vercel.app/?state=error) | `/?state=error` | "Server error. Please try again later." with a **Try again** button |
| Empty | [/?state=empty](https://YOUR-APP.vercel.app/?state=empty) | `/?state=empty` | "No repositories yet" message |
| Success | [/](https://YOUR-APP.vercel.app/) | `/` | The repositories for `gaearon`, plus a total-stars line |

**Notes**

- While a `?state=` parameter is in the URL, it overrides every search. Remove it to see real GitHub data.
- In `?state=error`, clicking **Try again** shows the skeletons for a moment and then the error returns. That is expected, because the demo forces the error every time. The mock requests have a short artificial delay (about 0.8 seconds) so each state is visible.
- To see loading without the parameter, open DevTools, go to the Network tab, set throttling to **Slow 3G**, and search a username.

## Real errors (no parameter needed)

Search these on the normal page (`/`):

| Search | Result | Try again button? |
|---|---|---|
| `zzzz-no-user-12345` | "No GitHub user with that name. Check the spelling and search again." | No, because searching the same name gives the same result |
| Turn the network off (DevTools, Network, Offline) and search a new name | "Couldn't reach GitHub. Check your connection." | Yes |

If GitHub's rate limit is hit, the app says so and explains that retrying won't help for about an hour. GitHub allows 60 unauthenticated requests per hour per IP address.

## How the three states stay distinct

- Each state has its own component: skeleton cards for loading, `ErrorMessage` for errors, and `EmptyState` for an empty list.
- Error messages say **what failed** and **what the user can do next**. The Try again button only appears where retrying can help (network and server errors), not for a missing user or a rate limit.
- **Zero and unmeasured are different.** The total-stars line is only rendered after a successful load, so a `0` means the repositories really have zero stars combined. It is never shown while loading or after an error.
- A missing description or language shows a plain fallback, and a repo with `0` stars shows `0` (using `??`, not `||`).

## Limitations

- Only the first 30 public repositories are loaded (GitHub's default page size), so "Total stars" covers those repositories only. The label says so.

## Tech

React, Vite, Tailwind CSS, GitHub REST API (`/users/{username}/repos`)
