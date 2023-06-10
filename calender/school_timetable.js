function myFunction() {
    const lastRow = SpreadsheetApp.getActuveSpreadsheet().getSheetByName("時間割").getLastRow();
    const ss_timetable = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("時間割")
        .getRange(2, 1, lastRow - 1, 11)
        .getValues();
    const ss_school_hours = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("授業時間").getRange(2, 2, 5, 2).getValues();

    for (let lecture of ss_timetable) {
        lectureInfo = { time: lecture[1], name: lecture[2], teacherName: lecture[3], roomNumber: lecture[4], moodle: lecture[6], startDate: lecture[7], endDate: lecture[10] };

        if (lectureInfo.name != "") {
            lectureInfo.time = parseInt(lectureInfo.time);

            let title = `📝【${lectureInfo.room_number}】${lectureInfo.name}`;
            let startTime = time_formatting(lectureInfo.time, ss_school_hours[lectureInfo.time - 1][0]);
            let endTime = time_formatting(lectureInfo.time, ss_school_hours[lectureInfo.time - 1][1]);
            let description = `${lectureInfo.teacher_name}\n${lectureInfo.moodle}\n`;
            let endDate = new Date(lectureInfo["endDate"]);
            console.log(startTime);
            set_calender(title, startTime, endTime, description, endDate);
        }
    }
}

function time_formatting(day, time) {
    const d = new Date();
    d.setFullYear(parseInt(Utilities.formatDate(day, "Asia/Tokyo", "yyyy")), parseInt(Utilities.formatDate(day, "Asia/Tokyo", "MM")) - 1, parseInt(Utilities.formatDate(day, "Asia/Tokyo", "dd")));
    d.setHours(parseInt(Utilities.formatDate(time, "Asia/Tokyo", "H")), parseInt(Utilities.formatDate(time, "Asia/Tokyo", "m")), 0);
    return d;
}

function set_calender(title, startTime, endTime, endDate, description) {
    const calender_id = "";
    const cal = CalendarApp.getCalendarById(calender_id);
    const recurrence = CalendarApp.newRecurrence().addWeeklyRule().until(endDate);
    const options = {
        description: description,
    };
    const event = cal.createEventSeries(title, startTime, endTime, recurrence, options);
    console.log(event.getId());
}
