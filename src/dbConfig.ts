export const dbConfig = {
  name: 'CoolDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'punch-outs',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'studentId', keypath: 'studentId', options: { unique: false } },
        { name: 'dateTime', keypath: 'dateString', options: { unique: false } },
      ],
    },
    {
      store: 'punch-ins',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'studentId', keypath: 'studentId', options: { unique: false } },
        { name: 'dateTime', keypath: 'dateString', options: { unique: false } },
      ],
    },
    {
      store: 'students',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'image', keypath: 'image', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        {
          name: 'admissionNo',
          keypath: 'admissionNo',
          options: { unique: true },
        },
        {
          name: 'fatherName',
          keypath: 'fatherName',
          options: { unique: false },
        },
        { name: 'mobileNo', keypath: 'mobileNo', options: { unique: false } },
        { name: 'gender', keypath: 'gender', options: { unique: false } },
        {
          name: 'identificationDoc',
          keypath: 'identificationDoc',
          options: { unique: false },
        },
        {
          name: 'identificationDocNo',
          keypath: 'identificationDocNo',
          options: { unique: false },
        },
        {
          name: 'address',
          keypath: 'address',
          options: { unique: false },
        },
        {
          name: 'territory',
          keypath: 'territory',
          options: { unique: false },
        },
        {
          name: 'router',
          keypath: 'router',
          options: { unique: false },
        },
        {
          name: 'lockerNo',
          keypath: 'lockerNo',
          options: { unique: false },
        },
        {
          name: 'reservedSeat',
          keypath: 'reservedSeat',
          options: { unique: false },
        },
        {
          name: 'dateOfJoining',
          keypath: 'dateOfJoining',
          options: { unique: false },
        },
        {
          name: 'validUpto',
          keypath: 'validUpto',
          options: { unique: false },
        },
        {
          name: 'timeSlotIn',
          keypath: 'timeSlotIn',
          options: { unique: false },
        },
        {
          name: 'timeSlotOut',
          keypath: 'timeSlotOut',
          options: { unique: false },
        },
        {
          name: 'feePaid',
          keypath: 'feePaid',
          options: { unique: false },
        },
      ],
    },
  ],
}
