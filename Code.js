/* The function below sends an email to teachers indicating the student is near
meeting exit criteria. The teacher is asked to click on a link to fill out their
information to the student transition form. */
function almostDone (){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Active");
  var data = sheet.getDataRange().getValues();
  data.forEach(function (row, val) {
    var rowNumber = val + 1
    var name = row[0]
    var days = row[13] // Days left
    var date = row[24] // Date teacher was notified aboout transition
    var message = '<br><em>CONFIDENTIAL information<br>Do not share this information with students or parents.</em><br><br> Dear Staff,<br><b>' + name + '</b> has <u>' + days + '</u> days remaining at NAMS.<br>Now is a good time to take a look at the <a href="https://docs.google.com/spreadsheets/d/11kbezUuY2o7P0cvgKMW5Kjp72SY2cOiZFa7SjjIfpeE/edit#gid=144679095">Student Transition Notes sheet</a> and complete it if you haven\'t done so already.<br>Thank you,<br>Administration';
    var notificationSubject = 'Notification: Student nearing end of placement';

    if (name != '' && days <= 7 && days > 0 && date === '') {
      var currentDate = Utilities.formatDate(new Date(),"GMT","MMM dd, YYYY");
      try {
        MailApp.sendEmail({
        // to: 'alvaro.gomez@nisd.net', // This is used for testing the emails

        to: 'russell.aguilar@nisd.net, atlanta.atoui@nisd.net, melissa.bowery@nisd.net, deborah.coyle@nisd.net, ulices.deleon@nisd.net, danny.garcia@nisd.net, steven.goff@nisd.net, david.hernandez@nisd.net, rebekah.hutton@nisd.net, valerie.idrogo@nisd.net, nadia.jasso@nisd.net, monica.marquez@nisd.net, john.paez@nisd.net, israel.ramon@nisd.net, lisa.tellez@nisd.net',
        cc: 'john.decker@nisd.net, sandy.cantu@nisd.net, michelle.farias@nisd.net, zina.gonzales@nisd.net',
        bcc: 'alvaro.gomez@nisd.net',
        subject: notificationSubject,
        htmlBody: message,
        replyTo: 'zina.gonzales@nisd.net'
        });
      Logger.log('Email sent to: ' + 'alvaro.gomez@nisd.net');
      sheet.getRange(rowNumber,25).setValue(currentDate);
      } catch (e) {
        Logger.log('Error sending email: ' + e.toString());
      }
    }
  });
}