function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }

  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
  }

  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    })
    return employee
  }

  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    })
    return employee
  }

  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
  }

  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    const wagesEarned = hoursWorked * employee.payPerHour
    return wagesEarned
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    const wages = datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employee, date)
    }, 0)
    return wages
  }

  function calculatePayroll(employees) {
    const totalWages = employees.reduce((total, employee) => {
      return total + allWagesFor(employee)
    }, 0)
    return totalWages
  }

  const employeeRecords = createEmployeeRecords([
    ["John", "Doe", "Engineer", 25],
    ["Jennie", "Wise", "Manager", 30]
  ])

  const john = employeeRecords[0]
  const jennie = employeeRecords[1]

  createTimeInEvent(john, "2023-04-02 0900")
  createTimeOutEvent(john, "2023-04-02 1700")
  createTimeInEvent(jennie, "2023-04-02 1000")
  createTimeOutEvent(jennie, "2023-04-02 1800")

  console.log(hoursWorkedOnDate(john, "2023-04-02")) // output: 8
  console.log(wagesEarnedOnDate(john, "2023-04-02")) // output: 200
  console.log(allWagesFor(john)) // output: 200
  console.log(allWagesFor(jennie)) // output: 240
  console.log(calculatePayroll(employeeRecords)) // output: 440

