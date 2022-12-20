using FSC_Dashboard.Constant;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class OTPDashboardController : Controller
    {
        // GET: OTPDashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult OTP_Dashboard()
        {
            if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
                return RedirectToAction("login", "User");

            SearchCriteria search = new SearchCriteria();
            search.FromDate = "";
            search.ToDate = "";
            search.GetDataFor = "Date Range";
            search.DateDropDownValue = "Current Day";
            //search.DateDropDownValue_two = "Previous Quarter";
            search.DateDropDownValue_two = "";

            ViewBag.Dropdown = new SelectList(BusinessHelper.BusinessHelper.Get_DropdownListForDateRange(search), WebConstants.DateRange, WebConstants.DateRange);
            ViewBag.sector = new SelectList(BusinessHelper.BusinessHelper.getSectorsLst(search), WebConstants.Sector, WebConstants.Sector);
            ViewBag.flightTypeSector = new SelectList(BusinessHelper.BusinessHelper.getFlightTypeSectorsLst(search), WebConstants.FlightTypeSector, WebConstants.FlightTypeSector);

            return View();
        }


        #region OverallOTP
        public JsonResult OTPGet_Delay_analysis_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.OTPGet_Delay_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Sector = rs.Sector.ToString(),
                           //FromcityCode = rs.FromcityCode.ToString(),
                           //ToCityCode = rs.ToCityCode.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OTPGet_Delay_analysis_Datewisechart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.OTPGet_Delay_analysis_Datewisechart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FlightDate = rs.FlightDate.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        #endregion OverallOTP

        #region Region wise OTP
        public JsonResult OTPGetRegion_Delay_analysis_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.OTPGetRegion_Delay_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           //FromCity = rs.FromCity.ToString(),
                           //CityCode = rs.CityCode.ToString(),
                           Region = rs.Region.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OTPGetRegionCity_Delay_analysis_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.OTPGetRegionCity_Delay_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FromCity = rs.FromCity.ToString(),
                           CityCode = rs.CityCode.ToString(),
                           Region = rs.Region.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        #endregion Region wise OTP

        #region Metro wise
        public JsonResult OTPGet_flight_type_analysis_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.OTPGet_flight_type_analysis_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           MetroCity = rs.MetroCity.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),

                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }


        #endregion Metro wise

        #region Sector wise OTP

        public JsonResult Get_SectorWise_bubble_chart(string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.SectorWise_bubble_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           Sector = rs.Sector.ToString(),
                           SectorCount = rs.SectorCount.ToString(),
                           //FromcityCode = rs.FromcityCode.ToString(),
                           //ToCityCode = rs.ToCityCode.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        #endregion Sector wise OTP

        #region Flight wise OTP

        public JsonResult FlightTypeSectorWise_bubble_chart(string fromDate, string toDate, string ddValue, string FSector, string GetDataFor)
        {
            List<FlightSection> LstFlightTypeAnalysis = new List<FlightSection>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.FSector = FSector;
            search.GetDataFor = GetDataFor;

            LstFlightTypeAnalysis = BusinessHelper.BusinessHelper.FlightTypeSectorWise_bubble_chart(search);
            var json = from rs in LstFlightTypeAnalysis
                       select new
                       {
                           FLTSector = rs.FLTSector.ToString(),
                           FLTSectorCount = rs.FLTSectorCount.ToString(),
                           OTPPercentage = rs.OTPPercentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        #endregion Flight wise OTP

        #region Dropdown

        public JsonResult Get_SectorListForDD(string fromDate, string toDate, string ddValue, string GetDataFor)
        {
            List<Sector> LstBase = new List<Sector>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.GetDataFor = GetDataFor;
            search.DateDropDownValue_two = ddValue;

            LstBase = BusinessHelper.BusinessHelper.getSectorsLst(search);
            var json = from rs in LstBase
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           SectorName = rs.SectorName.ToString(),
                           FromcityCode = rs.FromcityCode.ToString(),
                           ToCityCode = rs.ToCityCode.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get_FlightSectorListForDD(string fromDate, string toDate, string ddValue, string GetDataFor)
        {
            List<FlightTypeSector> LstBase = new List<FlightTypeSector>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.GetDataFor = GetDataFor;
            search.DateDropDownValue_two = ddValue;

            LstBase = BusinessHelper.BusinessHelper.getFlightTypeSectorsLst(search);
            var json = from rs in LstBase
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           //Id = rs.StaffID.ToString(),
                           flight_Type_Sector = rs.flight_Type_Sector.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        #endregion Dropdown

        #region Grid
        public JsonResult Get_SectorDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string fromDate, string toDate, string ddValue, string Sector, string GetDataFor)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();
          
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.Sector = Sector;
            search.GetDataFor = GetDataFor;


            try
            {
                List<FlightSection> lst = BusinessHelper.BusinessHelper.Get_SectorDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           //FlightDate = C.FlightDate,
                           //FlightNo = C.FlightNo,
                           //Sector = C.Sector,
                           //SectorTo = C.SectorTo,
                           //AircraftType = C.AircraftType,
                           //TailNo = C.TailNo,
                           //DiversionReason = C.DiversionReason,

                           Sector = C.Sector.ToString(),
                           SectorCount = C.SectorCount.ToString(),
                           //FromcityCode = C.FromcityCode.ToString(),
                           //ToCityCode = C.ToCityCode.ToString(),
                           OTPPercentage = C.OTPPercentage.ToString(),

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

        public JsonResult Get_FlightDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string fromDate, string toDate, string ddValue, string FSector, string GetDataFor)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.DateDropDownValue = ddValue;
            search.FSector = FSector;
            search.GetDataFor = GetDataFor;


            try
            {
                List<FlightSection> lst = BusinessHelper.BusinessHelper.Get_FlightDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           //FlightDate = C.FlightDate,
                           //FlightNo = C.FlightNo,
                           //Sector = C.Sector,
                           //AircraftType = C.AircraftType,
                           //TailNo = C.TailNo,
                           //Reason = C.Reason,

                           FLTSector = C.FLTSector.ToString(),
                           FLTSectorCount = C.FLTSectorCount.ToString(),
                           OTPPercentage = C.OTPPercentage.ToString(),

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

        #endregion Grid
    }
}