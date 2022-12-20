using FSC_Dashboard_DL;
using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_BL
{
    public class PvADashboard_BL
    {
        PvA_DL DL;

        public PvADashboard_BL()
        {
            DL = new PvA_DL();
        }
        public List<DelayAnalysis> PVAGet_PannedVsActual_chart(SearchCriteria search)
        {
            return DL.PVAGet_PannedVsActual_chart(search);
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chart(SearchCriteria search)
        {
            return DL.PVAGet_DayWiseBlockHours_chart(search);
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737(SearchCriteria search)
        {
            return DL.PVAGet_DayWiseBlockHours_chartForB737(search);
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737F(SearchCriteria search)
        {
            return DL.PVAGet_DayWiseBlockHours_chartForB737F(search);
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForQ400(SearchCriteria search)
        {
            return DL.PVAGet_DayWiseBlockHours_chartForQ400(search);
        }
        

    }
}
