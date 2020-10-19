using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using BL.Converters;
using DAL;
using DTO;

namespace BL
{
    public static class Mail
    {
        ///<summary> send reminder on mail to the passengers
        ///</summary>
        public static void sendMailReminderToP(Object state)
        {
            List<RegistrationDateRangeDTO> registrationNow = RegistrationDateRangeConverters.GetListDateRangeDTO(RegistrationDateRangeDal.GetTravelingsNow());
            foreach (var r in registrationNow)
            {
                sendMailReminder(RegisterationConverters.GetRegisterationDTO(RegisterationDal.GetRegisterationById(r.Id)));
            }
        }

        ///<summary> send reminder on mail
        ///</summary>
        public static void sendMailReminder(RegisterationDTO registeration)
        {
            TravelingDriver travelingDriver = TravelingDriverDal.GetTraveling(registeration.travelingIdDriver);
            TravelingPassenger travelingPassenger = TravelingPassengerDal.GetTraveling(registeration.travelingIdPassenger);
            Driver driver = DriverDal.GetDriverById(travelingDriver.DriverId);
            Passenger passenger = PassengerDal.GetPassengerById(travelingPassenger.PassengerId);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("traveligroup11@gmail.com");
                mail.To.Add(passenger.User.Mail);
                //mail.To.Add("lea0533113476@gmail.com");
                mail.Subject = " תזכורת נסיעה  ";
                string urlDetails = "http://localhost:4200/details-traveling-p/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                mail.Body = "<h2>תזכורת אודות נסיעתך היום<h2> <h3>פרטי הנהג <h3> <p>   שם נהג : " + driver.User.Name +
                    " <p> <p> לפרטי הנסיעה <p>  " + urlDetails +
                   "<br> בשעה  " + travelingDriver.Time.ToString()
                 + "  <p>  נסיעה טובה     <p>  ";
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("travelingroup11@gmail.com", "group1111@");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        /// <summary> send mail to suitable driver
        /// </summary>
        public static void sendMailSuitableDriver(TravelingPassenger travelingPassenger, TravelingDriverDTO travelingDriver)
        {
            string gender = "";
            Driver driver = DriverDal.GetDriverById(travelingDriver.DriverId);
            Passenger passenger = PassengerDal.GetPassengerById(travelingPassenger.PassengerId);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                if (driver.User.Gender == true)
                    gender = "זכר";
                else
                    gender = "נקבה";
                mail.From = new MailAddress("traveligroup11@gmail.com");
                mail.To.Add(driver.User.Mail);
                //mail.To.Add("lea0533113476@gmail.com");
                mail.Subject = "מציאת נסיעת נהג תואמת לנסיעתך ";
                string urlDetails = "http://localhost:4200/details-traveling-p/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                string sURL = "http://localhost:4200/suitable-drivers/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                mail.Body = "<h2>נמצא נהג תואם לנסיעתך <h2> <h3>פרטי הנהג <h3> <p>   שם נהג : " + driver.User.Name + " <p> <p> מין :" + " " + gender + "<p><br><p> לפרטי הנסיעה <br>" + urlDetails + "<p><br><p>" + "אשר כאן" + "<br><p>" + sURL;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("travelingroup11@gmail.com", "group1111@");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        /// <summary> send mail to the driver to confirm the joining
        /// </summary>
        public static bool MailDriverToConfirm(int idTravelingDriver, int idTravelingPassenger, string body, string subject)
        {
            string gender;
            TravelingDriver travelingDriver = TravelingDriverDal.GetTraveling(idTravelingDriver);
            TravelingPassenger travelingPassenger = TravelingPassengerDal.GetTraveling(idTravelingPassenger);
            Driver driver = DriverDal.GetDriverById(travelingDriver.DriverId);
            Passenger passenger = PassengerDal.GetPassengerById(travelingPassenger.PassengerId);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                if (passenger.User.Gender == true)
                    gender = "זכר";
                else
                    gender = "נקבה";
                mail.From = new MailAddress("traveligroup11@gmail.com");
                mail.To.Add(driver.User.Mail);
                //mail.To.Add("lea0533113476@gmail.com");
                mail.Subject = "אישור הצטרפות נוסע";
                string urlDetails = "http://localhost:4200/details-traveling-p/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                string urlConfirm = "http://localhost:4200/confirm-driver?idTravelingD=" + Uri.EscapeDataString(travelingDriver.TravelingIdDriver.ToString()) + "&idTravelingP=" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                mail.Body = "<h2>הצטרפות נוסע לנסיעתך<h2> <h3  >פרטי הנוסע <h3> <p>   שם נוסע : " + passenger.User.Name + " <p> <p> מין :" + " " + gender + "<p><br><p> לפרטי הנסיעה  <br>" + urlDetails + "<p><br><p>" + "אשר כאן" + "<br><p>" + urlConfirm;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("travelingroup11@gmail.com", "group1111@");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary> send mail to the passenger to confirm the joining
        /// </summary>
        public static bool MailPassengerToConfirm(int idTravelingDriver, int idTravelingPassenger, string body, string subject)
        {
            string gender;

            TravelingDriver travelingDriver = TravelingDriverDal.GetTraveling(idTravelingDriver);
            TravelingPassenger travelingPassenger = TravelingPassengerDal.GetTraveling(idTravelingPassenger);
            Driver driver = DriverDal.GetDriverById(travelingDriver.DriverId);
            Passenger passenger = PassengerDal.GetPassengerById(travelingPassenger.PassengerId);

            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                if (driver.User.Gender == true)
                    gender = "זכר";
                else
                    gender = "נקבה";
                mail.From = new MailAddress("traveligroup11@gmail.com");
                mail.To.Add(driver.User.Mail);
                //mail.To.Add("lea0533113476@gmail.com");
                mail.Subject = "אישור הצטרפותך לנסיעה ";
                string urlDetails = "http://localhost:4200/details-traveling-p/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                string sURL = "http://localhost:4200/confirm-passenger?idTravelingD=" + Uri.EscapeDataString(travelingDriver.TravelingIdDriver.ToString()) + "&idTravelingP=" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                mail.Body = "<h2>הצטרפותך לנסיעה<h2> <h3>פרטי הנהג <h3> <p>   שם נהג : " + driver.User.Name + " <p> <p> מין :" + " " + gender + "<p><br><p> לפרטי הנסיעה <br>" + urlDetails + "<p><br><p>" + "אשר כאן" + "<br><p>" + sURL;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("travelingroup11@gmail.com", "group1111@");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary> send mail to the passenger about the cancle
        /// </summary>
        public static void sendMailCancelToP(RegisterationDTO reg, DateTime fromDate, DateTime toDate)
        {
            TravelingDriver travelingDriver = TravelingDriverDal.GetTraveling(reg.travelingIdDriver);
            TravelingPassenger travelingPassenger = TravelingPassengerDal.GetTraveling(reg.travelingIdPassenger);
            Driver driver = DriverDal.GetDriverById(travelingDriver.DriverId);
            Passenger passenger = PassengerDal.GetPassengerById(travelingPassenger.PassengerId);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("traveligroup11@gmail.com");
                mail.To.Add(passenger.User.Mail);
                //mail.To.Add("lea0533113476@gmail.com");
                mail.Subject = " הודעה על ביטול נסיעה  ";
                string urlDetails = "http://localhost:4200/details-traveling-p/" + Uri.EscapeDataString(travelingPassenger.TravelingIdPassenger.ToString());
                mail.Body = "<h2>ביטול נסיעה מנהג<h2> <h3>פרטי הנהג <h3> <p>   שם נהג : " + driver.User.Name +
                    " <p> <p> לפרטי הנסיעה <p>  " + urlDetails +
                   "<br> מתאריך  " + fromDate.ToShortDateString()
                   + "   עד תאריך    " + toDate.ToShortDateString() + "  <p> במידה ונגבה תשלום עבור נסיעות אלו , ישולם החזר כספי    <p>  ";
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("travelingroup11@gmail.com", "group1111@");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
