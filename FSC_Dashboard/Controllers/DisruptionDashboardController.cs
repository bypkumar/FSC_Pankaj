using FSC_Dashboard.Constant;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class DisruptionDashboardController : Controller
    {
        // GET: DisruptionDashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Disruption_Dashboard()
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

        public JsonResult Get_DropdownListForDateRange(string fromDate, string toDate, string GetDataFor, string DateDropDownValue)
        {
            List<Dropdown> LstBase = new List<Dropdown>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.GetDataFor = GetDataFor == "null" ? "" : GetDataFor;
            search.DateDropDownValue = DateDropDownValue == "null" ? "" : DateDropDownValue;

            LstBase = BusinessHelper.BusinessHelper.Get_DropdownListForDateRange(search);
            var json = from rs in LstBase
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.Id.ToString(),
                           DateRange = rs.DateRange.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        #region Disruption Dashboard

        public JsonResult Get_Flight_Type_Wise_Delay_chart(string fromDate, string toDate, string ddValue, string FlightType, string DelayCode, string Code, string Mod)
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

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Flight_Type_Wise_Delay_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightType = rs.FlightType.ToString(),
                           FlightCount = rs.FlightCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_SelectedFlight_Type_Wise_Delay_chart(string fromDate, string toDate, string ddValue, string Code, string DelayCode, string Mod, string FlightType)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Code = Code;
            search.FlightType = FlightType;
            search.DelayCode = DelayCode;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_SelectedFlight_Type_Wise_Delay_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Reason = rs.Reason.ToString(),
                           ReasonCount = rs.ReasonCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_SelectedReason_Wise_Flight_chart(string fromDate, string toDate, string ddValue, string Code, string DelayCode, string Mod, string FlightType)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Code = Code;
            search.FlightType = FlightType;
            search.DelayCode = DelayCode;
            search.Mod = Mod;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_SelectedReason_Wise_Flight_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightDate = rs.FlightDate.ToString(),
                           FlightNo = rs.FlightNo.ToString(),
                           DelayTime = rs.DelayTime.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_Delay_Wise_Flight_Count_chart(string fromDate, string toDate, string ddValue)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Delay_Wise_Flight_Count_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           FlightType = rs.FlightType.ToString(),
                           Value = rs.Value.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Get_Flight_Wise_Delay_chart(string fromDate, string toDate, string ddValue)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Flight_Wise_Delay_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           FlightType = rs.FlightType.ToString(),
                           Value = rs.Value.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Get_Flight_Type_Wise_Diverted_chart(string fromDate, string toDate, string ddValue, string FlightType, string DelayCode, string Code, string Mod)
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

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Flight_Type_Wise_Diverted_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightType = rs.FlightType.ToString(),
                           FlightCount = rs.FlightCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Get_Diverted_Flight_Details_chart(string fromDate, string toDate, string ddValue)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Diverted_Flight_Details_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           FlightType = rs.FlightType.ToString(),
                           Value = rs.Value.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Get_Flight_Type_Wise_Cancelled_chart(string fromDate, string toDate, string ddValue, string FlightType, string DelayCode, string Code, string Mod)
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

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Flight_Type_Wise_Cancelled_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightType = rs.FlightType.ToString(),
                           FlightCount = rs.FlightCount.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Get_Cancellation_Flight_Details_chart(string fromDate, string toDate, string ddValue)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.Get_Cancellation_Flight_Details_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           FlightType = rs.FlightType.ToString(),
                           Value = rs.Value.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_DivertedDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string ddValue, string DrilldownValue, string selectedChangeType = "", string drilldown_val_one = "", string drilldown_val_two = "", string drilldown_val_three = "", string drilldown_val_four = "", string Code="", string DelayCode="", string Mod="", string FlightType="")
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();
            search.DateDropDownValue = ddValue;
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.FlightType = FlightType;
            search.DelayCode = DelayCode;
            search.Code = Code;
            search.Mod = Mod;
            //search.FromDate = "02-03-2020";
            //search.ToDate = "03-03-2020";

            search.DrilldownValue = DrilldownValue;
            search.selectedChangeType = selectedChangeType;
            search.drilldown_val_one = drilldown_val_one;
            search.drilldown_val_two = drilldown_val_two;
            search.drilldown_val_three = drilldown_val_three;
            search.drilldown_val_four = drilldown_val_four;


            try
            {
                List<FlightSection> lst = BusinessHelper.BusinessHelper.Get_DivertedDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           FlightDate = C.FlightDate,
                           FlightNo = C.FlightNo,
                           Sector = C.Sector,
                           DivertedTo = C.DivertedTo,
                           AircraftType = C.AircraftType,
                           TailNo = C.TailNo,
                           DiversionReason = C.DiversionReason,
                           
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                ////This code is added to solve maxjson error
                //var jsonData1 = Json(lstagent_Togrid, JsonRequestBehavior.AllowGet);

                //return jsonData1;
                ////This code end

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;


            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_CancelledDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string ddValue, string DrilldownValue, string selectedChangeType = "", string drilldown_val_one = "", string drilldown_val_two = "", string drilldown_val_three = "", string drilldown_val_four = "", string Code = "", string DelayCode = "", string Mod = "", string FlightType = "")
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();
            search.DateDropDownValue = ddValue;
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.FlightType = FlightType;
            search.DelayCode = DelayCode;
            search.Code = Code;
            search.Mod = Mod;
            //search.FromDate = "02-03-2020";
            //search.ToDate = "03-03-2020";
            search.DrilldownValue = DrilldownValue;
            search.selectedChangeType = selectedChangeType;
            search.drilldown_val_one = drilldown_val_one;
            search.drilldown_val_two = drilldown_val_two;
            search.drilldown_val_three = drilldown_val_three;
            search.drilldown_val_four = drilldown_val_four;


            try
            {
                List<FlightSection> lst = BusinessHelper.BusinessHelper.Get_CancelledDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           FlightDate = C.FlightDate,
                           FlightNo = C.FlightNo,
                           Sector = C.Sector,
                           AircraftType = C.AircraftType,
                           TailNo = C.TailNo,
                           Reason = C.Reason,
                           
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                ////This code is added to solve maxjson error
                //var jsonData1 = Json(lstagent_Togrid, JsonRequestBehavior.AllowGet);

                //return jsonData1;
                ////This code end

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;


            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}