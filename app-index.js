$(function () {
  let alertSun = false;
  let alertThieve = false;
  let qrCheck = false;
  let carParkNum = 10;
  let qrNum = 7;

  $('#logout-button').on('click', function () {
    $.ajax({
      type: "POST",
      url: "http://ecourse.cpe.ku.ac.th/exceed/api/larmpalm_qr/set?value=0",
      success: function (response) {
        console.log("set value 0: QR code " + response)
      }
    });
    $.ajax({
      type: "POST",
      url: "http://ecourse.cpe.ku.ac.th/exceed/api/larmpalm_check/set?value=0",
      success: function (response) {
        console.log("set value 0: check " + response)
      },
      fail: function (response) {
        console.log(response)
      }
    });
  });

  let intervalQr = setInterval(function () {
    $.ajax({
      type: "GET",
      url: "http://ecourse.cpe.ku.ac.th/exceed/api/larmpalm_qr/view/",
      dataType: "json",
      success: function (response) {
        if (response == 9) {
          qrNum = response;
          console.log("Found");
          clearInterval(intervalQr);
        }
      }
    });
  }, 1000);
  let carInterval = setInterval(function () {
    $.ajax({
      type: "GET",
      url: "http://ecourse.cpe.ku.ac.th/exceed/api/larmpalm_car/view/",
      dataType: "json",
      success: function (response) {
        console.log(response)
        carParkNum = response;
        if (carParkNum == 1) {
          if (qrNum == 9) {
            $('#thieveModal').modal('show');
            $('#image-secure').html('<img src="./images/unsecure.png" width="90" height="100%" style=" margin-left: 30px;">')
            $('#text-security').html('<h2 class="text-unsecure">UNSECURE</h2>')
            $('#bell-security').html('<img src="./images/vacarbell-on.png" width="65" height="65" class="bell-size">')
            $('#submit').html('<button type="button" id="submit-button" class="btn btn-secondary btn-lg btn-block">SUBMIT</button>')

            $('#submit-button').on('click', function () {
              $('#image-secure').html('<img src="./images/secure.png" width="90" height="100%" style=" margin-left: 30px;">')
              $('#text-security').html('<h2 class="text-secure">SECURE</h2>')
              $('#bell-security').html('<img src="./images/vacarbell-off.png" width="65" height="65" class="bell-size">')
              $('#submit').html('<div></div>')
            })
            clearInterval(carInterval);
          }
        }
        if (carParkNum == qrNum) {
          $.ajax({
            type: "POST",
            url: "http://ecourse.cpe.ku.ac.th/exceed/api/larmpalm_check/set?value=9",
            success: function (response) {
              console.log(response)
            },
            fail: function (response) {
              console.log(response)
            }
          });
        }
      }
    });
  }, 1000);

});




function setValueQr() {

}