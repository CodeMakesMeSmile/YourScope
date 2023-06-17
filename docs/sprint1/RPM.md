# YourScope | Wenduo Sky
## Iteration I - Review Planning Meeting
The purpose of this sprint is the establish some basic frontend interfaces, particularly the login page, the registration page, and user dashboards as well as foundational functionalities, such as login, registration, etc.. All members of the team attended the meeting. That is, Anna Chester, Ethan Zhang, Jason Su, Junlin Qu, and Miles Bernstein.
## Iteration Scope
#### User Login
**Description:** As a YourScope User I would like the ability to login, so that I could view the dashboard for my user type.
**Acceptance Criteria:** Given the user has registered an account, when they log in with their email and password, then they are redirected to their proper dashboard
 * YS-32: Add endpoint to API to handle log in logic.
 * YS-30: Add login page to UI.
 * YS-31: Add UI logic to get inputs from fields and call API.
#### Password Reset
**Description:** As a YourScope User I would like the ability to reset my password, so that if I forget my password, I don't get locked out of my account.
**Acceptance Criteria:** Given the user has registered an account, when they request a password reset, then they are taken through the necessary steps to reset their password.
 * YS-36: Add an endpoint to the API to perform the changing of password once verification is complete.
 * YS-41: Add UI that facilitates changing password.
 * YS-35: Add a "Forgot Password" page to the UI.
 * YS-34: Add a "Forgot Password button on the login screen on the UI.
 * YS-42: Add UI logic for password changing.
#### Admin Dashboard
**Description:** As a school admin, I would like to see dashboard upon login, so I have easy access to all features of YourScope.
**Acceptance Criteria:** Given a school admin has logged in, when they are redirected to the dashboard, then there should be previews of upcoming events, along with the option to redirect to the event or course pages.
 * YS-43: Add Admin dashboard to UI.
 * YS-45: Add redirects to each Admin feature on the UI from the dashboard.
 * YS-44: Add a blank page for each Admin route.
#### Employer Registration
**Description:** As an employer I would like the ability to register, so that I can create my account.
**Acceptance Criteria:** Given the employer is connected to the internet, when the employer inserts the their email, password, then they should be able to login.
 * YS-72: Add extra claim in Firebase user to store role of user.
 * YS-47: Add UI page for registration landing.
 * YS-49: Add UI logic that will display the employer registration if the "Employer" button is clicked on the landing page.
 * YS-50: Add an endpoint to the API to verify that the entered email exists in database.
 * YS-71: Create a Company object.
 * YS-51: Add an endpoint to the API to perform registration.
 * YS-54: Add UI logic to redirect the user to the Employer dashboard if registration is successful.
 * YS-53: Add UI logic to take in the input fields and then call the registration API.
 * YS-73: Add an endpoint to check if company already exists on the database.
 * YS-74: Add an endpoint to create company.
 * YS-75: Add UI logic where if the company does not exist, go to company creation page before employer registration.
 #### Employer Dashboard
 **Description:** As an employer, I would like to see the dashboard upon login, so I have easy access to all features of YourScope.
 **Acceptance Criteria:** Given an employer has logged in, when they are redirected to the dashboard, then there should be previews the option to create new current job postings, along with viewing their existing and expired postings.
 * YS-60: Add Employer dashboard to the UI.
 * YS-62: Add redirects to each Employer feature on the UI from the dashboard.
 * YS-61: Add a blank page for each employer feature.
 #### Student Registration
 **Description:** As a student, I would like to register, so that I have a YourScope account.
 **Acceptance Criteria:** Given student is connected to the internet, when student inserts the their email, password, and associated school, then they should be able to login
 * YS-48: Add UI page for registration landing.
 * YS-55: Add Angular component for student registration.
 * YS-52: Add an endpoint to the API to perform registration.
 * YS-56: Add UI logic that will display the student registration if "Student" button is clicked on landing page.
* YS-57: Add an endpoint to our API to verify that the entered email exists in database.
* YS-58: Add UI logic to take in the input fields and then call the registration API.
* YS-59: Add UI logic to redirect the user to the Student dashboard if registration is successful.

**Description:** As a student, I would like to see dashboard upon login, so I have easy access to all features of YourScope.
**Acceptance Criteria:** Given a student has logged in, when they view they dashboard, then they should see previews for their insights, courses, upcoming events and job postings, with the option to go into any of those sub-pages.
 * YS-63: Add Student dashboard to the UI.
* YS-65: Add redirects to each Student feature on the UI from the dashboard.
* YS-64: Add a blank page for each student feature.