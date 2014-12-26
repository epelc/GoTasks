package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gorilla/mux"
)

//flags
var (
	webDir  string
	webPort int
)

func init() {
	log.Println("Initializing...")
	//web flags
	flag.StringVar(&webDir, "webdir", "web/dist", "Change the web directory")
	flag.IntVar(&webPort, "wport", 8080, "Change port for the web server to listen on")

	flag.Parse()

	webDir = filepath.Clean(webDir)

	log.Println("All systems ready!")
}

func main() {
	//setup all of our routes
	r := mux.NewRouter()

	// Declare any api handlers here before the asset dirs
	// or you can use a seperate subrouter to put your api on a subdomain
	// we like to do this in production but it's much simpler to not use it

	// We use REquestPathHandler isntead of http.FileServer because it allows us to have clean urls
	r.PathPrefix("/app/").HandlerFunc(RequestPathHandler)
	r.PathPrefix("/lib/").HandlerFunc(RequestPathHandler)
	r.PathPrefix("/css/").HandlerFunc(RequestPathHandler)
	r.PathPrefix("/img/").HandlerFunc(RequestPathHandler)
	r.PathPrefix("/fonts/").HandlerFunc(RequestPathHandler)

	// General
	r.HandleFunc("/favicon.ico", func(w http.ResponseWriter, req *http.Request) {
		http.ServeFile(w, req, filepath.Join(webDir, "/favicon.ico"))
	})

	// For all other routes we serve up our apps index file
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		w.Header().Add("Cache-Control", "no-store")
		http.ServeFile(w, req, filepath.Join(webDir, "/index.html"))
	})

	log.Println("Starting web server")
	if err := http.ListenAndServe(":"+strconv.Itoa(webPort), r); err != nil {
		log.Fatalln("Server error:", err)
	}
}

// Serves files relative to the webDir
// Only safe if you use with PathPrefix() or similar functions
func RequestPathHandler(w http.ResponseWriter, req *http.Request) {

	path := filepath.Join(webDir, req.URL.Path)

	log.Println("Serving file:", path)

	//do not show directories
	fi, err := os.Stat(path)
	if os.IsNotExist(err) {
		log.Println("[FileHandler] error path does not exist:", err)
		http.NotFound(w, req)
		return
	} else if err != nil {
		http.NotFound(w, req)
		log.Println("[FileHandler] error checking if file is dir:", err)
		http.NotFound(w, req)
		return
	}
	if fi.IsDir() {
		http.NotFound(w, req)
		return
	}

	http.ServeFile(w, req, path)
}
