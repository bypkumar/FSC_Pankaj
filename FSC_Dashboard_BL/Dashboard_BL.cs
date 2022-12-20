using FSC_Dashboard_DL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_BL
{
    public class Dashboard_BL
    {
        Dashboard_DL DL;

        public Dashboard_BL()
        {
            DL = new Dashboard_DL();
        }

        public FlightSection Get_Flight_International_Domastic_Departs(SearchCriteria search)
        {
            return DL.Get_Flight_International_Domastic_Departs(search);

        }
        public List<FlightSection> Get_flight_type_analysis_chart(SearchCriteria search)
        {
            return DL.Get_flight_type_analysis_chart(search);
        }
        public List<FlightSection> Get_disruption_chart(SearchCriteria search)
        {
            return DL.Get_disruption_chart(search);
        }
        public List<FlightSection> Get_Aircraft_Utilization_chart(SearchCriteria search)
        {
            return DL.Get_Aircraft_Utilization_chart(search);
        }
        public List<FlightSection> Get_OverAllOTP_chart(SearchCriteria search)
        {
            return DL.Get_OverAllOTP_chart(search);
        }
        public List<FlightSection> Get_SectorTypeOTP_chart(SearchCriteria search)
        {
            return DL.Get_SectorTypeOTP_chart(search);
        }
        public List<FlightSection> Get_MetroWiseOTP_chart(SearchCriteria search)
        {
            return DL.Get_MetroWiseOTP_chart(search);
        }


        public List<DelayAnalysis> Get_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.Get_Delay_analysis_chart(search);
        }

        public List<DelayAnalysis> Get_PannedVsActual_chart(SearchCriteria search)
        {
            return DL.Get_PannedVsActual_chart(search);
        }




    }
}
