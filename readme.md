# Go-Material
This is a simple example of using `angular-material` since so many people have been asking for one lately. It uses golang for a backend fileserver however this can be switched out with anything. As long as you follow the same method of serving files.

>This project is currently in the process of becoming a hopefully full featured todo app. Since I'm quite tired of keeping track of things in a random file and I'd thought it'd be a good example + I'd get some use out of it which means I'll work on it more. The goal is that it will serve as a real world example app which you may even want to use yourself.

### Goals of this project
- Remain small and focused
- Learn how to write angularjs tests
- Learn how to use css animations like a pro
- Experiment with new organization tecniques

### What you need
You will need afew things to get up and running but I'm starting to use vagrant on another project so should be alot simpler soon.

- [Golang](http://golang.org/doc/install) - An awesome language we will use this for our backend(right now its just a simple file server)
 - Remember to set your `GOPATH` env variable.
 - Run `go get github.com/gorilla/mux` once you install go. This will install our only external golang dependency. It is a very nice router which we suggest you use.
- [SASS](http://sass-lang.com/install) - We need this to compile our sass files
 - Note we are using the SCSS syntax not the ruby like syntax
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

### Want to make your own file server in language X?
Heres a few tips for how the current setup works. Since I haven't decided if this should have a real backend with saving to mongodb or possibly redis. I'll let you know how the file server works since it gives you very clean urls and is pretty simple.

Basically for every asset directory you need some sort of path prefix handler with that directory name that will serve all files within that directory. We do this for the following directories
- app - your apps js and html template files
- css - compiled sass files end up here
- img - all your cat pictures go here
- You could also add a `lib` dir for any vendored js if your not including them via webpack

All REST apis are either served via an `api` subdomain or sub folder and they usaully tend to be named the plurarl version of your folders within your `app` dir. Follow [this](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api) guide for some awesome info about REST apis.

For all other unhandled routes your server should return the contents of your `index.html` so that your app can be loaded

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