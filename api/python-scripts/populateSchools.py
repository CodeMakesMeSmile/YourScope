import requests
import sys


'''
populateSchools.py [schoolId] [schoolName]

params:
schoolId   - Id of school in database
schoolName - Name of school in myblueprint
'''

MYBLUEPRINT_URL = "https://api.myblueprint.ca/v1.0/Public/Courses/"
YOURSCOPE_API_URL = "http://localhost:5212/api/schools/v1/add-courses/" 

CREDITS = {
    0.0: 0,
    0.5: 1,
    1.0: 2,
    2.0: 3,
    4.0: 3
}

def main(args):
    schoolId = args[1]
    schoolName = args[2]

    r = requests.get(MYBLUEPRINT_URL + schoolName)
    r.raise_for_status()

    data = r.json()

    formattedData = []

    for course in data:

        formattedData.append({
            "courseCode": course["courseCode"],
            "name": course["name"],
            "description": course["description"],
            "discipline": course["discipline"]["name"],
            "type": course["type"] if course["type"] else "",
            "grade": course["grade"],
            "credits": CREDITS[course["credits"]],
            "prerequisites": ",".join(course["prerequisites"])
        })

    r = requests.post(YOURSCOPE_API_URL + schoolId, json=formattedData)
    if r.status_code != 201:
        print(r.text)

    print("Done!")



if __name__ == "__main__":
    main(sys.argv)