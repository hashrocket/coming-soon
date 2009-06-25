$(document).ready(function() {
  initialize_form();
});

function initialize_form() {
  $("form input").focus()
    .click(function() {
      $("#flash .error").fadeOut();
  });

  $("form").submit(function() {
    var form = $(this);
    $.ajax({
      type: "POST",
      url: form.attr('action'),
      data: form.serialize(),
      beforeSend: function() {
        if (!isRFC822ValidEmail($("form input").val())) {
          show_error("The email address entered is invalid.");
          return false;
        }
        
        $('form button').attr('disabled', true).addClass('disabled');
        $("#flash .error").fadeOut();
        $("#flash, #flash .loading").show();
      },
      complete: function() {
        $("#flash .loading").fadeOut();
      },
      success: show_success,
      error: function() {show_error("An error occurred, please try again later")}
    });
    return false;
  });
};

function show_error(message) {
  $("#flash .error span.message").text(message);
  $("#flash, #flash .success").hide();
  $("#flash, #flash .error").fadeIn();
}

function show_success() {
  $("#flash .error").hide();
  $("#flash, #flash .success").fadeIn();
  $("form button").removeAttr('disabled').removeClass('disabled');
  $("form").addClass('submitted');
}

function isRFC822ValidEmail(sEmail) {
  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

  var reValidEmail = new RegExp(sValidEmail);

  if (reValidEmail.test(sEmail)) {
    return true;
  }

  return false;
}
