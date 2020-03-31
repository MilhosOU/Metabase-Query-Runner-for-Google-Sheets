var baseUrl = 'YOUR_METABASE_INSTANCE_URL';

/**
* Connect with Metabase's API.
* This is the function that will be called from an external script to run a query
* @param {query_id}
* @param {parameters} necessary for the query especially if the query needs variables
* @param {session_id} if null it will create an ad hoc session_id
* @return {Array} two dimensional array, for example [[headline_1, headline_2], [row_1, row_2]]
*/
function run_query(query_id, parameters, session_id) {
  if (session_id == null) {
    session_id = generate_new_session_id();
  }
  var url = baseUrl + "/card/" + query_id + "/query"; // you could write: [baseUrl, 'card', query_id, 'query'].join('/')
  var options = {
    method: "POST",
    contentType: "application/json",
    validateHttpsCertificates: false,
    muteHttpExceptions: false,
    followRedirects: true,
    headers: {
      "X-Metabase-Session": session_id
    },
    payload: JSON.stringify(
      {
        "ignore_cache": false,
        "parameters": parameters})
  }
  return convert_json_to_array(JSON.parse(UrlFetchApp.fetch(url, options)));
}


/**
* Generate a new session_id retriving the specific Metabase's API call.
* @return {String} Session-id.
* TODO: avoid the presence of username and password in the code.
*/
function generate_new_session_id() {
  var url = baseUrl + "/session/";
  var api_credentials = pick_random_username_password();
  var options = {
    method: "POST",
    contentType: "application/json",
    validateHttpsCertificates: false,
    muteHttpExceptions: false,
    followRedirects: true,
    payload: JSON.stringify({
      "username": api_credentials.username,
      "password": api_credentials.password
    })
  }
  return JSON.parse(UrlFetchApp.fetch(url, options))['id'];
}


/**
* Given the JSON response from Metabase, convert it to a managable array.
* @param {JSON} json_responses
* @return {Array}
*/
function convert_json_to_array(json_responses) {
  var query_table = new Array();
  query_table.push(json_responses["data"]["columns"]);
  var rows = json_responses["data"]["rows"];
  for (var i = 0; i < rows.length; i++) {
    query_table.push(rows[i]);
  }
  return query_table;
}

/**
* Metabase does not allow a single user to retrive to often data using API.
* In order to avoid this problem, multiple users can interact with the API following a  random schema.
*/
function pick_random_username_password() {
  var combinations = {
    '0': {
      "username": "USERNAME_1",
      "password": "PASSWORD_1"
    },
    '1': {
      "username": "USERNAME_2",
      "password": "PASSWORD_2"
    },
    '2': {
      "username": "USERNAME_3",
      "password": "PASSWORD_3"
    },
    '3': {
      "username": "USERNAME_4",
      "password": "PASSWORD_4"
    },
    '4': {
      "username": "USERNAME_5",
      "password": "PASSWORD_5"
    },
    '5': {
      "username": "USERNAME_6",
      "password": "PASSWORD_6"
    },
    '6': {
      "username": "USERNAME_7",
      "password": "PASSWORD_7"
    }
  };
  var max = Object.keys(combinations).length - 1;
  var random = Math.floor(Math.random() * (max + 1));
  return combinations[random];
}
