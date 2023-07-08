# YourScope | Wenduo Sky
## Iteration II - Planning Meeting Summary
* **Start Date**: Monday, June 26th, 2023
* **End Date**: Friday, July 7th, 2023
## Process
The purpose of this sprint is the establish some main features for the user, including creation of jobs and events, viewing jobs and events, viewing and creating job applications, and a student profile, which will require a considerable amount of back-end work. All members of the team attended the meeting. That is, Anna Chester, Ethan Zhang, Jason Su, Junlin Qu, and Miles Bernstein.
#### Previous Iteration Changes
Below are the most significant changes that the team plans to make to the process.
 * Assign story points to each task.
	 * To address the issue of poor prioritization and unclear task duration from the previous iteration, the team should implement a story point estimation process. Story points provide a relative measure of effort and complexity for each task, enabling the team to prioritize effectively and plan their work accordingly. The team can utilize techniques like planning poker or comparative estimation to assign story points to each ticket. The change aims to improve task prioritization and provide clarity on the effort required for each ticket. This helps the team in better planning, resource allocation, and meeting the iteration goals more effectively. To measure the accuracy of story point estimation by comparing the estimated story points with the actual effort required for completing the tickets. A smaller variance indicates the success of the change in improving task estimation.
 * Introduce a clear ticket assignment process.
	 * To address the flawed ticket distribution process from the previous iteration, the team should assign most of the subtasks of user stories to one person instead of many. It is not necessary to assign every single subtask within a user story to one person; team members are still encouraged to diversify and take tickets that may be similar to each other from different stories, but focus on one story rather than many. The change aims to achieve a more organized and efficient workflow by ensuring that each ticket is assigned to a specific team member. This helps prevent duplication of effort and more awareness of subtask dependency. The team can count the number of assigned tickets at the end of the iteration and ensure that the distribution of subtasks between stories is low. A high number of assigned tickets and a low spread of subtask assignments indicates the success of the change in ensuring proper distribution.
#### Roles & Responsibilities
* Anna: Front-end, focusing on implementing the displaying, creating, and deleting the events as an admin. Plus, displaying job applications to employers, and creating the UI for the user profile of students.
* Ethan: Front-end, focusing on 
* Jason: Back-end and front-end, focusing on the design and implementation of backend endpoints for creating and viewing student Events as well as for retrieving user data objects from the database.
* Miles: Back-end, focusing on managing relationship between database and backend, and creating endpoints for all job related tasks
* Junlin: Front-end, focusing on front-end logic for student job applications, student event viewings and employers creating and deleting job postings.
#### Events
All of our meetings will be held online through Discord. We will have standups on Mondays at 3:00PM, Wednesdays at 6:00PM, and Fridays at 1:00PM. We will also have a planning session on the first Monday of each sprint, right after our standup, and a review session on the Thursday before the sprint deadline, preparing ourselves and fixing oversights for the demo. If our team requires extra meetings, they will be scheduled on a need-be basis.
#### Artifacts
We will use JIRA to track all the tasks we must finish during the sprint. During our planning meeting, we discussed which tickets were a priority based on what functionality will be used the most. Furthermore, each story and their corresponding subtasks will be assigned with story points. which will help each team member to prioritize his or her tasks. There will be an initial distribution of some tickets and afterwards, each team member can pick up any ticket they want to work on, provided they can finish it within the sprint.
#### Git Workflow
All work will be done based on a new branch named 'sprint2', which is branched from 'main'. By the end of the sprint, 'sprint2' will be merged into 'main'. Each feature, or subtask, will be branched from 'sprint2' and the name of the branch should corresponding with its ticket ID (e.g. YS-69). When a feature is finished, a pull request is made to merge the branch into 'sprint2'. In order for merging, at least ONE other team member will be required to review it. If everything seems to be in order and there is no conflicting code, the reviewer can approve of the pull request and then the requester will be allowed to merge. Otherwise, a comment can be made regarding in the work or changes can be requested. Naming conventions for commits and merges will follow the format provided in the course (e.g. feat: Implementation or fix: Bugfix). This system that the team has chosen will ultimately reduce code conflicts and bugs. Furthermore, the naming conventions will make it clear which branch is meant for which ticket and when merging, reviewers will understand what they are looking for.
## Product
#### Goals and tasks
For the second sprint, the goal is to give users access to some base features to the application as well as completing previous tickets that were unfinished. The main focus will be linking the backend to the frontend more extensively and implementing important operations. For example, a student will be able to view and apply to jobs.
In order to meet the goal, the team will be working on eight user stories in order of most to least important:
1.  Admin Event Creation
2.  Employer Job Posting Creation
3.  Student View Events
4.  Student View Job Postings
5.  Employer View Applications
6.  Student Job Application
7.  Student Profile
8.  Student Registration
Each user story will be split into tasks which any team member can pick up and work on. The priority will be to complete the back-end features first and then the UI and its logic will be implemented.
#### Artifacts
By the end of the sprint, the team plans to have established many core features that can be showcased, such as creation of jobs and events, viewing jobs and events, viewing and creating job applications, and a student profile. In order to have this, we will also have the back-end capabilities to retrieve the various required data from the database. Working on these artifacts will enable the team to gain momentum on their work as the application revolves around the user's interactions with events and jobs. Moreover, future tasks are predicted to be similar to these tasks, allowing for familiar and quicker implementations.