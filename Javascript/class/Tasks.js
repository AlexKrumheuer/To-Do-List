class Tasks{
    taskFinished = false
    taskName
    taskList
    taskDate 
    taskAlarm
    taskFrequency
    taskInfo = ""
    taskNumber

    constructor (taskName, taskList, taskDate, taskAlarm, taskFrequency, taskNumber) {
        this.taskName = taskName
        this.taskList = taskList
        this.taskDate = taskDate
        this.taskAlarm = taskAlarm
        this.taskFrequency = taskFrequency
        this.taskNumber = taskNumber
    }

    setObjectInfo(taskName, taskDate, taskAlarm, taskFrequency, taskInfo) {
        this.taskName = taskName
        if(taskDate != "Remind me") {
            this.taskDate = taskDate
        }

        if(taskAlarm != "Add due date") {
            this.taskAlarm = taskAlarm
        }

        if(taskFrequency != "Repeat") {
            this.taskFrequency = taskFrequency
        }
        this.taskInfo = taskInfo
    }
}