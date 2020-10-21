import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent, Student } from './StudentTable.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let StudentsTbody: HTMLElement = document.getElementById('Students-Table')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputFilterBox1: HTMLInputElement = <HTMLInputElement>document.getElementById("filter1-box")!;
const inputFilterBox2: HTMLInputElement = <HTMLInputElement>document.getElementById("filter2-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;



btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();


renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderStudentInTable(students: Student[]): void {
  console.log('Desplegando estudiantes');
  students.forEach((students) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${students.dato}</td>
                             <td>${students.valor}</td>`;
    StudentsTbody.appendChild(trElement);
  });
}

function applyFilterByCredits() {
  let number = inputFilterBox1.valueAsNumber;
  let number2 = inputFilterBox2.valueAsNumber;
  clearCoursesInTable();
  let coursesFiltered: Course[] =new Array() ;
  coursesFiltered = searchCourseByCreditsHigh(number2, dataCourses);
  coursesFiltered = searchCourseByCreditsLow(number, coursesFiltered);
  renderCoursesInTable(coursesFiltered);
}



function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}
function searchCourseByCreditsHigh(nameKey: number, courses: Course[]) {
  return nameKey === null ? dataCourses : courses.filter(c =>
    c.credits<=nameKey);
}
function searchCourseByCreditsLow(nameKey: number, courses: Course[]) {
  return nameKey === null ? dataCourses : courses.filter(c =>
    c.credits>=nameKey);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}