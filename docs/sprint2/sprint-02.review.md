# YourScope | Wenduo Sky
## Iteration II - Review & Retrospect
This meeting took place on Friday, July 7, 2023 at 6:35PM. The meeting was held online through Discord.
## Process - Reflection
The second iteration acts as a good test of potential for awareness and improvement. Since the first iteration tested the conversion from theory to practice, there were bound to be some hiccups to arise. The second iteration acts as an opportunity to identify the pitfalls and improve on them. Below are the observations that Wenduo Sky had during the second iteration.
#### Successful Decisions
* The assignment of story points to each task.
	* Workflow was significantly improved when story points were assigned to each task on the JIRA. This enabled team members to complete tasks that were considered more lengthy first and improved work flow drastically. Most back-end tasks were weighted appropriately and had their foundations implemented relatively early.
* The ticket distribution was improved.
	* Since the team revolved ticket distribution around stories rather than random subtasks, workflow was smooth since team members were more informed with their work since they worked somewhat independently. Furthermore, this helped team members identify requirements that were unplanned and then implement them.
#### Unsuccessful Decisions
* Planning for back-end development was insufficient.
	* When developing front-end, team members found themselves blocked as the result of certain oversights in the structure of specifically GET endpoints. That is, there were times at which these endpoints did not return all data that was necessary to the front-end and changes needed to be made.
* Documentation was not written as the back-end was developed.
	* The team did not formally document back-end on Swagger as it was being developed and ended up in a time crunch to write all of the documentation of the endpoints near the end of the iteration.
#### Planned Changes
* Spend more time planning the development of back-end.
	* Hopefully, careful and intricate planning of the development of back-end will prevent the recurring encounters that the team had when developing front-end and create a better workflow.
* Write documentation as back-end is developed.
	* The team will make it a requirement to write documentation for every endpoint that is created in the back-end. This will prevent the time crunch that the team encountered at the end of this iteration.
* Work on back-end on the former half of the iteration and front-end on the latter half.
	* Although much of the back-end was completed in the former half of the iteration, there were still certain endpoints that were unimplemented and resulted in blockers for front-end development. The team has decided to make a much greater stress on back-end in the former half of the iteration.
## Product - Review
#### Complete Planned Tasks
* YS-76: Create Event Object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/f2ee6ad44590594b6f3d9a12807f8210c066b2ff)
* YS-78: Back-end endpoint to create and delete events.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/f2ee6ad44590594b6f3d9a12807f8210c066b2ff)
 * YS-84: Front-end UI to display Job Postings on Job Postings page.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/311df3b14605014f81ed4c1b97af482284aed937)
* YS-77: Front-end UI logic to create an delete events.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1ff5da2572cea9742145168adf46b8da68e0eea9)
 * YS-115: Update Event object to contain ID of associated school.
	 * This task was unplanned.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4eca3179923d4f329de9da16ed7777756c8c3a94)
 * YS-116: Update Create endpoint to account for school ID.
	 * This task was unplanned.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/16b429d9e774b224a596b0a806e5bfddd3a4cf71)
* YS-82: Back-end logic to create and delete Job Posting.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/7e280fe1493d4f3eb963ee6f205adef95520b141)
* YS-81: Create Job Posting Object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/7e280fe1493d4f3eb963ee6f205adef95520b141)
* YS-88: Back-end endpoint to create job application.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/47c6014b6a5948d87f57ec60cd4b239816757729)
* YS-86: Create Job Application Object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/47c6014b6a5948d87f57ec60cd4b239816757729)
* YS-90: Back-end endpoint to retrieve job applications by posting.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/47c6014b6a5948d87f57ec60cd4b239816757729)
* YS-92: Create Student Profile Object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/pull/63/commits/88928a15cf4acfb6166be7be87da30b1ec984617)
* YS-95: Routing to Student Profile page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1ff5da2572cea9742145168adf46b8da68e0eea9)
 * YS-97: Front-end UI to display Job Postings on Student Dashboard.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/db022b77f4bc2dd541b1fed341bb83a9d75dc430)
 * YS-96: Front-end UI display event on Student Dashboard.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/069f521c10d60bcf32247b643c29f0a88790b50a)
 * YS-79: Back-end endpoint to retrieve events.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/77d765c5e51f31f995443f92c51e7b1adc8e40ba)
 * YS-80: Front-end UI to display events on events page.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4b94f314b358f4e92cf8ca6a4e334dec93b724d2)
 * YS-125: Create an endpoint to count the total number of events filtered based on ID.
	 * This task was unplanned.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/68513241211905c0f0adf5058dd2b686a10b7e32)
 * YS-59: Add UI logic to redirect the user to the Student Dashboard if registration is successful.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5127fa55b4127574e8308af2fe83a80fd791d925)
 * YS-58: Add UI logic to take the input fields and then call the registration endpoint.
	 * [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/5127fa55b4127574e8308af2fe83a80fd791d925)
#### Incomplete Planned Tasks
* YS-83: Front-end UI to add and delete Job Postings.
	 * There was an oversight in the endpoint that retrieved Job Postings, resulting in a blocker that could not be resolved in time.
* YS-87: Front-end logic to apply for job.
	 * There was an oversight in the endpoint that retrieved Job Postings, resulting in a blocker that could not be resolved in time.
* YS-89: Front-end UI to display job applications for employers.
	 * There was an oversight in the endpoint that retrieved Job Postings, resulting in a blocker that could not be resolved in time.
* YS-93: Back-end endpoint to create, update, and retrieve student profile.
	 * There was insufficient time to complete this time.
* YS-94: Front-end to allow creation and editing of student profile.
	* Due to the incompletion of YS-93, this task could not have been completed.
## Meeting Highlights
Going into the next iteration, the team's main insights are:
 * Write possible blockers at the initial planning of the sprint, so task completion is streamlined.
 * Have back-end tickets be taken first, leaving more time to fix bugs for front-end tasks.
 * Get assistance from the TAs when help is needed, as they are almost always happy to help.
 * Read and write documentations thoroughly to increase work flow efficiency.