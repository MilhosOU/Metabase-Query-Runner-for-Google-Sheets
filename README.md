# Metabase API Query Runner for Google Sheets README

Welcome to the Metabase API Query Runner for Google Sheets!
This script enables you to connect with your Metabase instance's API, execute queries, and import data directly into your Google Sheets. It's designed to handle multiple users, preventing rate-limiting issues while fetching data.

## Features
- 📊 Run Metabase queries using their IDs and import data into Google Sheets
- 🚀 Handle query parameters for dynamic queries
- 🔒 Generate new session IDs on-the-fly
- 🔄 Randomly pick from multiple user accounts to avoid rate-limiting
- 🧩 Convert JSON response to a 2D array for easy manipulation and insertion into Google Sheets

## Prerequisites

This script is designed to work with Google Apps Script. Make sure you have a Google account and access to Google Apps Script.

## Configuration
1. Replace `YOUR_METABASE_INSTANCE_URL` with the URL of your Metabase instance.
2. Replace the `USERNAME_*` and `PASSWORD_*` placeholders with your Metabase account credentials.

## Usage
1. Create a new Google Apps Script project.
2. Copy the provided code into the Code.gs file in your project.
3. Save the script and deploy it as a library or as part of a larger Google Apps Script project.
4. Call the run_query() function from an external script or within your project to execute Metabase queries and import data into your Google Sheets.

## Functions

### run_query(query_id, parameters, session_id)
This is the main function that you'll call to execute a query using the Metabase API and import data into your Google Sheets. Pass the query_id and parameters (if required by the query), and an optional session_id. If no session_id is provided, the script will generate one for you.

### generate_new_session_id()
This function generates a new session ID by authenticating with the Metabase API using randomly selected credentials from the available combinations.

### convert_json_to_array(json_responses)
This function takes the JSON response from the Metabase API and converts it into a 2D array for easier data manipulation and insertion into Google Sheets.

### pick_random_username_password()
This function randomly selects a set of credentials (username and password) to authenticate with the Metabase API. This helps avoid rate-limiting issues by distributing requests across multiple users.

## Customization
You can modify the script according to your needs, extend its functionality, or integrate it into larger projects. Don't hesitate to adapt it to your specific use case.

Happy querying and data analyzing in Google Sheets! 📈📊
