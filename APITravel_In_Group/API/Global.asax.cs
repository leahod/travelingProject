using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using BL;

namespace API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        System.Threading.Timer timer=null;
        System.Threading.TimerCallback callback = new System.Threading.TimerCallback( Mail.sendMailReminderToP);

        System.Threading.Timer timer1 = null;
        System.Threading.TimerCallback callback1 = new System.Threading.TimerCallback(PaymentBL.PayToDriver);
        protected void Application_Start()
        {
        timer = new System.Threading.Timer(callback, null, 0, TimeSpan.FromSeconds(3).Minutes);
            GlobalConfiguration.Configure(WebApiConfig.Register);
           
        }
    }
}
