using FSC_Dashboard.Constant;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class PlannedVsActualDashboardController : Controller
    {
        // GET: PlannedVsActualDashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Planned_Vs_Actual_Block_Hours_Dashboard()
        {
            if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
                return RedirectToAction("login", "User");
            SearchCriteria search = new SearchCriteria();
            search.FromDate = "";
            search.ToDate = "";
            search.GetDataFor = "Date Range";
            search.DateDropDownValue = "";
            ViewBag.Dropdown = new SelectList(BusinessHelper.BusinessHelper.Get_DropdownListForDateRange(search), WebConstants.DateRange, WebConstants.DateRange);
            return View();
        }

        public JsonResult PVAGet_PannedVsActual_chart(string fromDate, string toDate, string ddValue, string Mod)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.PVAGet_PannedVsActual_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Time = rs.Time.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),
                           ActualFlightTime1 = rs.ActualFlightTime1.ToString(),
                           PlannedFlightTime1 = rs.PlannedFlightTime1.ToString()
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PVAGet_DayWiseBlockHours_chart(string fromDate, string toDate, string ddValue, string Mod)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.PVAGet_DayWiseBlockHours_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightDate = rs.FlightDate.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PVAGet_DayWiseBlockHours_chartForB737(string fromDate, string toDate, string ddValue, string Mod,string AcCode)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;
            search.AcCode = AcCode;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.PVAGet_DayWiseBlockHours_chartForB737(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //FlightDate = rs.FlightDate.ToString(),
                           Aircraft = rs.Aircraft.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PVAGet_DayWiseBlockHours_chartForB737F(string fromDate, string toDate, string ddValue, string Mod, string AcCode)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;
            search.AcCode = AcCode;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.PVAGet_DayWiseBlockHours_chartForB737F(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //FlightDate = rs.FlightDate.ToString(),
                           Aircraft = rs.Aircraft.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),


                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PVAGet_DayWiseBlockHours_chartForQ400(string fromDate, string toDate, string ddValue, string Mod, string AcCode)
        {
            List<DelayAnalysis> LstFlightTypeAnalysis = new List<DelayAnalysis>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Mod = Mod;
            search.AcCode = AcCode;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.PVAGet_DayWiseBlockHours_chartForQ400(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //FlightDate = rs.FlightDate.ToString(),
                           Aircraft = rs.Aircraft.ToString(),
                           ActualFlightTime = rs.ActualFlightTime.ToString(),
                           PlannedFlightTime = rs.PlannedFlightTime.ToString(),


                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

    }
}