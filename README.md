# UI Programming Challenge @ Appointedd

You've been given a [tRPC](https://trpc.io) back-end for a simple prototype of a basic dashboard for viewing and adding bookings. Your task is to build a simple React UI that meets these requirements:

- As a user I can see the bookings in a list view that sorted by the most recent booking at the top.
- As a user for each booking in the list view, I can see all of the details for that booking.
- As a user I can filter the bookings in a list view by the number of customers on a booking.

There are no restrictions other than:

- Your UI must be built with the React framework.
- Your UI must be built with TypeScript.

Please submit your solution either as a zip file containing your repository's code or a link to a publicly accessible repository with your code.

## Requirements

In order to work on this programming challenge you'll need Node.js installed. I recommend at least the latest LTS version which at the time of writing is **21.2.0**.

### Alternative: GitHub CodeSpaces

If you'd prefer to not install anything on your machine, this repository has been configured to support [GitHub Codespaces](https://github.com/features/codespaces) which will spin up a development environment along with a browser based version of VSCode in the cloud. You can do this by selecting the green "Code" button and choosing the Codespaces tab, then choosing New codespace on either this code repository or your own fork of this code repository.

## Running the API server

You can run the API server using either the VSCode task "api: start" or by running the following command in the root of the project:

```shell
npm --prefix api start
```

This will start the API server at http://localhost:3000 with the tRPC API available at http://localhost:3000/trpc. There is also a documentation page has also been included which is available at http://localhost:3000/trpc-panel.
