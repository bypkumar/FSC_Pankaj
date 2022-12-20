using FSC_Dashboard_DL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_BL
{
    public class DisruptionDashboard_BL
    {
        DisruptionDashboard_DL DL;

        public DisruptionDashboard_BL()
        {
            DL = new DisruptionDashboard_DL();
        }

        public List<FlightSection> Get_Flight_Type_Wise_Delay_chart(SearchCriteria search)
        {
            return DL.Get_Flight_Type_Wise_Delay_chart(search);

        }

        public List<FlightSection> Get_SelectedFlight_Type_Wise_Delay_chart(SearchCriteria search)
        {
            return DL.Get_SelectedFlight_Type_Wise_Delay_chart(search);

        }
        public List<FlightSection> Get_SelectedReason_Wise_Flight_chart(SearchCriteria search)
        {
            return DL.Get_SelectedReason_Wise_Flight_chart(search);

        }
        

        public List<FlightSection> Get_Delay_Wise_Flight_Count_chart(SearchCriteria search)
        {
            return DL.Get_Delay_Wise_Flight_Count_chart(search);

        }

        public List<FlightSection> Get_Flight_Wise_Delay_chart(SearchCriteria search)
        {
            return DL.Get_Flight_Wise_Delay_chart(search);

        }

        public List<FlightSection> Get_Flight_Type_Wise_Diverted_chart(SearchCriteria search)
        {
            return DL.Get_Flight_Type_Wise_Diverted_chart(search);

        }

        public List<FlightSection> Get_Diverted_Flight_Details_chart(SearchCriteria search)
        {
            return DL.Get_Diverted_Flight_Details_chart(search);

        }

        public List<FlightSection> Get_Flight_Type_Wise_Cancelled_chart(SearchCriteria search)
        {
            return DL.Get_Flight_Type_Wise_Cancelled_chart(search);

        }

        public List<FlightSection> Get_Cancellation_Flight_Details_chart(SearchCriteria search)
        {
            return DL.Get_Cancellation_Flight_Details_chart(search);

        }
        public List<Dropdown> Get_DropdownListForDateRange(SearchCriteria search)
        {
            return DL.Get_DropdownListForDateRange(search);
        }
        public List<FlightSection> Get_DivertedDataForGrid(SearchCriteria search)
        {
            return DL.Get_DivertedDataForGrid(search);
        }
        public List<FlightSection> Get_CancelledDataForGrid(SearchCriteria search)
        {
            return DL.Get_CancelledDataForGrid(search);
        }


    }
}
