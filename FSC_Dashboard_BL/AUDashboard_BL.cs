using FSC_Dashboard_DL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_BL
{
    public class AUDashboard_BL
    {
        AU_DL DL;

        public AUDashboard_BL()
        {
            DL = new AU_DL();
        }
        public List<FlightSection> AUGet_Aircraft_Utilization_chart(SearchCriteria search)
        {
            return DL.AUGet_Aircraft_Utilization_chart(search);
        }
        public List<FlightSection> AUGet_FleetWiseBifurcation_chart(SearchCriteria search)
        {
            return DL.AUGet_FleetWiseBifurcation_chart(search);
        }
        public List<FlightSection> AUGet_AircraftTailNoWise_chart(SearchCriteria search)
        {
            return DL.AUGet_AircraftTailNoWise_chart(search);
        }

    }
}
