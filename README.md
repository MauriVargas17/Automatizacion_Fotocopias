Institutional Photocopies Request API
=====================================

This API allows you to automate the process of requesting photocopies from your institution. It uses Node.js and MongoDB, and it has a number of features, including:

-   Processing, filtering, and getting statistics from all photocopies requests throughout time
-   User account creation and safe management of passwords and information
-   User ability to upload PDF files to the database for the admin to retrieve alongside their requests specifications
-   Admin ability to manage all requests (getting, deleting, marking as complete, filtering)
-   Admin ability to download reports of completed requests as .csv

Getting Started
---------------

To get started, you will need to:

1.  Install Node.js and MongoDB.
2.  Clone this repository.
3.  In the root directory, run `npm install`.
4.  In the root directory, run `npm start`.

The API will now be running on port 3000. You can test it out by visiting `http://localhost:3000` in your browser.

Features
--------

### Processing, filtering, and getting statistics from all photocopies requests throughout time

The API can process all photocopies requests throughout time. It can also filter requests by date, type, status, and other criteria. Finally, it can generate reports that show statistics about all requests, such as the number of requests made each month, the average number of pages per request, and the most popular types of requests.

Image of a person holding a stack of photocopies

### User account creation and safe management of passwords and information

The API allows users to create accounts and securely manage their passwords and other information. This information is stored in the database and is not accessible to anyone other than the user and the admin.

Image of a person typing on a keyboard

### User ability to upload PDF files to the database for the admin to retrieve alongside their requests specifications

Users can upload PDF files to the database. The admin can then retrieve these files alongside the users' requests specifications. This allows the admin to easily see what each user is requesting and to process the requests quickly and efficiently.

Image of a person uploading a file to a website

### Admin ability to manage all requests (getting, deleting, marking as complete, filtering)

The admin can manage all requests. This includes getting requests, deleting requests, marking requests as complete, and filtering requests by date, type, status, and other criteria.

Image of a person looking at a list of requests

### Admin ability to download reports of completed requests as .csv

The admin can download reports of completed requests as .csv files. This allows the admin to easily share the data with other stakeholders, such as the finance department or the IT department.

Image of a person opening a .csv file

Documentation
-------------

The API documentation is available at `http://localhost:3000/docs`. The documentation includes information about all of the API endpoints, as well as examples of how to use them.

Contributing
------------

If you would like to contribute to the API, please fork the repository and submit a pull request. All contributions are welcome!

License
-------

The API is licensed under the MIT License.

Contact
-------

If you have any questions or feedback, please contact me at [vargasmauricio65@gmail.com].
