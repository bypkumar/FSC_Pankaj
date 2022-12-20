using FSC_Dashboard_BL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSC_Dashboard.BusinessHelper
{
    public static class BusinessHelper
    {
        #region Dashboard
        public static FlightSection Get_Flight_International_Domastic_Departs(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_Flight_International_Domastic_Departs(search);
        }

        public static List<FlightSection> Get_flight_type_analysis_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_flight_type_analysis_chart(search);
        }
        public static List<FlightSection> Get_disruption_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_disruption_chart(search);
        }
        public static List<FlightSection> Get_Aircraft_Utilization_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_Aircraft_Utilization_chart(search);
        }
        public static List<FlightSection> Get_OverAllOTP_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_OverAllOTP_chart(search);
        }
        public static List<FlightSection> Get_SectorTypeOTP_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_SectorTypeOTP_chart(search);
        }
        public static List<FlightSection> Get_MetroWiseOTP_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_MetroWiseOTP_chart(search);
        }

        public static List<DelayAnalysis> Get_Delay_analysis_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_Delay_analysis_chart(search);
        }

        public static List<DelayAnalysis> Get_PannedVsActual_chart(SearchCriteria search)
        {
            Dashboard_BL BL = new Dashboard_BL();
            return BL.Get_PannedVsActual_chart(search);
        }
        #endregion Dashboard

        #region OTP Dashboard
        public static List<FlightSection> OTPGet_Delay_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGet_Delay_analysis_chart(search);
        }
        public static List<FlightSection> OTPGet_Delay_analysis_Datewisechart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGet_Delay_analysis_Datewisechart(search);
        }
        public static List<DelayAnalysis> OTPGetSector_Delay_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGetSector_Delay_analysis_chart(search);
        }
        public static List<DelayAnalysis> OTPGetFlight_Delay_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGetFlight_Delay_analysis_chart(search);
        }
        public static List<FlightSection> OTPGetRegion_Delay_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGetRegion_Delay_analysis_chart(search);
        }
        public static List<FlightSection> OTPGetRegionCity_Delay_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGetRegionCity_Delay_analysis_chart(search);
        }
        public static List<FlightSection> OTPGet_flight_type_analysis_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.OTPGet_flight_type_analysis_chart(search);
        }

        public static List<Sector> getSectorsLst(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.getSectorsLst(search);
        }

        public static List<FlightTypeSector> getFlightTypeSectorsLst(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.getFlightTypeSectorsLst(search);
        }

        public static List<FlightSection> SectorWise_bubble_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.SectorWise_bubble_chart(search);
        }

        public static List<FlightSection> FlightTypeSectorWise_bubble_chart(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.FlightTypeSectorWise_bubble_chart(search);
        }

        public static List<FlightSection> Get_SectorDataForGrid(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.Get_SectorDataForGrid(search);
        }
        public static List<FlightSection> Get_FlightDataForGrid(SearchCriteria search)
        {
            OTPDashboard_BL BL = new OTPDashboard_BL();
            return BL.Get_FlightDataForGrid(search);
        }



        #endregion OTP Dashboard

        #region LoadFactor Dashboard
        #endregion LoadFactor Dashboard

        #region PlannedVsActual Dashboard
        public static List<DelayAnalysis> PVAGet_PannedVsActual_chart(SearchCriteria search)
        {
            PvADashboard_BL BL = new PvADashboard_BL();
            return BL.PVAGet_PannedVsActual_chart(search);
        }
        public static List<DelayAnalysis> PVAGet_DayWiseBlockHours_chart(SearchCriteria search)
        {
            PvADashboard_BL BL = new PvADashboard_BL();
            return BL.PVAGet_DayWiseBlockHours_chart(search);
        }
        public static List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737(SearchCriteria search)
        {
            PvADashboard_BL BL = new PvADashboard_BL();
            return BL.PVAGet_DayWiseBlockHours_chartForB737(search);
        }
        public static List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737F(SearchCriteria search)
        {
            PvADashboard_BL BL = new PvADashboard_BL();
            return BL.PVAGet_DayWiseBlockHours_chartForB737F(search);
        }
        public static List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForQ400(SearchCriteria search)
        {
            PvADashboard_BL BL = new PvADashboard_BL();
            return BL.PVAGet_DayWiseBlockHours_chartForQ400(search);
        }
        #endregion PlannedVsActual Dashboard

        #region AircraftUtilization Dashboard
        public static List<FlightSection> AUGet_Aircraft_Utilization_chart(SearchCriteria search)
        {
            AUDashboard_BL BL = new AUDashboard_BL();
            return BL.AUGet_Aircraft_Utilization_chart(search);
        }
        public static List<FlightSection> AUGet_FleetWiseBifurcation_chart(SearchCriteria search)
        {
            AUDashboard_BL BL = new AUDashboard_BL();
            return BL.AUGet_FleetWiseBifurcation_chart(search);
        }
        public static List<FlightSection> AUGet_AircraftTailNoWise_chart(SearchCriteria search)
        {
            AUDashboard_BL BL = new AUDashboard_BL();
            return BL.AUGet_AircraftTailNoWise_chart(search);
        }




        #endregion AircraftUtilization Dashboard

        #region Disruption Dashboard

        public static List<Dropdown> Get_DropdownListForDateRange(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_DropdownListForDateRange(search);
        }

        public static List<FlightSection> Get_Flight_Type_Wise_Delay_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Flight_Type_Wise_Delay_chart(search);
        }
        public static List<FlightSection> Get_SelectedFlight_Type_Wise_Delay_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_SelectedFlight_Type_Wise_Delay_chart(search);
        }
        public static List<FlightSection> Get_SelectedReason_Wise_Flight_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_SelectedReason_Wise_Flight_chart(search);
        }
        

        public static List<FlightSection> Get_Delay_Wise_Flight_Count_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Delay_Wise_Flight_Count_chart(search);
        }

        public static List<FlightSection> Get_Flight_Wise_Delay_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Flight_Wise_Delay_chart(search);
        }

        public static List<FlightSection> Get_Flight_Type_Wise_Diverted_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Flight_Type_Wise_Diverted_chart(search);
        }

        public static List<FlightSection> Get_Diverted_Flight_Details_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Diverted_Flight_Details_chart(search);
        }

        public static List<FlightSection> Get_Flight_Type_Wise_Cancelled_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Flight_Type_Wise_Cancelled_chart(search);
        }

        public static List<FlightSection> Get_Cancellation_Flight_Details_chart(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_Cancellation_Flight_Details_chart(search);
        }
        public static List<FlightSection> Get_DivertedDataForGrid(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_DivertedDataForGrid(search);
        }
        public static List<FlightSection> Get_CancelledDataForGrid(SearchCriteria search)
        {
            DisruptionDashboard_BL BL = new DisruptionDashboard_BL();
            return BL.Get_CancelledDataForGrid(search);
        }

        #endregion Disruption Dashboard

    }
}