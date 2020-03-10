# Candor Mobile

Boilerplate app using Expo and Firebase

## Features

1. User login and signup
2. A couple screens to navigate

## Troubleshooting

If you cant get the app working, you might have to open `Simulator` first. There are occasionally issues with Expo where it will launch the `Simulator`, but won't wait for it to load before trying to run the app.

If your animations are moving slowly and cause your app to crash, `Command + T` to stop "slow animations", then restart.

If you're having issues with Firebase and grpc when running `npm install`, you may need to run `npm install --build-from-source @grpc/grpc-js`. https://github.com/grpc/grpc-node/issues/596

## Additional

To add content, you need to manually go into the Firebase console and add items to the `library`.

## TODO

- [ ] Update styles closer to spec (https://www.figma.com/file/I2KW0Ozoo1WUAhxMyqJF17Cn/ui-design?node-id=0%3A1)
- [ ] Move player state to `Context` to show bottom nav player across all screens and to allow user to control from other screens
- [ ] Forgot password