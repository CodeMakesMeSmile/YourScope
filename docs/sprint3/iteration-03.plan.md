# YourScope | Wenduo Sky
## Iteration III - Planning Meeting Summary
* **Start Date**: Monday, July 10th, 2023
* **End Date**: Friday, July 21st, 2023
## Process
The purpose of this sprint is the establish some more main features for the user and complete a number of features left incomplete in the previous sprint, including creation of jobs, viewing and creating job applications, student profiles, adding and removing courses, viewing courses in student schedules and prerequisites for courses, and the landing page. This iteration has more of a focus on front-end rather than back-end. All members of the team attended the meeting. That is, Anna Chester, Ethan Zhang, Jason Su, Junlin Qu, and Miles Bernstein.
#### Previous Iteration Changes
Below are the most significant changes that the team plans to make to the process.
* Allocate more time for back-end planning and design.
	* By spending more time planning and designing the back-end, the development team can identify potential challenges, requirements, and dependencies more effectively. This will result in a clearer and more comprehensive understanding of the project's scope, reducing the chances of encountering unexpected roadblocks during front-end development. The success of this change can be measured by the reduction in the number of critical blockers and high-priority issues that arise during front-end development due to inadequately planned back-end features. Additionally, tracking the percentage of back-end tasks completed without major revisions or scope changes can serve as an indicator of successful planning.
* Enforce documentation for every back-end endpoint.
	* Requiring documentation for each back-end endpoint promotes clarity and understanding among team members. Comprehensive documentation helps both back-end and front-end developers understand the available endpoints, their functionalities, and expected inputs/outputs. This will reduce the time spent on communication and rework due to misunderstandings or ambiguity in the API. The success of this change can be measured by the percentage of back-end endpoints that have complete and up-to-date documentation. The goal is to achieve 100% coverage of documented endpoints by the end of the iteration without going into time crunches.
* Prioritize back-end development before front-end development.
	* By prioritizing back-end development in the former half of the iteration, the development team can address crucial back-end functionalities and essential endpoints earlier. This approach ensures that front-end developers have a well-defined and stable API to work with during the latter half of the iteration, reducing the risk of critical blockers and late-stage API changes. The success of this change can be measured by tracking the percentage of essential back-end features and endpoints completed by the midpoint of the iteration. The goal is to have at least 70-80% of the essential back-end functionalities implemented before proceeding with front-end development.
#### Roles & Responsibilities
* Anna: Front-end, focusing on creating the front end functionality for student profiles, creating courses as admin, and viewing course schedule on student dashboard.
* Ethan: Front-end, focusing on various logics for user interfaces and user interfaces themselves
* Jason: Back-end and front-end, focusing on the design and implementation of backend endpoints for students selecting courses as well as for retrieving user data objects from the database.
* Miles: Back-end, focusing on managing relationship between database and backend, and creating endpoints for all tasks.
* Junlin: Front-end, focusing on front-end logic for student job applications, student event viewings and employers creating and deleting job postings.
#### Events
All of our meetings will be held online through Discord. We will have standups on Mondays at 3:00PM, Wednesdays at 6:00PM, and Fridays at 1:00PM. We will also have a planning session on the first Monday of each sprint, right after our standup, and a review session on the Thursday before the sprint deadline, preparing ourselves and fixing oversights for the demo. If our team requires extra meetings, they will be scheduled on a need-be basis.
#### Artifacts
We will use JIRA to track all the tasks we must finish during the sprint. During our planning meeting, we discussed which tickets were a priority based on what functionality will be used the most. Furthermore, each story and their corresponding subtasks will be assigned with story points. which will help each team member to prioritize his or her tasks. There will be an initial distribution of some tickets and afterwards, each team member can pick up any ticket they want to work on, provided they can finish it within the sprint.
#### Git Workflow
All work will be done based on a new branch named 'sprint2', which is branched from 'main'. By the end of the sprint, 'sprint2' will be merged into 'main'. Each feature, or subtask, will be branched from 'sprint2' and the name of the branch should corresponding with its ticket ID (e.g. YS-69). When a feature is finished, a pull request is made to merge the branch into 'sprint2'. In order for merging, at least ONE other team member will be required to review it. If everything seems to be in order and there is no conflicting code, the reviewer can approve of the pull request and then the requester will be allowed to merge. Otherwise, a comment can be made regarding in the work or changes can be requested. Naming conventions for commits and merges will follow the format provided in the course (e.g. feat: Implementation or fix: Bugfix). This system that the team has chosen will ultimately reduce code conflicts and bugs. Furthermore, the naming conventions will make it clear which branch is meant for which ticket and when merging, reviewers will understand what they are looking for.
## Product
#### Goals and tasks
For the third sprint, the goal is to give users access to some more base features to the application as well as completing previous tickets that were unfinished. The main focus will be implementing various front-end features for important operations. For example, a student will be able to create their own profile and then apply to jobs.
In order to meet the goal, the team will be working on nine user stories in order of most to least important:
1. Employer Job Posting Creation
2. Student Job Application
3. Student Profile Creation
4. Employer Job Viewing
5. Admin Course Addition & Removal
6. Student Prerequisite Viewing
7. Student Schedule Viewing
8. Student Schedule Addition
9. Landing Page

Each user story will be split into tasks which any team member can pick up and work on. The priority will be to complete the back-end features first and then the user interface and its logic will be implemented.
#### Artifacts
By the end of the sprint, the team plans to have established many core features that can be showcased, such as creation of jobs, viewing and creating job applications, student profiles, adding and removing courses, viewing courses in student schedules and prerequisites for courses, and the landing page. In order to have this, we will also have the back-end capabilities to retrieve the various required data from the database working in tandem with an intuitive user interface for all users. Working on these artifacts will enable the team to make user interface revisions for the final iteration.