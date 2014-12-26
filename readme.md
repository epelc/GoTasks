# Go-Material
This is a simple example of using `angular-material` since so many people have been asking for one lately. It uses golang for the backend which right now is just a simple file server to show general project layout. However I plan to hopefully expand this into a more full featured demo app which might do something useful. I've listed everything you need to get started, and I've done my best to add some extra documentation for why I did certain things.

Also note this is a nice demonstration of using angular with webpack which despite being super awesome is a bit hard to get setup. I'd suggest you ask on stackoverflow if you have any webpack related problems as the creator is active there and he is very helpful.

### What you need
You will need afew things to get up and running but I'm starting to use vagrant on another project so should be alot simpler soon.

- [Golang](http://golang.org/doc/install) - An awesome language we will use this for our backend(right now its just a simple file server)
 - Remember to set your `GOPATH` env variable.
 - Run `go get github.com/gorilla/mux` once you install go. This will install our only external golang dependency. It is a very nice router which we suggest you use.
- [sass](http://sass-lang.com/install) - We need this to compile our sass files
- [Nodejs](http://nodejs.org/) - Used for development web dependencies

Once you have everything installed you will need to clone this repo. Then cd to the `web` directory inside and run the following commands `npm install` and `bower install` to install everything else you need.

### Compiling your web assets
We use gulp which makes it easy to run tasks. Start off by running `gulp static` to copy our angular-material files to the right places for sass to work properly. You should only have to do this once or when upgrading angular-material.

You can now simply run `gulp --dev` and `gulp watch --dev` when you are ready to start working. This will copy all of your html/img files o the `dist` folder. It will also compile your sass files and bundle up your js into one file. Omit the `--dev` flag to enable minifcation and obfuscation.

>NOTE: `VERSION` is a string injected into your app which is pulled from the version info in your `package.json`. `DEVMODE` is also provided to help with changing your api endpoints easily.

### Running your server
Now you are ready to host your app. To do this just cd to the main project repo and run `go run main.go`. You should now be able to navigate to `localhost:8080` and see the following.

### Something broke or have a suggestion?
Let me know! I use this as a base for most of my projects so I'd love to hear any suggestions you have. Just make a pull request and I'll check it out.

### Need help?
Send me an email <epelc@greatcloak.com> or checkout some of the following resources

- Golang
 - Go through the [tour](tour.golang.org) to learn the basics
 - Refer to [this](http://golang.org/doc/) for a bunch of great info and getting started guides
 - Read their [blog](blog.golang.org) for more indepth explainaitions of useful things
 - The golang irc channel is really helpful `#go-nuts` on freenode
- Angular-material
 - Ask a question on stackoverflow tagged [angular-material](http://stackoverflow.com/questions/tagged/angular-material)
 - Checkout the [ng-mateiral](https://groups.google.com/forum/#!forum/ngmaterial) google group
- Webpack
 - Check out their [docs](http://webpack.github.io/docs/) they are alot better since I started using it
 - The creator is pretty active on [stackoverflow](http://stackoverflow.com/search?q=webpack)