using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class DashboardController : Controller
    {

        #region Charts Views
        public ActionResult Index()
        {
            if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
                return RedirectToAction("login", "User");

            return View();
        }
        public ActionResult Index2()
        {
            if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
                return RedirectToAction("login", "User");

            return View();
        }
        //public ActionResult Onload_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}
        //public ActionResult OTP_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}
        //public ActionResult Load_Factor_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}
        //public ActionResult Planned_Vs_Actual_Block_Hours_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}
        //public ActionResult Aircraft_Utilization_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}
        //public ActionResult Disruption_Dashboard()
        //{
        //    if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
        //        return RedirectToAction("login", "User");

        //    return View();
        //}

        #endregion

        #region Chart Callbacks

        public JsonResult Get_Flight_International_Domastic_Departs(string fromDate, string toDate, string ddValue)
        {
            FlightSection flightSection = new FlightSection();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            flightSection = BusinessHelper.BusinessHelper.Get_Flight_International_Domastic_Departs(search);
            return Json(new { result = flightSection }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_flight_type_analysis_chart(string fromDate, string toDate, string ddValue)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_flight_type_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //Pid = rs.Pid.ToString(),
                           FlightType = rs.FlightType.ToString(),
                           FlightCount = rs.FlightCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_disruption_chart(string fromDate, string toDate, string ddValue, string FlightType, string DelayCode, string Code, string Mod)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.FlightType = FlightType;
            search.DelayCode = DelayCode;
            search.Code = Code;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_disruption_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           
                           FlightType = rs.FlightType.ToString(),
                           Status = rs.Status.ToString(),
                           FlightCount = rs.FlightCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Aircraft Utilization
        public JsonResult Get_Aircraft_Utilization_chart(string fromDate, string toDate, string ddValue, string ACName, string GetDataFor)
        {
            List<FlightSection> LstAircraftUtilization = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.ACName = ACName;
            search.GetDataFor = GetDataFor;

            LstAircraftUtilization = BusinessHelper.BusinessHelper.Get_Aircraft_Utilization_chart(search);
            var json = from rs in LstAircraftUtilization
                       select new
                       {
                           AircraftFamily = rs.AircraftFamily.ToString(),
                           BlockTimeInHrs = rs.BlockTimeInHrs.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_OverAllOTP_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstAircraftUtilization = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstAircraftUtilization = BusinessHelper.BusinessHelper.Get_OverAllOTP_chart(search);
            var json = from rs in LstAircraftUtilization
                       select new
                       {
                           Sector = rs.Sector.ToString(),
                           //FromcityCode = rs.FromcityCode.ToString(),
                           //ToCityCode = rs.ToCityCode.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                           //InternationalOTPPercentage = rs.InternationalOTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_SectorTypeOTP_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstAircraftUtilization = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstAircraftUtilization = BusinessHelper.BusinessHelper.Get_SectorTypeOTP_chart(search);
            var json = from rs in LstAircraftUtilization
                       select new
                       {
                           Sector = rs.Sector.ToString(),
                           //FromcityCode = rs.FromcityCode.ToString(),
                           //ToCityCode = rs.ToCityCode.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                           //InternationalOTPPercentage = rs.InternationalOTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_MetroWiseOTP_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstAircraftUtilization = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstAircraftUtilization = BusinessHelper.BusinessHelper.Get_MetroWiseOTP_chart(search);
            var json = from rs in LstAircraftUtilization
                       select new
                       {
                           MetroCity = rs.MetroCity.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                           //InternationalOTPPercentage = rs.InternationalOTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Delay Analysis
        public JsonResult Get_Delay_analysis_chart(string fromDate, string toDate, string ddValue)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Delay_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           GroupCode = rs.GroupCode.ToString(),
                           DelayCount = rs.DelayCount.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Get_PannedVsActual_chart(string fromDate, string toDate, string ddValue, string Mod)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_PannedVsActual_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //Time = rs.Time.ToString(),
                           Aircraft = rs.Aircraft.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),
                           //ActualFlightTime1 = rs.ActualFlightTime1.ToString(),
                           //PlannedFlightTime1 = rs.PlannedFlightTime1.ToString()
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        #endregion

      


    }
}