(function(){

  $(function(){
    var electron = nodeRequire('electron');
    var dialog = electron.remote.dialog;
    var mainWindow = electron.remote.getCurrentWindow();

    if (mainWindow.needSetFolder()){
      $('#selectDirectory').click(function(e){

        e.preventDefault();

        dialog.showOpenDialog(mainWindow, {
          properties: ['openDirectory'],
          multiSelections: true
        }, function(folders){
          if (folders.length > 0){
            var folder_path = folders[0];
            mainWindow.setPadFolder(folder_path);
            ready();
          }
        });

        return true;
      });

      $('init-screen').hide();
      $('#giveMeRepository').show();
    } else {
      ready();
    }

    function ready(){
      $('#textProgress').html('<i class="fa fa-cog fa-spin"></i> Cargando...   ¡En un momento estaremos listos!');

      $('init-screen').show();

      mainWindow.startPad(
        function(dir){
          $('#repositoryPath').text(dir);
        },
        function(info){
          // print the current percent
          var percent = Math.round(info.progress * 100);
          $('#progreso').width(percent + '%');
          $('#progreso').attr('aria-valuenow', percent);
          $('#progreso').text(percent + '%');
        },
        function(info){
          $('init-screen').hide();
          $('#textProgress').hide();
          window.location.href = 'http://localhost:'+info.port+'/';
        },
        function(err){
          $('init-screen').hide();
        }
      );
    }

  });

}).call(this);