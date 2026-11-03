// Richmond classrooms families can collect a paid order from.
// api/checkout.js and api/notify.js use this same list, so names and inboxes stay in step.
const pickupLocations = [
  {
    id: 'richmondcentral',
    name: 'Richmond Central',
    lines: ['140-8031 Williams Road', 'Richmond, BC V7A 1G4'],
    address: '140-8031 Williams Road, Richmond, BC V7A 1G4',
    phone: '(604) 447-8999',
    tel: '+16044478999',
    email: 'richmondcentral@steamoji.com',
    maps: 'https://www.google.com/maps/search/?api=1&query=140-8031+Williams+Road+Richmond+BC+V7A+1G4',
  },
  {
    id: 'richmondnorth',
    name: 'Richmond North',
    lines: ['116-4940 No. 3 Road', 'Richmond, BC V6X 3A5'],
    address: '116-4940 No. 3 Road, Richmond, BC V6X 3A5',
    phone: '(604) 273-2555',
    tel: '+16042732555',
    email: 'richmondnorth@steamoji.com',
    maps: 'https://www.google.com/maps/search/?api=1&query=116-4940+No.+3+Road+Richmond+BC+V6X+3A5',
  },
];

if (typeof module !== 'undefined') module.exports = { pickupLocations };
