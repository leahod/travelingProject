using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public static class StatisticsDal
    {
        public static List<int> GetGender()
        {
            try
            {
                using (Travel_In_GroupDBEntities db = new Travel_In_GroupDBEntities())
                {
                    List<int> genderList = new List<int>();
                    int female = 0, male = 0;
                    foreach (var item in db.Users.ToList())
                    {
                        if (item.Gender == true)
                            male++;
                        else female++;
                    }
                    genderList.Add(female);
                    genderList.Add(male);
                    return genderList;
                }
            }
            catch (Exception e)
            {
                throw new Exception("error");
            }
        }

        public static List<int> GetDays()
        {
            try
            {
                using (Travel_In_GroupDBEntities db = new Travel_In_GroupDBEntities())
                {
                    List<int> DaysList = new List<int>();
                    for (int i = 0; i < 14; i++)
                        DaysList.Add(0);
                    foreach (var item in db.TravelingPassengers.ToList())
                    {
                        string[] days = item.Weekday.Split(',');
                        for (int i = 0; i < days.Length; i++)
                        {
                           if( days[i]!=""&&days[i]!=",")
                            {
                                int day = int.Parse(days[i]);
                                var q = db.Users.FirstOrDefault(
                                    x => x.Identity == 
                                    db.Passengers.FirstOrDefault(p => p.Id == item.PassengerId).Identity);
                                if(q.Gender==true)
                                    DaysList[day - 1+7]++;
                                else DaysList[day - 1]++;
                            }

                        }
                    }
                    return DaysList;
                }
            }
            catch (Exception e)
            {
                throw new Exception("error");
            }
        }

        public static int GetAvgPassengers()
        {
            try
            {
                using (Travel_In_GroupDBEntities db = new Travel_In_GroupDBEntities())
                {
                    int count = db.TravelingDrivers.Count(p => p.Price >= 0);
                    int sum = db.TravelingDrivers.Where(x=>x.Price>=0).Sum(p=> (int)p.Price);
                    return sum/count;
                }
            }
            catch (Exception e)
            {
                throw new Exception("error");
            }
        }
    }
}
