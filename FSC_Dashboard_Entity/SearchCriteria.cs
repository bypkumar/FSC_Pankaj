using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_Entity
{
   public class SearchCriteria
    {
        public string Mode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string DateDropDownValue { get; set; }
        public string DateDropDownValue_two { get; set; }
        public string FlightType { get; set; }
        public string Code { get; set; }
        public string DelayCode { get; set; }
        public string Mod { get; set; }
        public string GetDataFor { get; set; }
        public string ACName { get; set; }
        public string AcCode { get; set; }

        public string Sector { get; set; }
        public string FSector { get; set; }


        public string SearchText { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public int Page { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int rows { get; set; }
        public string DrilldownValue { get; set; }
        public string selectedChangeType { get; set; }
        public string drilldown_val_one { get; set; }
        public string drilldown_val_two { get; set; }
        public string drilldown_val_three { get; set; }
        public string drilldown_val_four { get; set; }


    }
}
