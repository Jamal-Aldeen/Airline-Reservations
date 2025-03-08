var def = {
    company_name: { type: "class", update: ["textContent"] },
    phone_number: { type: "class", update: ["textContent"] },
    phone_number_link: { type: "class", update: ["href"] },
    company_email: { type: "class", update: ["textContent"] },
    company_email_link: { type: "class", update: ["href"] },
    website_name: { type: "class", update: ["textContent"] },
    website_link: { type: "class", update: ["href"] },
    website_link_text: { type: "class", update: ["textContent"] },
    copyright: { type: "class", update: ["textContent"] },
    country_name: { type: "class", update: ["textContent"] },
    address: { type: "class", update: ["textContent"] },
  };
  
  function checkCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function updateElementOnPageByClass(variableValue, selector, attribute) {
    var elements = document.getElementsByClassName(selector);
    for (var i = 0; i < elements.length; i++) {
      elements[i][attribute] = variableValue;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    if (checkCookie("userCity")) {
      updateElementOnPageByClass(checkCookie("userCity"), "current_state", "textContent");
    }
    var date = new Date(Date.now() + (3600 * 1000 * 24));
    var untilDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    updateElementOnPageByClass(untilDate, "until_date", "textContent");
  
    fetch("./resources/data.json")
      .then(response => response.json())
      .then(json => {
        Object.keys(json).forEach(variableKey => {
          var variableValue = json[variableKey];
          if (variableValue) {
            var variableConfig = def[variableKey];
            if (variableConfig && variableConfig.type === "class") {
              variableConfig.update.forEach(attribute => {
                updateElementOnPageByClass(variableValue, variableKey, attribute);
              });
            }
          }
        });
      });
  });