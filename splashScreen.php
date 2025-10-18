<html>
  <head>

  </head>
  <body>

    <div id='splash' style='display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color: var(--primary); z-index:1000; opacity: 1; transition: .3s;'>
      <div id='loader' style='position: fixed; top: 0; left: 0; width: 100%; transform: scaleX(0); transform-origin: 0; height: 5px; background-color: var(--secondary_opacity); transition: 2.8s;'></div>
        <div style='position: fixed; width: 160px; left: 50%; top: 50%; transform: translate(-50%, -50%);'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130"><defs><style>.cls-1{fill:#050A12;}.cls-2{opacity:0.6;}.cls-3{fill:#fa8400;}</style></defs><title>Risorsa 20</title><g id="Livello_2" data-name="Livello 2"><g id="Livello_1-2" data-name="Livello 1"><rect class="cls-1" width="130" height="130"/><g class="cls-2"><path class="cls-3" d="M38.41,43.18A5.26,5.26,0,0,0,33.16,38h-.08a5.25,5.25,0,0,0-3.69,1.59L9,60.61a5.82,5.82,0,0,0-.06,8.08L29.34,90.3a5.25,5.25,0,0,0,7.43.21A5.27,5.27,0,0,0,37,83.09L19.62,64.72l17.3-17.81A5.19,5.19,0,0,0,38.41,43.18Z"/><path class="cls-3" d="M121.05,61,100.28,39.59A5.25,5.25,0,0,0,96.59,38h-.08a5.26,5.26,0,0,0-3.77,8.91l17.31,17.81L92.69,83.09a5.25,5.25,0,1,0,7.64,7.21l20.77-22A5.31,5.31,0,0,0,121.05,61Z"/><path class="cls-3" d="M77.36,27.71A5.28,5.28,0,0,0,70.71,31L49.14,95.74a5.26,5.26,0,0,0,10,3.33L80.68,34.36A5.28,5.28,0,0,0,77.36,27.71Z"/></g></g></g></svg>
        </div>
    </div>

    <script type="text/javascript">

    setTimeout(wait, 200);
    function wait() {
      document.getElementById('loader').style.transform = 'scaleX(1)';
    }

      var w;
      if(window.innerWidth !== undefined && window.innerHeight !== undefined) {
         w = window.innerWidth;
      } else {
         w = document.documentElement.clientWidth;
      }

      if (w > 770){
          setTimeout(function() {
              document.getElementById("splash").style.opacity = '0';
              setTimeout(function() {
                document.getElementById("splash").style.display='none';

                  //if login SI href ma non togli none
                  //if login NO togli none ma non href
              }, 1000);
          }, 2800);

          setTimeout(function() {
            if (sessionStorage.getItem("splashScreen") != 'si'){
              document.getElementById('splash').style.display='block';
            };


            // localStorage.removeItem("login_user");


            if (localStorage.getItem("login_user")){
              document.getElementById('bgDuringSplash').style.display = 'none';
            } else {
              if (sessionStorage.getItem("splashScreen") != 'si') {
                setTimeout(function() {
                  location.href = 'login.php'
                }, 3800);
              } else{
                location.href = 'login.php'
              }
            }

            sessionStorage.setItem("splashScreen", "si");

          }, 1);
      };
    </script>

  </body>
</html>
