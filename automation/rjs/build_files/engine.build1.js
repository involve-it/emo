({
  //appDir: "../source/engine",
  dir: "asdf",
  baseUrl: "../../../builds/src",
  //name: "engine/_engine_",
  //out: "../../../builds/src/engine/_engine_1.js",

  optimize : "none",
  modules : [
    {
      name : 'engine',
      location : 'engine',
      main : '_engine_'
    },
    {
      name : 'engine.emotion',
      location : 'engine/emotion',
      main : '_engine_'
    }]
  /*paths: {
   'underscore' : './libs/underscore-1.6.0',
   'jquery' : './libs/jquery-2.1.0',
   'xml2json' : './libs/xml2json'
   }*/
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