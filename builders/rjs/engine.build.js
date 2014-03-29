({
  //appDir: "../source/engine",
  dir: "appdirectory-build",
  baseUrl: "../../source/engine",
  name: "_engine_.js",
  out: "engine-build.js",

  optimize : "none",

  paths: {
    'underscore' : './libs/underscore-1.6.0',
    'jquery' : './libs/jquery-2.1.0',
    'xml2json' : './libs/xml2json'
  }
})


// run:
//C:\Users\ashot.arutyunyan\workspace-testing\SocialXtendMobile-2.3\build>node r.js -o main.build.js
// don't forget to change the index.html:
/*	<script src="js/libs/require/require.js"></script>
 <script>
 require.config({
 paths: {
 "main": "js/main-built"
 }
 });
 require(["main"]);
 </script>
 instead of <script type="text/javascript" data-main="js/main" src="js/libs/require/require.js"></script>*/