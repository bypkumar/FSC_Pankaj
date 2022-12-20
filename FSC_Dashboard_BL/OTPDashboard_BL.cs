using FSC_Dashboard_DL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_BL
{
    public class OTPDashboard_BL
    {
        OTPDashboard_DL DL;

        public OTPDashboard_BL()
        {
            DL = new OTPDashboard_DL();
        }

       
        public List<FlightSection> OTPGet_flight_type_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGet_flight_type_analysis_chart(search);
        }

        public List<FlightSection> OTPGet_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGet_Delay_analysis_chart(search);
        }
        public List<FlightSection> OTPGet_Delay_analysis_Datewisechart(SearchCriteria search)
        {
            return DL.OTPGet_Delay_analysis_Datewisechart(search);
        }
        public List<DelayAnalysis> OTPGetSector_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGetSector_Delay_analysis_chart(search);
        }
        public List<FlightSection> OTPGetRegion_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGetRegion_Delay_analysis_chart(search);
        }
        public List<FlightSection> OTPGetRegionCity_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGetRegionCity_Delay_analysis_chart(search);
        }
        
        public List<DelayAnalysis> OTPGetFlight_Delay_analysis_chart(SearchCriteria search)
        {
            return DL.OTPGetFlight_Delay_analysis_chart(search);
        }

        public List<Sector> getSectorsLst(SearchCriteria search)
        {
            return DL.getSectorsLst(search);
        }

        public List<FlightTypeSector> getFlightTypeSectorsLst(SearchCriteria search)
        {
            return DL.getFlightTypeSectorsLst(search);

        }

        public List<FlightSection> SectorWise_bubble_chart(SearchCriteria search)
        {
            return DL.SectorWise_bubble_chart(search);

        }
        public List<FlightSection> FlightTypeSectorWise_bubble_chart(SearchCriteria search)
        {
            return DL.FlightTypeSectorWise_bubble_chart(search);

        }

        public List<FlightSection> Get_SectorDataForGrid(SearchCriteria search)
        {
            return DL.Get_SectorDataForGrid(search);
        }
        public List<FlightSection> Get_FlightDataForGrid(SearchCriteria search)
        {
            return DL.Get_FlightDataForGrid(search);
        }





    }
}
