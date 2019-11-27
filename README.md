# JQueryFormValidator
A client-side form validator for a legacy system

This is a solution i built for a friend who is a cyber-security consultant for a company that primarily uses Splunk as their system builder. He needed client-side form validation without using any third party libraries (for security reasons) Via a bit of reverse engineering we determined that while the form page had access to Jquery, it was only an older version (3.0)

I wrote him the ValidationScripts.js to allow him to apply validation to his form systematically in a way that was future proof if the form is changed in the future. This project is simply the demonstration i gave him of it in use.
