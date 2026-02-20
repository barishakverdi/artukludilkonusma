import AirDatepicker from "air-datepicker";
import localeTr from "air-datepicker/locale/tr";

const appointmentDateInput = new AirDatepicker("#appointment-date", {
  locale: localeTr,
  minDate: new Date(),
  isMobile: false,
});
