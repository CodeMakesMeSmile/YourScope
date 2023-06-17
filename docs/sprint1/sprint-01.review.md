
# YourScope | Wenduo Sky
## Iteration I - Review & Retrospect
This meeting took place on Friday, June 16, 2023 at 5:00PM. The meeting was held online through Discord.
## Process - Reflection
The first sprint is arguably one of the most sprints to reflect on as it puts software engineering concepts into practice. This conversion from theory to practice is not necessarily a smooth one, resulting in poorly executed practices or decisions that end up not turning out too well. As a result, there is a need for changes moving forward for the sake of efficiency and success. Below are the observations that Wenduo Sky had during the first iteration.
#### Successful Decisions
Below are the process-related decisions that the team believed to have, in retrospect, turned out to be successful.
 * The user stories that were selected acted as a good foundation for moving forward.
	 * The user stories that were selected developed the fundamental functionalities  of the software that is being developed, enabling the possibility for testing and setting the example for similar features that need to be implemented in future sprints, thus facilitating development.
 * The scope of this sprint was accurate and realistic.
	 * The tickets and stories that the team prepared for this sprint were almost all completed, indicating that the team has a good understanding of how much can be handled.
 * The low-fidelity prototypes that were made acted as excellent models.
	 * The low-fidelity prototypes that were created saved a considerable amount of  time for frontend development. The design of the interface had already been established, saving the team the trouble of design durning the sprint.
#### Unsuccessful Decisions
Below are the process-related decisions that the team believed to have, in retrospect, turned out to be unsuccessful.
 * The process of distributing tickets was flawed.
	 * Although the team had initially distributed some tickets, many tickets had been unassigned and assignments were left to other team members to take on their own basis. This resulted in team members taking tickets from multiple stories, which hindered workflow, and uncertainty in deciding which tickets to be taken.
 * The assignment of story points was not done.
	 * This seemingly minor oversight ended up being an issue for certain team members. The lack of story points resulted in poor prioritization of tasks and judgements regarding the amount of time required for tickets being unclear.
#### Planned Changes
Below are the process-related changes that the team is planning to make.
 * Instead of broadly assigning tickets, assign tickets that are within a specific story to a specific team member. 
	 * As stated before, the very broad distribution of tickets across stories proved detrimental, as team members sometimes had difficulty determining whether certain dependent features were added or not. Assigning team members one story will enable team members to keep track of the work that they have done and establish a smooth workflow.
 * Evenly spread standup meetings out.
	 * The team had more standup meetings in the latter week of the sprint, which was not good for workflow and communication. Standup meetings that were so close to each other resulted in some of them being redundant as sometimes the work done was not sufficient to warrant a meeting.
## Product - Review
#### Completed Planned Goals:
There were no tasks completed that were not part of the original iteration plan.
 * YS-32: Add endpoint to API to handle log in logic.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/8e6f30a5393d54b93d4eec12c0933e8c4a95fd26)
 * YS-30: Add login page to UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5de1ea729e6fb2b4e09b1a4850dc356511a89468)
 * YS-31: Add UI logic to get inputs from fields and call API.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5de1ea729e6fb2b4e09b1a4850dc356511a89468)
 * YS-36: Add an endpoint to the API to perform the changing of password once verification is complete.
	 * Firebase conveniently handles this.
 * YS-41: Add UI that facilitates changing password.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/e3a1c2279a1b0ea8b22cc9de42e71801c2cf3b56)
 * YS-35: Add a "Forgot Password" page to the UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/e3a1c2279a1b0ea8b22cc9de42e71801c2cf3b56)
 * YS-34: Add a "Forgot Password button on the login screen on the UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/e3a1c2279a1b0ea8b22cc9de42e71801c2cf3b56)
 * YS-42: Add UI logic for password changing.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/e3a1c2279a1b0ea8b22cc9de42e71801c2cf3b56)
 * YS-63: Add Student dashboard to the UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1bf50dccc95cb29cacfd7fe3fd15697c2fba305f)
 * YS-43: Add Admin dashboard to UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/cd229fcbe7187c037159ebe12fe0b2fdcc90e13a)
 * YS-60: Add Employer dashboard to the UI.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/e99055d9c2d65caba7081e01605bfef25560d009)
 * YS-47: Add UI page for registration landing.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5f114c43b86419756e9aa1c5ea2fbeccea3bc063)
 * YS-49: Add UI logic that will display the employer registration if the "Employer" button is clicked on the landing page.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-50: Add an endpoint to the API to verify that the entered email exists in database.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1a412267dac01f61aaa3d4a5503a405d7a963a07)
 * YS-71: Create a Company object.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/9b0fb7b50160d4693e752dfe9902eb6717deda97)
 * YS-51: Add an endpoint to the API to perform registration.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5589d71939e6fc69897cc90660cbd2b4ebc828aa)
 * YS-54: Add UI logic to redirect the user to the Employer dashboard if registration is successful.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/b98059b1e3a67d210d67b46e241aadff039428d4)
 * YS-53: Add UI logic to take in the input fields and then call the registration API.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/61ed95fdc5b280ec4f2c3508808f15530bc6e38b)
 * YS-73: Add an endpoint to check if company already exists on the database.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/d0d232adfaef49ffecd8af2f1972d511d2d3a57e)
 * YS-74: Add an endpoint to create company.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4570064a9d65c9b47bb6c0da1ee653df1f5a3431)
 * YS-75: Add UI logic where if the company does not exist, go to company creation page before employer registration.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/61ed95fdc5b280ec4f2c3508808f15530bc6e38b)
 * YS-48: Add UI page for registration landing.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5f114c43b86419756e9aa1c5ea2fbeccea3bc063)
 * YS-55: Add Angular component for student registration.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5f114c43b86419756e9aa1c5ea2fbeccea3bc063)
 * YS-52: Add an endpoint to the API to perform registration.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5589d71939e6fc69897cc90660cbd2b4ebc828aa)
* YS-57: Add an endpoint to our API to verify that the entered email exists in database.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/cfba22fe4ad5182bddd953e6323ef26ddc47bbda)
 * YS-56: Add UI logic that will display the student registration if "Student" button is clicked on landing page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1046382e5e7af3c450352120367c1e8c638dcd26)
* YS-65: Add redirects to each Student feature on the UI from the dashboard.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
* YS-64: Add a blank page for each student feature.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-45: Add redirects to each Admin feature on the UI from the dashboard.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-44: Add a blank page for each Admin route.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-62: Add redirects to each Employer feature on the UI from the dashboard.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-61: Add a blank page for each employer feature.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4574e24f4b9affa3d2914d08823348e1b84beb13)
 * YS-72: Add extra claim in Firebase user to store role of user.
#### Incomplete Planned Goals:
 * YS-58: Add UI logic to take in the input fields and then call the registration API.
	 * There were underlying issues in the API that needed to be investigated further, but there was insufficient time.
 * YS-59: Add UI logic to redirect the user to the Student dashboard if registration is successful.
	 * There were underlying issues in the API that needed to be investigated further, but there was insufficient time.
## Meeting Highlights
Going into the next iteration, the team's main insights are:
 * Start early on deliverables and allocate more time to deliverables to prevent stressful time crunches.
 * Be aware that frontend tickets may take more time than expected.
 * Do not be afraid to ask for help from other team members, as each team member may have better experience in certain fields.