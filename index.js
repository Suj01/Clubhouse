class Apartment {
  constructor(facilityName, ratePerHour) {
    this.facilityName = facilityName;
    this.ratePerHour = ratePerHour;
    this.facilityBookings = [];
  }


  calculatePayment(startTime, endTime) {
    let totalAmount = 0;
    for (let i = startTime; i < endTime; i++) {
      let rate = 0;
      for (let j = 0; j < this.ratePerHour.length; j++) {
        if (i >= this.ratePerHour[j].start && i < this.ratePerHour[j].end) {
          rate = this.ratePerHour[j].rate;
          break;
        }
      }
      totalAmount += rate;
    }
    return totalAmount;
  }

  isBookingAvailable(date, startTime, endTime) {
    for (let i = 0; i < this.facilityBookings.length; i++) {
      let booking = this.facilityBookings[i];
      if (
        booking.date === date &&
        startTime < booking.endTime &&
        endTime > booking.startTime
      ) {
        return false;
      }
    }
    return true;
  }


  book(date, startTime, endTime) {
    if (this.isBookingAvailable(date, startTime, endTime)) {
      let amount = this.calculatePayment(startTime, endTime);
      this.facilityBookings.push({
        date: date,
        startTime: startTime,
        endTime: endTime,
      });
      return `Booked, Rs. ${amount}`;
    }
    return `Booking Failed, Already Booked`;
  }
}


const facilities = {
  Clubhouse: new Apartment("Clubhouse", [
    { start: 10, end: 16, rate: 100 },
    { start: 16, end: 22, rate: 500 },
  ]),
  "Tennis Court": new Apartment("Tennis Court", [
    { start: 0, end: 24, rate: 50 },
  ]),
  "Badminton Court": new Apartment("Tennis Court", [
    { start: 0, end: 24, rate: 80 },
  ]),
  "Swimming Pool": new Apartment("Tennis Court", [
    { start: 10, end: 22, rate: 250 },
  ]),
};


function bookFacility(name, date, timeRange) {
  const times = timeRange.split(" - ");
  const startTime = parseInt(times[0].split(":")[0]);
  const endTime = parseInt(times[1].split(":")[0]);
  const facility = facilities[name];
  if (!facility) {
    return "Facility not found";
  }
  return facility.book(date, startTime, endTime);
}


console.log(bookFacility("Clubhouse", "26-10-2020", "16:00 - 22:00"));
console.log(bookFacility("Tennis Court", "26-10-2020", "16:00 - 20:00"));
console.log(bookFacility("Badminton Court", "26-10-2020", "6:00 - 8:00"));
console.log(bookFacility("Swimming Pool", "26-10-2020", "11:00 - 13:00"));
console.log(bookFacility("Clubhouse", "26-10-2020", "16:00 - 22:00"));
console.log(bookFacility("Tennis Court", "26-10-2020", "17:00 - 21:00"));
