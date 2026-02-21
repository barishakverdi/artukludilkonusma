import AirDatepicker from "air-datepicker";
import localeTr from "air-datepicker/locale/tr";

const commonOptions = {
  locale: localeTr,
  minDate: new Date(),
  isMobile: false,
}
const appointmentDateInput = new AirDatepicker("#appointment-date", commonOptions);
const indexAppointmentDateInput = new AirDatepicker("#appointment-date-index", commonOptions);
