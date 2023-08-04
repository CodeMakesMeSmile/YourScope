import requests
from bs4 import BeautifulSoup
import mysql.connector
from unidecode import unidecode

USERNAME = "wouldn't you like to know"
PASSWORD = "weather boy"

uniIds = {}
allPrograms = set()

groups = ["a", "b", "c", "d-e", "f-g", "h", "i", "j-l", "m", "n-p", "q-s", "t-z"]

def getProgram(id):
    r = requests.get(f"https://www.ontariouniversitiesinfo.ca/programs/{id}")

    soup = BeautifulSoup(r.text, 'html.parser')

    website = soup.find_all("a", {"title": "Opens a new website in a new window"})[1]["href"].replace("'", "")
    name = soup.find_all("h1", {"class": "template-heading"})[0].contents[0].replace("'", "")

    prereqsList = soup.find("div", {"id": "requirements"}).div
    if prereqsList.ul:
        prereqsList = prereqsList.ul.children
    else:
        prereqsList = prereqsList.p

    prereqs = []
    for i in prereqsList:
        if i != "\n":
            prereqs.append(i.text)

    prereqs = ",".join(prereqs).replace("'", "")

    table = soup.find_all("dd")
    tableContents = list(i.contents[0] for i in table)
    uniName = tableContents[0][:15]
    uni = uniIds[uniName]
    gradeRange = tableContents[3].replace("'", "")
    
    if len(tableContents) >= 7 and type(tableContents[6]) == str:
        language = tableContents[6].replace("'", "")
    else:
        language = "English"

    return f"INSERT INTO `yourscope`.`UniPrograms` (`Name`, `Language`, `GradeRange`, `Prerequisites`, `Website`, `UniversityId`) VALUES ('{name}', '{language}', '{gradeRange}', '{prereqs}', '{website}', '{uni}')"

def getPrograms():
    for group in groups:
        r2 = requests.get(f"https://www.ontariouniversitiesinfo.ca/programs/search/?search=&group={group}")
        soup = BeautifulSoup(r2.text, 'html.parser')
        programs = soup.find_all("article", {"class": "result result-program"})
        for i in programs:
            allPrograms.add(i["data-program"])

    print(str(len(allPrograms)) + " programs loaded")


def main():

    #Get university info
    r = requests.get("https://www.ontariouniversitiesinfo.ca/universities")
    soup = BeautifulSoup(r.text, 'html.parser')
    unis = soup.find_all("article", {"class": "university"})
    for ind, i in enumerate(unis):
        uniIds[i.h2.a.contents[0][:15]] = ind+74

    #Get all program ids
    getPrograms()

    cnx = mysql.connector.connect(user=USERNAME, password=PASSWORD,
                                host='yourscope.c0a92ja1esk5.us-east-1.rds.amazonaws.com',
                                database='yourscope')
    cursor = cnx.cursor()

    #Loop through all program ids and insert into db
    try:
        for ind, i in enumerate(allPrograms):
            program = getProgram(i)
            cursor.execute(program)
            if ind % 50 == 0:
                percent = ((ind+1)/1410) * 100
                print(f"{percent:.2f}% of programs inserted")
    except Exception as e:
        print(i)
        raise e

    cnx.commit()
    cursor.close()
    cnx.close()


if __name__ == "__main__":
    main()
    print("Done!")
