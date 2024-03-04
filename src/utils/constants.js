import dayjs from 'dayjs'

export const GENDER_OBJECT = {
  MALE: 'male',
  FEMALE: 'female'
}

export const GENDER_ARRAY = [
  { value: GENDER_OBJECT.MALE, label: 'Male' },
  { value: GENDER_OBJECT.FEMALE, label: 'Female' }
]

export const EXERCISE_PARTS_OBJECT = {
  BODY_PART: 'bodyParts',
  TARGET: 'targets'
}

export const EXERCISE_PARTS_ARRAY = [
  { value: EXERCISE_PARTS_OBJECT.BODY_PART, label: 'Body parts' },
  { value: EXERCISE_PARTS_OBJECT.TARGET, label: 'Targets' }
]

export const DAYS_OF_WEEK_OBJECT = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday'
}

export const DAYS_OF_WEEK_ARRAY = [
  { value: DAYS_OF_WEEK_OBJECT.MONDAY, label: 'Monday' },
  { value: DAYS_OF_WEEK_OBJECT.TUESDAY, label: 'Tuesday' },
  { value: DAYS_OF_WEEK_OBJECT.WEDNESDAY, label: 'Wednesday' },
  { value: DAYS_OF_WEEK_OBJECT.THURSDAY, label: 'Thursday' },
  { value: DAYS_OF_WEEK_OBJECT.FRIDAY, label: 'Friday' },
  { value: DAYS_OF_WEEK_OBJECT.SATURDAY, label: 'Saturday' },
  { value: DAYS_OF_WEEK_OBJECT.SUNDAY, label: 'Sunday' }
]

export const CURRENT_DAY_OF_WEEK = dayjs().format('dddd').toLocaleLowerCase()
