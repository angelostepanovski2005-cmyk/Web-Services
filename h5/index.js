const skopjeStudentNames = studentsData
  .filter((student) => student.grad === "Skopje")
  .map((student) => student.ime);
console.log("Task 1:", skopjeStudentNames);

const studentsByProsekAsc = [...studentsData].sort(
  (a, b) => a.prosek - b.prosek,
);
console.log("Task 2:", studentsByProsekAsc);

const bestFinkiStudent = studentsData
  .filter((student) => student.fakultet === "FINKI")
  .reduce((best, student) => (student.prosek > best.prosek ? student : best));
console.log("Task 3:", bestFinkiStudent);

const worstBitolaStudent = studentsData
  .filter((student) => student.grad === "Bitola")
  .reduce((worst, student) =>
    student.prosek < worst.prosek ? student : worst,
  );
console.log("Task 4:", worstBitolaStudent);

const cityGpaMap = studentsData.reduce((acc, student) => {
  if (!acc[student.grad]) {
    acc[student.grad] = { total: 0, count: 0 };
  }
  acc[student.grad].total += student.prosek;
  acc[student.grad].count += 1;
  return acc;
}, {});

const citiesSortedByGpa = Object.keys(cityGpaMap)
  .map((city) => ({
    city,
    avgGpa: cityGpaMap[city].total / cityGpaMap[city].count,
  }))
  .sort((a, b) => b.avgGpa - a.avgGpa);
console.log("Task 5:", citiesSortedByGpa);
