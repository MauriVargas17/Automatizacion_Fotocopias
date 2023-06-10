# Institutional Photocopies Request API :office:

This API allows you to automate the process of requesting photocopies from your institution. It uses Node.js and MongoDB, and it has a number of features, including:

- Processing, filtering, and getting statistics from all photocopies requests throughout time
- User account creation and safe management of passwords and information
- User ability to upload PDF files to the database for the admin to retrieve alongside their requests specifications
- Admin ability to manage all requests (getting, deleting, marking as complete, filtering)
- Admin ability to download reports of completed requests as .csv
- User ability to reset their password through email

## Getting Started :tada:

To get started, you will need to:

1.  Install Node.js and MongoDB.
2.  Clone this repository.
3.  In the root directory, run `npm install`.
4.  In the root directory, run `npm start`.

The API will now be running on port 3000. You can test it out by visiting `http://localhost:3000` in your browser.

## Features :star:

### Processing, filtering, and getting statistics from all photocopies requests throughout time :bar_chart:

The API can process all photocopies requests throughout time. It can also filter requests by date, type, status, and other criteria. Finally, it can generate reports that show statistics about all requests, such as the number of requests made each month, the average number of pages per request, and the most popular types of requests.

### User account creation and safe management of passwords and information :busts_in_silhouette:

The API allows users to create accounts and securely manage their passwords and other information. This information is stored in the database and is not accessible to anyone other than the user and the admin.

### User ability to upload PDF files to the database for the admin to retrieve alongside their requests specifications :open_file_folder:

Users can upload PDF files to the database. The admin can then retrieve these files alongside the users' requests specifications. This allows the admin to easily see what each user is requesting and to process the requests quickly and efficiently.

### Admin ability to manage all requests (getting, deleting, marking as complete, filtering) :pencil:

The admin can manage all requests. This includes getting requests, deleting requests, marking requests as complete, and filtering requests by date, type, status, and other criteria.

### Admin ability to download reports of completed requests as .csv :calling:

The admin can download reports of completed requests as .csv files. This allows the admin to easily share the data with other stakeholders, such as the finance department or the IT department.

### User ability to reset their password :email:

If a user forgets their password, they can reset it by receiving an email from our mail service to the email they provided to create their account. The email will contain a link that the user can click on to reset their password.

# Documentation :books:

## Routes :arrow_heading_down:

This documentation includes information about all of the API endpoints, as well as examples of how to use them. ==Endpoints are GET unless stated otherwise==.

## Users :bust_in_silhouette:

Users are able to do a couple of actions according to their role, either `user` or `admin`. Regular users can access the following routes:

### Sign Up (POST)

`/api/v1/users/signup`
Including a body with the fields required in the file `/models/userModel`.

### Log In (POST)

`/api/v1/users/login`
Including a body with the user's `email` and `password`.

### Forget Password (POST)

`/api/v1/users/forgotPassword`
Including a body with the user's `email`. If email is correct, user will receive an email from our mail service.

### Reset Password (PATCH)

`/api/v1/users/resetPassword/:token`
Including a body with `password` and `confirmPassword`, and if the value `token` provided is valid and did not expire yet, then password will be reset.

_Needs to be logged in_

### Update Password (PATCH)

`/api/v1/users/updatePassword`
Including a body with the user's `currentPassword`, new `password` and `confirmPassword`.

### Update My User (PATCH)

`/api/v1/users/updateMyUser`
Including a body with the user's fields that are to be updated. Do not include the `password` field here!

### Delete My User (DELETE)

`/api/v1/users/deleteMyUser`
This will not entirely delete this document from the data base. It will only update it's `isActive` field.

_Needs to be `admin`_

### Get All Users

`/api/v1/users`
Returns all the users in the data base.

## Requests :bookmark_tabs:

All Requests routes are restricted to users with an `admin` role and therefore need to be logged in to perform any of the following routes:

### Get All Requests

`/api/v1/requests`
This route can be used to get all requests, but also to get specific requests if we add some details to the endpoint:
`/api/v1/requests?user=User&numberOfCopies[lt]=10&sort=numberOfCopies,-date`
That specification allows us to get only requests from `user` User, that have `numberOfCopies` of less than 10, and finally sorts the results according to `numberOfCopies` in ascending order, and as a second criteria takes `date` in descending order.

This endpoint allows to include `page` for pagination, `limit` to limit results to be shown, `fields` to restrict the fields to be shown and `sort`.

By default Requests are sorted by most recent.

### Post Request (POST)

`/api/v1/requests`
Including a body with the required fields in `models/requestModel`. Validation is applied.

### Delete All Requests (DELETE)

`/api/v1/requests`
Completely removes all requests from the data base.

### Get Request

`/api/v1/requests/:id`
Include the request `id` in the endpoint.

### Delete Request (DELETE)

`/api/v1/requests/:id`
Removes request with id `id` from the data base.

### Complete Request (PATCH)

`/api/v1/requests/:id`
Updates the request to have `isCompleted` as `true`.

### Get Requests By Date

`/api/v1/requests/date/:date`
Include the `date` as: 05-2023 (MM-YYYY) or 2023 (YYYY). Returns all the requests from that time period.

### Get Stats

`/api/v1/requests/stats`
Obtains stats of all the Requests, grouped by `faculty`, stating total requests made, total paper sheets used/neded, and averages and min/max for number of copies and pages.

### Get Monthly Plan

`/api/v1/requests/plan/month/:date`
Include the `date` as: 05-2023 (MM-YYYY). Returns an array of requests **not yet completed** that correspond to the month in `date`, displaying the day and all the requests made for that specific day.

### Get Yearly Plan

`/api/v1/requests/plan/year/:date`
Include the `date` as: 2023 (YYYY). Returns an array of requests **not yet completed** that correspond to the year in `date`, displaying the month and all the requests made for that specific month.

### Get Monthly Completed

`/api/v1/requests/completed/month/:date`
Include the `date` as: 05-2023 (MM-YYYY). Returns an array of **completed** requests that correspond to the month in `date`, displaying the day and all the requests made for that specific day.

### Get Yearly Completed

`/api/v1/requests/completed/year/:date`
Include the `date` as: 2023 (YYYY). Returns an array of **completed** requests that correspond to the year in `date`, displaying the month and all the requests made for that specific month.

## Files :file_folder:

All Files routes are also restricted to logged in users, but this time one endpoint is open to regular users and the rest only to `admin` users:

### Upload File (POST) _open to regular users_

`/api/v1/files`
Takes the file from req.file. It must be a pdf format file, otherwise will be rejected and not uploaded.

### Get All Files

`/api/v1/files`
Returns all files available in the data base with a `name` and a `size` in kilobytes.

### Download File By Name

`/api/v1/files/:name`
Downloads the file with a name of `name`.

### Delete File By Name (DELETE)

`/api/v1/files/:name`
Deletes the file with a name of `name`.

### Download Report

`/api/v1/files/reports`
Downloads a report of all the requests that have been completed so far in a format of csv as: 2023-05-31-Reporte-Fotocopias.csv

## Contributing

If you would like to contribute to the API, please fork the repository and submit a pull request. All contributions are welcome!

## License

The API is licensed under the MIT License.

## Contact

If you have any questions or feedback, please contact me at [vargasmauricio65@gmail.com] :shipit:.
