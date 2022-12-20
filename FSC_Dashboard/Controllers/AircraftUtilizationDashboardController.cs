using FSC_Dashboard.Constant;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class AircraftUtilizationDashboardController : Controller
    {
        #region Aircraft Utilization
        // GET: AircraftUtilizationDashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Aircraft_Utilization_Dashboard()
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

        public JsonResult AUGet_Aircraft_Utilization_chart(string fromDate, string toDate, string ddValue, string ACName, string GetDataFor)
        {
            List<FlightSection> LstAircraftUtilization = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.ACName = ACName;
            search.GetDataFor = GetDataFor;

            LstAircraftUtilization = BusinessHelper.BusinessHelper.AUGet_Aircraft_Utilization_chart(search);
            var json = from rs in LstAircraftUtilization
                       select new
                       {
                           AircraftFamily = rs.AircraftFamily.ToString(),
                           BlockTimeInHrs = rs.BlockTimeInHrs.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AUGet_FleetWiseBifurcation_chart(string fromDate, string toDate, string ddValue, string ACName, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.ACName = ACName;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.AUGet_FleetWiseBifurcation_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           AircraftFamily = rs.AircraftFamily.ToString(),
                           BlockTimeInHrs = rs.BlockTimeInHrs.ToString(),
                           AcName = rs.AcName.ToString(),
                           SumOfBlockTimeInHrs = rs.SumOfBlockTimeInHrs.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AUGet_AircraftTailNoWise_chart(string fromDate, string toDate, string ddValue, string ACName, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.ACName = ACName;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.AUGet_AircraftTailNoWise_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           AircraftFamily = rs.AircraftFamily.ToString(),
                           BlockTimeInHrs = rs.BlockTimeInHrs.ToString(),
                           AcName = rs.AcName.ToString(),
                           AcRegNo = rs.AcRegNo.ToString(),
                           SumOfBlockTimeInHrs = rs.SumOfBlockTimeInHrs.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}