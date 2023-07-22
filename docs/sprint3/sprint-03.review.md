# YourScope | Wenduo Sky
## Iteration III - Review & Retrospect
This meeting took place on Friday, July 21, 2023 at 5:35PM. The meeting was held online through Discord.
## Process - Reflection
The third iteration was by far the densest iteration the team had. After learning from the mistakes from the first and second iterations, the opportunity for a much more productive iteration revealed itself. Below are the observations that Wenduo Sky had during the second iteration.
#### Successful Decisions
* Proper planning of back-end was carried out.
	* Spending more time on back-end planning and design has led to a clearer understanding of how to use end-points and allowed team members to predict how to use endpoints despite their nonexistence. This clarity enabled better decision-making throughout the development process. With more thorough planning, the team encountered less hiccups during development. As a result, there is a notable reduction in the need for rework or major revisions, leading to a more efficient iteration.
* Back-end documentation was enforced during development.
	* Requiring documentation for every back-end endpoint fostered better collaboration between team members. Team members, no matter what they worked on, could easily understand the endpoints, leading to fewer misunderstandings and a smoother integration. Comprehensive documentation makes it easier to maintain the back-end in the future. When updates or changes are needed, team members can refer to the documentation to ensure that modifications are made accurately and without unintended consequences.
* Back-end development was front-loaded.
	* By prioritizing back-end development in the first half of the iteration, the team noticed a significant reduction in front-end blockers. Front-end developers can work with a well-defined API, leading to faster and more efficient front-end development. Front-loading back-end development provided more time to address and resolve complex issues related to database design, and core functionalities.
#### Unsuccessful Decisions
* Pull requests were left unreviewed for too long.
	* There had been a couple of instances in which pull requests had been created with requested reviewers, but the requested reviewers failed to review their respective pull requests. Resultantly, changes were unable to be merged before more conflicts had arisen with newer changes, hindering development.
#### Planned Changes
* Notify the team of pull requests that are made.
	* The root of the aforementioned issue with unreviewed pull requests was the lack of notification of the creation of pull requests. In the future, when a pull request is made, the reviewer of the pull request must be notified by the team member who opened the pull request and must be addressed as soon as possible by the reviewer.
## Product - Review
#### Complete Planned Tasks
* YS-83: Front-end UI to add and delete job postings.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/41e7fb64d996a70d67fc5509824fde21e631d5b5)
* YS-87: Front-end logic to apply for job.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/049d68d725094608c2e211e0ef949c38a013658d)
* YS-89: Front-end UI to display job applications for employers.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/f267e56a8f43651a5e45e7883664d030bcaa9655)
* YS-92: Create student profile object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/42b21d4adc7cb43d8f43ecab677d6c8297b3d25b)
* YS-93: Back-end endpoint to create and update, and retrieve student profile.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/42b21d4adc7cb43d8f43ecab677d6c8297b3d25b)
* YS-94: Front-end to allow creation and editing of student profile.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1661d395ea7532f33157e0a57e76203e8705e945)
* YS-95: Routing or redirecting to student profile page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1661d395ea7532f33157e0a57e76203e8705e945)
* YS-135: Create course object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/04ef253c830c805802d54959abe2ad71db2fd556)
* YS-137: Create back-end to add courses.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/04ef253c830c805802d54959abe2ad71db2fd556)
* YS-138: Create endpoint to retrieve courses with filters.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/7cc24fd31a612aa823ac627ca8c4e534baa81d6c)
* YS-177: Create back-end endpoint to remove course from school.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/b22352c0a19a8541769fc5b350eca4dbf9798917)
* YS-182: Create an endpoint to return the number of filtered courses.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/c9de0d93f92278eb8fe138069966a4781ea860ef)
* YS-139: Create front-end to add and remove courses.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4dc02731958dbbcd798f365e4e82445ffa3822fa)
* YS-153: Create front-end to display courses in admin dashboard.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/63eed3ff253dd08f592de14fd3653f0674d45aae)
* YS-152: Create front-end to retrieve courses for admins in dedicated page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1a7e3d727d682b9e62426f2cb1b47b8286a147fc)
* YS-140: Create endpoint to get prerequisite of a course.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/56eaf9a7fc9ed02b654eb67c51d13d99e3dac297)
* YS-141: Create front-end logic to view prerequisites of given course.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/56eaf9a7fc9ed02b654eb67c51d13d99e3dac297)
* YS-142: Create schedule object.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/fef087d02b32c61382be8a2ab26919ba0730b455)
* YS-146: Create front-end schedule page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/ca688458f8b7067e4f27fc924c6b050ab7f8b806)
* YS-144: Create endpoint to retrieve courses from schedule.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/ded86e3d1b4ce63d72d9a2b05822be4beba920d7)
* YS-178: Create endpoint to create a schedule for a student.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/fef087d02b32c61382be8a2ab26919ba0730b455)
* YS-143: Create endpoint to add and remove course from schedule.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/d2cb28e1c664630f091226204a0fdc986e056879)
* YS-145: Create front-end dashboard preview of schedule.
	* [Artifact]()
* YS-151: Add ability to log out.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/1e339be7923416d8ebba083087cec145e75b94fe)
* YS-136: Add front-end logic to load landing page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/ad7d048d7cd790dbcce6095924940747861fb86b)
* YS-25: Create SQL backup.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/95aa1cd17677b370b8014ccb480f17166d1b7755)
* YS-181: Paginate admin dedicated events page.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/227dab4e1edd7963fd8714eb794a132969389234)
* YS-176: Fix double redirection of registration.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/0024e910e1118c45d7e75445be101023bed5c944)
* YS-154: Create endpoint to populate school with myBlueprint course data.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/09ee171cbea5c44927a640128a798e00e76c8619)
* YS-130: Add validation on the input forms on the front-end.
	* [Artifact]()
* YS-129: GET job postings endpoint cannot be queried by employer ID.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/573fa00add3774bb89ac12f350531583866b0598)
* YS-128: GET job postings endpoint does not return the job posting ID.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/573fa00add3774bb89ac12f350531583866b0598)
* YS-131: Student dashboard does not display correct name of school.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/a9c7c9a351a47bf6036474a473d9adbab52936cb)
* YS-132: Endpoint to create admin account.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/cf7c8f214857fb9f17d90d6ef5f33f7f78adac4a)
* YS-180: Update job application endpoints with student profile and cover letter info.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/26ae711aa1e59afbb29214444d6a31c570fef035)
* YS-183: GET job postings endpoint has validation on user ID that does not allow retrieval of job postings.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/4a25bf2b9b5359454c9b3312c6073e865485753d)
* YS-184: Events do not display on the student dashboard.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/065db76bbdde53a425ad51ff7c88b5bd38cfc92a)
* YS-185: Create cover letter endpoint does not return state of CV after creation.
	* [Artifact](https://github.com/CSCC012023/final-project-s23-wenduo-sky/commit/9fba8204e3768d028bfa58971f2da382d3ab68b4)
#### Incomplete Planned Tasks
* YS-15: Front-end to retrieve courses in course page.
	* There was insufficient time to complete this task.
* YS-160: Front-end UI for cover letter creation.
	* There was an oversight in the endpoint that retrieved student profiles, resulting in a blocker that could not be resolved in time.
* YS-161: Front-end logic for cover letter creation.
	* There was an oversight in the endpoint that retrieved student profiles, resulting in a blocker that could not be resolved in time.
## Meeting Highlights
Going into the next iteration, the team's main insights are:
 * Keep eyes peeled for bugs or potential quality-of-life changes that can be made in the final iteration since there is ample time to make these changes
 * Keep up the good work!