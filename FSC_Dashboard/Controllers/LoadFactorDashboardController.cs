using FSC_Dashboard.Constant;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSC_Dashboard.Controllers
{
    public class LoadFactorDashboardController : Controller
    {
        // GET: LoadFactorDashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Load_Factor_Dashboard()
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
       
    }
}