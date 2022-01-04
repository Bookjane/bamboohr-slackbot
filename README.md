# bamboohr-slackbot

Slackbot for querying data from bamboohr:

* Birthdays
* Work Anniversaries
* Who is Out

## Local Development

### Setup `ngrok` Server

In order to do local development, we need to use ngrok to expose our local network as a public `HTTPS` url. This is a requirement for the slack app to hit the `/slack/events` and `/slack/actions` endpoints on our local server.

1. Install `ngrok` from here: https://ngrok.com/download
2. Bring up a terminal and run `ngrok http [PORT]` with whatever port you want to run the server from.
3. Use the `https` forwarding link from the terminal to fill in the `<TODO>` fields in the `manifest.yml`

### Create New App

Create new `app` from `app-manifest` here: https://api.slack.com/apps

1. Select workspace to deploy your app.
2. Copy and paste contents of  `./manifest.yml` from repo.
3. Finish app setup

### Setup `.env`

Copy and paste the following to a new file named `.env` in the top level directory:

```text
# Slack API
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_API_URL=https://slack.com/api
SLACK_USER_ID_ERROR_CONTACT=

# BambooHR API
BAMBOOHR_API_KEY=
BAMBOOHR_SUBDOMAIN=
BAMBOOHR_API_URL=https://api.bamboohr.com/api/gateway.php

# App Variables
PORT=3000
```

#### Slack API

1. Get `SLACK_BOT_TOKEN` from `Settings -> OAuth & Permissions -> Bot User OAuth Token`
2. Get `SLACK_SIGNING_SECRET` from `General -> Basic Information -> App Credentials -> Signing Secret`
3. Get `SLACK_USER_ID_ERROR_CONTACT` from `Slack -> Profile -> More -> Copy member ID`

#### BambooHR API

1. Get `BAMBOOHR_API_KEY` from whoever is your BambooHR admin.
     * Make sure that the API Key has read only permissions for the following:
       * Employee birthday
       * Employee hire date
       * Time Off
2. Get `BAMBOOHR_SUBDOMAIN` from the bamboo hr url you use to access the BambooHR dashboard.
   * `https://<BambooHR Subdomain>.bamboohr.com/home/`
