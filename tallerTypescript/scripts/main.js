import { dataCourses } from './dataCourses.js';
import { dataStudent } from './StudentTable.js';
var coursesTbody = document.getElementById('courses');
var StudentsTbody = document.getElementById('Students-Table');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputFilterBox1 = document.getElementById("filter1-box");
var inputFilterBox2 = document.getElementById("filter2-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (students) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + students.dato + "</td>\n                             <td>" + students.valor + "</td>";
        StudentsTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var number = inputFilterBox1.valueAsNumber;
    var number2 = inputFilterBox2.valueAsNumber;
    clearCoursesInTable();
    var coursesFiltered = new Array();
    coursesFiltered = searchCourseByCreditsHigh(number2, dataCourses);
    coursesFiltered = searchCourseByCreditsLow(number, coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCreditsHigh(nameKey, courses) {
    return nameKey === null ? dataCourses : courses.filter(function (c) {
        return c.credits <= nameKey;
    });
}
function searchCourseByCreditsLow(nameKey, courses) {
    return nameKey === null ? dataCourses : courses.filter(function (c) {
        return c.credits >= nameKey;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
