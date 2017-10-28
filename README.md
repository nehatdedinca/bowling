## Installation ##
  
```
git clone https://github.com/ptrhoffmann/babbel-bowling.git
cd babbel-bowling
npm install
```

## Build and Deploy ##
  
```
// dev-mode with hot module replacement 
npm run dev 

// prod-mode with minified source files 
npm run prod 
```

#### Endpoints: ####

Dev: http://localhost:8090/dev.html  
Prod: http://localhost:8090/index.html

(Or just open the index.html file from the 'static'-directory in your browser for the application in prod mode without running the npm scripts)

## Specials in DEV mode ##

In dev mode you can toggle the display of the DevTool by pressing 'ctrl+h' to see the redux actions and the state of the store.  
Additionally I've integrated the hot module replacement feature from webpack-dev-server for faster development.
Just try it out by running the application in dev mode and change styles or js-components. Enjoy the fast delivery of changed modules without rebuild or browser reloading.

## Usage ##

Pressing the 'Add Player'-button: 
- a new PlayerFrame will be added into the DOM.  

Pressing the 'Roll'-button: 
- random rolls will be generated when the input field is left blank.
- some simple validation will prevent users from wrong inputs, f.e. for the second roll only the maximum of available pins can be rolled (f.e first roll 7 -> maximum for second roll is 3, bigger inputs will be reduced)

## Next Steps ##

All required features have been implemented together with the bonus tasks, but due to the short development time not in an optimal way. 
So the main application logic is settled in the reducer store, which should be refactored into dedicated Redux actions.
Additionally some tests should be implemented.