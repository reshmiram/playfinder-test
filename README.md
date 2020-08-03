# FETest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Comments
- Once the app was developed, I added an NGRX store and attempted to move the whole app to the store model.
- I got all the data from the store. However, I ran out of time to create tests so I reverted the app back as otherwise, my tests would fail. I have therefore commented out the Store code but you are able to see how I had it working.
- I also ran out of time to add a reducer to get a single slot from the store for the search-slot component (I'm also not yet entirely clear how you would do this)
- If I had more time, I would read up more on NGRX and finish the Store as well as improve the responsive design for mobile screens. Also, I would componetize the app more as a couple of my components are very large files and for reusability it would be good to have UI elements as components. It would also be good to add some E2E tests





## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
