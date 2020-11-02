![sticker-debate](https://i.imgur.com/j0pNgAf.png)

A simple vue app for those who have too many stickers...

## Demo

![demo](https://i.imgur.com/5J9JoVi.gif)

## Features

- A material design frontend ([https://vuematerial.io/](https://vuematerial.io/))
- A basic backend written in js using express and a basic json database
- Auto sort of sticker-cards on vote by most voted
- A small Crystal script to generate the basic json
- Simple Discord oauth to authenticate users using auth0
- Ability to allowlist/denylist user IDs

## [WARN]: This is just a small fun project, it's not meant to be secure, safe or user-friendly. Don't PR <3.

## How to host it yourself

### Image Data

- Place all your images named whatever you want in `./public/assets/img/`
- Run the Crystal script using `$ crystal run generate_data.cr`. Your images will be renamed.
- Edit the generated json located at `./src/assets/data.json` with additional info about your stickers.

### Auth0

- Create an account, go to [https://manage.auth0.com/dashboard](https://manage.auth0.com/dashboard) and create a new application.
- Go to your application's settings and set `Allowed Callback URLs`, `Allowed Logout URLs`, `Allowed Web Origins` and whatever else you want to your domains (or localhost).
- We will also need to create a Discord application [here](https://discord.com/developers/applications)
- In the Discord application's settings, go to the `oauth2` tab, and under `Redirects` add your auth0's application domain plus `/login/callback` at the end. eg. `https://{auth0-app}.auth0.com/login/callback`
- Copy the client ID and secret
- Now on auth0, go to `Connections > Social > Create Connection > Discord` and input the info you copied from the previous step.
- Then go back to your auth0's application settings and enable it under the `Connections` tab.
- Lastly, input the required info in `./src/auth_config.json`

### Backend

- You can use the sample backend that's located in `./backend/`, however feel free to write your own, with whatever database and security levels you feel more comfortable with.
- After setting up your database you need to replace the `{backend}` tags in `./src/views/Home.vue` with your backend's domain.

### That's all, you now only need to run them!
